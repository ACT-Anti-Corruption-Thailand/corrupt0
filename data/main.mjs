import { generatePeople } from "./functions/people.mjs";
import { generateTotalDonation } from "./functions/totalDonation.mjs";
import { generateBusiness } from "./functions/business.mjs";
import { generateParties } from "./functions/parties.mjs";

import { generatePoliticianImages } from "./functions/politicianImages.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";

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
