import * as aq from "arquero";
import { op } from "arquero";
import fs from "fs/promises";
import JSON5 from "json5";
import path from "path";
import { safeLoadCSV } from "../utils/csv.mjs";

import { createBusinessInfoTable } from "./business.mjs";
import { getDonationData } from "./donation.mjs";

// ███╗   ██╗ █████╗ ███╗   ███╗███████╗    ██╗██████╗
// ████╗  ██║██╔══██╗████╗ ████║██╔════╝    ██║██╔══██╗
// ██╔██╗ ██║███████║██╔████╔██║█████╗      ██║██║  ██║
// ██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝      ██║██║  ██║
// ██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗    ██║██████╔╝
// ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝╚═════╝

const DATA_NACC_PDF = await safeLoadCSV("data/raw/nacc.csv");
const DATA_NACC = await safeLoadCSV("data/raw/nacc_detail.csv");
const DATA_HIGH_RANK = await safeLoadCSV(
  "data/raw/public_sector_high_ranking_officer.csv"
);
import ALT_NAMES from "../raw/pu_alt_names.json" assert { type: "json" };

const DONATION_TABLE = await getDonationData();
const DONATION_FULLNAME = DONATION_TABLE.derive({
  full_name: (d) => op.replace(d.formatted_name, /\s+/g, "-"),
});

/**
 * @returns {Promise<[{full_name: string, nacc_info: {nacc_id:number,full_name:string,position:string,submitted_case:string,submitted_date:string,pdf_disclosure_start_date:string}[]}[],{full_name: string, nacc_info: undefined}[]]>}
 */
export const generateNamesAndId = async () => {
  // NACC
  const nacc = DATA_NACC.derive({
    full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
  }).select(
    "nacc_id",
    "full_name",
    "position",
    "submitted_case",
    "submitted_date",
    "start_date"
  );

  const nacc_pdf = DATA_NACC_PDF.derive({
    full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
  }).select(
    "full_name",
    "position",
    "document_submitted_type",
    "submitted_date",
    "pdf_disclosure_start_date"
  );

  const nacc_names = nacc.select("full_name").dedupe();
  const nacc_data_table = nacc
    .join_left(
      nacc_pdf,
      (a, b) =>
        op.equal(a.full_name, b.full_name) &&
        op.equal(a.position, b.position) &&
        op.equal(a.submitted_case, b.document_submitted_type) &&
        op.equal(a.submitted_date, b.submitted_date)
    )
    .rename({
      full_name_1: "full_name",
      position_1: "position",
      submitted_date_1: "submitted_date",
    })
    .select(
      "nacc_id",
      "full_name",
      "position",
      "submitted_case",
      "submitted_date",
      "start_date",
      "pdf_disclosure_start_date"
    );
  const nacc_info_by_names = nacc_data_table
    .groupby("full_name")
    .objects({ grouped: "object" });

  // HIGH RANK
  const high_rank_names = DATA_HIGH_RANK.rename({ full_name: "_full_name" })
    .derive({
      full_name: (d) => op.replace(d._full_name, /\s+/g, "-"),
    })
    .select("full_name")
    .dedupe();

  // DONATION
  const donation_names = DONATION_FULLNAME.filter((d) =>
    op.equal(d.donor_prefix, "บุคคล")
  )
    .select("full_name")
    .dedupe();

  // NACC + HIGH RANK
  const nacc_and_highrank_names = nacc_names
    .join_full(high_rank_names, (a, b) => op.equal(a.full_name, b.full_name))
    .derive({
      full_name: (d) => d.full_name_1 || d.full_name_2,
    })
    .select("full_name");

  // ALL
  const names = nacc_and_highrank_names
    .join_full(donation_names, (a, b) => op.equal(a.full_name, b.full_name))
    .derive({
      full_name: (d) => d.full_name_1 || d.full_name_2,
    })
    .select("full_name");

  const alt_names_list = Object.values(ALT_NAMES).flat();

  // MAP NACC
  const names_arr = names
    .objects()
    .filter(({ full_name }) => !alt_names_list.includes(full_name));
  const [has_nacc, non_nacc] = names_arr.reduce(
    (all, { full_name }) => {
      const nacc_info = nacc_info_by_names[full_name];

      if (nacc_info) {
        const alt_names = ALT_NAMES[full_name] ?? [];
        const alternative_info = alt_names
          .map((e) => nacc_info_by_names[e])
          .filter((e) => e)
          .flat();

        return [
          [
            ...all[0],
            {
              full_name,
              nacc_info: [...nacc_info, ...alternative_info],
            },
          ],
          all[1],
        ];
      }
      return [
        all[0],
        [
          ...all[1],
          {
            full_name,
          },
        ],
      ];
    },
    [[], []]
  );

  return [has_nacc, non_nacc];
};

// ██████╗ ███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗ █████╗ ██╗         ██╗███╗   ██╗███████╗ ██████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║██╔══██╗██║         ██║████╗  ██║██╔════╝██╔═══██╗
// ██████╔╝█████╗  ██████╔╝███████╗██║   ██║██╔██╗ ██║███████║██║         ██║██╔██╗ ██║█████╗  ██║   ██║
// ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╗██║██╔══██║██║         ██║██║╚██╗██║██╔══╝  ██║   ██║
// ██║     ███████╗██║  ██║███████║╚██████╔╝██║ ╚████║██║  ██║███████╗    ██║██║ ╚████║██║     ╚██████╔╝
// ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝

const DATA_PERSONAL_INFO = await safeLoadCSV("data/raw/political_office_holder.csv");
const DATA_PERSONAL_INFO_TRANSFORMED = DATA_PERSONAL_INFO.derive({
  full_name: (d) => op.replace(d.first_name_th + " " + d.last_name_th, /\s+/g, "-"),
}).select("position", "full_name", "age", "previous_jobs");

