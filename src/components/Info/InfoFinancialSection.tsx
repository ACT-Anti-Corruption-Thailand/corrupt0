"use client";

import clsx from "clsx";
import { useState, Fragment } from "react";

import InfoFinanceDialog from "@/components/Info/InfoFinanceDialog";
import InfoFinancialDropdowns from "@/components/Info/InfoFinancialDropdowns";
import Image from "next/image";
import Link from "next/link";
import Accordion from "../Accordion";
import Checkbox from "../Checkbox";

import { formatMillion, formatThousands } from "@/functions/moneyFormatter";

import type { CSSProperties } from "react";

const f$ = (value: number) => formatThousands(formatMillion(value), 2);

interface InfoFinanceSingleCardDataEntry {
  type: string;
  value: [number, number | null | undefined, number | null | undefined];
}

interface InfoDetailsProps {
  hasSpouse: boolean;
  hasChild: boolean;
  data: InfoFinanceSingleCardDataEntry[];
}

const InfoDetails = ({ data, hasSpouse, hasChild }: InfoDetailsProps) => {
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
            <div className="flex-1">{f$(value[0])}</div>
            {hasSpouse && (
              <div className="flex-1 opacity-80 text-center">{f$(value[1] ?? 0)}</div>
            )}
            {hasChild && (
              <div className="flex-1 opacity-60 text-center">{f$(value[2] ?? 0)}</div>
            )}
            <div className="flex-1 text-right font-bold">
              {f$(value.reduce((a: number, c) => a + (c || 0), 0))}
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
      <div
        className="w-[--w] bg-black"
        style={{ "--w": `${(actor / total) * 100}%` } as CSSProperties}
      />
      <div
        className="w-[--w] bg-black opacity-40"
        style={{ "--w": (spouse / total) * 100 + "%" } as CSSProperties}
      />
      <div
        className="w-[--w] bg-black opacity-20"
        style={{ "--w": (child / total) * 100 + "%" } as CSSProperties}
      />
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
  const actor1Total = data.data1.reduce((a, c) => a + c.value[0], 0);
  const spouse1Total =
    showSpouse && spouseCount ? data.data1.reduce((a, c) => a + (c.value[1] || 0), 0) : 0;
  const child1Total =
    showChild && childCount ? data.data1.reduce((a, c) => a + (c.value[2] || 0), 0) : 0;
  const data1Total = actor1Total + spouse1Total + child1Total;

  const actor2Total = data.data2.reduce((a, c) => a + c.value[0], 0);
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
          <div className="flex-1">
            <span className="block b7 leading-1">ผู้ยื่น</span>
            <span className="block b4">{f$(actor1Total)}</span>
          </div>
          {showSpouse && spouseCount > 0 && (
            <div className="flex-1 opacity-80">
              <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
              <span className="block b4">{f$(spouse1Total)}</span>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="flex-1 opacity-60">
              <span className="block b7 leading-1">บุตร {childCount} คน</span>
              <span className="block b4">{f$(child1Total)}</span>
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
          hasSpouse={showSpouse && !!spouseCount}
          hasChild={showChild && !!childCount}
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
          <div className="flex-1">
            <span className="block b7 leading-1">ผู้ยื่น</span>
            <span className="block b4">{f$(actor2Total)}</span>
          </div>
          {showSpouse && spouseCount > 0 && (
            <div className="flex-1 opacity-80">
              <span className="block b7 leading-1">คู่สมรส {spouseCount} คน</span>
              <span className="block b4">{f$(spouse2Total)}</span>
            </div>
          )}
          {showChild && childCount > 0 && (
            <div className="flex-1 opacity-60">
              <span className="block b7 leading-1">บุตร {childCount} คน</span>
              <span className="block b4">{f$(child2Total)}</span>
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
          hasSpouse={showSpouse && !!spouseCount}
          hasChild={showChild && !!childCount}
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

const ASSET_DEBT: InfoFinancialSingleCardData = {
  name1: "ทรัพย์สิน",
  name2: "หนี้สิน",
  data1: [
    { type: "ทรัพย์สิน 1", value: [1e7, 5e6, 1e6] },
    { type: "ทรัพย์สิน 2", value: [1e7, 5e6, 1e6] },
  ],
  data2: [
    { type: "หนี้สิน 1", value: [3e6, 2e6, 1e6] },
    { type: "หนี้สิน 2", value: [3e6, 2e6, 1e6] },
  ],
};

const INCOME_EXPENSE: InfoFinancialSingleCardData = {
  name1: "รายได้",
  name2: "รายจ่าย",
  data1: [
    { type: "รายได้ 1", value: [3e6, 2e6, 1e6] },
    { type: "รายได้ 2", value: [3e6, 2e6, 1e6] },
  ],
  data2: [
    { type: "รายจ่าย 1", value: [1e7, 5e6, 1e6] },
    { type: "รายจ่าย 2", value: [1e7, 5e6, 1e6] },
  ],
};

const MAX = 4e7;
const SPOUSE_COUNT = 2;
const CHILD_COUNT = 1;

export default function InfoFinancialSection({ name }: { name: string }) {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

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
          <InfoFinancialDropdowns />
        </div>
        {/* การ์ดเงิน */}
        <div className="rounded-10 bg-white p-10 text-black">
          <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
            <Checkbox
              checked={showActor}
              setChecked={setShowActor}
              checkSrc="/icons/check-w.svg"
              className={{
                checkbox: "bg-black",
              }}
            >
              <span>ผู้ยื่น</span>
            </Checkbox>
            <Checkbox
              checked={showSpouse}
              setChecked={setShowSpouse}
              className={{
                checkbox: "bg-black-40",
              }}
            >
              <span>คู่สมรส</span>
            </Checkbox>
            <Checkbox
              checked={showChild}
              setChecked={setShowChild}
              className={{
                checkbox: "bg-black-20",
              }}
            >
              <span>บุตรที่ยังไม่บรรลุนิติภาวะ</span>
            </Checkbox>
          </div>
          <div className="py-5 mb-5 ml-10">
            <InfoFinanceDialog />
          </div>
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
          <div className="bg-gray-1 p-10">
            <div className="block b2 font-bold">การเสียภาษี</div>
            <section className="mb-10">
              <div className="block b3 font-bold mb-2">เงินได้พึงประเมิน</div>
              <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                <div className="w-80 bg-black" />
                <div className="w-80 bg-black opacity-40" />
              </div>
              <div className="flex pt-5">
                <div className="flex-1">
                  <span className="block b7 leading-1">ผู้ยื่น</span>
                  <span className="block b4">1.36</span>
                </div>
                <div className="opacity-80 flex-1 flex justify-center">
                  <div>
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">16.73</span>
                  </div>
                </div>
                <div className="text-right flex-1">
                  <span className="block b7 leading-1">
                    <span className="font-bold">รวม</span> (ล้านบาท)
                  </span>
                  <span className="block b4 font-bold">18.09</span>
                </div>
              </div>
            </section>
            <section className="border-t border-t-gray-4 pt-5">
              <div className="block b3 font-bold mb-5">เปรียบเทียบกับรายได้จริง</div>
              <div className="flex">
                <div className="b4 flex-1">
                  <span className="block leading-1">น้อยกว่า</span>
                  <span className="block">xx%</span>
                </div>
                <div className="opacity-80 b4 flex-1 flex justify-center">
                  <div>
                    <span className="block leading-1">น้อยกว่า</span>
                    <span className="block">xx%</span>
                  </div>
                </div>
                <div className="text-right b4 font-bold flex-1">
                  <span className="block leading-1">น้อยกว่า</span>
                  <span className="block">xx%</span>
                </div>
              </div>
            </section>
          </div>
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