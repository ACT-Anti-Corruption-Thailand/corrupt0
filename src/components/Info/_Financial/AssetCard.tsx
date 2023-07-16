"use client";
import Image from "next/image";
import Link from "next/link";

interface AssetSingleCardProps {
  name: string;
}

export function AssetSingleCard({ name }: AssetSingleCardProps) {
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
        <div className="flex gap-5 items-start">
          <Image src="/icons/placeholder.svg" alt="" width={40} height={40} />
          <div className="flex-1 text-black">
            <span className="block b5">ห้องชุดเพนท์เฮาส์</span>
            <span className="block b3 font-bold">92.12 ล้านบาท</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
