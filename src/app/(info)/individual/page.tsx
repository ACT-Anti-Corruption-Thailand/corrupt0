'use client'

import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Link from "next/link";

export default function Individual() {
  return (
    <>
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_politician.png">
          <Image
            className="self-center mb-10 mt-30"
            src="./icons/financial.svg"
            width={45}
            height={45}
            alt="financial"
          />
          <p className="font-black text-40 text-center mb-30">
            ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ
          </p>
        </ImgCard>
        <p className="text-gray-5 text-18 mt-20 mb-10">
          อัพเดทข้อมูลเมื่อวันที่ 00/00/2556
        </p>
        <div>Search</div>
        <div className="w-[85vw] border-1 border-gray-4" />
        <p className="text-30 font-black text-white my-15">
          สำรวจตามกลุ่มตำแหน่ง
        </p>
        <div className="flex flex-row">
          <p className="text-18 text-gray-4">เเสดงข้อมูล</p>
          <Tab.Group>
            <Tab.List className="bg-gray-6 rounded-5 text-gray-4">
              <Tab>ทรัพย์สิน</Tab>
              <Tab>หนี้สิน</Tab>
              <Tab>ทั้งคู่</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
}
