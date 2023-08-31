import ImgCard from "@/components/ImgCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { IndividualSection } from "@/components/Donation/IndividualSection";
import { PartySection } from "@/components/Donation/PartySection";

import { openGraph, twitter } from "@/app/layout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อมูลเงินบริจาคพรรคการเมือง | Corrupt0 — ACT Ai",
  openGraph: {
    ...openGraph,
    title: "ข้อมูลเงินบริจาคพรรคการเมือง | Corrupt0 — ACT Ai",
  },
  twitter: {
    ...twitter,
    title: "ข้อมูลเงินบริจาคพรรคการเมือง | Corrupt0 — ACT Ai",
  },
};

export default function Donation() {
  return (
    <>
      <Navbar
        back={{
          href: "/",
          text: "หน้าหลัก",
        }}
      />
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_donation.png" className="w-full">
          <div className="flex flex-col justify-center my-auto py-30 lg:mx-[15vw] lg:p-[70px]">
            <Image
              className="self-center mb-10 h-[45px] lg:h-100"
              src="./icons/donate.svg"
              width={100}
              height={100}
              alt="financial"
            />
            <p className="font-black text-center h1">ดูข้อมูลเงินบริจาคพรรคการเมือง</p>
          </div>
        </ImgCard>
        <p className="text-gray-5 b3 lg:b6 mt-20">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </p>

        <PartySection />
        <IndividualSection />
      </section>
    </>
  );
}
