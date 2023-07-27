"use client";

import { useState } from "react";

import Image from "next/image";
import Dropdown from "../../Dropdown";
import InfoDonationChart from "./Chart";
import ChartSort from "@/components/ChartSort";
import EntityBarCard from "@/components/EntityBarCard";
import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import { data } from "autoprefixer";

interface PartySectionProps {
  data: any;
  theme: string;
}

export default function InfoPartyDonationSection(props: PartySectionProps) {
  const DONATION_TYPES = ["ทุกกลุ่มตำแหน่ง", ...new Set(props.data.map((d: any) => d.donor_prefix))] as string[];
  const YEARS = ["ทุกปี", ...new Set(props.data.map((d: any) => String(d.year)))].sort((a: any, b: any) => +b - +a) as string[];

  const [year, setYear] = useState(YEARS[0]);
  const [type, setType] = useState(DONATION_TYPES[0]);

  const totalDonation = props.data.filter((items: any) => year === "ทุกปี" ? true : String(items.year) === year).filter((items: any) => type === "ทุกกลุ่มตำแหน่ง" ? true : items.donor_prefix === type).reduce((acc: any, curr: any) => acc + curr.amount, 0)
  const [amount, unit] = thaiMoneyFormatter(totalDonation);

  const DATA = YEARS.slice(1).reverse().map((year: string) => ({ x: year, y1: props.data.filter((item: any) => String(item.year) === year).reduce((acc: any, curr: any) => acc + +curr.amount, 0) }))

  console.log(DATA)

  const displayData = Object.values(props.data.filter((items: any) => year === "ทุกปี" ? true : String(items.year) === year).filter((items: any) => type === "ทุกกลุ่มตำแหน่ง" ? true : items.donor_prefix === type).reduce((acc: any, curr: any) => {
    const donor_fullname = curr.donor_fullname;
    if (acc[donor_fullname]) {
      acc[donor_fullname].amount += curr.amount;
    } else {
      acc[donor_fullname] = { ...curr };
    }
    return acc;
  }, {})).sort((a: any, b: any) => b.amount - a.amount)

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
      <div className="p-10 flex flex-col items-center">
        <div className="flex gap-5 items-center justify-center b5 mb-5">
          <span className="opacity-70">เลือกดูข้อมูลบริจาค</span>
          <Dropdown data={YEARS} value={year} setValue={setYear} />
        </div>
        <p className="text-center mb-8">
          <span className="b4 font-bold">เงินบริจาครวม</span>
          <br />
          <span className="b2">{formatThousands(amount) + " " + unit}</span>
        </p>
        <InfoDonationChart
          x="x"
          y={["y1"]}
          yColors={[props.theme]}
          data={DATA}
        />
        <p className="b6 text-gray-4">หมายเหตุ: แสดงเฉพาะยอดบริจากที่เกิน 5,000 บาท</p>
        <div className="flex flex-row items-center gap-10 my-10 lg:my-30">
          <p className="text-gray-4 b4 lg:b3">แสดง</p>
          <Dropdown
            data={DONATION_TYPES}
            value={type}
            setValue={setType}
          />
          <ChartSort name="individual-donation-sort" />
        </div>
        <div className="flex gap-4 flex-col mt-10">{/* TODO: add search */}</div>
        {
          displayData.filter((d: any, idx: number) => idx < 10).map((d: any, index: number) => <EntityBarCard name={d.donor_fullname} title={d.donor_prefix} color={props.theme} imgPath="/placeholders/person.png" amount={d.amount} maxAmount={totalDonation} key={index} />)
        }
      </div>
    </section>
  );
}
