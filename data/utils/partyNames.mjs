import fs from "fs/promises";
import { safeLoadCSV } from "../utils/csv.mjs";

// FIXME: Use real data
const PARTY_BASE = await safeLoadCSV("data/constants/party.csv");
const _PARTY_ID = {};

export const PARTY_NAMES_BY_ID = PARTY_BASE.groupby("ect_party_id").objects({
  grouped: "object",
});

const PARTY_LOOKUP = Object.fromEntries(
  Object.entries(PARTY_NAMES_BY_ID)
    .map(([id, e]) => {
      const sorted = [...e].sort((a, z) => z.index - a.index);
      _PARTY_ID[sorted[0].party_name.replace("พรรค", "")] = id;
      return sorted.map((f) => [
        f.party_name.replace("พรรค", ""),
        sorted[0].party_name.replace("พรรค", ""),
      ]);
    })
    .flat()
);

const MISSPELL_LOOKUP = {
  อาสมาตุภูมิ: PARTY_LOOKUP["อาสามาตุภูมิ"],
  พลังชน: PARTY_LOOKUP["พลังชล"],
  ทวงคืนผืนป่า: PARTY_LOOKUP["ทวงคืนผืนป่าประเทศไทย"],
  ทวงคืนผืนป่าแห่งประเทศไทย: PARTY_LOOKUP["ทวงคืนผืนป่าประเทศไทย"],
  สังคมประชาธิไตยไทย: PARTY_LOOKUP["สังคมประชาธิปไตยไทย"],
  ทวนคืนผืนป่าประเทศไทย: PARTY_LOOKUP["ทวงคืนผืนป่าประเทศไทย"],
  ประชาชนปฎิรูป: PARTY_LOOKUP["ประชาชนปฏิรูป"],
  ไทยรักษาชาต: PARTY_LOOKUP["ไทยรักษาชาติ"],
  ไทยศรีวิไลย: PARTY_LOOKUP["ไทยศรีวิไลย์"],
  พลังประชาชาติไทย: PARTY_LOOKUP["รวมพลังประชาชาติไทย"],
  ประชาภิวัฒน: PARTY_LOOKUP["ประชาภิวัฒน์"],
  ท้องถิ่นไท: PARTY_LOOKUP["ท้องถิ่นไทย"],
};

export const NEW_PARTY_LOOKUP = {
  ...PARTY_LOOKUP,
  ...MISSPELL_LOOKUP,
};

export const PARTY_ID = _PARTY_ID;

await fs.writeFile(`src/data/party_lookup.json`, JSON.stringify(NEW_PARTY_LOOKUP));
