"use client";

import { useState } from "react";

import InfoFinanceDialog from "@/components/Info/_Financial/Dialog";
import InfoFinancialDropdowns from "@/components/Info/_Financial/Dropdowns";
import Image from "next/image";
import { TopAssetCard } from "./AssetCard";
import InfoFinancialCheckboxes from "./Checkboxes";
import { InfoFinancialCompareCard, InfoFinancialSingleCard } from "./FinancialCard";
import { InfoFinancialCompareTaxCard, InfoFinancialSingleTaxCard } from "./TaxCard";

import { formatMillion, formatThousands } from "@/functions/moneyFormatter";

import type { DropdownDetailedData } from "../../BareDropdown";
import type { TopPropertyData } from "./AssetCard";

export const f$ = (value: number) => formatThousands(formatMillion(value), 2);
export const safePercent = (value: number, outof: number) => (value / (outof || 1)) * 100;
export const fP = (value: number) => Math.floor(value * 1e2) / 1e2;

type NumberNullUndefined = number | null | undefined;
export type ActorSpouseChildArr = [number, NumberNullUndefined, NumberNullUndefined];

export interface InfoFinanceStatement {
  type: string;
  value: ActorSpouseChildArr;
}

interface InfoFinancial {
  ทรัพย์สิน: InfoFinanceStatement[];
  หนี้สิน: InfoFinanceStatement[];
  รายได้: InfoFinanceStatement[];
  รายจ่าย: InfoFinanceStatement[];
  ภาษี: ActorSpouseChildArr;
}

const ASSETS: Record<string, TopPropertyData> = {
  "2566": {
    name: "ห้องชุดเพนท์เฮาส์",
    price: 92_120_000,
  },
  "2562": {
    name: "ห้องชุดเพนท์เฮาส์",
    price: 92_120_000,
  },
};

const calcMax = (
  compareYear: boolean,
  currentYearData: InfoFinancial,
  compareYearData: InfoFinancial
) => {
  const propertyMax = currentYearData.ทรัพย์สิน
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const debtMax = currentYearData.หนี้สิน
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const incomeMax = currentYearData.รายได้
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const expenseMax = currentYearData.รายจ่าย
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const taxMax = currentYearData.ภาษี.reduce((a: number, c) => a + (c ?? 0), 0);

  const currentMax = Math.max(propertyMax, debtMax, incomeMax, expenseMax, taxMax);
  if (!compareYear) return currentMax;

  const comparePropertyMax = compareYearData.ทรัพย์สิน
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareDebtMax = compareYearData.หนี้สิน
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareIncomeMax = compareYearData.รายได้
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareExpenseMax = compareYearData.รายจ่าย
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareTaxMax = compareYearData.ภาษี.reduce((a: number, c) => a + (c ?? 0), 0);

  return Math.max(
    currentMax,
    comparePropertyMax,
    compareDebtMax,
    compareIncomeMax,
    compareExpenseMax,
    compareTaxMax
  );
};

interface InfoFinancialSectionProps {
  name: string;
  spouseCount: number;
  childCount: number;
  years: DropdownDetailedData[];
  compareYears: DropdownDetailedData[];
  data: Record<string, InfoFinancial>;
}

export default function InfoFinancialSection({
  name,
  spouseCount,
  childCount,
  years,
  compareYears,
  data,
}: InfoFinancialSectionProps) {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

  const [currentYear, setCurrentYear] = useState(years[0]);
  const [compareYear, setCompareYear] = useState(compareYears[0]);

  const currentYearData = data[currentYear.data];
  const compareYearData = data[compareYear.data];

  const max = calcMax(compareYear.data, currentYearData, compareYearData);

  return (
    <section id="financial">
      <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6">
        <Image src="/icons/financial.svg" alt="" width={30} height={30} />
        <span>สถานะทางการเงิน</span>
      </header>

      <div className="p-10">
        <div className="mb-5 text-center">
          <span className="b3 font-bold inline-block mr-2">ปีที่ยื่นบัญชี</span>
          <span className="b5">(กรณีที่ยื่น)</span>
        </div>
        <div className="flex mb-10 gap-10">
          <InfoFinancialDropdowns
            data={years}
            compare={compareYears}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            compareYear={compareYear}
            setCompareYear={setCompareYear}
          />
        </div>
        {/* การ์ดเงิน */}
        <div className="rounded-10 bg-white p-10 text-black">
          <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
            <InfoFinancialCheckboxes
              showActor={showActor}
              setShowActor={setShowActor}
              showSpouse={showSpouse}
              setShowSpouse={setShowSpouse}
              showChild={showChild}
              setShowChild={setShowChild}
            />
          </div>
          <div className="py-5 mb-5 ml-10">
            <InfoFinanceDialog />
          </div>
          {compareYear.data ? (
            <>
              <InfoFinancialCompareCard
                name="ทรัพย์สิน"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.ทรัพย์สิน}
                data2={compareYearData.ทรัพย์สิน}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialCompareCard
                name="หนี้สิน"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.หนี้สิน}
                data2={compareYearData.หนี้สิน}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
                lessIsBetter
              />
              <InfoFinancialCompareCard
                name="รายได้"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.รายได้}
                data2={compareYearData.รายได้}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialCompareCard
                name="รายจ่าย"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.รายจ่าย}
                data2={compareYearData.รายจ่าย}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
                lessIsBetter
              />
              <InfoFinancialCompareTaxCard
                year1={currentYear.data}
                year2={compareYear.data}
                tax1={currentYearData.ภาษี}
                tax2={compareYearData.ภาษี}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
            </>
          ) : (
            <>
              <InfoFinancialSingleCard
                name1="ทรัพย์สิน"
                name2="หนี้สิน"
                data1={currentYearData.ทรัพย์สิน}
                data2={currentYearData.หนี้สิน}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialSingleCard
                name1="รายได้"
                name2="รายจ่าย"
                data1={currentYearData.รายได้}
                data2={currentYearData.รายจ่าย}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialSingleTaxCard
                tax={currentYearData.ภาษี}
                income={currentYearData.รายได้}
                max={max}
                spouseCount={spouseCount}
                childCount={childCount}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
            </>
          )}
        </div>
      </div>

      {/* เจาะลึกทรัพย์สิน */}
      {
        // <TopAssetCard
        //   name={name}
        //   year1={currentYear.data}
        //   year2={compareYear.data}
        //   property1={ASSETS[currentYear.data]}
        //   property2={ASSETS[compareYear.data]}
        // />
      }
    </section>
  );
}
