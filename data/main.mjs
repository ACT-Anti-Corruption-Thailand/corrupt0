import fs from "fs/promises";
import path from "path";

import { generatePeople } from "./functions/person.mjs";
import { generateTotalDonation } from "./functions/totalDonation.mjs";
import { generateBusiness } from "./functions/business.mjs";
import { generateParties } from "./functions/parties.mjs";

import { generatePoliticianImages } from "./functions/politicianImages.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";

const SRCDATA_PATH = path.join("src", "data");
const INFO_PATH = path.join(SRCDATA_PATH, "info");

export const removeFiles = async (dir) => {
  console.info(`ℹ Removing Files in \`${dir}\`...`);
  for (const file of await fs.readdir(dir)) {
    const filePath = path.join(dir, file);
    const statFile = await fs.stat(filePath);
    if (statFile.isDirectory()) {
      await removeFiles(filePath);
    } else {
      await fs.unlink(filePath);
    }
  }
  console.info(`ℹ \`${dir}\` Cleared`);
};

export const removeExistedData = async () => {
  await fs.mkdir(INFO_PATH, { recursive: true });
  console.info(`ℹ \`${INFO_PATH}\` Created`);

  await removeFiles(SRCDATA_PATH);

  console.info(`ℹ \`${SRCDATA_PATH}\` is Ready`);
};

await removeExistedData();

// NOTE - ห้ามเปลี่ยนลำดับ Functions
// คนบางคนชื่อเหมือนบริษัท (อาจจะหลุดมาจากตอนกรอกข้อมูล) ต้องให้บริษัทขึ้นก่อนคน เพื่อให้คน overwrite บริษัท

console.info(`ℹ Generating Parties`);
await generateParties();
console.info(`ℹ Generating Businesses`);
await generateBusiness();
console.info(`ℹ Generating People`);
await generatePeople();

console.info(`ℹ Generating Total Donation`);
await generateTotalDonation();
console.info(`ℹ Generating Party Assets`);
await generatePartyAssets();
console.info(`ℹ Generating Politician Images`);
await generatePoliticianImages();
console.info("✅ Data Processing Done");
