"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Dropdown from "../../Dropdown";
import InfoDonationChart from "./Chart";
import InfoDonationPartyCard from "./PartyCard";

import { MONTHS } from "@/constants/abbr";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

interface DonationData {
  year: number;
  month: number;
  party: string;
  amount: number;
}

interface InfoDonationSection {
  rawData: any;
  allYears: number[];
  allParties: string[];
}

type ChartData = {
  x: number;
} & Record<string, any>;

const partyDonationByYear = (year: string | number, data: DonationData[]) => {
  const summary: Record<string, number> = {};

  for (const d of data) {
    if (d.year !== +year) continue;
    if (summary[d.party]) summary[d.party] += d.amount;
    else summary[d.party] = d.amount;
  }

  return summary;
};

const formatDataByYear = (
  year: string,
  data: DonationData[],
  allYears: number[],
  allParties: string[]
): ChartData[] => {
  if (year === "ทุกปี")
    return allYears.map((_year) => ({
      x: _year,
      ...partyDonationByYear(_year, data),
    }));

  const dataByMonth: Record<string, DonationData[]> = {};

  for (const d of data) {
    if (dataByMonth[d.month]) dataByMonth[d.month].push(d);
    else dataByMonth[d.month] = [d];
  }

  const result: ChartData[] = Array(12).fill``.map((_, month) => ({
    x: +month + 1,
    ...Object.fromEntries(
      allParties.map((p) => [
        p,
        dataByMonth[month + 1]
          ?.filter((e) => e.party === p)
          ?.reduce((a, c) => a + c.amount, 0) || undefined,
      ])
    ),
  }));

  return result;
};

const getPartiesColor = (parties: string[]) => {
  return parties.map((party) => PARTY_ASSETS[party]?.color ?? "#fff");
};

interface PartyDonationDetail {
  name: string;
  isTop10?: boolean;
  statements: { date: string; amount: number }[];
}

const getDonationByParty = (data: DonationData[]): PartyDonationDetail[] => {
  const dataByParty: Record<string, DonationData[]> = {};

  for (const d of data) {
    if (dataByParty[d.party]) dataByParty[d.party].push(d);
    else dataByParty[d.party] = [d];
  }

  return Object.entries(dataByParty).map(([party, details]) => ({
    name: party,
    statements: details.map((d) => ({
      date: `${(d.month + "").padStart(2, "0")}/${d.year}`,
      amount: d.amount,
    })),
  }));
};

export default function InfoDonationSection({
  rawData,
  allYears,
  allParties,
}: InfoDonationSection) {
  const typedData = rawData as DonationData[];

  const YEARS = useMemo(() => ["ทุกปี", ...allYears.map((e) => "" + e)], [allYears]);
  const PARTIES = useMemo(() => ["ทุกพรรค", ...allParties], [allParties]);

  const [year, setYear] = useState(YEARS[0]);
  const [party, setParty] = useState(PARTIES[0]);

  const filteredData = typedData.filter((d) => {
    const satisfyYear = year === "ทุกปี" || d.year === +year;
    const satisfyParty = party === "ทุกพรรค" || d.party === party;
    return satisfyParty && satisfyYear;
  });
  const totalFilteredData = thaiMoneyFormatter(
    filteredData.reduce((a, c) => a + c.amount, 0)
  );

  const yParty = party === "ทุกพรรค" ? allParties : [party];

  return (
    <section id="donation">
      <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
        <Image src="/icons/donate.svg" alt="" width={30} height={30} />
        <span className="w-auto">
          ประวัติการบริจาคเงิน
          <br />
          ให้พรรคการเมือง
        </span>
      </header>
      <div className="p-10">
        <div className="flex gap-10 items-center justify-center mb-8 b4">
          <div className="flex gap-5 items-center">
            <span>ดู</span>
            <Dropdown data={YEARS} value={year} setValue={setYear} />
          </div>
          <div className="flex gap-5 items-center">
            <span>ดู</span>
            <Dropdown data={PARTIES} value={party} setValue={setParty} />
          </div>
        </div>
        <p className="text-center mb-8">
          <span className="b4 font-bold">
            รวมบริจาคให้พรรค{party === "ทุกพรรค" ? "การเมือง" : party}
          </span>
          <br />
          <span className="b2">
            {formatThousands(totalFilteredData[0])} {totalFilteredData[1]}
          </span>
        </p>
        <InfoDonationChart
          x="x"
          y={yParty}
          yColors={getPartiesColor(yParty)}
          data={formatDataByYear(year, filteredData, allYears, allParties)}
          isMonth={year !== "ทุกปี"}
        />
        <div className="flex gap-4 flex-col mt-10">
          {getDonationByParty(filteredData).map((d) => (
            <InfoDonationPartyCard
              key={d.name}
              name={d.name}
              isTop10={d.isTop10}
              statements={d.statements}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
