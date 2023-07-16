"use client";

import clsx from "clsx";
import { Fragment, useState } from "react";

import InfoFinanceDialog from "@/components/Info/_Financial/Dialog";
import InfoFinancialDropdowns from "@/components/Info/_Financial/Dropdowns";
import Image from "next/image";
import Link from "next/link";
import Accordion from "../../Accordion";
import InfoFinancialCheckboxes from "./Checkboxes";

import { formatMillion, formatThousands } from "@/functions/moneyFormatter";

import type { CSSProperties } from "react";
import type { DropdownDetailedData } from "../../BareDropdown";

const f$ = (value: number) => formatThousands(formatMillion(value), 2);

const safePercent = (value: number, outof: number) => (value / (outof || 1)) * 100;
const fP = (value: number) => Math.floor(value * 1e2) / 1e2;

type NumberNullUndefined = number | null | undefined;
type ActorSpouseChildArr = [number, NumberNullUndefined, NumberNullUndefined];

interface InfoFinanceStatement {
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

interface InfoFinancialDetailsProps {
  data: InfoFinanceStatement[];
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const InfoFinancialSingleDetails = ({
  data,
  showActor,
  showSpouse,
  showChild,
}: InfoFinancialDetailsProps) => {
  return (
    <Accordion
      trigger={
        <>
          <div className="text-right text-gray-5 b6 underline ui-open:hidden">
            รายละเอียด
          </div>
          <div className="text-right text-gray-5 b6 underline -mt-2 pt-2 border-t border-t-black-40 ui-not-open:hidden">
            ปิด
          </div>
        </>
      }
    >
      {data.map(({ type, value }) => (
        <Fragment key={type}>
          <div className="b4 font-bold">{type}</div>
          <div className="flex b4 mb-10 last:pb-2 last:mb-2 last:border-b last:border-b-black-40">
            {showActor && <div className="flex-1">{f$(value[0])}</div>}
            {showSpouse && (
              <div className={clsx("flex-1 opacity-80", showActor && "text-center")}>
                {f$(value[1] ?? 0)}
              </div>
            )}
            {showChild && (
              <div
                className={clsx(
                  "flex-1 opacity-60",
                  (showActor || showSpouse) && "text-center"
                )}
              >
                {f$(value[2] ?? 0)}
              </div>
            )}
            <div className="flex-1 text-right font-bold">
              {f$(
                (showActor ? value[0] : 0) +
                  (showSpouse ? value[1] || 0 : 0) +
                  (showChild ? value[2] || 0 : 0)
              )}
            </div>
          </div>
        </Fragment>
      ))}
    </Accordion>
  );
};

interface InfoFinancialChartProps {
  actor: number;
  spouse: number;
  child: number;
  max: number;
}

const InfoFinancialChart = ({ actor, spouse, child, max }: InfoFinancialChartProps) => {
  const total = actor + spouse + child;

  return (
    <div
      className="flex border border-black h-20 mb-2 w-[--w]"
      style={{ "--w": `${safePercent(total, max)}%` } as CSSProperties}
    >
      {actor > 0 && (
        <div
          className="w-[--w] bg-black"
          style={{ "--w": `${safePercent(actor, total)}%` } as CSSProperties}
        />
      )}
      {spouse > 0 && (
        <div
          className="w-[--w] bg-black opacity-40"
          style={{ "--w": `${safePercent(spouse, total)}%` } as CSSProperties}
        />
      )}
      {child > 0 && (
        <div
          className="w-[--w] bg-black opacity-20"
          style={{ "--w": `${safePercent(child, total)}%` } as CSSProperties}
        />
      )}
    </div>
  );
};

interface InfoFinancialSingleCardProps {
  name1: string;
  name2: string;
  data1: InfoFinanceStatement[];
  data2: InfoFinanceStatement[];
  max: number;

  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const InfoFinancialSingleCard = ({
  name1,
  name2,
  data1,
  data2,
  max,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
}: InfoFinancialSingleCardProps) => {
  const actor1Total = showActor ? data1.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse1Total =
    showSpouse && spouseCount ? data1.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child1Total =
    showChild && childCount ? data1.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data1Total = actor1Total + spouse1Total + child1Total;

  const actor2Total = showActor ? data2.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse2Total =
    showSpouse && spouseCount ? data2.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child2Total =
    showChild && childCount ? data2.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data2Total = actor2Total + spouse2Total + child2Total;

  const dataDifference = data1Total - data2Total;

  return (
    <div
      className={clsx(
        "mb-10 p-10",
        dataDifference >= 0 ? "bg-value-positive-bg" : "bg-value-negative-bg"
      )}
    >
      <section className="mb-5">
        <div className="block b3 font-bold mb-2">{name1}</div>
        <InfoFinancialChart
          actor={actor1Total}
          spouse={spouse1Total}
          child={child1Total}
          max={max}
        />
        <div className="flex pt-5 justify-between">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(actor1Total)}</span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="flex-1 opacity-80 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(spouse1Total)}</span>
              </div>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="flex-1 opacity-60 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(child1Total)}</span>
              </div>
            </div>
          )}
          <div className="flex-1 text-right">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(data1Total)}</span>
          </div>
        </div>
        <InfoFinancialSingleDetails
          data={data1}
          showActor={showActor}
          showSpouse={showSpouse && !!spouseCount}
          showChild={showChild && !!childCount}
        />
      </section>
      <section className="mb-10">
        <div className="block b3 font-bold mb-2">{name2}</div>
        <InfoFinancialChart
          actor={actor2Total}
          spouse={spouse2Total}
          child={child2Total}
          max={max}
        />
        <div className="flex pt-5">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(actor2Total)}</span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="flex-1 opacity-80 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(spouse2Total)}</span>
              </div>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="flex-1 opacity-60 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(child2Total)}</span>
              </div>
            </div>
          )}
          <div className="flex-1 text-right">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(data2Total)}</span>
          </div>
        </div>
        <InfoFinancialSingleDetails
          data={data2}
          showActor={showActor}
          showSpouse={showSpouse && !!spouseCount}
          showChild={showChild && !!childCount}
        />
      </section>
      <p
        className={clsx(
          "b4 font-bold text-center no-balance",
          dataDifference >= 0 ? "text-value-positive-text" : "text-value-negative-text"
        )}
      >
        {dataDifference > 0
          ? `${name1} มากกว่า ${name2} ${f$(dataDifference)} ล้านบาท`
          : dataDifference === 0
          ? `${name1} เท่ากับ ${name2}`
          : `${name1} น้อยกว่า ${name2} ${f$(Math.abs(dataDifference))} ล้านบาท`}
      </p>
    </div>
  );
};

