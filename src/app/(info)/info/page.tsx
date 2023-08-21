import ImgCard from "@/components/ImgCard";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Image from "next/image";
import MainTab from "@/components/Info/MainTab";

import { openGraph, twitter } from "@/app/layout";
import DATA_PEOPLE from "@/data/people_search.json";

import type { Metadata } from "next";

const PEOPLE = DATA_PEOPLE.filter((e) => e.at(-1) === "|").map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link: "/info/" + link,
    title: position,
  };
});

export const metadata: Metadata = {
  title: "ข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ | Corrupt0 — ACT Ai",
  openGraph: {
    ...openGraph,
    title: "ข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ | Corrupt0 — ACT Ai",
  },
  twitter: {
    ...twitter,
    title: "ข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ | Corrupt0 — ACT Ai",
  },
};

export default function Info() {
  return (
    <>
      <Navbar
        back={{
          href: "/",
          text: "หน้าหลัก",
        }}
      />
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_politician.png" className="w-full">
          <div className="flex flex-col justify-center my-auto py-30 lg:mx-[20vw] lg:p-[70px]">
            <Image
              className="self-center mb-10 h-[45px] lg:h-100"
              src="./icons/financial.svg"
              width={100}
              height={100}
              alt="financial"
            />
            <p className="text-center h1">ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ</p>
          </div>
        </ImgCard>
        <p className="text-gray-5 b3 lg:b6 mt-20">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </p>
        <Search placeholder="ค้นหาด้วยชื่อ/นามสกุล" data={PEOPLE} />
        <div className="w-[90vw] border-1 border-gray-4 lg:mt-20 lg:w-full" />
        <p className="h3 font-black text-white mt-15 mb-10 lg:mt-30 lg:mb-20 lg:h2">
          สำรวจตามกลุ่มตำแหน่ง
        </p>
        <div className="flex flex-col items-center text-center b6 lg:b5 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          <MainTab />
        </div>
      </section>
    </>
  );
}
