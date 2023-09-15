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

import { formatMillion, formatThousands } from "@/functions/moneyFormatter";

import type { DropdownDetailedData } from "../../BareDropdown";

export const f$ = (value: number) => formatThousands(formatMillion(value), 2);
export const safePercent = (value: number, outof: number) => (value / (outof || 1)) * 100;
export const fP = (value: number) => Math.floor(value * 1e2) / 1e2;

type NumberNullUndefined = number | null | undefined;
export type TaxArray = [number, NumberNullUndefined];
export type FinanceArray = [number, NumberNullUndefined, NumberNullUndefined];

export interface InfoFinanceStatement {
  type: string;
  value: FinanceArray;
}

interface InfoFinancial {
  ทรัพย์สิน?: InfoFinanceStatement[];
  หนี้สิน?: InfoFinanceStatement[];
  รายได้?: InfoFinanceStatement[];
  รายจ่าย?: InfoFinanceStatement[];
  ภาษี?: TaxArray;
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
  naccYear: Record<string | number, number | string>;
  nacc: Record<string, any>;
}

export default function InfoFinancialSection({
  name,
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

  const [leftYear, setLeftYear] = useState(years[0]);
  const [rightYear, setRightYear] = useState(compareYears[0]);

  const [currentYear, compareYear] =
    rightYear.data === null || naccYear[leftYear.data] < naccYear[rightYear.data]
      ? [leftYear, rightYear]
      : [rightYear, leftYear];

  const currentYearData = data[currentYear.data];
  const compareYearData = data[compareYear.data];

  const max = calcMax(compareYear.data, currentYearData, compareYearData);

  const spouseCount = nacc[currentYear.data].spouse ?? 0;
  const childCount = nacc[currentYear.data].child ?? 0;

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
              currentYear={leftYear}
              setCurrentYear={setLeftYear}
              compareYear={rightYear}
              setCompareYear={setRightYear}
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
                    showActor={showActor}
                    showSpouse={showSpouse}
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
                    showActor={showActor}
                    showSpouse={showSpouse}
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
          year1={naccYear[currentYear.data]}
          year2={naccYear[compareYear.data]}
          property1={assetsData[currentYear.data]}
          property2={assetsData[compareYear.data]}
        />
      </section>

      {/* ปุ่มเอกสาร */}
      <div className="flex gap-5 px-10 mb-10">
        <DownloadMenu data={nacc} />
        <a
          href={`/data/${name}.json`}
          className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5 no-underline text-white hover:bg-white hover:text-black"
          download
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 20"
            width={20}
            height={20}
          >
            <path
              fill="currentColor"
              d="M12.097 9.511c.013.128.02.27.018.426 0 .203-.006.379-.017.526a1.26 1.26 0 01-.074.364.43.43 0 01-.163.213.524.524 0 01-.285.068.514.514 0 01-.28-.068.442.442 0 01-.162-.213 1.322 1.322 0 01-.078-.364 6.396 6.396 0 01-.001-.952c.014-.129.041-.24.08-.33a.5.5 0 01.163-.214.455.455 0 01.272-.076c.116 0 .21.025.28.076.073.05.128.121.168.213.04.092.066.202.079.331z"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8.959 5V2h6.625a1 1 0 011 1v13a1 1 0 01-1 1h-10a1 1 0 01-1-1V6.375h3c.76 0 1.375-.616 1.375-1.375zm.333 4.378a.865.865 0 00-.003-.209.305.305 0 00-.063-.15.292.292 0 00-.136-.091.673.673 0 00-.223-.031c-.07 0-.129.01-.175.028a.279.279 0 00-.169.193.586.586 0 00-.017.146c0 .04.006.077.019.111.013.033.03.064.052.091a.396.396 0 00.183.127l.457.178c.151.06.282.121.391.186.11.064.201.132.272.206a.68.68 0 01.21.503c.001.171-.026.32-.081.445a.819.819 0 01-.234.311.985.985 0 01-.362.185c-.14.04-.297.06-.47.06a1.81 1.81 0 01-.522-.068.928.928 0 01-.374-.214.884.884 0 01-.223-.37 1.597 1.597 0 01-.059-.54h.703c-.004.113.003.208.018.285a.438.438 0 00.08.186.32.32 0 00.15.1.724.724 0 00.39.011.41.41 0 00.138-.063.322.322 0 00.1-.112.35.35 0 00.037-.167c0-.07-.01-.13-.028-.178a.328.328 0 00-.076-.122.402.402 0 00-.118-.085 1.683 1.683 0 00-.153-.07l-.69-.274a.806.806 0 01-.392-.295.802.802 0 01-.122-.446.856.856 0 01.32-.696c.1-.079.215-.138.346-.177.132-.039.271-.059.419-.059.166 0 .319.023.458.067.14.043.258.11.356.198a.825.825 0 01.224.331c.052.133.073.29.064.47h-.697zm-2.98 1.128v.23c0 .053.001.102.005.146a.362.362 0 00.024.115c.015.03.036.055.064.073a.217.217 0 00.116.026.265.265 0 00.13-.026.16.16 0 00.068-.073.335.335 0 00.026-.115 2.13 2.13 0 00.005-.147V8.377h.71v2.39c0 .119-.011.225-.034.317a.805.805 0 01-.094.236.612.612 0 01-.147.169.792.792 0 01-.192.108c-.07.027-.145.046-.226.058-.08.012-.165.018-.252.018-.155 0-.29-.02-.404-.062a.717.717 0 01-.285-.178.752.752 0 01-.169-.294 1.341 1.341 0 01-.055-.404v-.229h.71zm4.03-.97c-.01.131-.014.263-.014.395 0 .16.004.315.014.464.01.149.03.288.061.418s.075.248.13.356a.905.905 0 00.564.453c.134.042.294.063.48.063.184 0 .343-.021.476-.064a.893.893 0 00.563-.455c.057-.109.101-.228.132-.358.03-.13.052-.27.062-.418a6.65 6.65 0 00.015-.46c0-.133-.005-.267-.015-.399a2.088 2.088 0 00-.06-.377 1.396 1.396 0 00-.129-.334.898.898 0 00-.221-.267 1.007 1.007 0 00-.338-.176 1.561 1.561 0 00-.473-.064c-.189 0-.351.022-.488.065a1.04 1.04 0 00-.345.18.9.9 0 00-.224.268 1.446 1.446 0 00-.13.334c-.03.12-.05.245-.06.376zm3.684-1.159l.831 2.08v-2.08h.71v3.233h-.85l-.824-2.041v2.04h-.71V8.378h.843z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M7.584 5.625H4.959l3.25-3.25V5c0 .345-.28.625-.625.625z"
            />
          </svg>
          <span>ดาวน์โหลดข้อมูล</span>
        </a>
      </div>
    </>
  );
}
