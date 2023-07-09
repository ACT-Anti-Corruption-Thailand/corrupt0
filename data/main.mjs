import fs from "fs";
import { generatePolitician } from "./functions/politician.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";
import { generatePoliticianImages } from "./functions/politicianImages.mjs";

fs.mkdirSync("src/data/info", { recursive: true });

await generatePolitician();
await generatePartyAssets();
generatePoliticianImages();
