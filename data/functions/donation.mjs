import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";
import { op } from "arquero";
import { generateNamesAndId } from "./politician.mjs";

const RAW_DIR = "data/raw";

// นักการเมือง - Gen ชื่อจาก nacc + high rank
// นิติบุคคล - Gen จาก donation
// พรรค - Gen จาก donation
// บุคคลทั่วไป - Gen จาก donation

export const getDonationData = async () => {
  const files = await fs.readdir(RAW_DIR);
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("political_party_donor"))
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

export const getPeopleFromDonation = async (donation_table) => {
  const politicians = await generateNamesAndId();
  const pol_name = politicians.map((e) => e.full_name);

  return donation_table
    .filter((d) => op.equal(d.donor_prefix, "บุคคลธรรมดา"))
    .derive({
      full_name: (d) =>
        op.replace(d.donor_firstname + " " + d.donor_lastname, /\s+|\/|\\/g, "-"),
    })
    .select("full_name")
    .dedupe()
    .objects()
    .map((e) => e.full_name)
    .filter((e) => !pol_name.includes(e));
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

  const people = await getPeopleFromDonation(donationTable);
  await fs.writeFile(`src/data/people.json`, JSON.stringify(people));
  for (let person of people) {
    await fs.writeFile(`src/data/info/${person}.json`, "{}");
  }

  const parties = await getPartiesFromDonation(donationTable);
  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    await fs.writeFile(`src/data/info/${party}.json`, "{}");
  }
};
