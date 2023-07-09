import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";

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

const allTable = await createTable(fileLists);
allTable.print();

/*
Ideal Data;

const PartyDonation = [
    2565: {
        totalAmount: 10000,
        data: [
            {
                name: "พลังประชารัฐ",
                amount: 10000
            },
            {
                name: "พลังประชาธิปไตย",
                amount: 0
            }
        ]
    }
    2564: {
        ...
    }
]

const IndividualDonor = [

];
*/
