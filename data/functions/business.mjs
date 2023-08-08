import * as aq from "arquero";
import { op } from "arquero";
import fs from "fs/promises";
import path from "path";
import { getDonationData } from "./donation.mjs";

const RAW_DIR = "data/raw";
const DONATION_TABLE = await getDonationData();

// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

const normalizeName = (name) => name.trim().replace(/\s+/g, " ").replace(/ํา/g, "ำ");

const getFormalName = (donation_full_name) =>
  donation_full_name
    .replace(/บริษัท จำกัด \(มหาชน\)(.+)/g, "บริษัท $1 จำกัด (มหาชน)")
    .replace(/บริษัท จำกัด(.+)/g, "บริษัท $1 จำกัด")
    .replace("(มหาชน) จำกัด", "จำกัด (มหาชน)")
    .replace("หจก.", "ห้างหุ้นส่วนจำกัด ")
    .replace(/ห้างหุ้นส่วนจำกัด(.)/g, "ห้างหุ้นส่วนจำกัด $1");

const getFileName = (formal_name) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

const getCompanyName = (formal_name) =>
  formal_name.replace(/บริษัท (.+?) จำกัด.*|ห้างหุ้นส่วนจำกัด (.+)/g, "$1$2");

// ██████╗ ██╗   ██╗███████╗██╗███╗   ██╗███████╗███████╗███████╗
// ██╔══██╗██║   ██║██╔════╝██║████╗  ██║██╔════╝██╔════╝██╔════╝
// ██████╔╝██║   ██║███████╗██║██╔██╗ ██║█████╗  ███████╗███████╗
// ██╔══██╗██║   ██║╚════██║██║██║╚██╗██║██╔══╝  ╚════██║╚════██║
// ██████╔╝╚██████╔╝███████║██║██║ ╚████║███████╗███████║███████║
// ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝

const getBusinessNameFromDonation = () => {
  return DONATION_TABLE.filter((d) => op.equal(d.donor_prefix, "นิติบุคคล"))
    .select("donor_fullname")
    .dedupe()
    .objects()
    .map((e) => {
      const donationName = normalizeName(e.donor_fullname);
      const formalName = getFormalName(donationName);
      const justName = getCompanyName(formalName);
      const fileName = getFileName(formalName);

      return {
        donationName,
        formalName,
        justName,
        fileName,
      };
    });
};

export const createBusinessInfoTable = async () => {
  const files = await fs.readdir(RAW_DIR);
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("act_company_split_"))
    .map((file) => path.join(RAW_DIR, file));

  let tables = [];
  for (let file of filePaths) {
    tables.push(await aq.loadCSV(file));
  }

  return tables.reduce((all, curr) => all.concat(curr));
};

const BUSINESS_INFO_TABLE = await createBusinessInfoTable();

/**
 * @param {string} formal_name
 * @returns {{operating_status?:string,register_date?:string,address?:string,mission?:string,businessdomain?:string}}
 */
const getBusinessInfo = (formal_name) => {
  let businessData = {};
  let found_row = null;

  BUSINESS_INFO_TABLE.select(
    "name",
    "operating_status",
    "register_date",
    "address",
    "mission",
    "businessdomain"
  ).scan((row, data, stop) => {
    if (data.name.data[row] === formal_name) {
      found_row = row;
      stop();
    }
  });

  if (found_row) {
    businessData = {
      operating_status: BUSINESS_INFO_TABLE.get("operating_status", found_row),
      register_date: BUSINESS_INFO_TABLE.get("register_date", found_row),
      address: BUSINESS_INFO_TABLE.get("address", found_row),
      mission: BUSINESS_INFO_TABLE.get("mission", found_row),
      businessdomain: BUSINESS_INFO_TABLE.get("businessdomain", found_row),
    };
  }

  return businessData;
};

/**
 * @param {string} donation_name
 * @returns {{year: number, month: number, party: string, amount: number}[]}
 */
const getBusinessDonation = (donation_name) => {
  return DONATION_TABLE.params({ donation_name })
    .filter((d) => d.donor_fullname === donation_name)
    .select("year", "month", "party", "amount")
    .rename({ amount: "_amount" })
    .groupby("year", "month", "party")
    .rollup({ amount: (d) => op.sum(d._amount) })
    .ungroup()
    .select("year", "month", "party", "amount")
    .objects();
};

const DATA_LAW_SEC = await aq.loadCSV("data/raw/sec.csv");
const DATA_LAW_JUDGEMENT = await aq.loadCSV("data/raw/judgement.csv");
const DATA_LAW_NACC = await aq.loadCSV("data/raw/nacc_culpability.csv", {
  parse: { note: String },
});

/**
 * @param {string} just_name
 * @returns {{sec: any[], judgement: any[], nacc: any[]}}
 */
export const getBusinessLawsuit = (just_name) => {
  const sec = DATA_LAW_SEC.params({ just_name: new RegExp(just_name, "g") })
    .filter((d) => op.match(d.person_name, just_name))
    .objects();
  const judgement = DATA_LAW_JUDGEMENT.params({ just_name: new RegExp(just_name, "g") })
    .filter((d) => op.match(d.defendant_company, just_name))
    .objects();
  const nacc = DATA_LAW_NACC.params({ just_name: new RegExp(just_name, "g") })
    .filter((d) => op.match(d.accused_first_name, just_name))
    .objects();

  return {
    sec,
    judgement,
    nacc,
  };
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generateBusiness = async () => {
  const businesses = getBusinessNameFromDonation();

  const safeBusinessesFilename = businesses.map((name) => name.fileName);
  await fs.writeFile(`src/data/businesses.json`, JSON.stringify(safeBusinessesFilename));
  for (let { donationName, fileName, formalName, justName } of businesses) {
    const info = getBusinessInfo(formalName);
    const donation = getBusinessDonation(donationName);
    const lawsuit = getBusinessLawsuit(justName);

    const data = {
      name: formalName,
      ...info,
      donation,
      lawsuit,
    };

    await fs.writeFile(`src/data/info/${fileName}.json`, JSON.stringify(data));
  }
};

console.info(`ℹ Generating Businesses`);
await generateBusiness();
console.info("✅ Businesses Done");
