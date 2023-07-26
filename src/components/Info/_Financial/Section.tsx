"use client";

import { useState } from "react";

import InfoFinanceDialog from "@/components/Info/_Financial/Dialog";
import InfoFinancialDropdowns from "@/components/Info/_Financial/Dropdowns";
import Image from "next/image";
import DownloadMenu from "../DownloadMenu";
import { TopAssetCard } from "./AssetCard";
import InfoFinancialCheckboxes from "./Checkboxes";
import { InfoFinancialCompareCard, InfoFinancialSingleCard } from "./FinancialCard";
import { InfoFinancialCompareTaxCard, InfoFinancialSingleTaxCard } from "./TaxCard";
import Link from "next/link";

import { formatMillion, formatThousands } from "@/functions/moneyFormatter";

import type { DropdownDetailedData } from "../../BareDropdown";

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
  ทรัพย์สิน?: InfoFinanceStatement[];
  หนี้สิน?: InfoFinanceStatement[];
  รายได้?: InfoFinanceStatement[];
  รายจ่าย?: InfoFinanceStatement[];
  ภาษี?: ActorSpouseChildArr;
}

const calcMax = (
  compareYear: boolean,
  currentYearData: InfoFinancial,
  compareYearData: InfoFinancial
) => {
  const propertyMax =
    currentYearData.ทรัพย์สิน
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const debtMax =
    currentYearData.หนี้สิน
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const incomeMax =
    currentYearData.รายได้
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const expenseMax =
    currentYearData.รายจ่าย
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const taxMax =
    currentYearData.ภาษี?.reduce((a: number, c) => a + (c ?? 0), 0) ?? -Infinity;

  const currentMax = Math.max(propertyMax, debtMax, incomeMax, expenseMax, taxMax);
  if (!compareYear) return currentMax;

  const comparePropertyMax =
    compareYearData.ทรัพย์สิน
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const compareDebtMax =
    compareYearData.หนี้สิน
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const compareIncomeMax =
    compareYearData.รายได้
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const compareExpenseMax =
    compareYearData.รายจ่าย
      ?.map((e) => e.value)
      .flat()
      .reduce((a, c) => (a ?? 0) + (c ?? 0), 0) ?? -Infinity;
  const compareTaxMax =
    compareYearData.ภาษี?.reduce((a: number, c) => a + (c ?? 0), 0) ?? -Infinity;

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
  assetsData: Record<
    string,
    {
      value: number;
      name: string;
      baseCatg: string;
    }
  >;
  naccYear: Record<string | number, number>;
  nacc: any;
}

export default function InfoFinancialSection({
  name,
  spouseCount,
  childCount,
  years,
  compareYears,
  data,
  assetsData,
  naccYear,
  nacc,
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
    <>
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
                  year1={naccYear[currentYear.data]}
                  year2={naccYear[compareYear.data]}
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
                  year1={naccYear[currentYear.data]}
                  year2={naccYear[compareYear.data]}
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
                  year1={naccYear[currentYear.data]}
                  year2={naccYear[compareYear.data]}
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
                  year1={naccYear[currentYear.data]}
                  year2={naccYear[compareYear.data]}
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
                {currentYearData.ภาษี && compareYearData.ภาษี && (
                  <InfoFinancialCompareTaxCard
                    year1={naccYear[currentYear.data]}
                    year2={naccYear[compareYear.data]}
                    tax1={currentYearData.ภาษี}
                    tax2={compareYearData.ภาษี}
                    max={max}
                    spouseCount={spouseCount}
                    childCount={childCount}
                    showActor={showActor}
                    showSpouse={showSpouse}
                    showChild={showChild}
                  />
                )}
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
                {currentYearData.ภาษี ? (
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
                ) : (
                  <div className="bg-gray-1 p-10 font-bold b3">
                    <div className="b2">การเสียภาษี</div>
                    <span className="block mb-5">เงินได้พึงประเมิน</span>
                    <span className="block text-gray-5">ไม่ได้ระบุไว้</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* เจาะลึกทรัพย์สิน */}
        <TopAssetCard
          name={name}
          year1={naccYear[currentYear.data]}
          year2={naccYear[compareYear.data]}
          property1={assetsData[currentYear.data]}
          property2={assetsData[compareYear.data]}
        />
      </section>

      {/* ปุ่มเอกสาร */}
      <div className="flex gap-5 px-10 mb-10">
        <DownloadMenu data={nacc} />
        <Link
          href={`/data/${name}.json`}
          className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5 no-underline text-white hover:bg-white hover:text-black"
          download
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 21"
            width={20}
            height={20}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8.375 2.544v3c0 .759-.616 1.374-1.375 1.374H4v9.626a1 1 0 001 1h10a1 1 0 001-1v-13a1 1 0 00-1-1H8.375zm-4 3.624H7c.345 0 .625-.28.625-.625V2.918l-3.25 3.25zM9.5 9.543H7v2h2.5v-2zm-2.5 5v-2h2.5v2H7zm3.5 0v-2H13v2h-2.5zm2.5-5v2h-2.5v-2H13zm-7-1v7h8v-7H6z"
              clipRule="evenodd"
            />
          </svg>
          <span>ดาวน์โหลดข้อมูล</span>
        </Link>
      </div>
    </>
  );
}
