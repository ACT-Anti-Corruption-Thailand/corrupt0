import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";
import { op } from "arquero";

const generateTotalDonation = async () => {
  const directoryPath = "data/raw";
  const files = await fs.readdir(directoryPath);

  const fileLists = files
    .filter((file) => file.toLowerCase().includes("political_party_donor"))
    .map((file) => path.join(directoryPath, file));

  const readCSV = async (filePath) => {
    const table = await aq.loadCSV(filePath);
    return table;
  };

  const createTable = async (filePaths) => {
    let tables = [];
    for (let file of filePaths) {
      tables.push(await readCSV(file));
    }
    const concatenatedTable = tables.reduce((all, curr) => all.concat(curr));
    return concatenatedTable;
  };

  const table = await createTable(fileLists);

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

export const generateDonation = async () => {
  const Donation = await generateTotalDonation();
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
