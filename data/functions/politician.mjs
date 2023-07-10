import fs from "fs";
import { op } from "arquero";
import * as aq from "arquero";
import JSON5 from "json5";

// ███╗   ██╗ █████╗ ███╗   ███╗███████╗    ██╗██████╗
// ████╗  ██║██╔══██╗████╗ ████║██╔════╝    ██║██╔══██╗
// ██╔██╗ ██║███████║██╔████╔██║█████╗      ██║██║  ██║
// ██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝      ██║██║  ██║
// ██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗    ██║██████╔╝
// ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝╚═════╝

const DATA_NACC = await aq.loadCSV("data/raw/nacc_detail.csv");
const DATA_HIGH_RANK = await aq.loadCSV(
  "data/raw/public_sector_high_ranking_officer.csv"
);

export const generateNamesAndId = async () => {
  const nacc_names = DATA_NACC.derive({
    full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
  }).select("nacc_id", "full_name");

  const high_rank_names = DATA_HIGH_RANK.rename({ full_name: "_full_name" })
    .derive({
      full_name: (d) => op.replace(d._full_name, /\s+/g, "-"),
    })
    .select("full_name")
    .dedupe();

  const names = nacc_names
    .join_full(high_rank_names, (a, b) => op.equal(a.full_name, b.full_name))
    .derive({
      full_name: (d) => d.full_name_1 || d.full_name_2,
    })
    .select("nacc_id", "full_name")
    .objects();

  return names;
};

// ██████╗ ███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗ █████╗ ██╗         ██╗███╗   ██╗███████╗ ██████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║██╔══██╗██║         ██║████╗  ██║██╔════╝██╔═══██╗
// ██████╔╝█████╗  ██████╔╝███████╗██║   ██║██╔██╗ ██║███████║██║         ██║██╔██╗ ██║█████╗  ██║   ██║
// ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╗██║██╔══██║██║         ██║██║╚██╗██║██╔══╝  ██║   ██║
// ██║     ███████╗██║  ██║███████║╚██████╔╝██║ ╚████║██║  ██║███████╗    ██║██║ ╚████║██║     ╚██████╔╝
// ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝

const DATA_PERSONAL_INFO = await aq.loadCSV("data/raw/political_office_holder.csv");
const DATA_PERSONAL_INFO_TRANSFORMED = DATA_PERSONAL_INFO.derive({
  full_name: (d) => op.replace(d.first_name_th + " " + d.last_name_th, /\s+/g, "-"),
}).select("position", "full_name", "age", "previous_jobs");

const getPersonalData = async (name) => {
  let person_data_json = {};
  let found_row = null;

  DATA_PERSONAL_INFO_TRANSFORMED.scan((row, data, stop) => {
    if (data.full_name.data[row] === name) {
      found_row = row;
      stop();
    }
  });

  if (found_row) {
    person_data_json = {
      position: DATA_PERSONAL_INFO_TRANSFORMED.get("position", found_row),
      age: DATA_PERSONAL_INFO_TRANSFORMED.get("age", found_row),
      previous_jobs: JSON5.parse(
        DATA_PERSONAL_INFO_TRANSFORMED.get("previous_jobs", found_row)?.replace(
          /None/g,
          "null"
        ) ?? "[]"
      ),
    };
  }

  return person_data_json;
};

// ██████╗ ███████╗██╗      █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗██╗  ██╗██╗██████╗
// ██╔══██╗██╔════╝██║     ██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝██║  ██║██║██╔══██╗
// ██████╔╝█████╗  ██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗███████║██║██████╔╝
// ██╔══██╗██╔══╝  ██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║██╔══██║██║██╔═══╝
// ██║  ██║███████╗███████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║██║  ██║██║██║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝

const DATA_RELATIONSHIP_KEY = await aq.loadCSV("data/raw/relationship.csv");
const DATA_RELATIVE_INFO = await aq.loadCSV("data/raw/relative_info.csv");
const DATA_RELATIONSHIP_NORMALIZED = DATA_RELATIVE_INFO.derive({
  full_name: (d) => d.first_name + " " + d.last_name,
})
  .join_left(DATA_RELATIONSHIP_KEY, "relationship_id")
  .select("nacc_id", "full_name", "relationship_name");

export const getRelationship = async (nacc_id) =>
  DATA_RELATIONSHIP_NORMALIZED.params({ nacc_id: nacc_id })
    .filter((d) => op.equal(d.nacc_id, nacc_id))
    .select("full_name", "relationship_name")
    .objects();

// ██╗      █████╗ ██╗    ██╗███████╗██╗   ██╗██╗████████╗
// ██║     ██╔══██╗██║    ██║██╔════╝██║   ██║██║╚══██╔══╝
// ██║     ███████║██║ █╗ ██║███████╗██║   ██║██║   ██║
// ██║     ██╔══██║██║███╗██║╚════██║██║   ██║██║   ██║
// ███████╗██║  ██║╚███╔███╔╝███████║╚██████╔╝██║   ██║
// ╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝ ╚═════╝ ╚═╝   ╚═╝

