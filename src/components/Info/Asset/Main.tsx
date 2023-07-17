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

interface InfoAssetMainProps {
  statements: {
    cash: InfoAssetStatement[];
    deposit: InfoAssetStatement[];
    investment: InfoAssetStatement[];
    loan: InfoAssetStatement[];
    land: InfoAssetLandStatement[];
    concession: InfoAssetConcessionStatement[];
    building: InfoAssetBuildingStatement[];
    vehicle: InfoAssetVehicleStatement[];
    valuable: InfoAssetValuableStatement;
  };
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
            statements1={statements.cash}
            statements2={statements.cash}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินฝาก"
            statements1={statements.deposit}
            statements2={statements.deposit}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินลงทุน"
            statements1={statements.investment}
            statements2={statements.investment}
          />
          <InfoAssetCompareAccordion.Cash
            name="เงินให้กู้ยืม"
            statements1={statements.loan}
            statements2={statements.loan}
          />
          <InfoAssetCompareAccordion.Land
            statements1={statements.land}
            statements2={statements.land}
          />
          <InfoAssetCompareAccordion.Concession
            statements1={statements.concession}
            statements2={statements.concession}
          />
          <InfoAssetCompareAccordion.Building
            statements1={statements.building}
            statements2={statements.building}
          />
          <InfoAssetCompareAccordion.Vehicle
            statements1={statements.vehicle}
            statements2={statements.vehicle}
          />
        </>
      ) : (
        <>
          <InfoAssetSingleAccordion.Cash name="เงินสด" statements={statements.cash} />
          <InfoAssetSingleAccordion.Cash name="เงินฝาก" statements={statements.deposit} />
          <InfoAssetSingleAccordion.Cash
            name="เงินลงทุน"
            statements={statements.investment}
          />
          <InfoAssetSingleAccordion.Cash
            name="เงินให้กู้ยืม"
            statements={statements.loan}
          />
          <InfoAssetSingleAccordion.Land statements={statements.land} />
          <InfoAssetSingleAccordion.Concession statements={statements.concession} />
          <InfoAssetSingleAccordion.Building statements={statements.building} />
          <InfoAssetSingleAccordion.Vehicle statements={statements.vehicle} />
          <InfoAssetSingleAccordion.Valuable statements={statements.valuable} />
        </>
      )}
    </section>
  );
}
