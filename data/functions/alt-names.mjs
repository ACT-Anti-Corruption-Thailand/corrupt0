import { op } from "arquero";
import fs from "fs/promises";
import { safeLoadCSV } from "../utils/csv.mjs";

const DATA_NACC = await safeLoadCSV("data/raw/nacc_detail.csv");
// FIXME: Use real data (use modified file for testing)
const DATA_OLD_NAME = await safeLoadCSV("data/constants/submitter_old_name.csv");

const nacc_original_names = Object.fromEntries(
  DATA_NACC.derive({
    first_name: (d) => op.replace(d.first_name, /\s+/g, "-"),
    last_name: (d) => op.replace(d.last_name, /\s+/g, "-"),
  })
    .select("nacc_id", "first_name", "last_name")
    .dedupe("nacc_id")
    .objects()
    .map((e) => [
      e.nacc_id,
      {
        first_name: e.first_name,
        last_name: e.last_name,
      },
    ])
);

const available_nacc_ids = Object.keys(nacc_original_names);

const alternative_names = Object.fromEntries(
  Object.entries(
    DATA_OLD_NAME.select("nacc_id", "first_name", "last_name")
      .groupby("nacc_id")
      .objects({ grouped: "object" })
  )
    .filter((e) => available_nacc_ids.includes(e[0] + ""))
    .map((e) => {
      const original_names = nacc_original_names[e[0]];
      const original_first_name = original_names.first_name;
      const original_last_name = original_names.last_name;
      const original_full_name = `${original_first_name} ${original_last_name}`.replace(
        /\s+/g,
        "-"
      );

      return [
        original_full_name,
        [
          ...new Set(
            e[1].map((f) => {
              // Either of these are gonna have value
              const { first_name, last_name } = f;
              if (first_name && last_name)
                return `${first_name} ${last_name}`.replace(/\s+/g, "-");

              // Have first name. Don't have last name
              if (first_name) {
                return `${first_name} ${original_last_name}`.replace(/\s+/g, "-");
              }

              // Have last name. Don't have first name
              return `${original_first_name} ${last_name}`.replace(/\s+/g, "-");
            })
          ),
        ],
      ];
    })
);

await fs.writeFile(`data/raw/pu_alt_names.json`, JSON.stringify(alternative_names));
