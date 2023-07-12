import * as aq from "arquero";
import fs from "fs/promises";
import path from "path";

const RAW_DIR = "data/raw";

export const getDonationData = async () => {
  const files = await fs.readdir(RAW_DIR);
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("political_party_donor_"))
    .map((file) => path.join(RAW_DIR, file));

  let tables = [];
  for (let file of filePaths) {
    tables.push(await aq.loadCSV(file));
  }

  return tables.reduce((all, curr) => all.concat(curr));
};
