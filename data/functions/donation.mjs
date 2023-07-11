import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";
import { op } from "arquero";

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

export const getBusinessNameFromDonation = async (donation_table) => {
  return donation_table
    .filter((d) => op.equal(d.donor_prefix, "นิติบุคคล"))
    .select("donor_firstname")
    .dedupe()
    .objects()
    .map((e) => e.donor_firstname.replace(/\s+|\/|\\/g, "-"));
};

export const getPartiesFromDonation = async (donation_table) => {
  return donation_table
    .select("party")
    .dedupe()
    .objects()
    .map((e) => "พรรค" + e.party.replace(/\s+|\/|\\/g, "-"));
};

export const generateDonation = async () => {
  const donationTable = await getDonationData();

  await fs.mkdir("src/data/info", { recursive: true });

  const businesses = await getBusinessNameFromDonation(donationTable);

  await fs.writeFile(`src/data/businesses.json`, JSON.stringify(businesses));
  for (let business of businesses) {
    await fs.writeFile(`src/data/info/${business}.json`, "{}");
  }

  const parties = await getPartiesFromDonation(donationTable);
  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    await fs.writeFile(`src/data/info/${party}.json`, "{}");
  }
};
