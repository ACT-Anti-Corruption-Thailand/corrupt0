import fs from "fs/promises";
import * as aq from "arquero";
import { op } from "arquero";
import { getDonationData } from "./donation.mjs";
import { NEW_PARTY_LOOKUP } from "../utils/partyNames.mjs";

const getTotalDonation = async () => {
  const rawTable = await getDonationData();

  const table = rawTable.derive({
    donor_fullname: (d) => d.formatted_name,
  });
  const newPartyTable = table.derive({
    party: aq.escape((d) => NEW_PARTY_LOOKUP[d.party] ?? d.party),
  });

  const totalPerYearTable = newPartyTable
    .select("year", "amount")
    .groupby("year")
    .rollup({ total: (d) => op.sum(d.amount) })
    .orderby(aq.desc((d) => d.total));

  const totalTable = newPartyTable
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

  const partyPerYearTable = newPartyTable
    .select("party", "year", "amount")
    .rename({ amount: "_amount" })
    .groupby("year", "party")
    .rollup({ amount: (d) => op.sum(d._amount) });

  const totalPerPartyTable = newPartyTable
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

  const individualPerPartyTable = Object.values(
    table
      .select("year", "donor_prefix", "donor_fullname", "party", "amount")
      .objects()
      .reduce((acc, obj) => {
        const { year, donor_prefix, donor_fullname, party, amount } = obj;

        if (donor_fullname in acc) {
          acc[donor_fullname].donation.push({ year, party, amount, color: "#fff" });
          acc[donor_fullname].totalDonationByParty[party] =
            (acc[donor_fullname].totalDonationByParty[party] ?? 0) + amount;
          acc[donor_fullname].total += amount;
        } else {
          acc[donor_fullname] = {
            name: donor_fullname,
            title: donor_prefix,
            donation: [{ year, party, amount, color: "#fff" }],
            totalDonationByParty: {
              [party]: amount,
            },
          };
          acc[donor_fullname].total = amount;
        }

        return acc;
      }, {})
  ).sort((a, b) => b.total - a.total);

  return {
    totalPerYearWithTotalTable,
    partyPerYearWithTotalTable,
    individualPerPartyTable,
  };
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
  );

  const DONOR = Donation.individualPerPartyTable;
  const top10Person = [];
  const top10Business = [];

  for (
    let donor_idx = 0;
    (top10Person.length < 10 || top10Business.length < 10) && donor_idx < DONOR.length;
    ++donor_idx
  ) {
    if (DONOR[donor_idx].title === "บุคคล" && top10Person.length < 10) {
      top10Person.push(DONOR[donor_idx].name);
    } else if (DONOR[donor_idx].title === "นิติบุคคล" && top10Business.length < 10) {
      top10Business.push(DONOR[donor_idx].name);
    }
  }

  await fs.writeFile(
    "src/data/donation/topdonor.json",
    JSON.stringify({
      person: top10Person,
      business: top10Business,
    })
  );
};

console.info(`ℹ Generating Total Donation`);
await generateTotalDonation();
console.info("✅ Total Donation Done");
