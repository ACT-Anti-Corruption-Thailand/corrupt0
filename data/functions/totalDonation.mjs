import fs from "fs/promises";
import * as aq from "arquero";
import { op } from "arquero";
import { getDonationData } from "./donation.mjs";

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

const getTotalDonation = async () => {
  const rawTable = await getDonationData();

  const table = rawTable.derive({
    donor_fullname: aq.escape((d) =>
      d.donor_prefix === "นิติบุคคล"
        ? getFormalBusinessName(d.donor_fullname)
        : (d.donor_firstname + " " + d.donor_lastname)
            .replace(/\s+|\/|\\/g, " ")
            .replace(/ํา/g, "ำ")
    ),
  });

  const totalPerYearTable = table
    .select("year", "amount")
    .groupby("year")
    .rollup({ total: (d) => op.sum(d.amount) })
    .orderby(aq.desc((d) => d.total));

  const totalTable = table
    .select("amount")
    .rollup({ total: (d) => op.sum(d.amount) })
    .derive({ year: () => "ทุกปี" });

  const totalPerYearWithTotalTable = totalTable
    .concat(totalPerYearTable)
    .orderby(aq.desc((d) => d.total))
    .objects()
    .reduce((acc, obj) => {
      const { year } = obj;
      const objWOYear = { ...obj };
      delete objWOYear.year;

      if (year in acc) {
        acc[year].push(objWOYear);
      } else {
        acc[year] = [objWOYear];
      }

      return acc;
    }, {});

  const partyPerYearTable = table
    .select("party", "year", "amount")
    .rename({ amount: "_amount" })
    .groupby("year", "party")
    .rollup({ amount: (d) => op.sum(d._amount) });

  const totalPerPartyTable = table
    .select("party", "amount")
    .groupby("party")
    .rollup({ amount: (d) => op.sum(d.amount) })
    .derive({ year: () => "ทุกปี" });

  const partyPerYearWithTotalTable = totalPerPartyTable
    .concat(partyPerYearTable)
    .orderby(aq.desc((d) => d.amount))
    .objects()
    .reduce((acc, obj) => {
      const { year } = obj;
      const objWOYear = { ...obj };
      delete objWOYear.year;

      if (year in acc) {
        acc[year].push(objWOYear);
      } else {
        acc[year] = [objWOYear];
      }

      return acc;
    }, {});

  // party: { name: amount } -> entry -> sort -> pick top 10
  const normalDonateTracker = {};
  const businessDonateTracker = {};

  const individualPerPartyTable = Object.values(
    table
      .select("year", "donor_prefix", "donor_fullname", "party", "amount")
      .objects()
      .reduce((acc, obj) => {
        const { year, donor_prefix, donor_fullname, party, amount } = obj;

        if (donor_fullname in acc) {
          acc[donor_fullname].donation.push({ year, party, amount, color: "#fff" });
          acc[donor_fullname].totalDonationByParty[party] =
            (acc[donor_fullname].totalDonationByParty[party] ?? 0) + amount;
          acc[donor_fullname].total += amount;
        } else {
          acc[donor_fullname] = {
            name: donor_fullname,
            title: donor_prefix,
            donation: [{ year, party, amount, color: "#fff" }],
            totalDonationByParty: {
              [party]: amount,
            },
          };
          acc[donor_fullname].total = amount;
        }

        if (donor_prefix === "บุคคล") {
          if (party in normalDonateTracker) {
            normalDonateTracker[party][donor_fullname] =
              (normalDonateTracker[party][donor_fullname] ?? 0) + amount;
          } else {
            normalDonateTracker[party] = {
              [donor_fullname]: amount,
            };
          }
        } else {
          if (party in businessDonateTracker) {
            businessDonateTracker[party][donor_fullname] =
              (businessDonateTracker[party][donor_fullname] ?? 0) + amount;
          } else {
            businessDonateTracker[party] = {
              [donor_fullname]: amount,
            };
          }
        }

        return acc;
      }, {})
  ).sort((a, b) => b.total - a.total);

  for (const party in normalDonateTracker) {
    Object.entries(normalDonateTracker[party])
      .sort((a, z) => z[1] - a[1])
      .slice(0, 10)
      .forEach((e) => {
        const index = individualPerPartyTable.findIndex((f) => f.name === e[0]);
        individualPerPartyTable[index].top10 = [
          ...(individualPerPartyTable[index]?.top10 ?? []),
          party,
        ];
      });
  }
  for (const party in businessDonateTracker) {
    Object.entries(businessDonateTracker[party])
      .sort((a, z) => z[1] - a[1])
      .slice(0, 10)
      .forEach((e) => {
        const index = individualPerPartyTable.findIndex((f) => f.name === e[0]);
        individualPerPartyTable[index].top10 = [
          ...(individualPerPartyTable[index]?.top10 ?? []),
          party,
        ];
      });
  }

  return {
    totalPerYearWithTotalTable,
    partyPerYearWithTotalTable,
    individualPerPartyTable,
  };
};

export const generateTotalDonation = async () => {
  const Donation = await getTotalDonation();

  await fs.mkdir("src/data/donation", { recursive: true });

  await fs.writeFile(
    "src/data/donation/totalPerYearWithTotal.json",
    JSON.stringify(Donation.totalPerYearWithTotalTable)
  );
  await fs.writeFile(
    "src/data/donation/partyPerYearWithTotal.json",
    JSON.stringify(Donation.partyPerYearWithTotalTable)
  );
  await fs.writeFile(
    "src/data/donation/donor.json",
    JSON.stringify(Donation.individualPerPartyTable)
  );
};

console.info(`ℹ Generating Total Donation`);
await generateTotalDonation();
console.info("✅ Total Donation Done");
