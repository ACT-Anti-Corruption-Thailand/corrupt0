import fs from "fs";
import path from "path";
import JSON5 from "json5";

const FILES = [
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_003/001/pdf/csv/nacc.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_003/001/nacc/co003_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_001/001/nacc_culpability/nacc_culpability.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_004/001/pdf/ect.csv",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_004/001/ect/co004_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/corrupt0/co_002/001/sec/sec.csv",
  "https://storage.googleapis.com/act_opendata/opendata/master_data/ds_002/001/ds002_opendata_path.json",
  "https://storage.googleapis.com/act_opendata/opendata/master_data/ds_002/001/ds002_opendata_path.json",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_003/001/person_family_opendata/person_family.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_003/001/political_office_holder_opendata/political_office_holder.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_004/001/nacc/nacc_culpability.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_005/001/judgement/judgement.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_007/001/public_sector_high_ranking_officer/public_sector_high_ranking_officer.csv",
  "https://storage.googleapis.com/act_datacatalog/master_data/ds_009/001/ds009_opendata_path.json",
];

const fetchData = async (files) => {
  for (let i = 0; i < files.length; i++) {
    const resp = await fetch(files[i]);
    const text = await resp.text();
    fs.writeFileSync(`data/raw/${files[i].split("/").at(-1)}`, text);
  }
};

await fetchData(FILES);

let subFetchList = [];
const directoryPath = "data/raw";

fs.readdir(directoryPath, (_, files) => {
  const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === ".json");

  const fileArray = jsonFiles.map((file) => {
    const filePath = path.join(directoryPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON5.parse(fileContent);
  });

  subFetchList = fileArray.map((e) => Object.values(e)).flat(Infinity);

  fetchData(subFetchList);
});