interface InfoFinancialCompareCardProps {
  name: string;
  year1: string;
  year2: string;
  max: number;
  data1: InfoFinanceStatement[];
  data2: InfoFinanceStatement[];
  spouseCount: number;
  childCount: number;
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
  lessIsBetter?: boolean;
}

const InfoFinancialCompareCard = ({
  name,
  year1,
  year2,
  max,
  data1,
  data2,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
  lessIsBetter,
}: InfoFinancialCompareCardProps) => {
  const actor1Total = showActor ? data1.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse1Total =
    showSpouse && spouseCount ? data1.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child1Total =
    showChild && childCount ? data1.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data1Total = actor1Total + spouse1Total + child1Total;

  const actor2Total = showActor ? data2.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse2Total =
    showSpouse && spouseCount ? data2.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child2Total =
    showChild && childCount ? data2.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data2Total = actor2Total + spouse2Total + child2Total;

  const percentDiff = safePercent(data2Total, data1Total);

  const bgColorClass = lessIsBetter
    ? ["bg-value-positive-bg", "bg-value-negative-bg"]
    : ["bg-value-negative-bg", "bg-value-positive-bg"];
  const textColorClass = lessIsBetter
    ? ["text-value-positive-text", "text-value-negative-text"]
    : ["text-value-negative-text", "text-value-positive-text"];

  return (
    <div
      className={clsx(
        "mb-10 p-10",
        percentDiff === 100 ? "bg-value-positive-bg" : bgColorClass[+(percentDiff > 100)]
      )}
    >
      <section className="mb-5">
        <div className="b3 font-bold">
          {name}{" "}
          {percentDiff > 100 ? (
            <span className={textColorClass[1]}>เพิ่มขึ้น {fP(percentDiff - 100)}%</span>
          ) : percentDiff === 100 ? (
            <span className="text-value-positive-text">ไม่เปลี่ยนแปลง</span>
          ) : (
            <span className={textColorClass[0]}>ลดลง {fP(100 - percentDiff)}%</span>
          )}
        </div>
        <div className="b4 font-bold">{year1}</div>
        <InfoFinancialChart
          actor={actor1Total}
          spouse={spouse1Total}
          child={child1Total}
          max={max}
        />
        <div className="b4 font-bold">{year2}</div>
        <InfoFinancialChart
          actor={actor2Total}
          spouse={spouse2Total}
          child={child2Total}
          max={max}
        />
        <div className="flex pt-5 justify-between">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(actor1Total)}</span>
              <span className="block b4">{f$(actor2Total)}</span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="flex-1 opacity-80 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(spouse1Total)}</span>
                <span className="block b4">{f$(spouse2Total)}</span>
              </div>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="flex-1 opacity-60 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(child1Total)}</span>
                <span className="block b4">{f$(child2Total)}</span>
              </div>
            </div>
          )}
          <div className="flex-1 text-right">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(data1Total)}</span>
            <span className="block b4 font-bold">{f$(data2Total)}</span>
          </div>
        </div>
        {/* <InfoFinancialDetails
          data={data1}
          showActor={showActor}
          showSpouse={showSpouse && !!spouseCount}
          showChild={showChild && !!childCount}
        /> */}
      </section>
    </div>
  );
};

