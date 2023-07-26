import fs from "fs/promises";
import * as aq from "arquero";
import { op } from "arquero";
import { getDonationData } from "./donation.mjs";

const getTotalDonation = async () => {
  const rawTable = await getDonationData();
  
  const table = rawTable.derive({ party: (d) => op.replace( d.party,"พรรค", "") }).derive({ year: (d) => op.parse_int(d.year + 543) })

  const totalPerYearTable = table
    .select("year", "amount")
    .groupby("year")
    .rollup({ total: (d) => op.sum(d.amount) })
    .orderby(aq.desc((d) => d.total));

  const totalTable = table
    .select("amount")
    .rollup({ total: (d) => op.sum(d.amount) })
    .derive({ year: () => "ทุกปี" });

  const totalPerYearWithTotalTable = totalTable
    .concat(totalPerYearTable)
    .orderby(aq.desc((d) => d.total))
    .objects()
    .reduce((acc, obj) => {
      const { year } = obj;
      const objWOYear = { ...obj };
      delete objWOYear.year;

      if (year in acc) {
        acc[year].push(objWOYear);
      } else {
        acc[year] = [objWOYear];
      }

      return acc;
    }, {});

  const partyPerYearTable = table
    .select("party", "year", "amount")
    .rename({ amount: "_amount" })
    .groupby("year", "party")
    .rollup({ amount: (d) => op.sum(d._amount) })

  const totalPerPartyTable = table
    .select("party", "amount")
    .groupby("party")
    .rollup({ amount: (d) => op.sum(d.amount) })
    .derive({ year: () => "ทุกปี" });

  const partyPerYearWithTotalTable = totalPerPartyTable
    .concat(partyPerYearTable)
    .orderby(aq.desc((d) => d.amount))
    .objects()
    .reduce((acc, obj) => {
      const { year } = obj;
      const objWOYear = { ...obj };
      delete objWOYear.year;

      if (year in acc) {
        acc[year].push(objWOYear);
      } else {
        acc[year] = [objWOYear];
      }

      return acc;
    }, {});

  const individualPerPartyTable = Object.values(table
    .select("year", "donor_prefix","donor_fullname", "party", "amount")
    .objects()
    .reduce((acc, obj) => {
      const { year, donor_prefix, donor_fullname, party, amount } = obj;

      if (donor_fullname in acc) {
        acc[donor_fullname].donation.push({ year, party, amount, color: "#fff" });
        acc[donor_fullname].total += amount
      } else {
        acc[donor_fullname] = {
          name: donor_fullname,
          title: donor_prefix,
          donation: [{ year, party, amount, color: "#fff" }],
        };
        acc[donor_fullname].total = amount;
      }

      return acc;
    }, {})
  ).sort((a,b) => b.total - a.total)

  return { totalPerYearWithTotalTable, partyPerYearWithTotalTable, individualPerPartyTable };
};

export const generateTotalDonation = async () => {
  const Donation = await getTotalDonation();

  await fs.mkdir("src/data/donation", { recursive: true });

  await fs.writeFile(
    "src/data/donation/totalPerYearWithTotal.json",
    JSON.stringify(Donation.totalPerYearWithTotalTable)
  );
  await fs.writeFile(
    "src/data/donation/partyPerYearWithTotal.json",
    JSON.stringify(Donation.partyPerYearWithTotalTable)
  );
  await fs.writeFile(
    "src/data/donation/donor.json",
    JSON.stringify(Donation.individualPerPartyTable)
  )
};

console.info(`ℹ Generating Total Donation`);
await generateTotalDonation();
console.info("✅ Total Donation Done");