const DATA_LAW_SEC = await aq.loadCSV("data/raw/sec.csv");
const DATA_LAW_JUDGEMENT = await aq.loadCSV("data/raw/judgement.csv");
const DATA_LAW_NACC = await aq.loadCSV("data/raw/nacc_culpability.csv", {
  parse: { note: String },
});
// const DATA_NACC_2 = await aq.loadCSV("data/raw/nacc_culpability0.csv"); // ขอให้ format มาให้ใหม่

const DATA_LAW_SEC_TRANSFORMED = DATA_LAW_SEC.derive({
  full_name: (d) => op.replace(d.person_name + " " + d.person_surname, /\s+/g, "-"),
});
const DATA_LAW_JUDGEMENT_TRANSFORMED_1 = DATA_LAW_JUDGEMENT.derive({
  full_name: (d) =>
    op.replace(d.defendant_first_name1 + " " + d.defendant_last_name1, /\s+/g, "-"),
});
const DATA_LAW_JUDGEMENT_TRANSFORMED_2 = DATA_LAW_JUDGEMENT.derive({
  full_name: (d) =>
    op.replace(d.defendant_first_name2 + " " + d.defendant_last_name2, /\s+/g, "-"),
});
const DATA_LAW_NACC_TRANSFORMED = DATA_LAW_NACC.derive({
  full_name: (d) =>
    op.replace(d.accused_first_name + " " + d.accused_last_name, /\s+/g, "-"),
});

export const getLawsuit = async (name) => {
  const sec = DATA_LAW_SEC_TRANSFORMED.params({ name })
    .filter((d) => op.equal(d.full_name, name))
    .objects();
  const judgement1 = DATA_LAW_JUDGEMENT_TRANSFORMED_1.params({ name })
    .filter((d) => op.equal(d.full_name, name))
    .objects();
  const judgement2 = DATA_LAW_JUDGEMENT_TRANSFORMED_2.params({ name })
    .filter((d) => op.equal(d.full_name, name))
    .objects();
  const nacc = DATA_LAW_NACC_TRANSFORMED.params({ name })
    .filter((d) => op.equal(d.full_name, name))
    .objects();

  return {
    sec,
    judgement: [...judgement1, ...judgement2],
    nacc,
  };
};

//  █████╗ ███████╗███████╗███████╗████████╗
// ██╔══██╗██╔════╝██╔════╝██╔════╝╚══██╔══╝
// ███████║███████╗███████╗█████╗     ██║
// ██╔══██║╚════██║╚════██║██╔══╝     ██║
// ██║  ██║███████║███████║███████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝

const DATA = {
  ASSET: await aq.loadCSV("data/raw/asset.csv"),
  ASSET_BUILDING_INFO: await aq.loadCSV("data/raw/asset_building_info.csv"),
  ASSET_LAND_INFO: await aq.loadCSV("data/raw/asset_land_info.csv"),
  ASSET_OTHER_ASSET_INFO: await aq.loadCSV(
    "data/raw/asset_other_asset_info.csv"
  ),
  ASSET_VEHICLE_INFO: await aq.loadCSV("data/raw/asset_vehicle_info.csv"),

  // lookup
  ASSET_ACQUISITION_TYPE: await aq.loadCSV(
    "data/raw/asset_acquisition_type.csv"
  )
};

export const getAsset = async (nacc_id) => {
  if (nacc_id) {
    let assets = DATA.ASSET.derive({
      valuation: op.replace((d) => Number(d.valuation))
    })
      .params({ nacc_id })
      .filter((d) => op.equal(d.nacc_id, nacc_id));
    let asset_building_info = DATA.ASSET_BUILDING_INFO.params({
      nacc_id
    }).filter((d) => op.equal(d.nacc_id, nacc_id));
    let asset_land_info = DATA.ASSET_LAND_INFO.params({ nacc_id }).filter((d) =>
      op.equal(d.nacc_id, nacc_id)
    );
    let asset_other_asset_info = DATA.ASSET_OTHER_ASSET_INFO.params({
      nacc_id
    }).filter((d) => op.equal(d.nacc_id, nacc_id));
    let asset_vehicle_info = DATA.ASSET_VEHICLE_INFO.params({ nacc_id }).filter(
      (d) => op.equal(d.nacc_id, nacc_id)
    );

    let all_assets = assets
      .join_left(asset_building_info, "asset_id")
      .join_left(asset_land_info, "asset_id")
      .join_left(asset_other_asset_info, "asset_id")
      .join_left(asset_vehicle_info, "asset_id")
      .orderby("asset_id");
    console.log(aq.agg(all_assets, op.sum("valuation")));

    return {
      assets: all_assets.objects()
    };
  }
  return {};
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generatePolitician = async () => {
  const namesAndId = await generateNamesAndId();

  fs.writeFileSync(
    `src/data/politicians.json`,
    JSON.stringify(namesAndId.map((e) => e.full_name))
  );

  namesAndId.forEach(async ({ full_name, nacc_id }) => {
    const person_data_json = await getPersonalData(full_name);
    const relationship = await getRelationship(nacc_id);
    const lawsuit = await getLawsuit(full_name);
    const asset = await getAsset(nacc_id);

    const data = {
      ...person_data_json,
      lawsuit,
      relationship,
      asset,
    };

    fs.writeFileSync(`src/data/info/${full_name}.json`, JSON.stringify(data));
  });
};
