import fs from "fs/promises";
import path from "path";
import JSON5 from "json5";

export const fetchData = async (files) => {
  fs.mkdir("data/raw", { recursive: true });
  for (let i = 0; i < files.length; i++) {
    const resp = await fetch(files[i]);
    const text = await resp.text();
    await fs.writeFile(`data/raw/${files[i].split("/").at(-1)}`, text);
  }
};

export const fetchSubData = async () => {
  let subFetchList = [];
  const directoryPath = "data/raw";

  const files = await fs.readdir(directoryPath);
  const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === ".json");

  for (let i = 0; i < jsonFiles.length; i++) {
    const file = jsonFiles[i];
    const filePath = path.join(directoryPath, file);
    const fileContent = await fs.readFile(filePath, "utf8");

    subFetchList[i] = Object.values(JSON5.parse(fileContent));
  }

  await fetchData(subFetchList.flat(Infinity));
};
