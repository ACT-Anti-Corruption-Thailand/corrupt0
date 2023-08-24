import * as aq from "arquero";
import fs from "fs/promises";
import { NEW_PARTY_LOOKUP, PARTY_ID, PARTY_NAMES_BY_ID } from "../utils/partyNames.mjs";
import { getDonationData } from "./donation.mjs";

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
  const parties_id = {};

  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    const donor = await getPartyDonor(party.replace("พรรค", ""));
    const ect_id = PARTY_ID[party.replace("พรรค", "")];
    const names = [...(PARTY_NAMES_BY_ID[ect_id] ?? [])]
      .sort((a, z) => z.index - a.index)
      .map((f) => f.party_name.replace("พรรค", ""));

    parties_id[party] = ect_id;

    await fs.writeFile(
      `src/data/info/${party}.json`,
      JSON.stringify({ ect_id, names, donor })
    );
  }

  await fs.writeFile(`src/data/parties_id.json`, JSON.stringify(parties_id));
};

console.info(`ℹ Generating Parties`);
await generateParties();
console.info("✅ Parties Done");
