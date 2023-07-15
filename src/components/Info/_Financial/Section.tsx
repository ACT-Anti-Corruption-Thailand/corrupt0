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

interface InfoFinanceSingleCardDataEntry {
  type: string;
  value: [number, number | null | undefined, number | null | undefined];
}

interface InfoDetailsProps {
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
  data: InfoFinanceSingleCardDataEntry[];
}

const InfoDetails = ({ data, showActor, showSpouse, showChild }: InfoDetailsProps) => {
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
      style={{ "--w": `${(total / max) * 100}%` } as CSSProperties}
    >
      {actor > 0 && (
        <div
          className="w-[--w] bg-black"
          style={{ "--w": `${(actor / total) * 100}%` } as CSSProperties}
        />
      )}
      {spouse > 0 && (
        <div
          className="w-[--w] bg-black opacity-40"
          style={{ "--w": `${(spouse / total) * 100}%` } as CSSProperties}
        />
      )}
      {child > 0 && (
        <div
          className="w-[--w] bg-black opacity-20"
          style={{ "--w": `${(child / total) * 100}%` } as CSSProperties}
        />
      )}
    </div>
  );
};

interface InfoFinancialSingleCardData {
  name1: string;
  name2: string;
  data1: InfoFinanceSingleCardDataEntry[];
  data2: InfoFinanceSingleCardDataEntry[];
}

interface InfoFinancialSingleCardProps {
  data: InfoFinancialSingleCardData;
  max: number;
  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const InfoFinancialSingleCard = ({
  data,
  max,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
}: InfoFinancialSingleCardProps) => {
  const actor1Total = showActor ? data.data1.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse1Total =
    showSpouse && spouseCount ? data.data1.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child1Total =
    showChild && childCount ? data.data1.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data1Total = actor1Total + spouse1Total + child1Total;

  const actor2Total = showActor ? data.data2.reduce((a, c) => a + c.value[0], 0) : 0;
  const spouse2Total =
    showSpouse && spouseCount ? data.data2.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child2Total =
    showChild && childCount ? data.data2.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
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
        <div className="block b3 font-bold mb-2">{data.name1}</div>
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
        <InfoDetails
          data={data.data1}
          showActor={showActor}
          showSpouse={showSpouse && !!spouseCount}
          showChild={showChild && !!childCount}
        />
      </section>
      <section className="mb-10">
        <div className="block b3 font-bold mb-2">{data.name2}</div>
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
        <InfoDetails
          data={data.data2}
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
          ? `${data.name1} มากกว่า ${data.name2} ${f$(dataDifference)} ล้านบาท`
          : dataDifference === 0
          ? `${data.name1} เท่ากับ ${data.name2}`
          : `${data.name1} น้อยกว่า ${data.name2} ${f$(
              Math.abs(dataDifference)
            )} ล้านบาท`}
      </p>
    </div>
  );
};

interface TaxSingleCardProps {
  tax: Omit<InfoFinancialChartProps, "max">;
  income: InfoFinanceSingleCardDataEntry[];
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
  const totalTax = tax.actor + tax.child + tax.spouse;
  const [totalActorIncome, totalSpouseIncome, totalChildIncome] = income.reduce(
    (a, c) => {
      return [a[0] + c.value[0], a[1] + (c.value[1] ?? 0), a[2] + (c.value[2] ?? 0)];
    },
    [0, 0, 0]
  );

  const actorCompare = Math.floor((tax.actor / totalActorIncome) * 100);
  const spouseCompare = Math.floor((tax.spouse / totalSpouseIncome) * 100);
  const childCompare = Math.floor((tax.child / totalChildIncome) * 100);
  const totalCompare = Math.floor(
    (totalTax / (totalActorIncome + totalSpouseIncome + totalChildIncome)) * 100
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
          actor={tax.actor}
          spouse={tax.spouse}
          child={tax.child}
          max={max}
        />
        <div className="flex pt-5">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(tax.actor)}</span>
              <span className="block b6 leading-1">
                {actorWording}
                {actorValue}%*
              </span>
            </div>
          )}
          {spouseCount > 0 && showSpouse && (
            <div className="opacity-80 flex-1 flex justify-center">
              <div>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(tax.spouse)}</span>
                <span className="block b6 leading-1">
                  {spouseWording}
                  {spouseValue}%*
                </span>
              </div>
            </div>
          )}
          {childCount > 0 && showChild && (
            <div className="opacity-80 flex-1 flex justify-center">
              <div>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(tax.child)}</span>
                <span className="block b6 leading-1">
                  {childWording}
                  {childValue}%*
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
              {totalValue}%*
            </span>
          </div>
        </div>
        <span className="block b7 text-right mt-2">*เมื่อเปรียบเทียบกับรายได้</span>
      </section>
    </div>
  );
};

const ASSET_DEBT: InfoFinancialSingleCardData = {
  name1: "ทรัพย์สิน",
  name2: "หนี้สิน",
  data1: [
    { type: "ทรัพย์สิน 1", value: [1e7, 0, 1e6] },
    { type: "ทรัพย์สิน 2", value: [1e7, 5e6, 0] },
  ],
  data2: [
    { type: "หนี้สิน 1", value: [3e6, 0, 1e6] },
    { type: "หนี้สิน 2", value: [3e6, 2e6, 0] },
  ],
};

const INCOME_DATA: InfoFinanceSingleCardDataEntry[] = [
  { type: "รายได้ 1", value: [3e6, 2e6, 1e6] },
  { type: "รายได้ 2", value: [3e6, 2e6, 1e6] },
];

const INCOME_EXPENSE: InfoFinancialSingleCardData = {
  name1: "รายได้",
  name2: "รายจ่าย",
  data1: INCOME_DATA,
  data2: [
    { type: "รายจ่าย 1", value: [1e7, 5e6, 1e6] },
    { type: "รายจ่าย 2", value: [1e7, 5e6, 1e6] },
  ],
};

const TAX: Omit<InfoFinancialChartProps, "max"> = {
  actor: 5e6,
  spouse: 5e6,
  child: 1e6,
};

const MAX = 4e7;
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

export default function InfoFinancialSection({ name }: { name: string }) {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

  const [currentYear, setCurrentYear] = useState(YEARS[0]);
  const [compareYear, setCompareYear] = useState(COMPARE_YEARS[0]);

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
            <div>Double Compare</div>
          ) : (
            <>
              <InfoFinancialSingleCard
                data={ASSET_DEBT}
                max={MAX}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <InfoFinancialSingleCard
                data={INCOME_EXPENSE}
                max={MAX}
                spouseCount={SPOUSE_COUNT}
                childCount={CHILD_COUNT}
                showActor={showActor}
                showSpouse={showSpouse}
                showChild={showChild}
              />
              <TaxSingleCard
                tax={TAX}
                income={INCOME_DATA}
                max={MAX}
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
