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
    .orderby(aq.desc((d) => d.total))
    .objects();

  const partyPerYearTable = table
    .select("party", "year", "amount")
    .rename({ amount: "_amount" })
    .groupby("year", "party")
    .rollup({ amount: (d) => op.sum(d._amount) })
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

  return { totalPerYearTable, partyPerYearTable };
};

export const generateTotalDonation = async () => {
  const Donation = await getTotalDonation();

  fs.mkdir("src/data/donation", { recursive: true });

  await fs.writeFile(
    "src/data/donation/totalPerYear.json",
    JSON.stringify(Donation.totalPerYearTable)
  );
  await fs.writeFile(
    "src/data/donation/partyPerYear.json",
    JSON.stringify(Donation.partyPerYearTable)
  );
};
