import fs from "fs/promises";
import path from "path";

const PUBLICDATA_PATH = path.join("public", "data");
const SRCDATA_PATH = path.join("src", "data");
const INFO_PATH = path.join(SRCDATA_PATH, "info");

export const removeFiles = async (dir) => {
  console.info(`ℹ Removing Files in \`${dir}\`...`);
  for (const file of await fs.readdir(dir)) {
    const filePath = path.join(dir, file);
    const statFile = await fs.stat(filePath);
    if (statFile.isDirectory()) {
      await removeFiles(filePath);
    } else {
      await fs.unlink(filePath);
    }
  }
  console.info(`ℹ \`${dir}\` Cleared`);
};

export const removeExistedData = async () => {
  await fs.mkdir(INFO_PATH, { recursive: true });
  console.info(`ℹ \`${INFO_PATH}\` Created`);
  await removeFiles(SRCDATA_PATH);
  console.info(`ℹ \`${SRCDATA_PATH}\` is Ready`);

  await fs.mkdir(PUBLICDATA_PATH, { recursive: true });
  console.info(`ℹ \`${PUBLICDATA_PATH}\` Created`);
  await removeFiles(PUBLICDATA_PATH);
  console.info(`ℹ \`${PUBLICDATA_PATH}\` is Ready`);
};

await removeExistedData();
