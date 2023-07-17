"use client";
import clsx from "clsx";
import { Fragment } from "react";
import Accordion from "../../Accordion";
import type { InfoFinanceStatement } from "./Section";
import { f$ } from "./Section";

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
