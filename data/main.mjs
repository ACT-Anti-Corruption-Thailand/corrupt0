import fs from "fs";
import { generatePeople } from "./functions/person.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";
import { generatePoliticianImages } from "./functions/politicianImages.mjs";
import { generateTotalDonation } from "./functions/totalDonation.mjs";
import { generateDonation } from "./functions/donation.mjs";

fs.mkdirSync("src/data/info", { recursive: true });

await generatePeople();
await generatePartyAssets();
await generateTotalDonation();
await generateDonation();
generatePoliticianImages();
