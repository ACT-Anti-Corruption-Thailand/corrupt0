import fs from "fs/promises";
import data from "../constants/partyAssets.json" assert { type: "json" };

export const generatePartyAssets = async () => {
  let party = Object.fromEntries(data.list.map(e => [e.Name, {
    color: e.Color,
    image: e.Images
    ? e.Images[0].url
      ? e.Images[0].url
      : `https://sheets.wevis.info/${e.Images[0].path}`
    : null,
  }]))

  await fs.mkdir("src/data/color", { recursive: true });
  await fs.writeFile(`src/data/color/partyAssets.json`, JSON.stringify(party));
};