interface TaxSingleCardProps {
  tax: ActorSpouseChildArr;
  income: InfoFinanceStatement[];
  max: number;

  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const TaxSingleCard = ({
  tax,
  income,
  max,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
}: TaxSingleCardProps) => {
  const taxActor = showActor ? tax[0] : 0;
  const taxSpouse = showSpouse ? tax[1] ?? 0 : 0;
  const taxChild = showChild ? tax[2] ?? 0 : 0;

  const totalTax = taxActor + taxSpouse + taxChild;
  const [totalActorIncome, totalSpouseIncome, totalChildIncome] = income.reduce(
    (a, c) => {
      return [a[0] + c.value[0], a[1] + (c.value[1] ?? 0), a[2] + (c.value[2] ?? 0)];
    },
    [0, 0, 0]
  );

  const actorCompare = safePercent(taxActor, totalActorIncome);
  const spouseCompare = safePercent(taxSpouse, totalSpouseIncome);
  const childCompare = safePercent(taxChild, totalChildIncome);
  const totalCompare = safePercent(
    totalTax,
    totalActorIncome + totalSpouseIncome + totalChildIncome
  );

  const [actorWording, actorValue] =
    actorCompare > 100 ? ["+", actorCompare - 100] : ["-", 100 - actorCompare];
  const [spouseWording, spouseValue] =
    spouseCompare > 100 ? ["+", spouseCompare - 100] : ["-", 100 - spouseCompare];
  const [childWording, childValue] =
    childCompare > 100 ? ["+", childCompare - 100] : ["-", 100 - childCompare];
  const [totalWording, totalValue] =
    totalCompare > 100 ? ["+", totalCompare - 100] : ["-", 100 - totalCompare];

  return (
    <div className="bg-gray-1 p-10">
      <div className="block b2 font-bold">การเสียภาษี</div>
      <section>
        <div className="block b3 font-bold mb-2">เงินได้พึงประเมิน</div>
        <InfoFinancialChart
          actor={taxActor}
          spouse={taxSpouse}
          child={taxChild}
          max={max}
        />
        <div className="flex pt-5">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(taxActor)}</span>
              <span className="block b6 leading-1">
                {actorWording}
                {fP(actorValue)}%*
              </span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(taxSpouse)}</span>
                <span className="block b6 leading-1">
                  {spouseWording}
                  {fP(spouseValue)}%*
                </span>
              </div>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(taxChild)}</span>
                <span className="block b6 leading-1">
                  {childWording}
                  {fP(childValue)}%*
                </span>
              </div>
            </div>
          )}
          <div className="text-right flex-1">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(totalTax)}</span>
            <span className="block b6 leading-1">
              {totalWording}
              {fP(totalValue)}%*
            </span>
          </div>
        </div>
        <span className="block b7 text-right mt-2">*เมื่อเปรียบเทียบกับรายได้</span>
      </section>
    </div>
  );
};

