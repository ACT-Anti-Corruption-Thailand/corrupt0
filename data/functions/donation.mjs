import { op } from "arquero";
import * as aq from "arquero";
import fs from "fs/promises";
import path from "path";
import { safeLoadCSV } from "../utils/csv.mjs";
import ALT_NAMES from "../raw/pu_alt_names.json" assert { type: "json" };

const REVERSE_ALT_NAMES = Object.fromEntries(
  Object.entries(ALT_NAMES)
    .map(([latest_name, old_names_arr]) =>
      old_names_arr.map((old_name) => [old_name, latest_name])
    )
    .flat()
);

const getFormalBusinessName = (donation_full_name) =>
  donation_full_name
    .replace(/ํา/g, "ำ")
    .replace(/บริษัท จำกัด \(มหาชน\)(.+)/g, "บริษัท $1 จำกัด (มหาชน)")
    .replace(/บริษัท จำกัด(.+)/g, "บริษัท $1 จำกัด")
    .replace("(มหาชน) จำกัด", "จำกัด (มหาชน)")
    .replace("หจก.", "ห้างหุ้นส่วนจำกัด ")
    .replace(/ห้างหุ้นส่วนจำกัด(.)/g, "ห้างหุ้นส่วนจำกัด $1")
    .replace(/\s+/g, " ")
    .trim();

const getName = (donor_firstname, donor_lastname) => {
  const dashed_full_name = (donor_firstname + " " + donor_lastname)
    .replace(/\s+|\/|\\/g, "-")
    .replace(/ํา/g, "ำ");

  return (REVERSE_ALT_NAMES[dashed_full_name] ?? dashed_full_name).replace(/-/g, " ");
};

const RAW_DIR = "data/raw";

export const getDonationData = async () => {
  const files = await fs.readdir(RAW_DIR);
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("political_party_donor_"))
    .map((file) => path.join(RAW_DIR, file));

  let tables = [];
  for (let file of filePaths) {
    tables.push(
      await safeLoadCSV(file).then((e) =>
        e.derive({
          date: aq.escape((d) => d.date ?? null),
        })
      )
    );
  }

  return tables
    .reduce((all, curr) => all.concat(curr))
    .derive({
      year: (d) => op.parse_int(d.year) + 543,
      party: (d) => op.replace(d.party, "พรรค", ""),
      donor_prefix: (d) => op.replace(d.donor_prefix, "ธรรมดา", ""),
      formatted_name: aq.escape((d) =>
        d.donor_prefix === "นิติบุคคล"
          ? getFormalBusinessName(d.donor_fullname)
          : getName(d.donor_firstname, d.donor_lastname)
      ),
    });
};
