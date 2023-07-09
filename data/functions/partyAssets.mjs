import fs from "fs/promises";
import data from "../constants/partyAssets.json" assert { type: "json" };

export const generatePartyAssets = async () => {
  let party = data.list
    .filter((e) => e.PartyType === "พรรค")
    .map(({ Name, Color, Images }) => ({
      Name,
      Color,
      Images,
    }));
  party.map(({ Images }) => {
    if (Images && Images[0].path) {
      Images[0].path = "https://sheets.wevis.info/" + Images[0].path;
      const { path: url, ...rest } = Images[0];
      Images[0] = { url, ...rest };
    }
  });
  await fs.mkdir("src/data/color", { recursive: true });
  await fs.writeFile(`src/data/color/partyAssets.json`, JSON.stringify(party));
};
