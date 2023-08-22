import * as aq from "arquero";
import { op } from "arquero";
import fs from "fs/promises";
import JSON5 from "json5";
import path from "path";

import { createBusinessInfoTable } from "./business.mjs";
import { getDonationData } from "./donation.mjs";

// ███╗   ██╗ █████╗ ███╗   ███╗███████╗    ██╗██████╗
// ████╗  ██║██╔══██╗████╗ ████║██╔════╝    ██║██╔══██╗
// ██╔██╗ ██║███████║██╔████╔██║█████╗      ██║██║  ██║
// ██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝      ██║██║  ██║
// ██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗    ██║██████╔╝
// ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝╚═════╝

const DATA_NACC_PDF = await aq.loadCSV("data/raw/nacc.csv");
const DATA_NACC = await aq.loadCSV("data/raw/nacc_detail.csv");
const DATA_HIGH_RANK = await aq.loadCSV(
  "data/raw/public_sector_high_ranking_officer.csv"
);
const DATA_OLD_NAME = await aq.loadCSV("data/raw/submitter_old_name.csv");
const DONATION_TABLE = await getDonationData();
const DONATION_FULLNAME = DONATION_TABLE.derive({
  full_name: (d) =>
    op.replace(d.donor_firstname + " " + d.donor_lastname, /\s+|\/|\\/g, "-"),
});

/**
 * @returns {Promise<[{full_name: string, nacc_info: {nacc_id:number,full_name:string,Position:string,submitted_case:string,Submitted_Date:string,pdf_disclosure_start_date:string}[]}[],{full_name: string, nacc_info: undefined}[]]>}
 */
