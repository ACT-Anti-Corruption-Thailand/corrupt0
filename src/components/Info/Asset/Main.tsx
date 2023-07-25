"use client";

import { useState } from "react";

import InfoAssetCompareAccordion from "@/components/Info/Asset/CompareAccordion";
import InfoAssetSingleAccordion from "@/components/Info/Asset/SingleAccordion";
import InfoFinancialCheckboxes from "@/components/Info/_Financial/Checkboxes";
import InfoFinancialDropdowns from "@/components/Info/_Financial/Dropdowns";

import type { DropdownDetailedData } from "@/components/BareDropdown";
import type {
  InfoAssetBuildingStatement,
  InfoAssetConcessionStatement,
  InfoAssetLandStatement,
  InfoAssetStatement,
  InfoAssetValuableStatement,
  InfoAssetVehicleStatement,
} from "@/components/Info/Asset/SingleAccordion";

const EMPTY_STATEMENT = {
  cash: [],
  deposit: [],
  investment: [],
  loan: [],
  land: [],
  concession: [],
  building: [],
  vehicle: [],
  valuable: {
    กระเป๋า: [],
    อาวุธปืน: [],
    นาฬิกา: [],
    เครื่องประดับ: [],
    วัตถุมงคล: [],
    ทองคำ: [],
    ของสะสมอื่น: [],
    "งานศิลปะ โบราณวัตถุ": [],
  },
};

interface InfoAssetStatements {
  เงินสด: InfoAssetStatement[];
  เงินฝาก: InfoAssetStatement[];
  เงินลงทุน: InfoAssetStatement[];
  เงินให้กู้ยืม: InfoAssetStatement[];
  ที่ดิน: InfoAssetLandStatement[];
  สิทธิและสัมปทาน: InfoAssetConcessionStatement[];
  โรงเรือนและสิ่งปลูกสร้าง: InfoAssetBuildingStatement[];
  ยานพาหนะ: InfoAssetVehicleStatement[];
  ทรัพย์สินอื่น: InfoAssetValuableStatement;
}

interface InfoAssetMainProps {
  statements: Record<string, InfoAssetStatements>;
  years: DropdownDetailedData[];
  compare_years: DropdownDetailedData[];
}

export default function InfoAssetMain({
  statements,
  years,
  compare_years,
}: InfoAssetMainProps) {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

  const [currentYear, setCurrentYear] = useState(years[0]);
  const [compareYear, setCompareYear] = useState(compare_years[0]);

  const statements1 = statements[currentYear.data] ?? EMPTY_STATEMENT;
  const statements2 = statements[compareYear.data] ?? EMPTY_STATEMENT;

  return (
    <section className="bg-gray-2 pt-10 rounded-5 text-black max-w-[850px] mx-auto overflow-hidden">
      <h2 className="b5 text-center mb-5">
        <span className="b3 font-bold">ปีที่ยื่นบัญชี</span> (กรณีที่ยื่น)
      </h2>
      <div className="flex mb-10 gap-10 px-10">
        <InfoFinancialDropdowns
          light
          data={years}
          compare={compare_years}
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
      {compareYear.data ? (
        <>
          <InfoAssetCompareAccordion.Cash
            name="เงินสด"
            statements1={statements1.เงินสด}
            statements2={statements2.เงินสด}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินฝาก"
            statements1={statements1.เงินฝาก}
            statements2={statements2.เงินฝาก}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินลงทุน"
            statements1={statements1.เงินลงทุน}
            statements2={statements2.เงินลงทุน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินให้กู้ยืม"
            statements1={statements1.เงินให้กู้ยืม}
            statements2={statements2.เงินให้กู้ยืม}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Land
            statements1={statements1.ที่ดิน}
            statements2={statements2.ที่ดิน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Concession
            statements1={statements1.สิทธิและสัมปทาน}
            statements2={statements2.สิทธิและสัมปทาน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Building
            statements1={statements1.โรงเรือนและสิ่งปลูกสร้าง}
            statements2={statements2.โรงเรือนและสิ่งปลูกสร้าง}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Vehicle
            statements1={statements1.ยานพาหนะ}
            statements2={statements2.ยานพาหนะ}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetCompareAccordion.Valuable
            statements1={statements1.ทรัพย์สินอื่น}
            statements2={statements2.ทรัพย์สินอื่น}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
        </>
      ) : (
        <>
          <InfoAssetSingleAccordion.Cash
            name="เงินสด"
            statements={statements1.เงินสด}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินฝาก"
            statements={statements1.เงินฝาก}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินลงทุน"
            statements={statements1.เงินลงทุน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินให้กู้ยืม"
            statements={statements1.เงินให้กู้ยืม}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Land
            statements={statements1.ที่ดิน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Concession
            statements={statements1.สิทธิและสัมปทาน}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Building
            statements={statements1.โรงเรือนและสิ่งปลูกสร้าง}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Vehicle
            statements={statements1.ยานพาหนะ}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
          <InfoAssetSingleAccordion.Valuable
            statements={statements1.ทรัพย์สินอื่น}
            showActor={showActor}
            showSpouse={showSpouse}
            showChild={showChild}
          />
        </>
      )}
    </section>
  );
}