interface TaxCompareCardProps {
  year1: string;
  year2: string;
  tax1: ActorSpouseChildArr;
  tax2: ActorSpouseChildArr;
  max: number;

  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const TaxCompareCard = ({
  year1,
  year2,
  tax1,
  tax2,
  max,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
}: TaxCompareCardProps) => {
  const taxActor1 = showActor ? tax1[0] : 0;
  const taxSpouse1 = showSpouse ? tax1[1] ?? 0 : 0;
  const taxChild1 = showChild ? tax1[2] ?? 0 : 0;
  const totalTax1 = taxActor1 + taxSpouse1 + taxChild1;

  const taxActor2 = showActor ? tax2[0] : 0;
  const taxSpouse2 = showSpouse ? tax2[1] ?? 0 : 0;
  const taxChild2 = showChild ? tax2[2] ?? 0 : 0;
  const totalTax2 = taxActor2 + taxSpouse2 + taxChild2;

  const percentDiff = safePercent(totalTax2, totalTax1);

  return (
    <div className="bg-gray-1 p-10">
      <div className="b2 font-bold">
        การเสียภาษี{" "}
        <span className="b3 text-gray-5">
          {percentDiff > 100
            ? `เพิ่มขึ้น ${fP(percentDiff - 100)}%`
            : percentDiff === 100
            ? "ไม่เปลี่ยนแปลง"
            : `ลดลง ${fP(100 - percentDiff)}%`}
        </span>
      </div>
      <section>
        <div className="b3 font-bold">เงินได้พึงประเมิน</div>
        <div className="b4 font-bold">{year1}</div>
        <InfoFinancialChart
          actor={taxActor1}
          spouse={taxSpouse1}
          child={taxChild1}
          max={max}
        />
        <div className="b4 font-bold">{year2}</div>
        <InfoFinancialChart
          actor={taxActor2}
          spouse={taxSpouse2}
          child={taxChild2}
          max={max}
        />
        <div className="flex pt-5">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(taxActor1)}</span>
              <span className="block b4">{f$(taxActor2)}</span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(taxSpouse1)}</span>
                <span className="block b4">{f$(taxSpouse2)}</span>
              </div>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(taxChild1)}</span>
                <span className="block b4">{f$(taxChild2)}</span>
              </div>
            </div>
          )}
          <div className="text-right flex-1">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(totalTax1)}</span>
            <span className="block b4 font-bold">{f$(totalTax2)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

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

const DATA_2566: InfoFinancial = {
  property: [
    { type: "ทรัพย์สิน 1", value: [1e7, 0, 1e6] },
    { type: "ทรัพย์สิน 2", value: [1e7, 5e6, 0] },
  ],
  debt: [
    { type: "หนี้สิน 1", value: [3e6, 0, 1e6] },
    { type: "หนี้สิน 2", value: [3e6, 2e6, 0] },
  ],
  income: [
    { type: "รายได้ 1", value: [3e6, 2e6, 1e6] },
    { type: "รายได้ 2", value: [3e6, 2e6, 1e6] },
  ],
  expense: [
    { type: "รายจ่าย 1", value: [1e7, 5e6, 1e6] },
    { type: "รายจ่าย 2", value: [1e7, 5e6, 1e6] },
  ],
  tax: [5e6, 5e6, 1e6],
};

const DATA_2562: InfoFinancial = {
  property: [
    { type: "ทรัพย์สิน 1", value: [1e7 * 0.9, 0, 1e6 * 0.9] },
    { type: "ทรัพย์สิน 2", value: [1e7 * 0.9, 5e6 * 0.9, 0] },
  ],
  debt: [
    { type: "หนี้สิน 1", value: [3e6 * 1.1, 0, 1e6 * 1.1] },
    { type: "หนี้สิน 2", value: [3e6 * 1.1, 2e6 * 1.1, 0] },
  ],
  income: [
    { type: "รายได้ 1", value: [3e6, 2e6, 1e6] },
    { type: "รายได้ 2", value: [3e6, 2e6, 1e6] },
  ],
  expense: [
    { type: "รายจ่าย 1", value: [1e7 * 1.1, 5e6 * 0.9, 1e6] },
    { type: "รายจ่าย 2", value: [1e7 * 1.1, 5e6 * 0.9, 1e6] },
  ],
  tax: [5e6 * 1.1, 5e6 * 0.9, 1e6 * 1.1],
};

const DATA: Record<string, InfoFinancial> = {
  "2566": DATA_2566,
  "2562": DATA_2562,
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
              <TaxCompareCard
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
              <TaxSingleCard
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
      <Link
        href={`${name}/asset`}
        className="block rounded-10 bg-white border border-white overflow-hidden mb-10 mx-10"
      >
        <header className="py-[17px] px-10 bg-asset_explore bg-center bg-cover">
          <div className="flex justify-between h3">
            <span>เจาะลึกทรัพย์สิน</span>
            <Image
              className="-rotate-90"
              src="/icons/arr-w.svg"
              alt=""
              width={16}
              height={16}
            />
          </div>
        </header>
        <div className="p-10">
          <span className="b4 text-gray-4 font-bold block mb-10">
            ทรัพย์สินที่แพงที่สุด
          </span>
          <div className="flex gap-5 items-start">
            <Image src="/icons/placeholder.svg" alt="" width={40} height={40} />
            <div className="flex-1 text-black">
              <span className="block b5">ห้องชุดเพนท์เฮาส์</span>
              <span className="block b3 font-bold">92.12 ล้านบาท</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
