"use client";

import { useState } from "react";

import InfoAssetAccordion from "@/components/Info/Asset/Accordion";
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
} from "@/components/Info/Asset/Accordion";

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
      <InfoAssetAccordion.Cash name="เงินสด" statements={statements.cash} />
      <InfoAssetAccordion.Cash name="เงินฝาก" statements={statements.deposit} />
      <InfoAssetAccordion.Cash name="เงินลงทุน" statements={statements.investment} />
      <InfoAssetAccordion.Cash name="เงินให้กู้ยืม" statements={statements.loan} />
      <InfoAssetAccordion.Land statements={statements.land} />
      <InfoAssetAccordion.Concession statements={statements.concession} />
      <InfoAssetAccordion.Building statements={statements.building} />
      <InfoAssetAccordion.Vehicle statements={statements.vehicle} />
      <InfoAssetAccordion.Valuable statements={statements.valuable} />
    </section>
  );
}
