import { generatePartyAssets } from "./functions/partyAssets.mjs";
import { generateNames } from "./functions/politician.mjs";

await generateNames();
await generatePartyAssets();