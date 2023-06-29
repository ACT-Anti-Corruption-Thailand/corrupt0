"use client";

import React from "react";
import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import GraphCard from "@/components/GraphCard";
import Search from "@/components/Search";

export default function Individual() {
  const [selected, setSelected] = React.useState("");

  const people = [
    { id: 1, name: "Wade Cooper", title: "Regional Paradigm Technician" },
    { id: 2, name: "Arlene Mccoy", title: "Hello" },
    { id: 3, name: "Devon Webb", title: "jasf" },
    { id: 4, name: "Tom Cook", title: "asf" },
    { id: 5, name: "Tanya Fox", title: "asf" },
    { id: 6, name: "Hellen Schmidt", title: "asf" },
  ];
  
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
        <p className="text-gray-5 text-18 mt-20">
          อัพเดทข้อมูลเมื่อวันที่ 00/00/2556
        </p>
        <Search placeholder="ค้นหาด้วยชื่อ/นามสกุล" data={people} selected={people[0]} setSelected={setSelected} />
        <div className="w-[85vw] border-1 border-gray-4" />
        <p className="text-30 font-black text-white my-15">
          สำรวจตามกลุ่มตำแหน่ง
        </p>
        <div className="flex flex-col items-center text-center text-18">
          <Tab.Group>
            <Tab.List className="flex flex-row items-center">
              <p className="text-gray-4 mr-10 bg-black">เเสดงข้อมูล</p>
              <div className="text-gray-4 bg-gray-6 rounded-5">
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20">
                  ทรัพย์สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20">
                  หนี้สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20">
                  ทั้งคู่
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <div className="flex flex-row items-center justify-center my-10 text-act">
                <div className="w-20 border-1 border-dashed mr-5" />
                <p>ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2562 = 1.64 ล้านบาท</p>
              </div>
              <Tab.Panel>
                {/* ทรัพย์สิน */}
                <div className="flex flex-row items-center justify-around py-10 text-gray-4 border-t-1 border-gray-6">
                  <p>กลุ่มตำแหน่ง</p>
                  <p>การกระจายตัว</p>
                  <p>สูงสุด - ต่ำสุด</p>
                </div>
                <GraphCard
                  title="นายกรัฐมนตรีและรัฐมนตรี"
                  number="xxx คน"
                  max="xxx ล้านบาท"
                  min="xxx ล้านบาท"
                />
                <GraphCard
                  title="สมาชิกสภาผู้แทนราษฎร"
                  number="491 คน"
                  max="474,816.92 ล้านบาท"
                  min="5,064 บาท"
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* หนี้สิน */}
                <div className="flex flex-row items-center justify-around py-10 text-gray-4 border-t-1 border-gray-6">
                  <p>กลุ่มตำแหน่ง</p>
                  <p>การกระจายตัว</p>
                  <p>สูงสุด - ต่ำสุด</p>
                </div>
                <GraphCard
                  title="นายกรัฐมนตรีและรัฐมนตรี"
                  number="xxx คน"
                  max="xxx ล้านบาท"
                  min="xxx ล้านบาท"
                />
                <GraphCard
                  title="สมาชิกสภาผู้แทนราษฎร"
                  number="491 คน"
                  max="474,816.92 ล้านบาท"
                  min="5,064 บาท"
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* ทั้งคู่ Scatterplot */}


              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
}
