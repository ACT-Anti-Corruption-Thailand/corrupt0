import fs from "fs/promises";
import { getDonationData } from "./donation.mjs";
import { op } from "arquero";
import * as aq from "arquero";
import { NEW_PARTY_LOOKUP } from "../utils/partyNames.mjs";

const RAW_DONATION_TABLE = await getDonationData();
const DONATION_TABLE = RAW_DONATION_TABLE.derive({
  donor_fullname: (d) => d.formatted_name,
});

// ██████╗  █████╗ ██████╗ ████████╗██╗███████╗███████╗
// ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██╔════╝
// ██████╔╝███████║██████╔╝   ██║   ██║█████╗  ███████╗
// ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██╔══╝  ╚════██║
// ██║     ██║  ██║██║  ██║   ██║   ██║███████╗███████║
// ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝

export const getPartiesFileNameFromDonation = async () => {
  return [
    ...new Set(
      DONATION_TABLE.select("party")
        .dedupe()
        .objects()
        .map(
          (e) =>
            "พรรค" + (NEW_PARTY_LOOKUP[e.party] ?? e.party).replace(/\s+|\/|\\/g, "-")
        )
    ),
  ];
};

export const getPartyDonor = async (party) => {
  return DONATION_TABLE.params({ party })
    .select("party", "month", "year", "donor_prefix", "donor_fullname", "amount")
    .filter(aq.escape((d) => (NEW_PARTY_LOOKUP[d.party] ?? d.party) === party))
    .objects()
    .map((obj) => {
      const { party, ...rest } = obj;
      return rest;
    })
    .sort((a, b) => b.amount - a.amount);
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generateParties = async () => {
  const parties = await getPartiesFileNameFromDonation();

  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    const donor = await getPartyDonor(party.replace("พรรค", ""));
    await fs.writeFile(`src/data/info/${party}.json`, JSON.stringify(donor));
  }
};

console.info(`ℹ Generating Parties`);
await generateParties();
console.info("✅ Parties Done");
