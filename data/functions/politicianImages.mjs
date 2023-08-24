import fs from "fs/promises";
// TODO: Make Fetcher
import PEOPLE_ASSETS from "../constants/politicianAssets.json" assert { type: "json" };

export const generatePoliticianImages = async () => {
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

  await fs.writeFile("src/data/politicianImages.json", JSON.stringify(cleaned));
};

console.info(`ℹ Generating Politician Images`);
await generatePoliticianImages();
console.info("✅ Politician Images Done");