export const generateNamesAndId = async () => {
  // NACC
  const nacc = DATA_NACC.derive({
    full_name: (d) => op.replace(d.first_name + " " + d.last_name, /\s+/g, "-"),
  }).select(
    "nacc_id",
    "full_name",
    "Position",
    "submitted_case",
    "Submitted_Date",
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
        op.equal(a.Position, b.position) &&
        op.equal(a.submitted_case, b.document_submitted_type) &&
        op.equal(a.Submitted_Date, b.submitted_date)
    )
    .rename({
      full_name_1: "full_name",
    })
    .select(
      "nacc_id",
      "full_name",
      "Position",
      "submitted_case",
      "Submitted_Date",
      "start_date",
      "pdf_disclosure_start_date"
    );
  const nacc_info_by_names = nacc_data_table
    .groupby("full_name")
    .objects({ grouped: "object" });
  const available_nacc_ids = nacc_data_table
    .select("nacc_id")
    .dedupe()
    .objects()
    .map((e) => e.nacc_id);

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
  const alternative_names = Object.fromEntries(
    Object.entries(
      DATA_OLD_NAME.select("nacc_id", "first_name", "last_name")
        .groupby("nacc_id")
        .objects({ grouped: "object" })
    )
      .filter((e) => available_nacc_ids.includes(+e[0]))
      .map((e) => {
        const original_names = nacc_original_names[e[0]];
        const original_first_name = original_names.first_name;
        const original_last_name = original_names.last_name;

        return [
          e[0],
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
          }),
        ];
      })
  );
  const alt_names_list = Object.values(alternative_names).flat();

  // MAP NACC
  const names_arr = names
    .objects()
    .filter(({ full_name }) => !alt_names_list.includes(full_name));
  const [has_nacc, non_nacc] = names_arr.reduce(
    (all, { full_name }) => {
      const nacc_info = nacc_info_by_names[full_name];

      if (nacc_info) {
        const alt_names = [
          ...new Set(
            nacc_info
              .map((e) => alternative_names[e.nacc_id])
              .filter((e) => e)
              .flat()
          ),
        ];
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

const DATA_PERSONAL_INFO = await aq.loadCSV("data/raw/political_office_holder.csv");
const DATA_PERSONAL_INFO_TRANSFORMED = DATA_PERSONAL_INFO.derive({
  full_name: (d) => op.replace(d.first_name_th + " " + d.last_name_th, /\s+/g, "-"),
}).select("position", "full_name", "age", "previous_jobs");

/**
 * @param {string} name kebab-case full name
 * @returns {Promise<{position?:string, age?: number, previous_jobs?: Object.<string,any>[]}>}
 */
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
const DATA_SPOUSE_INFO = await aq.loadCSV("data/raw/spouse_info.csv");

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
    .objects()
    .sort((a, z) => a.full_name.localeCompare(z.full_name))
    .sort(
      (a, z) =>
        getRelationshipRank(a.relationship_name) -
        getRelationshipRank(z.relationship_name)
    );
};

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
  ASSET: await aq.loadCSV("data/raw/asset.csv").then((value) =>
    value.derive({
      actor: (d) => {
        return d.owner_by_submitter === "TRUE"
          ? "ผู้ยื่น"
          : d.owner_by_spouse === "TRUE"
          ? "คู่สมรส"
          : d.owner_by_child === "TRUE"
          ? "บุตร"
          : "ไม่ระบุ";
      },
      name: (d) => d.asset_name,
      value: (d) => op.parse_float(op.replace(d.valuation, /,/g, "")),
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
  ASSET_LAND_INFO: await aq.loadCSV("data/raw/asset_land_info.csv").then((value) =>
    value.derive({
      address_land: (d) => {
        return `${d.sub_district} ${d.district} ${d.province}`;
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
  ASSET_OTHER_ASSET_INFO: await aq.loadCSV("data/raw/asset_other_asset_info.csv"),
  ASSET_VEHICLE_INFO: await aq.loadCSV("data/raw/asset_vehicle_info.csv"),

  // lookup
  ASSET_ACQUISITION_TYPE: await aq.loadCSV("data/raw/asset_acquisition_type.csv"),
  ASSET_TYPE: await aq.loadCSV("data/raw/asset_type.csv"),

  // statement
  STATEMENT: await aq.loadCSV("data/raw/statement.csv").then((value) =>
    value.derive({
      asset_year: (d) => {
        let year = op.year(d.latest_submitted_date);
        return year < 2200 ? year + 543 : year;
      },
      total: (d) => {
        return (
          op.parse_float(op.replace(d.valuation_submitter, /,/g, "")) +
          op.parse_float(op.replace(d.valuation_spouse, /,/g, "")) +
          op.parse_float(op.replace(d.valuation_child, /,/g, ""))
        );
      },
    })
  ),

  STATEMENT_DETAIL: await aq.loadCSV("data/raw/statement_detail.csv").then((value) =>
    value.derive({
      asset_year: (d) => {
        let year = op.year(d.latest_submitted_date);
        return year < 2200 ? year + 543 : year;
      },
      total: (d) => {
        return (
          op.parse_float(op.replace(d.valuation_submitter, /,/g, "")) +
          op.parse_float(op.replace(d.valuation_spouse, /,/g, "")) +
          op.parse_float(op.replace(d.valuation_successor, /,/g, ""))
        );
      },
    })
  ),

  // statement lookup
  STATEMENT_TYPE: await aq.loadCSV("data/raw/statement_type.csv"),
  STATEMENT_DETAIL_TYPE: await aq.loadCSV("data/raw/statement_detail_type.csv"),
};

const ASSET_CATEGORY = DATA.ASSET_TYPE.dedupe("asset_type_main_type_name").array(
  "asset_type_main_type_name"
);

const getAssetActorRank = (actor) =>
  ["ผู้ยื่น", "คู่สมรส", "บุตร", "ไม่ระบุ"].indexOf(actor);

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
    .join_left(DATA.STATEMENT_DETAIL_TYPE, "statement_detail_type_id");

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
            "vehicle_model"
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
      .derive({
        valuation_submitter: (d) =>
          d.valuation_submitter
            ? op.parse_float(op.replace(d.valuation_submitter, /,/g, ""))
            : null,
        valuation_spouse: (d) =>
          d.valuation_spouse
            ? op.parse_float(op.replace(d.valuation_spouse, /,/g, ""))
            : null,
        valuation_successor: (d) =>
          d.valuation_successor
            ? op.parse_float(op.replace(d.valuation_successor, /,/g, ""))
            : null,
      })
      .select(
        "detail",
        "valuation_submitter",
        "valuation_spouse",
        "valuation_successor",
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
          value: e.valuation_successor,
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
    .join_left(DATA.STATEMENT_DETAIL_TYPE, "statement_detail_type_id")
    .select(
      "valuation_submitter",
      "valuation_spouse",
      "valuation_successor",
      "statement_type_id",
      "statement_detail_sub_type_name"
    )
    .derive({
      valuation_submitter: (d) =>
        d.valuation_submitter
          ? op.parse_float(op.replace(d.valuation_submitter, /,/g, ""))
          : 0,
      valuation_spouse: (d) =>
        d.valuation_spouse ? op.parse_float(op.replace(d.valuation_spouse, /,/g, "")) : 0,
      valuation_successor: (d) =>
        d.valuation_successor
          ? op.parse_float(op.replace(d.valuation_successor, /,/g, ""))
          : 0,
    })
    .groupby("statement_type_id", "statement_detail_sub_type_name")
    .rollup({
      a: (d) => op.sum(d.valuation_submitter),
      b: (d) => op.sum(d.valuation_spouse),
      c: (d) => op.sum(d.valuation_successor),
    })
    .groupby("statement_type_id")
    .objects({ grouped: "object" });

  for (const catg in statementData) {
    statementData[catg] = statementData[catg].map((e) => ({
      type: e.statement_detail_sub_type_name,
      value: [e.a, e.b, e.c],
    }));
  }

  const tax = DATA.STATEMENT.params({ nacc_id })
    .filter(
      (d) => op.equal(d.nacc_id, nacc_id) && op.equal(d.statement_type_id, 5) // NOTE - Assuming that tax is always id 5
    )
    .select("valuation_submitter", "valuation_spouse")
    .objects()[0];

  statementData["ภาษี"] = [
    tax?.valuation_submitter ?? "",
    tax?.valuation_spouse ?? "",
  ].map((e) => +e.replace(/,/g, ""));

  if (statementData["ภาษี"].reduce((a, c) => a + c) === 0) delete statementData["ภาษี"];

  if (JSON.stringify(statementData) === "{}") return;

  return statementData;
};

const getLatestStatementSummary = (latestNaccYear, latestNaccId, statements) => {
  try {
    const s = statements[latestNaccId];
    const lastestStatement = {
      year: latestNaccYear + 543,
      รายได้: s["รายได้"]
        .map((e) => e.value)
        .flat()
        .reduce((a, c) => a + c),
      รายจ่าย: s["รายจ่าย"]
        .map((e) => e.value)
        .flat()
        .reduce((a, c) => a + c),
      ทรัพย์สิน: s["ทรัพย์สิน"]
        .map((e) => e.value)
        .flat()
        .reduce((a, c) => a + c),
      หนี้สิน: s["หนี้สิน"]
        .map((e) => e.value)
        .flat()
        .reduce((a, c) => a + c),
    };

    return lastestStatement;
  } catch (e) {
    return;
  }
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
      .select("year", "month", "party", "amount")
      // .rename({ amount: "_amount" })
      .orderby("year", "month")
      // .groupby("year", "month", "party")
      // .rollup({ amount: (d) => op.sum(d._amount) })
      // .ungroup()
      .select("year", "month", "party", "amount")
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
    tables.push(await aq.loadCSV(file));
  }

  return tables.reduce((all, curr) => all.concat(curr));
};

const CONST_DIR = "data/constants";

const createCredenTable = async () => {
  const co005Files = await fs.readdir(CONST_DIR);
  const co005DirectorPath = path.join(
    CONST_DIR,
    co005Files.find((f) => f.toLowerCase().includes("corrupt0_co_005_director"))
  );
  const co005ShareholderPath = path.join(
    CONST_DIR,
    co005Files.find((f) => f.toLowerCase().includes("corrupt0_co_005_shareholder"))
  );

  const c5DirectorOgTable = await aq.loadCSV(co005DirectorPath);
  const c5ShareholderOgTable = await aq.loadCSV(co005ShareholderPath);

  const c5DirectorTable = c5DirectorOgTable
    .filter((d) => d.is_have_data === "True")
    .derive({
      position: (_) => "คณะกรรมการบริษัท",
      full_name: (d) => op.replace(d.query_name, /\s+/g, "-"),
      business_name: (d) => d.company_name_th,
      type: (d) => d.submit_obj_big_type + " " + d.obj_tname,
    })
    .select("position", "full_name", "business_name", "type");

  const c5ShareholderTable = c5ShareholderOgTable
    .filter((d) => d.is_have_data === "True")
    .derive({
      position: (_) => "ผู้ถือหุ้น",
      full_name: (d) => op.replace(d.query_name, /\s+/g, "-"),
      business_name: (d) => d.company_name_th,
      type: (d) => d.submit_obj_big_type + " " + d.obj_tname,
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
                position: e.Position,
                case: e.submitted_case,
                date: e.Submitted_Date, // NOTE - Backward Compatability
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
      ? Object.values(formattedNacc).map((e) => e.full_name)
      : [dashed_full_name];

    let person_data_json = {};
    for (let dfname of nameFind) {
      const pd = await getPersonalData(dfname);
      person_data_json = { ...person_data_json, ...pd };
    }

    if (person_data_json.position)
      searchIndexer.push(
        dashed_full_name + "|" + person_data_json.position + (nacc_info ? "|" : "")
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
    business = business.flat();

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
      relationship.push(d);
    }
    relationship = [...new Set(relationship.flat().map((e) => JSON.stringify(e)))].map(
      (e) => JSON.parse(e)
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

      if (latestStatement?.ทรัพย์สิน && latestStatement?.หนี้สิน)
        debtAssetList.push({
          name: dashed_full_name,
          asset: latestStatement?.ทรัพย์สิน
            ?.map((e) => e.value)
            ?.flat()
            ?.reduce((a, c) => a + c),
          debt: latestStatement?.หนี้สิน
            ?.map((e) => e.value)
            ?.flat()
            ?.reduce((a, c) => a + c),
        });
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
};

console.info(`ℹ Generating People`);
await generatePeople();
console.info("✅ People Done");