const DATA_PERSONAL_SUBMITTER = await safeLoadCSV("data/raw/submitter_info.csv");
const DATA_PERSONAL_SUBMITTER_TRANSFORMED = DATA_PERSONAL_SUBMITTER.derive({
  full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
}).select("submitter_id", "full_name", "age");

const DATA_PERSONAL_SUBMITTER_POSITION = await safeLoadCSV(
  "data/raw/submitter_position.csv"
);
const DATA_SUBMITTER_POSITION_GROUP = await safeLoadCSV(
  "data/raw/position_category_type.csv"
);
const DATA_SUBMITTER_POSITION_GROUP_TRANSFORMED = DATA_SUBMITTER_POSITION_GROUP.select(
  "position_category_id",
  "corrupt0_category",
  "nacc_sub_category"
).objects();

/**
 * @param {string} name kebab-case full name
 * @returns {Promise<{position?:string, age?: number, previous_jobs?: Object.<string,any>[], group?: string, subgroup?: string}>}
 */
const getPersonalData = async (name) => {
  let person_data_json = {};
  let found_row = null;

  DATA_PERSONAL_SUBMITTER_TRANSFORMED.scan((row, data, stop) => {
    if (data.full_name.data[row] === name) {
      found_row = row;
      stop();
    }
  });

  if (found_row !== null) {
    const submitter_id = DATA_PERSONAL_SUBMITTER_TRANSFORMED.get(
      "submitter_id",
      found_row
    );

    const all_positions = DATA_PERSONAL_SUBMITTER_POSITION.params({ submitter_id })
      .filter((d) => op.equal(d.submitter_id, submitter_id))
      .select(
        "position_period_type_id",
        "position",
        "position_category_type_id",
        "date_acquiring_type_id",
        "start_year",
        "date_ending_type_id",
        "end_year"
      )
      .objects();

    const current_position = all_positions.find((d) => d.position_period_type_id === 1);
    const current_group = DATA_SUBMITTER_POSITION_GROUP_TRANSFORMED.find(
      (d) => d.position_category_id === current_position.position_category_type_id
    );

    const other_jobs = all_positions
      .filter((d) => d.position_period_type_id === 2)
      .map((d) => ({
        position_title: d.position,
        start_year: d.start_year
          ? d.start_year + 543
          : d.date_acquiring_type_id === 3
          ? new Date().getFullYear() + 543
          : undefined,
        end_year: d.end_year
          ? d.end_year + 543
          : d.date_ending_type_id === 2 || d.date_ending_type_id === 3
          ? new Date().getFullYear() + 543
          : undefined,
      }));

    const previous_jobs = all_positions
      .filter((d) => d.position_period_type_id === 3)
      .map((d) => ({
        position_title: d.position,
        start_year: d.start_year
          ? d.start_year + 543
          : d.date_acquiring_type_id === 3
          ? new Date().getFullYear() + 543
          : undefined,
        end_year: d.end_year
          ? d.end_year + 543
          : d.date_ending_type_id === 2 || d.date_ending_type_id === 3
          ? new Date().getFullYear() + 543
          : undefined,
      }));

    person_data_json = {
      age: DATA_PERSONAL_SUBMITTER_TRANSFORMED.get("age", found_row),
      position: current_position.position,
      group: current_group?.corrupt0_category,
      subgroup: current_group?.nacc_sub_category,
      other_jobs,
      previous_jobs,
    };

    return person_data_json;
  }

  DATA_PERSONAL_INFO_TRANSFORMED.scan((row, data, stop) => {
    if (data.full_name.data[row] === name) {
      found_row = row;
      stop();
    }
  });

  if (found_row !== null) {
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

const DATA_RELATIONSHIP_KEY = await safeLoadCSV("data/raw/relationship.csv");
const DATA_RELATIVE_INFO = await safeLoadCSV("data/raw/relative_info.csv");
const DATA_SPOUSE_INFO = await safeLoadCSV("data/raw/spouse_info.csv");

const DATA_RELATIONSHIP_NORMALIZED = DATA_RELATIVE_INFO.derive({
  full_name: (d) => d.first_name + " " + d.last_name,
})
  .join_left(DATA_RELATIONSHIP_KEY, "relationship_id")
  .select("nacc_id", "full_name", "relationship_name");
const DATA_SPOUSE_INFO_NORMALIZED = DATA_SPOUSE_INFO.derive({
  full_name: (d) => d.first_name + " " + d.last_name,
  relationship_name: (_) => "คู่สมรส",
}).select("nacc_id", "full_name", "relationship_name");

const DATA_RELATIVES = DATA_RELATIONSHIP_NORMALIZED.concat(DATA_SPOUSE_INFO_NORMALIZED);

const getRelationshipRank = (relationship) =>
  ["บิดา", "มารดา", "พี่น้อง", "บุตร", "คู่สมรส", "บิดาคู่สมรส", "มารดาคู่สมรส"].indexOf(
    relationship
  );

/**
 * @param {number} [nacc_id]
 * @returns {Promise<{full_name: string, relationship_name: string }[]>}
 */
export const getRelationship = async (nacc_id) => {
  if (!nacc_id) return [];
  return DATA_RELATIVES.params({ nacc_id })
    .filter((d) => op.equal(d.nacc_id, nacc_id))
    .select("full_name", "relationship_name")
    .objects();
};

// ██╗      █████╗ ██╗    ██╗███████╗██╗   ██╗██╗████████╗
// ██║     ██╔══██╗██║    ██║██╔════╝██║   ██║██║╚══██╔══╝
// ██║     ███████║██║ █╗ ██║███████╗██║   ██║██║   ██║
// ██║     ██╔══██║██║███╗██║╚════██║██║   ██║██║   ██║
// ███████╗██║  ██║╚███╔███╔╝███████║╚██████╔╝██║   ██║
// ╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝ ╚═════╝ ╚═╝   ╚═╝

const DATA_LAW_SEC = await safeLoadCSV("data/raw/sec.csv");
const DATA_LAW_JUDGEMENT = await safeLoadCSV("data/raw/judgement.csv");
const DATA_LAW_NACC = await safeLoadCSV("data/raw/nacc_culpability.csv", {
  parse: { note: String },
});

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

/**
 * @param {string} name kebab-case full name
 * @returns {Promise<{sec: any[], judgement: any[], nacc: any[]}>}
 */
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

let DATA = {
  ASSET: await safeLoadCSV("data/raw/asset.csv").then((value) =>
    value.derive({
      actor: (d) => {
        return op.lower(d.owner_by_spouse) === "true"
          ? "คู่สมรส"
          : op.lower(d.owner_by_child) === "true"
          ? "บุตร"
          : "ผู้ยื่น";
      },
      name: (d) => d.asset_name,
      value: (d) => d.valuation ?? 0,
      acquiring_year: (d) => {
        let year = op.parse_int(d.acquiring_year);
        return year < 2200 ? year + 543 : year;
      },
      asset_year: (d) => {
        let year = op.year(d.latest_submitted_date);
        return year < 2200 ? year + 543 : year;
      },
      receiveDate: (d) => {
        if (!(d.acquiring_year && d.acquiring_date && d.acquiring_month))
          return undefined;
        let year = d.acquiring_year < 2200 ? d.acquiring_year + 543 : d.acquiring_year;
        return `${d.acquiring_date}/${d.acquiring_month}/${year}`;
      },
      endDate: (d) => {
        if (!(d.ending_year && d.ending_date && d.ending_month)) return undefined;
        let year = d.ending_year < 2200 ? d.ending_year + 543 : d.ending_year;
        return `${d.ending_date}/${d.ending_month}/${year}`;
      },
    })
  ),
  ASSET_LAND_INFO: await safeLoadCSV("data/raw/asset_land_info.csv").then((value) =>
    value.derive({
      address_land: (d) => {
        return `${d.sub_distirict} ${d.distirict} ${d.province}`;
      },
    })
  ),
  ASSET_BUILDING_INFO: await aq
    .loadCSV("data/raw/asset_building_info.csv")
    .then((value) =>
      value.derive({
        address_building: (d) => {
          return `${d.sub_district} ${d.district} ${d.province}`;
        },
      })
    ),
  ASSET_OTHER_ASSET_INFO: await safeLoadCSV("data/raw/asset_other_asset_info.csv"),
  ASSET_VEHICLE_INFO: await safeLoadCSV("data/raw/asset_vehicle_info.csv"),

  // lookup
  ASSET_ACQUISITION_TYPE: await safeLoadCSV("data/raw/asset_acquisition_type.csv"),
  ASSET_TYPE: await safeLoadCSV("data/raw/asset_type.csv"),

  // statement
  STATEMENT: await safeLoadCSV("data/raw/statement.csv").then((value) =>
    value.derive({
      asset_year: (d) => {
        let year = op.year(d.latest_submitted_date);
        return year < 2200 ? year + 543 : year;
      },
      total: (d) => {
        return (
          (d.valuation_submitter ?? 0) +
          (d.valuation_spouse ?? 0) +
          (d.valuation_child ?? 0)
        );
      },
    })
  ),

  STATEMENT_DETAIL: await safeLoadCSV("data/raw/statement_detail.csv").then((value) =>
    value.derive({
      asset_year: (d) => {
        let year = op.year(d.latest_submitted_date);
        return year < 2200 ? year + 543 : year;
      },
      total: (d) => {
        return d.valuation_submitter + d.valuation_spouse + d.valuation_child;
      },
    })
  ),
};

const STATEMENT_TYPE = await safeLoadCSV("data/raw/statement_type.csv");
const STATEMENT_DETAIL_TYPE = await safeLoadCSV(
  "data/raw/statement_detail_type.csv"
).then((e) => e.join_left(STATEMENT_TYPE, "statement_type_id"));

const ASSET_CATEGORY = DATA.ASSET_TYPE.dedupe("asset_type_main_type_name").array(
  "asset_type_main_type_name"
);

const getAssetActorRank = (actor) => ["ผู้ยื่น", "คู่สมรส", "บุตร"].indexOf(actor);

/**
 * @param {number} [nacc_id]
 * @returns {Promise<Object.<string, any>[]>}
 */
export const getAsset = async (nacc_id) => {
  if (!nacc_id) return {};

  let assets = DATA.ASSET.params({ nacc_id })
    .filter((d) => op.equal(d.nacc_id, nacc_id))
    .orderby("asset_year");
  let asset_building_info = DATA.ASSET_BUILDING_INFO.params({
    nacc_id,
  }).filter((d) => op.equal(d.nacc_id, nacc_id));
  let asset_land_info = DATA.ASSET_LAND_INFO.params({ nacc_id }).filter((d) =>
    op.equal(d.nacc_id, nacc_id)
  );
  let asset_other_asset_info = DATA.ASSET_OTHER_ASSET_INFO.params({
    nacc_id,
  }).filter((d) => op.equal(d.nacc_id, nacc_id));
  let asset_vehicle_info = DATA.ASSET_VEHICLE_INFO.params({ nacc_id }).filter((d) =>
    op.equal(d.nacc_id, nacc_id)
  );

  let all_assets = assets
    .join_left(asset_building_info, "asset_id")
    .join_left(asset_land_info, "asset_id")
    .join_left(asset_other_asset_info, "asset_id")
    .join_left(asset_vehicle_info, "asset_id")
    .join_left(DATA.ASSET_TYPE, "asset_type_id")
    .join_left(DATA.ASSET_ACQUISITION_TYPE, "asset_acquisition_type_id")
    .orderby("asset_id")
    .derive({
      type: (d) => d.asset_type_sub_type_name,
      receiveFrom: (d) => d.asset_acquisition_type_name,
      address: (d) => {
        if (d.address_land) return d.address_land;
        if (d.address_building) return d.address_building;
        return "";
      },
    });

  let statement_detail = DATA.STATEMENT_DETAIL.params({ nacc_id })
    .filter((d) => op.equal(d.nacc_id, nacc_id))
    .join_left(STATEMENT_DETAIL_TYPE, "statement_detail_type_id");

  let assetData = {};
  ASSET_CATEGORY.forEach((cat) => {
    assetData[cat] = {};
    let allSubType = DATA.ASSET_TYPE.params({ cat })
      .filter((d) => op.equal(d.asset_type_main_type_name, cat))
      .array("asset_type_sub_type_name");
    allSubType.forEach((sub_cat) => {
      if (cat === "ทรัพย์สินอื่น") {
        assetData[cat][sub_cat] = all_assets
          .params({ cat, sub_cat })
          .filter(
            (d) =>
              op.equal(d.asset_type_main_type_name, cat) &&
              op.equal(d.asset_type_sub_type_name, sub_cat)
          )
          .select("actor", "value", "name", "count", "receiveDate", "unit")
          .objects()
          .sort((a, z) => z.value - a.value)
          .sort((a, z) => getAssetActorRank(a.actor) - getAssetActorRank(z.actor));
      } else {
        assetData[cat] = all_assets
          .params({ cat })
          .filter((d) => op.equal(d.asset_type_main_type_name, cat))
          .select(
            "actor",
            "value",
            "type",
            "name",
            "address",
            "land_doc_number",
            "building_doc_number",
            "count",
            "registration_number",
            "receiveDate",
            "endDate",
            "receiveFrom",
            "province",
            "vehicle_model",
            "rai",
            "ngan",
            "sq_wa"
          )
          .objects()
          .sort((a, z) => z.value - a.value)
          .sort((a, z) => getAssetActorRank(a.actor) - getAssetActorRank(z.actor));
      }
    });
  });

  // statement
  ["เงินสด", "เงินฝาก", "เงินลงทุน", "เงินให้กู้ยืม"].forEach((type) => {
    assetData[type] = statement_detail
      .params({ type })
      .filter((d) => op.equal(d.statement_detail_sub_type_name, type))
      .select(
        "detail",
        "valuation_submitter",
        "valuation_spouse",
        "valuation_child",
        "total",
        "note"
      )
      .objects();

    assetData[type] = assetData[type]
      .map((e) => [
        {
          actor: "ผู้ยื่น",
          name: e.detail || type,
          value: e.valuation_submitter,
        },
        {
          actor: "คู่สมรส",
          name: e.detail || type,
          value: e.valuation_spouse,
        },
        {
          actor: "บุตร",
          name: e.detail || type,
          value: e.valuation_child,
        },
      ])
      .flat()
      .filter((e) => e.value);
  });

  // remove undefined
  for (const type in assetData) {
    if (type === "ทรัพย์สินอื่น") {
      for (const subtype in assetData["ทรัพย์สินอื่น"]) {
        if (assetData["ทรัพย์สินอื่น"][subtype].length === 0)
          delete assetData["ทรัพย์สินอื่น"][subtype];
      }
    } else {
      if (assetData[type].length === 0) delete assetData[type];
    }
  }

  if (JSON.stringify(assetData["ทรัพย์สินอื่น"]) === "{}")
    delete assetData["ทรัพย์สินอื่น"];
  if (JSON.stringify(assetData) === "{}") return;

  return assetData;
};

const getTopAsset = (assetData) => {
  if (!assetData) return;

  const ที่ดิน = assetData["ที่ดิน"]?.map((e) => ({ ...e, baseCatg: "ที่ดิน" })) ?? [];
  const โรงเรือนและสิ่งปลูกสร้าง =
    assetData["โรงเรือนและสิ่งปลูกสร้าง"]?.map((e) => ({
      ...e,
      baseCatg: "โรงเรือนและสิ่งปลูกสร้าง",
    })) ?? [];
  const ยานพาหนะ =
    assetData["ยานพาหนะ"]?.map((e) => ({ ...e, baseCatg: "ยานพาหนะ" })) ?? [];
  const สิทธิและสัมปทาน =
    assetData["สิทธิและสัมปทาน"]?.map((e) => ({
      ...e,
      baseCatg: "สิทธิและสัมปทาน",
    })) ?? [];
  const ทรัพย์สินอื่น =
    Object.values(assetData["ทรัพย์สินอื่น"] ?? {})?.map((e) => ({
      ...e,
      baseCatg: "ทรัพย์สินอื่น",
    })) ?? [];

  const all = [
    ...ที่ดิน,
    ...โรงเรือนและสิ่งปลูกสร้าง,
    ...ยานพาหนะ,
    ...สิทธิและสัมปทาน,
    ...ทรัพย์สินอื่น,
  ];

  const max = all.reduce(
    (a, c) => {
      if (c.value > a[0]) return [c.value, c];
      return a;
    },
    [-Infinity, {}]
  );

  return max[1];
};

// ███████╗████████╗ █████╗ ████████╗███████╗███╗   ███╗███████╗███╗   ██╗████████╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
// ███████╗   ██║   ███████║   ██║   █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ███████╗
// ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
// ███████║   ██║   ██║  ██║   ██║   ███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ███████║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

/**
 * @param {number} [nacc_id]
 * @returns {Promise<Object.<string, any>[]>}
 */
export const getStatement = async (nacc_id) => {
  if (!nacc_id) return {};

  let statementData = {};

  statementData = DATA.STATEMENT_DETAIL.params({ nacc_id })
    .filter((d) => op.equal(d.nacc_id, nacc_id))
    .join_left(STATEMENT_DETAIL_TYPE, "statement_detail_type_id")
    .select(
      "valuation_submitter",
      "valuation_spouse",
      "valuation_child",
      "statement_type_name",
      "statement_detail_sub_type_name"
    )
    .derive({
      valuation_submitter: (d) => d.valuation_submitter ?? 0,
      valuation_spouse: (d) => d.valuation_spouse ?? 0,
      valuation_child: (d) => d.valuation_child ?? 0,
    })
    .groupby("statement_type_name", "statement_detail_sub_type_name")
    .rollup({
      a: (d) => op.sum(d.valuation_submitter),
      b: (d) => op.sum(d.valuation_spouse),
      c: (d) => op.sum(d.valuation_child),
    })
    .groupby("statement_type_name")
    .objects({ grouped: "object" });

  for (const catg in statementData) {
    statementData[catg] = statementData[catg].map((e) => ({
      type: e.statement_detail_sub_type_name,
      value: [e.a, e.b, e.c],
    }));
  }

  const taxId = STATEMENT_TYPE.objects().find(
    (e) => e.statement_type_name.trim() === "ภาษี"
  ).statement_type_id;

  const tax = DATA.STATEMENT.params({ nacc_id, taxId })
    .filter((d) => op.equal(d.nacc_id, nacc_id) && op.equal(d.statement_type_id, taxId))
    .select("valuation_submitter", "valuation_spouse")
    .objects()[0];

  statementData["ภาษี"] = [tax?.valuation_submitter ?? 0, tax?.valuation_spouse ?? 0];

  if (statementData["ภาษี"].reduce((a, c) => a + c) === 0) delete statementData["ภาษี"];

  if (JSON.stringify(statementData) === "{}") return;

  return statementData;
};

const getLatestStatementSummary = (latestNaccYear, latestNaccId, statements) => {
  const s = statements[latestNaccId];
  const lastestStatement = {
    year: latestNaccYear + 543,
    รายได้: s?.["รายได้"]
      ?.map((e) => e?.value ?? 0)
      ?.flat()
      ?.reduce((a, c) => a + c),
    รายจ่าย: s?.["รายจ่าย"]
      ?.map((e) => e?.value ?? 0)
      ?.flat()
      ?.reduce((a, c) => a + c),
    ทรัพย์สิน: s?.["ทรัพย์สิน"]
      ?.map((e) => e?.value ?? 0)
      ?.flat()
      ?.reduce((a, c) => a + c),
    หนี้สิน: s?.["หนี้สิน"]
      ?.map((e) => e?.value ?? 0)
      ?.flat()
      ?.reduce((a, c) => a + c),
  };

  return lastestStatement;
};

// ██████╗  ██████╗ ███╗   ██╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔═══██╗████╗  ██║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██║  ██║██║   ██║██╔██╗ ██║███████║   ██║   ██║██║   ██║██╔██╗ ██║
// ██║  ██║██║   ██║██║╚██╗██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
// ██████╔╝╚██████╔╝██║ ╚████║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * @param {string} name kebab-case full name
 * @returns {Promise<{year: number, month: number, party: string, amount: number}[]>>}
 */
const getPersonDonation = async (name) => {
  return (
    DONATION_FULLNAME.params({ name })
      .filter((d) => d.full_name === name)
      .select("year", "month", "date", "party", "amount")
      // .rename({ amount: "_amount" })
      .orderby("year", "month", "date")
      // .groupby("year", "month", "party")
      // .rollup({ amount: (d) => op.sum(d._amount) })
      // .ungroup()
      .select("year", "month", "date", "party", "amount")
      .objects()
  );
};

// ██████╗ ██╗   ██╗███████╗██╗███╗   ██╗███████╗███████╗███████╗
// ██╔══██╗██║   ██║██╔════╝██║████╗  ██║██╔════╝██╔════╝██╔════╝
// ██████╔╝██║   ██║███████╗██║██╔██╗ ██║█████╗  ███████╗███████╗
// ██╔══██╗██║   ██║╚════██║██║██║╚██╗██║██╔══╝  ╚════██║╚════██║
// ██████╔╝╚██████╔╝███████║██║██║ ╚████║███████╗███████║███████║
// ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝

export const createShareholderTable = async () => {
  const files = await fs.readdir("data/raw");
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("commitee_shareholder_split_"))
    .map((file) => path.join("data/raw", file));

  let tables = [];
  for (let file of filePaths) {
    tables.push(await safeLoadCSV(file));
  }

  return tables.reduce((all, curr) => all.concat(curr));
};

const createCredenTable = async () => {
  const co005Files = await fs.readdir("data/raw");
  const co005DirectorPath = path.join(
    "data/raw",
    co005Files.find((f) => f.toLowerCase().includes("creden_director"))
  );
  const co005ShareholderPath = path.join(
    "data/raw",
    co005Files.find((f) => f.toLowerCase().includes("creden_shareholder"))
  );

  const c5DirectorOgTable = await safeLoadCSV(co005DirectorPath);
  const c5ShareholderOgTable = await safeLoadCSV(co005ShareholderPath);

  const c5DirectorTable = c5DirectorOgTable
    .filter((d) => op.lower(d.is_have_data) === "true")
    .derive({
      position: (_) => "คณะกรรมการบริษัท",
      full_name: (d) => op.replace(d.query_name, /\s+/g, "-"),
      business_name: (d) => d.company_name_th,
      type: aq.escape((d) => {
        const tname = d.obj_tname && d.obj_tname !== "-" ? d.obj_tname : undefined;
        if (d.submit_obj_big_type && tname) return `(${d.submit_obj_big_type}) ${tname}`;
        if (d.submit_obj_big_type) return `(${d.submit_obj_big_type})`;
        if (tname) return `${tname}`;
        return undefined;
      }),
    })
    .select("position", "full_name", "business_name", "type");

  const c5ShareholderTable = c5ShareholderOgTable
    .filter((d) => op.lower(d.is_have_data) === "true")
    .derive({
      position: (_) => "ผู้ถือหุ้น",
      full_name: (d) => op.replace(d.query_name, /\s+/g, "-"),
      business_name: (d) => d.company_name_th,
      type: aq.escape((d) => {
        const tname = d.obj_tname && d.obj_tname !== "-" ? d.obj_tname : undefined;
        if (d.submit_obj_big_type && tname) return `(${d.submit_obj_big_type}) ${tname}`;
        if (d.submit_obj_big_type) return `(${d.submit_obj_big_type})`;
        if (tname) return `${tname}`;
        return undefined;
      }),
    })
    .select("position", "full_name", "business_name", "type");

  return c5DirectorTable.concat(c5ShareholderTable);
};

const BUSINESS_INFO_TABLE = await createBusinessInfoTable();
const SHAREHOLDER_TABLE = await createShareholderTable();
const CREDEN_TABLE = await createCredenTable();

const REDUCED_BUSINESS_INFO_TABLE = BUSINESS_INFO_TABLE.select(
  "company_id",
  "name",
  "businessdomain"
)
  .rename({ name: "business_name", businessdomain: "type" })
  .dedupe();
const REDUCED_SHAREHOLDER_TABLE = SHAREHOLDER_TABLE.rename({
  position: "_position",
})
  .derive({
    full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
    position: (d) => (d._position === "commitee" ? "คณะกรรมการบริษัท" : "ผู้ถือหุ้น"),
  })
  .select("company_id", "full_name", "position")
  .dedupe();

const SHAREHOLDER_BUSINESS_TABLE = REDUCED_SHAREHOLDER_TABLE.join(
  REDUCED_BUSINESS_INFO_TABLE,
  "company_id"
)
  .select("position", "full_name", "business_name", "type")
  .concat(CREDEN_TABLE);

/**
 * @param {string} name kebab-case full name
 * @returns {Promise<{position: string, business_name: string, businessdomain:string}[]>}
 */
const getPersonBusiness = async (name) => {
  return SHAREHOLDER_BUSINESS_TABLE.params({ name })
    .filter((d) => d.full_name === name)
    .select("position", "business_name", "type")
    .objects();
};

/**
 * @param {{position: "คณะกรรมการบริษัท" | "ผู้ถือหุ้น", business_name: string, businessdomain?: string}[]} business
 * @returns {{position: string, business_name: string, businessdomain: string}[]}
 */
const processBusinessList = (business) => {
  const biz_names = business
    .map((e) => e.business_name)
    .sort((a, z) => a.length - z.length);

  for (let i = biz_names.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (biz_names[i].includes(biz_names[j])) {
        biz_names[i] = null;
        break;
      }
    }
  }

  const unique_name = biz_names.filter((e) => e);

  const new_data = unique_name
    .map((e) => {
      const biz = business.filter((f) => f.business_name === e);
      if (biz.length === 1) return biz[0];
      return {
        position: "กรรมการบริษัทและผู้ถือหุ้น",
        business_name: e,
        businessdomain: biz[0].businessdomain,
      };
    })
    .sort((a, z) => a.business_name.localeCompare(z.business_name));

  return new_data;
};

