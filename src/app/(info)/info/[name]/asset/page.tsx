"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

import InfoAssetAccordion from "@/components/Info/Asset/InfoAssetAccordion";
import InfoAssetPopover from "@/components/Info/Asset/InfoAssetPopover";
import InfoFinancialCheckboxes from "@/components/Info/InfoFinancialCheckboxes";
import InfoFinancialDropdowns from "@/components/Info/InfoFinancialDropdowns";
import Image from "next/image";

import { POLITICIANS } from "@/data/pagelist";

import type { DropdownDetailedData } from "@/components/BareDropdown";
import type {
  InfoAssetBuildingStatement,
  InfoAssetConcessionStatement,
  InfoAssetLandStatement,
  InfoAssetStatement,
  InfoAssetValuableStatement,
  InfoAssetVehicleStatement,
} from "@/components/Info/Asset/InfoAssetAccordion";

export async function generateStaticParams() {
  return POLITICIANS.map((pos) => ({
    name: pos,
  }));
}

const EXAMPLE_CASH_STATEMENTS: InfoAssetStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
  },
  {
    actor: "บุตร",
    value: 300000,
  },
];

const EXAMPLE_LAND_STATEMENTS: InfoAssetLandStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    type: "โฉนด",
    name: "โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    type: "อื่น ๆ",
    name: "ไม่ใช่โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
  {
    actor: "บุตร",
    value: 300000,
    type: "โฉนด",
    name: "โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
];

const EXAMPLE_CONCESSION_STATEMENTS: InfoAssetConcessionStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "กรมธรรม์ เลขที่ T230301731",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "FWD ประกันชีวิต เลขที่ 41463739",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "FWD ประกันชีวิต เลขที่ 41463739",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
];

const EXAMPLE_BUILDING_STATEMENTS: InfoAssetBuildingStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
];

const EXAMPLE_VEHICLE_STATEMENTS: InfoAssetVehicleStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
];

const EXAMPLE_VALUABLE_STATEMENTS: InfoAssetValuableStatement = {
  ของสะสมอื่น: [
    {
      actor: "ผู้ยื่น",
      name: "กริ่งปวเรศ ทองคำ 3 บาท",
      value: 10000,
      count: 1,
      receiveDate: "20/03/2557",
    },
    {
      actor: "คู่สมรส",
      name: "พระร่วงหลังรางปืน จ. สุโขทัย ทอง 2 บาท",
      value: 741963,
      count: 3,
      receiveDate: "20/03/2557",
    },
    {
      actor: "บุตร",
      name: "พระสมเด็จไกเซอร์เลี่ยมทอง 2 บาท",
      value: 20,
      count: 200,
      receiveDate: "20/03/2557",
    },
  ],
  "งานศิลปะ โบราณวัตถุ": [
    {
      actor: "ผู้ยื่น",
      name: "กริ่งปวเรศ ทองคำ 3 บาท",
      value: 1000000,
      count: 1,
      receiveDate: "20/03/2557",
    },
    {
      actor: "คู่สมรส",
      name: "พระร่วงหลังรางปืน จ. สุโขทัย ทอง 2 บาท",
      value: 1000000,
      count: 3,
      receiveDate: "20/03/2557",
    },
    {
      actor: "บุตร",
      name: "พระสมเด็จไกเซอร์เลี่ยมทอง 2 บาท",
      value: 1000000,
      count: 200,
      receiveDate: "20/03/2557",
    },
  ],
};

const YEARS: DropdownDetailedData[] = [
  {
    data: "2566",
    label: (
      <>
        <span className="b5 font-bold">2566</span> (พ้นตำแหน่ง)
      </>
    ),
  },
  {
    data: "2562",
    label: (
      <>
        <span className="b5 font-bold">2562</span> (ดำรงตำแหน่ง)
      </>
    ),
  },
];

const COMPARE_YEARS: DropdownDetailedData[] = [
  {
    data: null,
    label: <span className="b6">เลือกปีเปรียบเทียบ</span>,
  },
  ...YEARS,
];

