import fs from "fs/promises";
import path from "path";
import * as aq from "arquero";
import { op } from "arquero";

const RAW_DIR = "data/raw";

export const getDonationData = async () => {
  const files = await fs.readdir(RAW_DIR);
  const filePaths = files
    .filter((file) => file.toLowerCase().includes("political_party_donor_"))
    .map((file) => path.join(RAW_DIR, file));

  let tables = [];
  for (let file of filePaths) {
    tables.push(await aq.loadCSV(file));
  }

  return tables.reduce((all, curr) => all.concat(curr));
};

// ██████╗ ██╗   ██╗███████╗██╗███╗   ██╗███████╗███████╗███████╗
// ██╔══██╗██║   ██║██╔════╝██║████╗  ██║██╔════╝██╔════╝██╔════╝
// ██████╔╝██║   ██║███████╗██║██╔██╗ ██║█████╗  ███████╗███████╗
// ██╔══██╗██║   ██║╚════██║██║██║╚██╗██║██╔══╝  ╚════██║╚════██║
// ██████╔╝╚██████╔╝███████║██║██║ ╚████║███████╗███████║███████║
// ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝

export const getBusinessNameFromDonation = async (donation_table) => {
  return donation_table
    .filter((d) => op.equal(d.donor_prefix, "นิติบุคคล"))
    .select("donor_firstname")
    .dedupe()
    .objects()
    .map((e) => e.donor_firstname);
};

/**
 * @param {any[]} donation_table
 * @param {string} name donor_firstname
 * @returns {Promise<{year: number, month: number, party: string, amount: number}[]>>}
 */
const getBusinessDonation = async (donation_table, name) => {
  return donation_table
    .params({ name })
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

// ██████╗  █████╗ ██████╗ ████████╗██╗███████╗███████╗
// ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██╔════╝
// ██████╔╝███████║██████╔╝   ██║   ██║█████╗  ███████╗
// ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██╔══╝  ╚════██║
// ██║     ██║  ██║██║  ██║   ██║   ██║███████╗███████║
// ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝

export const getPartiesFromDonation = async (donation_table) => {
  return donation_table
    .select("party")
    .dedupe()
    .objects()
    .map(
      (e) => (e.party.includes("พรรค") ? "" : "พรรค") + e.party.replace(/\s+|\/|\\/g, "-")
    );
};

// ███╗   ███╗ █████╗ ██╗███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

export const generateDonation = async () => {
  const donationTable = await getDonationData();

  await fs.mkdir("src/data/info", { recursive: true });

  // Business
  const businesses = await getBusinessNameFromDonation(donationTable);

  const safeBusinessesFilename = businesses.map((b) => b.replace(/\s+|\/|\\/g, "-"));
  await fs.writeFile(`src/data/businesses.json`, JSON.stringify(safeBusinessesFilename));
  for (let business of businesses) {
    const name = business;
    const donation = await getBusinessDonation(donationTable, business);

    const data = {
      name,
      donation,
    };

    const safeBusinessFilename = business.replace(/\s+|\/|\\/g, "-");
    await fs.writeFile(
      `src/data/info/${safeBusinessFilename}.json`,
      JSON.stringify(data)
    );
  }

  // Parties
  const parties = await getPartiesFromDonation(donationTable);

  await fs.writeFile(`src/data/parties.json`, JSON.stringify(parties));
  for (let party of parties) {
    await fs.writeFile(`src/data/info/${party}.json`, "{}");
  }
};
