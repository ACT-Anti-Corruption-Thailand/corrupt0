"use client";
import clsx from "clsx";
import InfoPopover from "../Popover";
import { InfoFinancialChart } from "./Chart";
import { f$, fP, safePercent } from "./Section";
import type { InfoFinanceStatement, TaxArray } from "./Section";

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

  const [totalActorIncome, totalSpouseIncome] = income?.reduce(
    (a, c) => {
      return [a[0] + c.value[0], a[1] + (c.value[1] ?? 0)];
    },
    [0, 0]
  ) ?? [0, 0];

  const actorCompare = safePercent(taxActor, totalActorIncome);
  const spouseCompare = safePercent(taxSpouse, totalSpouseIncome);
  const totalCompare = safePercent(totalTax, totalActorIncome + totalSpouseIncome);

  return (
    <div className="bg-gray-1 p-10">
      <div className="block b2 font-bold">การเสียภาษี</div>
      <section>
        <div className="flex items-center gap-2">
          <p className="block b3 font-bold mb-2">เงินได้พึงประเมิน</p>
          <InfoPopover>
            <p className="b4">
              <span className="block font-bold mb-5">เงินได้พึงประเมิน</span>
              คือ เงินได้ตามที่ระบุไว้ใน{" "}
              <a
                className="underline"
                href="https://www.rd.go.th/5937.html#mata40"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                บทบัญญัติแห่งประมวลรัษฎากร มาตรา 40 (1) ถึง (8)
              </a>{" "}
              ซึ่งโดยทั่วไป เงินที่เราได้รับจะถูกรวมเป็นเงินได้พึงประเมิน
              เว้นแต่ระบุให้ยกเว้นตามบท
              <a
                className="underline"
                href="https://www.rd.go.th/5937.html#mata42"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                บัญญัติแห่งประมวลรัษฎากร มาตรา 42 (1) ถึง (29)
              </a>
            </p>
          </InfoPopover>
        </div>
        <InfoFinancialChart actor={taxActor} spouse={taxSpouse} child={0} max={max} />
        <div className="flex py-5">
          {showActor && (
            <div className="flex-1">
              <span className="block b7">ผู้ยื่น</span>
              <span className="block b4 leading-1">{f$(taxActor)}</span>
              {actorCompare === 100 ? (
                <span className="block b7">เท่ากับรายได้</span>
              ) : (
                <span className="block b7">{fP(actorCompare)}% ของรายได้</span>
              )}
            </div>
          )}
          {showSpouse && spouseCount > 0 && (
            <div className="opacity-80 flex-1 flex">
              <div className={clsx(showActor && "mx-auto")}>
                <span className="block b7">คู่สมรส {spouseCount} คน</span>
                <span className="block b4 leading-1">{f$(taxSpouse)}</span>
                {spouseCompare === 100 ? (
                  <span className="block b7">เท่ากับรายได้</span>
                ) : (
                  <span className="block b7">{fP(spouseCompare)}% ของรายได้</span>
                )}
              </div>
            </div>
          )}
          <div className="text-right flex-1">
            <span className="block b7">
              <span className="font-bold">รวม</span> (ล้านบาท)
            </span>
            <span className="block b4 font-bold leading-1">{f$(totalTax)}</span>
            {totalCompare === 100 ? (
              <span className="block b7 font-bold">เท่ากับรายได้</span>
            ) : (
              <span className="block b7 font-bold">{fP(totalCompare)}% ของรายได้</span>
            )}
          </div>
        </div>
        {((showActor && actorCompare !== 100) ||
          (showSpouse && tax[1] && spouseCompare !== 100) ||
          totalCompare !== 100) && (
          <p className="b7 text-black/40">
            *คำนวณ % จาก (เงินได้พึงประเมิน/รายได้) x 100
          </p>
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
