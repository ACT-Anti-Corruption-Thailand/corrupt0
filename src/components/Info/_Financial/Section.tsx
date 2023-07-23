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
  property: InfoFinanceStatement[];
  debt: InfoFinanceStatement[];
  income: InfoFinanceStatement[];
  expense: InfoFinanceStatement[];
  tax: ActorSpouseChildArr;
}

const SPOUSE_COUNT = 2;
const CHILD_COUNT = 1;

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

const DATA_62: InfoFinancial = {
  property: [
    { type: "เงินสด", value: [1e7 * 1.2, 0 * 0.8, 1e6] },
    { type: "เงินฝาก", value: [1e7 * 1.2, 5e6 * 0.8, 0] },
    { type: "เงินลงทุน", value: [1e7 * 1.2, 0 * 0.8, 1e6] },
    { type: "เงินให้กู้ยืม", value: [1e7 * 1.2, 5e6 * 0.8, 0] },
    { type: "ที่ดิน", value: [1e7 * 1.2, 0 * 0.8, 1e6] },
    { type: "สิทธิและสัมปทาน", value: [1e7 * 1.2, 5e6 * 0.8, 0] },
  ],
  debt: [
    { type: "เงินเบิกเกินบัญชี", value: [3e6, 0, 1e6] },
    { type: "เงินกู้จากธนาคารและสถาบันการเงินอื่น", value: [3e6, 2e6, 0] },
    { type: "หนี้สินอื่น", value: [3e6, 2e6, 0] },
  ],
  income: [
    { type: "รายได้จากการรับให้", value: [3e6, 2e6, 1e6] },
    { type: "รายได้จากการทำเกษตร", value: [3e6, 2e6, 1e6] },
    { type: "รายได้อื่นๆ", value: [3e6, 2e6, 1e6] },
  ],
  expense: [{ type: "รายจ่ายประจำ", value: [1e7, 5e6, 1e6] }],
  tax: [5e6, 5e6, 1e6],
};

const DATA_66: InfoFinancial = {
  property: [
    { type: "เงินสด", value: [1e7, 0, 1e6] },
    { type: "เงินฝาก", value: [1e7, 5e6, 0] },
    { type: "เงินลงทุน", value: [1e7, 0, 1e6] },
    { type: "เงินให้กู้ยืม", value: [1e7, 5e6, 0] },
    { type: "ที่ดิน", value: [1e7, 0, 1e6] },
    { type: "โรงเรือนและสิ่งปลูกสร้าง", value: [1e7, 5e6, 0] },
    { type: "ยานพาหนะ", value: [1e7, 0, 1e6] },
    { type: "สิทธิและสัมปทาน", value: [1e7, 5e6, 0] },
    { type: "ทรัพย์สินอื่น", value: [1e7, 0, 1e6] },
  ],
  debt: [
    { type: "เงินเบิกเกินบัญชี", value: [3e6, 0, 1e6] },
    { type: "เงินกู้จากธนาคารและสถาบันการเงินอื่น", value: [3e6, 2e6, 0] },
    { type: "หนี้สินที่มีหลักฐานเป็นหนังสือ", value: [3e6, 0, 1e6] },
    { type: "หนี้สินอื่น", value: [3e6, 2e6, 0] },
  ],
  income: [
    { type: "รายได้ประจำ", value: [3e6, 2e6, 1e6] },
    { type: "รายได้จากทรัพย์สิน", value: [3e6, 2e6, 1e6] },
    { type: "รายได้อื่นๆ", value: [3e6, 2e6, 1e6] },
  ],
  expense: [
    { type: "รายจ่ายประจำ", value: [1e7, 5e6, 1e6] },
    { type: "รายจ่ายอื่นๆ", value: [1e7, 5e6, 1e6] },
  ],
  tax: [5e6, 5e6, 1e6],
};

const DATA: Record<string, InfoFinancial> = {
  "2566": DATA_66,
  "2562": DATA_62,
};

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
  const propertyMax = currentYearData.property
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const debtMax = currentYearData.debt
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const incomeMax = currentYearData.income
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const expenseMax = currentYearData.expense
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const taxMax = currentYearData.tax.reduce((a: number, c) => a + (c ?? 0), 0);

  const currentMax = Math.max(propertyMax, debtMax, incomeMax, expenseMax, taxMax);
  if (!compareYear) return currentMax;

  const comparePropertyMax = compareYearData.property
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareDebtMax = compareYearData.debt
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareIncomeMax = compareYearData.income
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareExpenseMax = compareYearData.expense
    .map((e) => e.value.reduce((a: number, c) => a + (c ?? 0), 0))
    .reduce((a, c) => a + c, 0);
  const compareTaxMax = compareYearData.tax.reduce((a: number, c) => a + (c ?? 0), 0);

  return Math.max(
    currentMax,
    comparePropertyMax,
    compareDebtMax,
    compareIncomeMax,
    compareExpenseMax,
    compareTaxMax
  );
};

export default function InfoFinancialSection({ name }: { name: string }) {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

  const [currentYear, setCurrentYear] = useState(YEARS[0]);
  const [compareYear, setCompareYear] = useState(COMPARE_YEARS[0]);

  const currentYearData = DATA[currentYear.data];
  const compareYearData = DATA[compareYear.data];

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
            data={YEARS}
            compare={COMPARE_YEARS}
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
                data1={currentYearData.property}
                data2={compareYearData.property}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialCompareCard
                name="หนี้สิน"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.debt}
                data2={compareYearData.debt}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
                lessIsBetter
              />
              <InfoFinancialCompareCard
                name="รายได้"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.income}
                data2={compareYearData.income}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialCompareCard
                name="รายจ่าย"
                year1={currentYear.data}
                year2={compareYear.data}
                data1={currentYearData.expense}
                data2={compareYearData.expense}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
                lessIsBetter
              />
              <InfoFinancialCompareTaxCard
                year1={currentYear.data}
                year2={compareYear.data}
                tax1={currentYearData.tax}
                tax2={compareYearData.tax}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
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
                data1={currentYearData.property}
                data2={currentYearData.debt}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialSingleCard
                name1="รายได้"
                name2="รายจ่าย"
                data1={currentYearData.income}
                data2={currentYearData.expense}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialSingleTaxCard
                tax={currentYearData.tax}
                income={currentYearData.income}
                max={max}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
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
        <TopAssetCard
          name={name}
          year1={currentYear.data}
          year2={compareYear.data}
          property1={ASSETS[currentYear.data]}
          property2={ASSETS[compareYear.data]}
        />
      }
    </section>
  );
}