//  ██████╗ ██████╗  ██████╗ ██╗   ██╗██████╗     ███╗   ███╗███████╗████████╗ █████╗ ██████╗  █████╗ ████████╗ █████╗
// ██╔════╝ ██╔══██╗██╔═══██╗██║   ██║██╔══██╗    ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ███╗██████╔╝██║   ██║██║   ██║██████╔╝    ██╔████╔██║█████╗     ██║   ███████║██║  ██║███████║   ██║   ███████║
// ██║   ██║██╔══██╗██║   ██║██║   ██║██╔═══╝     ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║  ██║██╔══██║   ██║   ██╔══██║
// ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║         ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██████╔╝██║  ██║   ██║   ██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝         ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

const GROUPS = [
  "นายกรัฐมนตรีและรัฐมนตรี",
  "สมาชิกสภาผู้แทนราษฎร",
  "สมาชิกวุฒิสภา",
  "สมาชิกสภานิติบัญญัติแห่งชาติ",
  "ข้าราชการการเมือง",
  "ตุลาการศาลรัฐธรรมนูญ",
  "ผู้ดำรงตำแหน่งในองค์กรอิสระ",
  "ผู้บริหารกระทรวง/ข้าราชการระดับสูง",
  "องค์กรปกครองส่วนท้องถิ่น",
];

