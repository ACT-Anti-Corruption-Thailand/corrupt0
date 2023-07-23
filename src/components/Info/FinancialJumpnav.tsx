import { formatMillion, formatThousands } from "@/functions/moneyFormatter";
import clsx from "clsx";
import Image from "next/image";

const f$ = (n: number) => formatThousands(formatMillion(n));

interface FinancialJumpnavProps {
  latestStatement: {
    year: number;
    รายได้: number;
    รายจ่าย: number;
    ทรัพย์สิน: number;
    หนี้สิน: number;
  };
}

const bgClass = {
  "=": "bg-value-positive-bg",
  ">": "bg-value-positive-bg",
  "<": "bg-value-negative-bg",
};

const textClass = {
  "=": "text-value-positive-text",
  ">": "text-value-positive-text",
  "<": "text-value-negative-text",
};

export function FinancialJumpnav({ latestStatement }: FinancialJumpnavProps) {
  const compareทรัพย์สินหนี้สิน =
    latestStatement.ทรัพย์สิน === latestStatement.หนี้สิน
      ? "="
      : latestStatement.ทรัพย์สิน > latestStatement.หนี้สิน
      ? ">"
      : "<";
  const compareรายได้รายจ่าย =
    latestStatement.รายได้ === latestStatement.รายจ่าย
      ? "="
      : latestStatement.รายได้ > latestStatement.รายจ่าย
      ? ">"
      : "<";

  return (
    <a className="block p-10 bg-black border-b border-b-gray-6" href="#financial">
      <span className="flex gap-5 items-center mb-5">
        <Image src="/icons/financial.svg" alt="" width={20} height={20} />
        <span>
          <span className="b4 font-bold">สถานะการเงินปี {latestStatement.year}</span>{" "}
          <span className="b7 text-gray-5">(ปีล่าสุดที่มีข้อมูลในระบบ)</span>
        </span>
        <Image
          className="ml-auto lg:-rotate-90"
          src="/icons/arr-g.svg"
          alt=""
          width={16}
          height={16}
        />
      </span>
      <div className="flex gap-2 flex-wrap">
        <div
          className={clsx(
            "flex-1 py-5 px-[7px] flex items-center gap-5 justify-center",
            bgClass[compareทรัพย์สินหนี้สิน],
            textClass[compareทรัพย์สินหนี้สิน]
          )}
        >
          <div className="flex flex-col items-center">
            <span className="opacity-60 b5 text-white">ทรัพย์สิน</span>
            <span className="b1 font-bold">{f$(latestStatement.ทรัพย์สิน)}</span>
            <span className="opacity-60 b6">ล้านบาท</span>
          </div>
          <span className="b5 font-bold">{compareทรัพย์สินหนี้สิน}</span>
          <div className="flex flex-col items-center">
            <span className="opacity-60 b5 text-white">หนี้สิน</span>
            <span className="b1 font-bold">{f$(latestStatement.หนี้สิน)}</span>
            <span className="opacity-60 b6">ล้านบาท</span>
          </div>
        </div>
        <div
          className={clsx(
            "flex-1 py-5 px-[7px] flex items-center gap-5 justify-center",
            bgClass[compareรายได้รายจ่าย],
            textClass[compareรายได้รายจ่าย]
          )}
        >
          <div className="flex flex-col items-center">
            <span className="opacity-60 b5 text-white">รายได้</span>
            <span className="b1 font-bold">{f$(latestStatement.รายได้)}</span>
            <span className="opacity-60 b6">ล้านบาท</span>
          </div>
          <span className="b5 font-bold">{compareรายได้รายจ่าย}</span>
          <div className="flex flex-col items-center">
            <span className="opacity-60 b5 text-white">รายจ่าย</span>
            <span className="b1 font-bold">{f$(latestStatement.รายจ่าย)}</span>
            <span className="opacity-60 b6">ล้านบาท</span>
          </div>
        </div>
      </div>
    </a>
  );
}
