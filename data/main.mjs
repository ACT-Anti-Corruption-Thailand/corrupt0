import fs from "fs";
import { generatePolitician } from "./functions/politician.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";
import { generatePoliticianImages } from "./functions/politicianImages.mjs";
import { generateDonation } from "./functions/donation.mjs";

fs.mkdirSync("src/data/info", { recursive: true });

await generatePolitician();
await generatePartyAssets();
await generateDonation();
generatePoliticianImages();
