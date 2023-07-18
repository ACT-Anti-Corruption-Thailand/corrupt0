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
  cash: InfoAssetStatement[];
  deposit: InfoAssetStatement[];
  investment: InfoAssetStatement[];
  loan: InfoAssetStatement[];
  land: InfoAssetLandStatement[];
  concession: InfoAssetConcessionStatement[];
  building: InfoAssetBuildingStatement[];
  vehicle: InfoAssetVehicleStatement[];
  valuable: InfoAssetValuableStatement;
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
            statements1={statements1.cash}
            statements2={statements2.cash}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินฝาก"
            statements1={statements1.deposit}
            statements2={statements2.deposit}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินลงทุน"
            statements1={statements1.investment}
            statements2={statements2.investment}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินให้กู้ยืม"
            statements1={statements1.loan}
            statements2={statements2.loan}
          />
          <InfoAssetCompareAccordion.Land
            statements1={statements1.land}
            statements2={statements2.land}
          />
          <InfoAssetCompareAccordion.Concession
            statements1={statements1.concession}
            statements2={statements2.concession}
          />
          <InfoAssetCompareAccordion.Building
            statements1={statements1.building}
            statements2={statements2.building}
          />
          <InfoAssetCompareAccordion.Vehicle
            statements1={statements1.vehicle}
            statements2={statements2.vehicle}
          />
          <InfoAssetCompareAccordion.Valuable
            statements1={statements1.valuable}
            statements2={statements2.valuable}
          />
        </>
      ) : (
        <>
          <InfoAssetSingleAccordion.Cash name="เงินสด" statements={statements1.cash} />
          <InfoAssetSingleAccordion.Cash
            name="เงินฝาก"
            statements={statements1.deposit}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินลงทุน"
            statements={statements1.investment}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินให้กู้ยืม"
            statements={statements1.loan}
          />
          <InfoAssetSingleAccordion.Land statements={statements1.land} />
          <InfoAssetSingleAccordion.Concession statements={statements1.concession} />
          <InfoAssetSingleAccordion.Building statements={statements1.building} />
          <InfoAssetSingleAccordion.Vehicle statements={statements1.vehicle} />
          <InfoAssetSingleAccordion.Valuable statements={statements1.valuable} />
        </>
      )}
    </section>
  );
}