const chartTier = [0.1, 1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9];

const generateGroupMetadata = async (people_data_by_group) => {
  const metadataByGroup = Object.fromEntries(
    GROUPS.map((e) => [
      e,
      {
        asset: {
          chartData: Object.entries(
            people_data_by_group[e].reduce(
              (a, c) => {
                const val = c.asset;
                for (const tier of [...chartTier].reverse()) {
                  if (val >= tier) return { ...a, [tier]: (a[tier] ?? 0) + 1 };
                }
                return { ...a, 0.1: (a[1] ?? 0) + 1 };
              },
              Object.fromEntries(chartTier.map((f) => [f, undefined]))
            )
          )
            .map((f) => ({
              x: +f[0],
              y:
                f[1] === undefined
                  ? undefined
                  : (f[1] / people_data_by_group[e].length) * 100,
            }))
            .sort((a, z) => a.x - z.x),
          max:
            people_data_by_group[e].length > 0
              ? Math.max(...people_data_by_group[e].map((f) => f.asset))
              : 0,
          min:
            people_data_by_group[e].length > 0
              ? Math.min(...people_data_by_group[e].map((f) => f.asset))
              : 0,
        },
        debt: {
          chartData: Object.entries(
            people_data_by_group[e].reduce(
              (a, c) => {
                const val = c.debt;
                for (const tier of [...chartTier].reverse()) {
                  if (val >= tier) return { ...a, [tier]: (a[tier] ?? 0) + 1 };
                }
                return { ...a, 0.1: (a[1] ?? 0) + 1 };
              },
              Object.fromEntries(chartTier.map((f) => [f, undefined]))
            )
          )
            .map((f) => ({
              x: +f[0],
              y:
                f[1] === undefined
                  ? undefined
                  : (f[1] / people_data_by_group[e].length) * 100,
            }))
            .sort((a, z) => a.x - z.x),
          max:
            people_data_by_group[e].length > 0
              ? Math.max(...people_data_by_group[e].map((f) => f.debt))
              : 0,
          min:
            people_data_by_group[e].length > 0
              ? Math.min(...people_data_by_group[e].map((f) => f.debt))
              : 0,
        },
        count: people_data_by_group[e].length,
        subgroup: [...new Set(people_data_by_group[e].map((f) => f.subgroup))],
      },
    ])
  );

  await fs.writeFile(
    `src/data/people_group_metadata.json`,
    JSON.stringify(metadataByGroup)
  );
};

