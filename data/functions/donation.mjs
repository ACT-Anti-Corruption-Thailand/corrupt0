import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";

const directoryPath = "../raw";
const files = await fs.readdir(directoryPath);

const fileLists = files
  .filter((file) => file.toLowerCase().includes("political_party_donor"))
  .map((file) => (file.includes(" ") ? file.replace(" ", "_") : file)) //ดัก " " เปบี่ยนเป็น "_"
  .map((file) => path.join(directoryPath, file));

const readCSV = async (filePath) => {
  const fileData = await fs.readFile(filePath, "utf-8");
  const table = aq.fromCSV(fileData);
  return table;
};

const createTable = (filePaths) => {
  const tables = filePaths.map((filePath) => readCSV(filePath));
  console.log(tables)
  const concatenatedTable = tables.reduce((prev, curr) => prev.concat(curr));
  return concatenatedTable;
};

const allTable = createTable(fileLists);
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
