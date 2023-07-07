"use client";

import { useState } from "react";

import Image from "next/image";
import Dropdown from "../../Dropdown";
import InfoDonationChart from "./Chart";

const DATA = [
  { x: "2558", y1: 1, y2: 3 },
  { x: "2559", y1: 2, y2: 2 },
  { x: "2560", y1: 3, y2: 1 },
  { x: "2561", y1: 4, y2: 2 },
  { x: "2562", y1: 3, y2: 3 },
  { x: "2563", y1: 2, y2: 4 },
];

const YEARS = ["ทุกปี", "2566", "2565", "2564", "2563", "2562"];

export default function InfoPartyDonationSection() {
  const [year, setYear] = useState(YEARS[0]);

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
        <div className="flex gap-5 items-center justify-center b5 mb-5">
          <span className="opacity-70">เลือกดูข้อมูลบริจาค</span>
          <Dropdown.Single data={YEARS} value={year} setValue={setYear} />
        </div>
        <p className="text-center mb-8">
          <span className="b4 font-bold">เงินบริจาครวม</span>
          <br />
          <span className="b2">000 ล้านบาท</span>
        </p>
        <InfoDonationChart
          x="x"
          y={["y1", "y2"]}
          yColors={["#6DD4FF", "#4993FE"]}
          data={DATA}
        />
        <div className="flex gap-4 flex-col mt-10">{/* TODO: add search */}</div>
      </div>
    </section>
  );
}