// ██████╗ ██████╗ ███████╗
// ██╔══██╗██╔══██╗██╔════╝
// ██████╔╝██║  ██║█████╗
// ██╔═══╝ ██║  ██║██╔══╝
// ██║     ██████╔╝██║
// ╚═╝     ╚═════╝ ╚═╝

/**
 * @param {{id:number, pdf:string}[]} pdfList
 */
const getPdfs = async (pdfList) => {
  for (const pdf of pdfList) {
    const resp = await fetch(pdf.pdf);
    const abuffer = await resp.arrayBuffer();

    await fs.writeFile(path.join("public", "pdf", pdf.id + ".pdf"), Buffer.from(abuffer));
  }
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generatePeople = async () => {
  const [has_nacc, non_nacc] = await generateNamesAndId();

  await fs.writeFile(
    `src/data/people_nacc.json`,
    JSON.stringify(has_nacc.map((e) => e.full_name).sort((a, z) => a.localeCompare(z)))
  );
  await fs.writeFile(
    `src/data/people_gen.json`,
    JSON.stringify(non_nacc.map((e) => e.full_name).sort((a, z) => a.localeCompare(z)))
  );

  const namesAndId = [...has_nacc, ...non_nacc];
  const searchIndexer = [];
  const businessCount = [];
  const assetsValueList = [];
  const incomeValueList = [];
  const debtAssetList = [];
  const lawsuitCountList = [];

  const peopleByGroup = Object.fromEntries(GROUPS.map((e) => [e, []]));
  const pdfList = [];

  // let idx = 1;
  // const ppllen = namesAndId.length;
  // console.info(`ℹ Found ${ppllen} people.`);
  for (const { full_name: dashed_full_name, nacc_info } of namesAndId) {
    // console.info(`ℹ Processing ${idx++}/${ppllen}...`);
    const formattedNacc = nacc_info
      ? Object.fromEntries(
          nacc_info
            .map((e) => [
              e.nacc_id,
              {
                full_name: e.full_name,
                position: e.position,
                case: e.submitted_case,
                date: e.submitted_date, // NOTE - Backward Compatability
                start_date: e.start_date,
                pdf: e.pdf_disclosure_start_date,
              },
            ])
            .sort((a, z) => {
              const aSBDate = new Date(a[1].date);
              const zSBDate = new Date(z[1].date);
              if (aSBDate !== zSBDate) return zSBDate - aSBDate;

              const aSTDate = new Date(a[1].start_date);
              const zSTDate = new Date(z[1].start_date);
              if (aSTDate !== zSTDate) return zSTDate - aSTDate;

              if (a[1].case !== z[1].case) {
                if (a[1].case === "กรณีพ้นจากตำแหน่ง") return -1;
                if (z[1].case === "กรณีพ้นจากตำแหน่ง") return 1;
              }
              return 0;
            })
        )
      : undefined;
    const nacc_ids = nacc_info ? Object.keys(formattedNacc) : [];
    const nameFind = formattedNacc
      ? Object.values(formattedNacc)
          .map((e) => e.full_name)
          .reverse()
      : [dashed_full_name];

    if (formattedNacc) {
      pdfList.push(Object.entries(formattedNacc).map(([id, { pdf }]) => ({ id, pdf })));
    }

    let person_data_json = {};
    for (let dfname of [
      ...nameFind,
    ].reverse() /* เอาเก่าสุดขึ้นก่อน ข้อมูลใหม่สุดจะได้เขียนทับ */) {
      const pd = await getPersonalData(dfname);
      person_data_json = { ...person_data_json, ...pd };
    }

    if (person_data_json.group || person_data_json.position)
      searchIndexer.push(
        dashed_full_name +
          "|" +
          (person_data_json.group || person_data_json.position.split(" ")[0]) +
          (nacc_info ? "|" : "")
      );
    else searchIndexer.push(dashed_full_name);

    let lawsuit = {
      sec: [],
      judgement: [],
      nacc: [],
    };
    let donation = [];
    let business = [];
    for (let dfname of nameFind) {
      const { sec, judgement, nacc } = await getLawsuit(dfname);
      lawsuit = {
        sec: [...lawsuit.sec, ...sec],
        judgement: [...lawsuit.judgement, ...judgement],
        nacc: [...lawsuit.nacc, ...nacc],
      };
      donation.push(await getPersonDonation(dfname));
      business.push(await getPersonBusiness(dfname));
    }
    donation = donation.flat();
    business = processBusinessList(business.flat());

    if (business.length > 1 && nacc_info) {
      businessCount.push({
        count: business.length,
        name: dashed_full_name,
      });
    }

    const lawsuitCount =
      lawsuit.judgement.length + lawsuit.nacc.length + lawsuit.sec.length;
    if (lawsuitCount) {
      lawsuitCountList.push({
        count: lawsuitCount,
        name: dashed_full_name,
      });
    }

    let relationship = [];
    for (let nid of nacc_ids) {
      const d = await getRelationship(+nid);

      if (nid in formattedNacc) {
        const [SPOUSE_COUNT, CHILD_COUNT] = d.reduce(
          (a, c) => {
            switch (c.relationship_name) {
              case "บุตร":
                return [a[0], a[1] + 1];
              case "คู่สมรส":
                return [a[0] + 1, a[1]];
            }
            return a;
          },
          [0, 0]
        );

        formattedNacc[nid].spouse = SPOUSE_COUNT;
        formattedNacc[nid].child = CHILD_COUNT;
      }

      relationship.push(d);
    }
    relationship = [...new Set(relationship.flat().map((e) => JSON.stringify(e)))]
      .map((e) => JSON.parse(e))
      .sort((a, z) => a.full_name.localeCompare(z.full_name))
      .sort(
        (a, z) =>
          getRelationshipRank(a.relationship_name) -
          getRelationshipRank(z.relationship_name)
      );

    let assets = {};
    for (let nid of nacc_ids) {
      const d = await getAsset(+nid);
      assets[nid] = d;
    }

    let statement = {};
    for (let nid of nacc_ids) {
      const d = await getStatement(+nid);
      statement[nid] = d;
    }

    let topAssets = {};
    for (let nid of nacc_ids) {
      const d = await getTopAsset(assets[nid]);
      topAssets[nid] = d;
    }

    let latestStatementSummary = undefined;

    if (formattedNacc) {
      const [latestNaccId, latestNaccData] = Object.entries(formattedNacc)[0];
      const latestNaccYear = new Date(latestNaccData.date).getFullYear(); // NOTE - Assume ว่ามี submitted_date เสมอ

      latestStatementSummary = getLatestStatementSummary(
        latestNaccYear,
        latestNaccId,
        statement
      );

      const latestStatement = statement[latestNaccId];
      if (latestStatement?.รายได้) {
        incomeValueList.push({
          name: dashed_full_name,
          value: latestStatement.รายได้
            .map((e) => e.value)
            .flat()
            .reduce((a, c) => a + c),
        });
      }

      if (latestStatement?.ทรัพย์สิน) {
        assetsValueList.push({
          name: dashed_full_name,
          value: latestStatement.ทรัพย์สิน
            .map((e) => e.value)
            .flat()
            .reduce((a, c) => a + c),
        });
      }

      if (person_data_json?.group) {
        const pA =
          latestStatement.ทรัพย์สิน
            ?.map((e) => e.value)
            ?.flat()
            ?.reduce((a, c) => a + c) ?? 0;
        const pD =
          latestStatement.หนี้สิน
            ?.map((e) => e.value)
            ?.flat()
            ?.reduce((a, c) => a + c) ?? 0;

        const dD = {
          name: dashed_full_name,
          group: person_data_json.group,
          asset: pA,
          debt: pD,
        };

        debtAssetList.push(dD);

        peopleByGroup[person_data_json.group].push({
          ...dD,
          subgroup: person_data_json.subgroup,
        });
      }
    }

    const data = {
      nacc: formattedNacc,
      ...person_data_json,
      names: nameFind,
      lawsuit,
      relationship,
      assets,
      donation,
      business,
      statement,
      topAssets,
      latestStatement: latestStatementSummary,
    };

    await fs.writeFile(`src/data/info/${dashed_full_name}.json`, JSON.stringify(data));
  }

  await fs.writeFile(
    `src/data/business_count.json`,
    JSON.stringify(businessCount.sort((a, z) => z.count - a.count))
  );

  await fs.writeFile(
    `src/data/lawsuit_count.json`,
    JSON.stringify(lawsuitCountList.sort((a, z) => z.count - a.count))
  );

  await fs.writeFile(
    `src/data/top_income_assets.json`,
    JSON.stringify({
      income: incomeValueList.sort((a, z) => z.value - a.value),
      assets: assetsValueList.sort((a, z) => z.value - a.value),
    })
  );

  await fs.writeFile(
    `src/data/people_search.json`,
    JSON.stringify(searchIndexer.sort((a, z) => a.localeCompare(z)))
  );

  await fs.writeFile(
    `src/data/nacc_debtasset.json`,
    JSON.stringify(debtAssetList.sort((a, z) => a.name.localeCompare(z.name)))
  );

  for (const group in peopleByGroup) {
    peopleByGroup[group].sort((a, z) => z.asset - a.asset);
  }
  await fs.writeFile(`src/data/people_group.json`, JSON.stringify(peopleByGroup));

  await generateGroupMetadata(peopleByGroup);

  await getPdfs(pdfList.flat().filter((e) => e.pdf));
};

console.info(`ℹ Generating People`);
await generatePeople();
console.info("✅ People Done");
