"use client";
import clsx from "clsx";
import { Fragment } from "react";
import Accordion from "../../Accordion";
import type { InfoFinanceStatement } from "./Section";
import { f$, fP, safePercent } from "./Section";

interface InfoFinancialSingleDetailsProps {
  data: InfoFinanceStatement[];
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

export const InfoFinancialSingleDetails = ({
  data,
  showActor,
  showSpouse,
  showChild,
}: InfoFinancialSingleDetailsProps) => {
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

interface InfoFinanceCompareEntryProps extends InfoFinancialCompareDetailsProps {
  type: string;
}

const InfoFinanceCompareEntry = ({
  type,
  data1,
  data2,
  showActor,
  showSpouse,
  showChild,
  lessIsBetter,
}: InfoFinanceCompareEntryProps) => {
  const data1Entry = data1?.find((e) => e.type === type) ?? { value: [0, 0, 0] };
  const data2Entry = data2?.find((e) => e.type === type) ?? { value: [0, 0, 0] };

  const data1Value = data1Entry.value;
  const data2Value = data2Entry.value;

  const data1Total =
    (showActor ? data1Value[0] : 0) +
    (showSpouse ? data1Value[1] || 0 : 0) +
    (showChild ? data1Value[2] || 0 : 0);
  const data2Total =
    (showActor ? data2Value[0] : 0) +
    (showSpouse ? data2Value[1] || 0 : 0) +
    (showChild ? data2Value[2] || 0 : 0);

  const percentDiff = safePercent(data2Total, data1Total);

  const textColorClass = lessIsBetter
    ? ["text-value-positive-text", "text-value-negative-text"]
    : ["text-value-negative-text", "text-value-positive-text"];

  return (
    <Fragment>
      <div className="b4 font-bold">
        {type}{" "}
        {percentDiff > 100 ? (
          <span className={textColorClass[1]}>เพิ่มขึ้น {fP(percentDiff - 100)}%</span>
        ) : percentDiff === 100 ? (
          <span className="text-value-positive-text">ไม่เปลี่ยนแปลง</span>
        ) : (
          <span className={textColorClass[0]}>ลดลง {fP(100 - percentDiff)}%</span>
        )}
      </div>
      <div className="flex b4">
        {showActor && <div className="flex-1">{f$(data1Value[0])}</div>}
        {showSpouse && (
          <div className={clsx("flex-1 opacity-80", showActor && "text-center")}>
            {f$(data1Value[1] ?? 0)}
          </div>
        )}
        {showChild && (
          <div
            className={clsx(
              "flex-1 opacity-60",
              (showActor || showSpouse) && "text-center"
            )}
          >
            {f$(data1Value[2] ?? 0)}
          </div>
        )}
        <div className="flex-1 text-right font-bold">{f$(data1Total)}</div>
      </div>
      <div className="flex b4 mb-10 last:pb-2 last:mb-2 last:border-b last:border-b-black-40">
        {showActor && <div className="flex-1">{f$(data2Value[0])}</div>}
        {showSpouse && (
          <div className={clsx("flex-1 opacity-80", showActor && "text-center")}>
            {f$(data2Value[1] ?? 0)}
          </div>
        )}
        {showChild && (
          <div
            className={clsx(
              "flex-1 opacity-60",
              (showActor || showSpouse) && "text-center"
            )}
          >
            {f$(data2Value[2] ?? 0)}
          </div>
        )}
        <div className="flex-1 text-right font-bold">{f$(data2Total)}</div>
      </div>
    </Fragment>
  );
};

interface InfoFinancialCompareDetailsProps {
  data1?: InfoFinanceStatement[];
  data2?: InfoFinanceStatement[];
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
  lessIsBetter?: boolean;
}

export const InfoFinancialCompareDetails = ({
  data1,
  data2,
  showActor,
  showSpouse,
  showChild,
  lessIsBetter,
}: InfoFinancialCompareDetailsProps) => {
  const uniqType = [
    ...new Set([
      ...(data1?.map((e) => e.type) ?? []),
      ...(data2?.map((e) => e.type) ?? []),
    ]),
  ].sort((a, z) => a.localeCompare(z));

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
      {uniqType.map((type) => (
        <InfoFinanceCompareEntry
          key={type}
          type={type}
          data1={data1}
          data2={data2}
          showActor={showActor}
          showSpouse={showSpouse}
          showChild={showChild}
          lessIsBetter={lessIsBetter}
        />
      ))}
    </Accordion>
  );
};
