import * as aq from "arquero";
import fs from "fs/promises";

export const safeLoadCSV = async (path) => {
  try {
    return await aq.loadCSV(path);
  } catch (e) {
    const fileContent = await fs.readFile(path, "utf8");
    const table = fileContent
      .split("\n")[0]
      .split(",")
      .map((f) => [f, []]);
    return aq.table(table);
  }
};
