import fs from "fs";
import PEOPLE_ASSETS from "../constants/politicianAssets.json" assert { type: "json" };

export const generatePoliticianImages = () => {
  const cleaned = Object.fromEntries(
    PEOPLE_ASSETS.list.map(({ Name, Images }) => [
      Name.replace(/\s+/g, "-"),
      Images
        ? Images[0].url
          ? Images[0].url
          : `https://sheets.wevis.info/${Images[0].path}`
        : null,
    ])
  );

  fs.writeFileSync("src/data/politicianImages.json", JSON.stringify(cleaned));
};
