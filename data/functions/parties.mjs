import fs from "fs/promises";
import { getDonationData } from "./donation.mjs";

const DONATION_TABLE = await getDonationData();

// ██████╗  █████╗ ██████╗ ████████╗██╗███████╗███████╗
// ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██╔════╝
// ██████╔╝███████║██████╔╝   ██║   ██║█████╗  ███████╗
// ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██╔══╝  ╚════██║
// ██║     ██║  ██║██║  ██║   ██║   ██║███████╗███████║
// ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝

export const getPartiesFromDonation = async () => {
  return DONATION_TABLE.select("party")
    .dedupe()
    .objects()
    .map(
      (e) => (e.party.includes("พรรค") ? "" : "พรรค") + e.party.replace(/\s+|\/|\\/g, "-")
    );
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generateParties = async () => {
  const parties = await getPartiesFromDonation();

  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    await fs.writeFile(`src/data/info/${party}.json`, "{}");
  }
};

console.info(`ℹ Generating Parties`);
await generateParties();
console.info("✅ Parties Done");
