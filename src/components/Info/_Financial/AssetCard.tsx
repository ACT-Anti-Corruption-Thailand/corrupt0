"use client";
import Image from "next/image";
import Link from "next/link";

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

const ICONS: Record<string, string> = {
  เงินสด: "/icons/cash.svg",
  เงินฝาก: "/icons/saving.svg",
  เงินลงทุน: "/icons/invest.svg",
  เงินให้กู้ยืม: "/icons/borrow.svg",
  ที่ดิน: "/icons/land.svg",
  โรงเรือนและสิ่งปลูกสร้าง: "/icons/building.svg",
  ยานพาหนะ: "/icons/vehicle.svg",
  สิทธิและสัมปทาน: "/icons/concession.svg",
  ทรัพย์สินอื่น: "/icons/valuable.svg",
};

export interface TopPropertyData {
  name: string;
  value: number;
  baseCatg: string;
}

interface TopAssetCardProps {
  name: string;
  year1: string | number;
  property1: TopPropertyData;
  year2?: string | number;
  property2?: TopPropertyData;
}

export function TopAssetCard({
  name,
  year1,
  property1,
  year2,
  property2,
}: TopAssetCardProps): JSX.Element {
  const [p1price, p1unit] = thaiMoneyFormatter(property1?.value ?? 0);
  const [p2price, p2unit] = property2
    ? thaiMoneyFormatter(property2?.value ?? 0)
    : [null, null];

  return (
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
        {year2 && property2 ? (
          <div className="flex gap-5 items-stretch text-black">
            <div className="flex-1 flex flex-col gap-5 justify-center items-center">
              <span className="b3">{year1}</span>
              {property1 && (
                <Image src={ICONS[property1.baseCatg]} alt="" width={40} height={40} />
              )}
              <span className="b5">{property1?.name ?? "ไม่มีข้อมูล"}</span>
              {property1 && (
                <span className="b3 font-bold -mt-5">
                  {formatThousands(p1price)} {p1unit}
                </span>
              )}
            </div>
            <div className="w-1 bg-gray-4" />
            <div className="flex-1 flex flex-col gap-5 justify-center items-center">
              <span className="b3">{year2}</span>
              {property2 && (
                <Image src={ICONS[property2.baseCatg]} alt="" width={40} height={40} />
              )}
              <span className="b5">{property2?.name ?? "ไม่มีข้อมูล"}</span>
              {property2 && (
                <span className="b3 font-bold -mt-5">
                  {p2price && formatThousands(p2price)} {p2unit}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-5 items-start">
            {property1 && (
              <Image src={ICONS[property1.baseCatg]} alt="" width={40} height={40} />
            )}
            <div className="flex-1 text-black">
              <span className="block b5">{property1?.name ?? "ไม่มีข้อมูล"}</span>
              {property1 && (
                <span className="block b3 font-bold">
                  {formatThousands(p1price)} {p1unit}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
