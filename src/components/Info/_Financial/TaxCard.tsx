"use client";
import clsx from "clsx";
import { InfoFinancialChart } from "./Chart";
import type { ActorSpouseChildArr, InfoFinanceStatement } from "./Section";
import { f$, fP, safePercent } from "./Section";

interface CompareIncomeProps {
  totalTax: number;
  income: InfoFinanceStatement[];
  taxActor: number;
  taxSpouse: number;
  taxChild: number;
  showActor: boolean;
  showSpouse: boolean;
  spouseCount: number;
  showChild: boolean;
  childCount: number;
}

function CompareIncome({
  totalTax,
  income,
  taxActor,
  taxSpouse,
  taxChild,
  showActor,
  showSpouse,
  spouseCount,
  showChild,
  childCount,
}: CompareIncomeProps) {
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
    actorCompare > 100
      ? ["มากกว่า", actorCompare - 100]
      : ["น้อยกว่า", 100 - actorCompare];
  const [spouseWording, spouseValue] =
    spouseCompare > 100
      ? ["มากกว่า", spouseCompare - 100]
      : ["น้อยกว่า", 100 - spouseCompare];
  const [childWording, childValue] =
    childCompare > 100
      ? ["มากกว่า", childCompare - 100]
      : ["น้อยกว่า", 100 - childCompare];
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
        {showChild && childCount > 0 && (
          <div className="opacity-80 flex-1 flex">
            <div className={clsx((showActor || showSpouse) && "mx-auto")}>
              <span className="block b4">{childWording}</span>
              <span className="block b5">{fP(childValue)}%</span>
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
  tax: ActorSpouseChildArr;
  income?: InfoFinanceStatement[];
  max: number;

  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

export const InfoFinancialSingleTaxCard = ({
  tax,
  income,
  max,
  spouseCount,
  childCount,
  showActor,
  showSpouse,
  showChild,
}: InfoFinancialSingleTaxCardProps) => {
  const taxActor = showActor ? tax[0] : 0;
  const taxSpouse = showSpouse ? tax[1] ?? 0 : 0;
  const taxChild = showChild ? tax[2] ?? 0 : 0;

  const totalTax = taxActor + taxSpouse + taxChild;

  return (
    <div className="bg-gray-1 p-10">
      <div className="block b2 font-bold">การเสียภาษี</div>
      <section>
        <span className="block b3 font-bold mb-2">เงินได้พึงประเมิน</span>
        <InfoFinancialChart
          actor={taxActor}
          spouse={taxSpouse}
          child={taxChild}
          max={max}
        />
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
          {showChild && childCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx((showActor || showSpouse) && "mx-auto")}>
                <span className="block b7 leading-1">บุตร {childCount} คน</span>
                <span className="block b4">{f$(taxChild)}</span>
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
            taxChild={taxChild}
            showActor={showActor}
            showSpouse={showSpouse}
            spouseCount={spouseCount}
            showChild={showChild}
            childCount={childCount}
          />
        )}
      </section>
    </div>
  );
};

interface InfoFinancialCompareTaxCardProps {
  year1: string | number;
  year2: string | number;
  tax1: ActorSpouseChildArr;
  tax2: ActorSpouseChildArr;
  max: number;

  spouseCount: number;
  childCount: number;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

export const InfoFinancialCompareTaxCard = ({
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
}: InfoFinancialCompareTaxCardProps) => {
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
