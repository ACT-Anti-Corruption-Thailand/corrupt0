import * as aq from "arquero";
import { op } from "arquero";
import fs from "fs/promises";
import path from "path";

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

  return tables
    .reduce((all, curr) => all.concat(curr))
    .derive({
      year: (d) => op.parse_int(d.year) + 543,
      party: (d) => op.replace(d.party, "พรรค", ""),
      donor_prefix: (d) => op.replace(d.donor_prefix, "ธรรมดา", ""),
    });
};

export const getEctDonationData = async () => {
  const DATA_DONATION = await aq.loadCSV("data/raw/donation.csv");
  const DATA_DONOR = await aq.loadCSV("data/raw/donor.csv");

  const merged = DATA_DONATION.join_left(DATA_DONOR, ["donor_id 🗝", "donor_id "])
    .rename({
      party_name: "party",
      title: "donor_title",
      first_name: "donor_firstname",
      last_name: "donor_lastname",
      donation_type: "type",
    })
    .derive({
      amount: (d) => op.parse_float(op.replace(d.valuation, /฿|,/g, "")),
      donor_prefix: (d) => (d.is_individual === "TRUE" ? "บุคคล" : "นิติบุคคล"),
      donor_fullname: (d) =>
        d.is_individual === "TRUE"
          ? `${d.donor_title}${d.donor_firstname} ${d.donor_lastname}`
          : `${d.donor_title} ${d.donor_firstname} ${d.donor_lastname}`,
    })
    .select(
      "year",
      "month",
      "day",
      "party",
      "donor_prefix",
      "donor_title",
      "donor_fullname",
      "donor_firstname",
      "donor_lastname",
      "position",
      "amount",
      "type"
    );

  return merged;
};
