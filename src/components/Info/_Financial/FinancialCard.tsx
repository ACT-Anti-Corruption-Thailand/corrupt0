"use client";
import clsx from "clsx";
import { InfoFinancialChart } from "./Chart";
import { InfoFinancialSingleDetails } from "./Details";
import type { InfoFinanceStatement } from "./Section";
import { f$, fP, safePercent } from "./Section";

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

export const InfoFinancialSingleCard = ({
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

export const InfoFinancialCompareCard = ({
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
