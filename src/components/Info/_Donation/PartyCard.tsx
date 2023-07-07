import Image from "next/image";
import Accordion from "../../Accordion";
import Link from "next/link";

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

import type { CSSProperties } from "react";

export interface DonationStatement {
  date: string;
  amount: number;
}

interface InfoDonationPartyCardProps {
  name: string;
  color: string;
  isTop10: boolean;
  statements: DonationStatement[];
}

export default function InfoDonationPartyCard({
  name,
  color,
  isTop10,
  statements,
}: InfoDonationPartyCardProps) {
  const [totalAmount, totalUnit] = thaiMoneyFormatter(
    statements.reduce((a, c) => a + c.amount, 0)
  );

  return (
    <Accordion
      className="bg-white-10 py-5 px-10 rounded-5"
      trigger={
        <div className="text-left flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Image
              className="border border-black rounded-full"
              src="/placeholders/party.png"
              alt=""
              width={25}
              height={25}
            />
            <span className="b2 font-bold">{name}</span>
            <Link href={`/info/พรรค${name}`} target="_blank">
              <Image src="/icons/new_tab.svg" alt="ดูข้อมูลพรรค" width={15} height={15} />
            </Link>
            <Image
              className="ui-open:rotate-180 ml-auto"
              src="/icons/caret-g.svg"
              width={12}
              height={12}
              alt=""
            />
          </div>
          <hr
            className="border-t-[3px] border-t-[--color] mb-5"
            style={{ "--color": color } as CSSProperties}
          />
          {isTop10 && (
            <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
              1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
            </div>
          )}
          <div className="flex gap-5 items-baseline leading-1 b4 -mt-5">
            <span className="font-bold">รวมยอดบริจาค</span>
            <span className="font-bold b1 ml-auto">{formatThousands(totalAmount)}</span>
            <span>{totalUnit}</span>
          </div>
          <div className="flex gap-5 items-baseline leading-1 b4 -mt-10">
            <span className="font-bold">บริจาคจำนวน</span>
            <span className="font-bold b1 ml-auto">{statements.length}</span>
            <span>ครั้ง</span>
          </div>
        </div>
      }
    >
      <div className="border-t border-t-gray-6 pt-5 mt-4">
        <div className="flex justify-between items-baseline b5 text-gray-5 -mb-4">
          <span>วันที่บริจาค</span>
          <span>จำนวน (บาท)</span>
        </div>
        {statements.map(({ date, amount }, i) => (
          <div className="flex justify-between items-baseline -mb-4" key={i}>
            <span className="b6 font-bold">{date}</span>
            <span className="b3">{formatThousands(amount)}</span>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
