import fs from "fs";
import * as aq from "arquero";
import JSON5 from "json5";

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
    .union(high_rank_names)
    .dedupe()
    .objects()
    .map(({ full_name }) => full_name);

  const personal_info = await aq.loadCSV("data/raw/political_office_holder.csv");
  const person_data = personal_info
    .derive({
      full_name: (d) =>
        aq.op.replace(d.first_name_th + " " + d.last_name_th, /\s+/g, "-"),
    })
    .select("position", "full_name", "age", "previous_jobs");

  names.forEach((name) => {
    let person_data_json = {};
    let found_row = null;

    person_data.scan((row, data, stop) => {
      if (data.full_name.data[row] === name) {
        found_row = row;
        stop();
      }
    });

    if (found_row) {
      person_data_json = {
        position: person_data.get("position", found_row),
        age: person_data.get("age", found_row),
        previous_jobs: JSON5.parse(
          person_data.get("previous_jobs", found_row)?.replace(/None/g, "null") ?? "[]"
        ),
      };
    }

    fs.writeFileSync(`src/data/info/${name}.json`, JSON.stringify(person_data_json));
  });

  fs.writeFileSync(`src/data/politicians.json`, JSON.stringify(names));
};
