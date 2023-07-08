import fs from "fs";
import * as aq from "arquero";

// Generate Politician Name
export const generateNames = async () => {
  const nacc = await aq.loadCSV("data/raw/nacc_detail.csv");
  const nacc_names = nacc
    .derive({
      full_name: (d) => aq.op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
    })
    .select("full_name");

  const high_rank = await aq.loadCSV("data/raw/public_sector_high_ranking_officer.csv");
  const high_rank_names = high_rank
    .rename({ full_name: "_full_name" })
    .derive({
      full_name: (d) => aq.op.replace(d._full_name, /\s+/g, "-"),
    })
    .select("full_name")
    .dedupe();

  const names = nacc_names
    .concat(high_rank_names)
    .dedupe()
    .objects()
    .map(({ full_name }) => full_name);

  names.forEach((name) => {
    fs.writeFileSync(`src/data/info/${name}.json`, "{}");
  });

  fs.writeFileSync(`src/data/politicians.json`, JSON.stringify(names));
};
