import fs, { constants } from "fs/promises";
import path from "path";
import JSON5 from "json5";

const DIRECTORY_PATH = path.join("data", "raw");

const FILES = [
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_003/001/pdf/csv/nacc.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_001/001/nacc_culpability/nacc_culpability.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_004/001/pdf/ect.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_002/001/sec/sec.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_003/001/person_family_opendata/person_family.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_003/001/political_office_holder_opendata/political_office_holder.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_005/001/judgement/judgement.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_007/001/public_sector_high_ranking_officer/public_sector_high_ranking_officer.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_003/001/nacc/co003_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_004/001/ect/co004_opendata_path.json",
  "https://storage.googleapis.com/act_opendata/opendata/master_data/ds_002/001/ds002_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_009/001/ds009_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_009/001/co004_opendata_path.json",
];

export const removeExistedData = async () => {
  await fs.mkdir(DIRECTORY_PATH, { recursive: true });
  console.info(`ℹ \`${DIRECTORY_PATH}\` Created`);

  console.info(`ℹ Removing Files in \`${DIRECTORY_PATH}\`...`);
  for (const file of await fs.readdir(DIRECTORY_PATH)) {
    await fs.unlink(path.join(DIRECTORY_PATH, file));
  }
  console.info("ℹ `" + DIRECTORY_PATH + "` Cleared");
};

export const fetchData = async (files) => {
  console.info("ℹ Fetching...");

  for (let i = 0; i < files.length; i++) {
    try {
      const resp = await fetch(files[i]);
      const text = await resp.text();

      let output = path.join(DIRECTORY_PATH, files[i].split("/").at(-1));

      for (let j = 0; ; j++) {
        try {
          await fs.access(output, constants.F_OK); // Throw error when cannot access

          // Can access -> duplicate file -> rename
          const [ext, ...rest] = output.split(".").reverse();
          output = `${rest.reverse().join(".")}${j}.${ext}`;
          continue;
        } catch (e) {
          // Cannot access -> Not existed
          await fs.writeFile(output, text);
        }
        break;
      }
    } catch (e) {
      console.error(`🛑 Error occurred in ${files[i]}: ${e.message}`);
      console.error(`🛑 Skipping...`);
    }
  }
};

export const fetchSubData = async () => {
  console.info("ℹ Fetching Subdata...");

  let subFetchList = [];

  const files = await fs.readdir(DIRECTORY_PATH);
  const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === ".json");

  for (let i = 0; i < jsonFiles.length; i++) {
    const file = jsonFiles[i];
    const filePath = path.join(DIRECTORY_PATH, file);
    const fileContent = await fs.readFile(filePath, "utf8");

    try {
      const parsedContent = JSON5.parse(fileContent);
      switch (file) {
        case "co003_opendata_path.json":
        case "co004_opendata_path.json":
          subFetchList[i] = parsedContent.database_format;
          break;
        case "ds002_opendata_path.json":
        case "ds009_opendata_path.json":
        case "co004_opendata_path0.json":
        default:
          subFetchList[i] = Object.values(parsedContent);
      }
    } catch (e) {
      console.error(`🛑 Error occurred in ${file}: ${e.message}`);
      console.error(`🛑 Skipping...`);
      subFetchList[i] = [];
    }
  }

  await fetchData(subFetchList.flat(Infinity));
};

await removeExistedData();
await fetchData(FILES);
await fetchSubData();

console.info("✅ Fetch Done");
