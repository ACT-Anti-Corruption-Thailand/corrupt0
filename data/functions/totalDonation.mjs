import fs from "fs/promises";
import * as aq from "arquero";
import { op } from "arquero";
import { getDonationData } from "./donation.mjs";

const getTotalDonation = async () => {
  const table = await getDonationData();

  const totalPerYearTable = table
    .select("year", "amount")
    .groupby("year")
    .rollup({ total: (d) => op.sum(d.amount) })
    .derive({ year: (d) => d.year + 543})
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
    .derive({ year: (d) => d.year + 543})

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

  return { totalPerYearWithTotalTable, partyPerYearWithTotalTable };
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
};