interface AssetPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Asset({ params }: AssetPageProps) {
  if (POLITICIANS.some((name) => name === decodeURI(params.name))) notFound();

  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

  const [currentYear, setCurrentYear] = useState(YEARS[0]);
  const [compareYear, setCompareYear] = useState(COMPARE_YEARS[0]);

  return (
    <main>
      <header className="p-10 text-center">
        <span className="block mb-10 b6 text-gray-5">
          อัปเดตข้อมูลเมื่อวันที่ 00/00/2556
        </span>
        <h1 className="h2 flex gap-5 items-center justify-center">
          เจาะลึกทรัพย์สินรวม
          <InfoAssetPopover>
            <span className="font-bold block">รายการทรัพย์สิน ประกอบด้วย</span>
            <ol className="list-decimal ml-[2ch]">
              <li>เงินสด</li>
              <li>เงินฝาก</li>
              <li>เงินลงทุน</li>
              <li>เงินให้กู้ยืม</li>
              <li>ที่ดิน</li>
              <li>โรงเรือนและสิ่งปลูกสร้าง</li>
              <li>ยานพาหนะ</li>
              <li>สิทธิสัมปทาน</li>
              <li>ทรัพย์สินอื่น</li>
            </ol>
          </InfoAssetPopover>
        </h1>
      </header>

      <section className="bg-gray-2 pt-10 rounded-5 text-black max-w-[850px] mx-auto overflow-hidden">
        <h2 className="b5 text-center mb-5">
          <span className="b3 font-bold">ปีที่ยื่นบัญชี</span> (กรณีที่ยื่น)
        </h2>
        <div className="flex mb-10 gap-10 px-10">
          <InfoFinancialDropdowns
            light
            data={YEARS}
            compare={COMPARE_YEARS}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            compareYear={compareYear}
            setCompareYear={setCompareYear}
          />
        </div>
        <div className="flex gap-10 items-center justify-center b6 py-5">
          <InfoFinancialCheckboxes
            showActor={showActor}
            setShowActor={setShowActor}
            showSpouse={showSpouse}
            setShowSpouse={setShowSpouse}
            showChild={showChild}
            setShowChild={setShowChild}
          />
        </div>
        <span className="block text-center b5 mb-10">หน่วย: บาท</span>
        <InfoAssetAccordion.Cash name="เงินสด" statements={EXAMPLE_CASH_STATEMENTS} />
        <InfoAssetAccordion.Cash name="เงินฝาก" statements={EXAMPLE_CASH_STATEMENTS} />
        <InfoAssetAccordion.Cash name="เงินลงทุน" statements={EXAMPLE_CASH_STATEMENTS} />
        <InfoAssetAccordion.Cash
          name="เงินให้กู้ยืม"
          statements={EXAMPLE_CASH_STATEMENTS}
        />
        <InfoAssetAccordion.Land statements={EXAMPLE_LAND_STATEMENTS} />
        <InfoAssetAccordion.Concession statements={EXAMPLE_CONCESSION_STATEMENTS} />
        <InfoAssetAccordion.Building statements={EXAMPLE_BUILDING_STATEMENTS} />
        <InfoAssetAccordion.Vehicle statements={EXAMPLE_VEHICLE_STATEMENTS} />
        <InfoAssetAccordion.Valuable statements={EXAMPLE_VALUABLE_STATEMENTS} />
      </section>

      <div className="flex gap-5 mt-10 mb-20 max-w-[850px] mx-auto">
        <button
          type="button"
          className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
        >
          <Image src="/icons/pdf.svg" alt="" width={20} height={20} />
          <span>ดูเอกสารจริง</span>
        </button>
        <button
          type="button"
          className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
        >
          <Image src="/icons/sheet.svg" alt="" width={20} height={20} />
          <span>ดาวน์โหลดข้อมูล</span>
        </button>
      </div>
    </main>
  );
}
