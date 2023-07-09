import { generatePolitician } from "./functions/politician.mjs";
import { generatePartyAssets } from "./functions/partyAssets.mjs";
import { generatePoliticianImages } from "./functions/politicianImages.mjs";

await generatePolitician();
await generatePartyAssets();
generatePoliticianImages();

