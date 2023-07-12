import fs from "fs/promises";
import * as aq from "arquero";
import { op } from "arquero";
import { getDonationData } from "./donation.mjs";

const DONATION_TABLE = await getDonationData();

// ██████╗ ██╗   ██╗███████╗██╗███╗   ██╗███████╗███████╗███████╗
// ██╔══██╗██║   ██║██╔════╝██║████╗  ██║██╔════╝██╔════╝██╔════╝
// ██████╔╝██║   ██║███████╗██║██╔██╗ ██║█████╗  ███████╗███████╗
// ██╔══██╗██║   ██║╚════██║██║██║╚██╗██║██╔══╝  ╚════██║╚════██║
// ██████╔╝╚██████╔╝███████║██║██║ ╚████║███████╗███████║███████║
// ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝

const getBusinessNameFromDonation = async () => {
  return DONATION_TABLE.filter((d) => op.equal(d.donor_prefix, "นิติบุคคล"))
    .select("donor_firstname")
    .dedupe()
    .objects()
    .map((e) => e.donor_firstname);
};

/**
 * @param {string} name donor_firstname
 * @returns {Promise<{year: number, month: number, party: string, amount: number}[]>>}
 */
const getBusinessDonation = async (name) => {
  return DONATION_TABLE.params({ name })
    .filter((d) => d.donor_firstname === name)
    .select("year", "month", "party", "amount")
    .rename({ amount: "_amount", year: "_year" })
    .derive({
      year: (d) => d._year + 543,
    })
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
 * @param {string} name company name without บริษัท or จำกัด
 * @returns {Promise<{sec: any[], judgement: any[], nacc: any[]}>}
 */
export const getBusinessLawsuit = async (name) => {
  const sec = DATA_LAW_SEC.params({ name: new RegExp(name, "g") })
    .filter((d) => op.match(d.person_name, name))
    .objects();
  const judgement = DATA_LAW_JUDGEMENT.params({ name: new RegExp(name, "g") })
    .filter((d) => op.match(d.defendant_company, name))
    .objects();
  const nacc = DATA_LAW_NACC.params({ name: new RegExp(name, "g") })
    .filter((d) => op.match(d.accused_first_name, name))
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
  const businesses = await getBusinessNameFromDonation();

  const safeBusinessesFilename = businesses.map((b) => b.replace(/\s+|\/|\\/g, "-"));
  await fs.writeFile(`src/data/businesses.json`, JSON.stringify(safeBusinessesFilename));
  for (let business of businesses) {
    const name = business;
    const donation = await getBusinessDonation(business);
    const lawsuit = await getBusinessLawsuit(name);

    const data = {
      name,
      donation,
      lawsuit,
    };

    const safeBusinessFilename = business.replace(/\s+|\/|\\/g, "-");
    await fs.writeFile(
      `src/data/info/${safeBusinessFilename}.json`,
      JSON.stringify(data)
    );
  }
};
