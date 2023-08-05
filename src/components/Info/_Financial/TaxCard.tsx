"use client";
import clsx from "clsx";
import { InfoFinancialChart } from "./Chart";
import type { TaxArray, InfoFinanceStatement } from "./Section";
import { f$, fP, safePercent } from "./Section";

interface CompareIncomeProps {
  totalTax: number;
  income: InfoFinanceStatement[];
  taxActor: number;
  taxSpouse: number;
  showActor: boolean;
  showSpouse: boolean;
  spouseCount: number;
}

function CompareIncome({
  totalTax,
  income,
  taxActor,
  taxSpouse,
  showActor,
  showSpouse,
  spouseCount,
}: CompareIncomeProps) {
  const [totalActorIncome, totalSpouseIncome] = income.reduce(
    (a, c) => {
      return [a[0] + c.value[0], a[1] + (c.value[1] ?? 0)];
    },
    [0, 0]
  );

  const actorCompare = safePercent(taxActor, totalActorIncome);
  const spouseCompare = safePercent(taxSpouse, totalSpouseIncome);
  const totalCompare = safePercent(totalTax, totalActorIncome + totalSpouseIncome);

  const [actorWording, actorValue] =
    actorCompare > 100
      ? ["มากกว่า", actorCompare - 100]
      : ["น้อยกว่า", 100 - actorCompare];
  const [spouseWording, spouseValue] =
    spouseCompare > 100
      ? ["มากกว่า", spouseCompare - 100]
      : ["น้อยกว่า", 100 - spouseCompare];
  const [totalWording, totalValue] =
    totalCompare > 100
      ? ["มากกว่า", totalCompare - 100]
      : ["น้อยกว่า", 100 - totalCompare];

  return (
    <div className="flex flex-col gap-5 py-5 border-y border-y-gray-4">
      <span className="block b3 font-bold">เปรียบเทียบกับรายได้จริง</span>
      <div className="flex">
        {showActor && (
          <div className="flex-1">
            <span className="block b4">{actorWording}</span>
            <span className="block b5">{fP(actorValue)}%</span>
          </div>
        )}
        {showSpouse && spouseCount > 0 && (
          <div className="opacity-80 flex-1 flex">
            <div className={clsx(showActor && "mx-auto")}>
              <span className="block b4">{spouseWording}</span>
              <span className="block b5">{fP(spouseValue)}%</span>
            </div>
          </div>
        )}
        <div className="text-right flex-1">
          <span className="block b4">{totalWording}</span>
          <span className="block b5">{fP(totalValue)}%</span>
        </div>
      </div>
    </div>
  );
}

interface InfoFinancialSingleTaxCardProps {
  tax: TaxArray;
  income?: InfoFinanceStatement[];
  max: number;

  spouseCount: number;

  showActor: boolean;
  showSpouse: boolean;
}

export const InfoFinancialSingleTaxCard = ({
  tax,
  income,
  max,
  spouseCount,
  showActor,
  showSpouse,
}: InfoFinancialSingleTaxCardProps) => {
  const taxActor = showActor ? tax[0] : 0;
  const taxSpouse = showSpouse ? tax[1] ?? 0 : 0;

  const totalTax = taxActor + taxSpouse;

  return (
    <div className="bg-gray-1 p-10">
      <div className="block b2 font-bold">การเสียภาษี</div>
      <section>
        <span className="block b3 font-bold mb-2">เงินได้พึงประเมิน</span>
        <InfoFinancialChart actor={taxActor} spouse={taxSpouse} child={0} max={max} />
        <div className="flex pt-5 mb-10">
          {showActor && (
            <div className="flex-1">
              <span className="block b7 leading-1">ผู้ยื่น</span>
              <span className="block b4">{f$(taxActor)}</span>
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
                <span className="block b4">{f$(taxSpouse)}</span>
              </div>
            </div>
          )}
          <div className="text-right flex-1">
            <span className="block b7 leading-1">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold">{f$(totalTax)}</span>
          </div>
        </div>
        {income && (
          <CompareIncome
            income={income}
            totalTax={totalTax}
            taxActor={taxActor}
            taxSpouse={taxSpouse}
            showActor={showActor}
            showSpouse={showSpouse}
            spouseCount={spouseCount}
          />
        )}
      </section>
    </div>
  );
};

interface InfoFinancialCompareTaxCardProps {
  year1: string | number;
  year2: string | number;
  tax1: TaxArray;
  tax2: TaxArray;
  max: number;

  spouseCount: number;

  showActor: boolean;
  showSpouse: boolean;
}

export const InfoFinancialCompareTaxCard = ({
  year1,
  year2,
  tax1,
  tax2,
  max,
  spouseCount,
  showActor,
  showSpouse,
}: InfoFinancialCompareTaxCardProps) => {
  const taxActor1 = showActor ? tax1[0] : 0;
  const taxSpouse1 = showSpouse ? tax1[1] ?? 0 : 0;
  const totalTax1 = taxActor1 + taxSpouse1;

  const taxActor2 = showActor ? tax2[0] : 0;
  const taxSpouse2 = showSpouse ? tax2[1] ?? 0 : 0;
  const totalTax2 = taxActor2 + taxSpouse2;

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
        <InfoFinancialChart actor={taxActor1} spouse={taxSpouse1} child={0} max={max} />
        <div className="b4 font-bold">{year2}</div>
        <InfoFinancialChart actor={taxActor2} spouse={taxSpouse2} child={0} max={max} />
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
