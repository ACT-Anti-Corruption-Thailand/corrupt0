"use client";
import EntityBarCard from "@/components/EntityBarCard";
import ImgCard from "@/components/ImgCard";
import InfoPopover from "@/components/Info/Popover";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import DATA_PEOPLE from "@/data/people_search.json";

import { moneyFormatter } from "@/functions/moneyFormatter";

const PEOPLE = DATA_PEOPLE.map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link: "/info/" + link,
    title: position,
  };
});

const DATA = [
  {
    name: 1000000,
    amount: 2,
  },
  {
    name: 4234567,
    amount: 13,
  },
  {
    name: 5000000,
    amount: 8,
  },
];

export default function Position({ params }: { params: { name: string } }) {
  const position = params.name;

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
              src="../icons/financial.svg"
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
          {position}
        </p>
        <div className="flex flex-col items-center text-center b6 lg:b5 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          <Tab.Group>
            <Tab.List className="flex flex-row items-center">
              <p className="text-gray-4 mr-10 bg-black ">เเสดงข้อมูล</p>
              <div className="text-gray-4 bg-gray-6 rounded-5">
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20 outline-none">
                  ทรัพย์สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20 outline-none">
                  หนี้สิน
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {/* ทรัพย์สิน */}
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1.8 ล้านบาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="w-[90vw] lg:w-[70vw] h-[270px] grow-[2] mx-auto">
                  <ResponsiveContainer>
                    <BarChart data={DATA}>
                      <CartesianGrid fill="white" fillOpacity={0.1} />
                      <ReferenceLine
                        x={1801090.878}
                        stroke="#EC1C24"
                        isFront={true}
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        type="number"
                        dataKey="name"
                        fill="3F3F3F"
                        domain={["auto", "auto"]}
                        tickFormatter={moneyFormatter}
                      />
                      <Bar dataKey="amount" fill="#fff" minPointSize={1} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-5 b6">ปริมาณทรัพย์สิน (บาท)</p>
                <div className="mb-20 lg:mb-30 w-[90vw] lg:w-[70vw]">
                  <EntityBarCard
                    name="สุชาติ ภิญโญ"
                    title="สมาชิกวุฒิสภา"
                    color="white"
                    amount={1637239}
                    maxAmount={10000000}
                    imgPath="/icons/person.svg"
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {/* หนี้สิน */}
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>205,679 บาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="w-[90vw] lg:w-[70vw] h-[270px] grow-[2] mx-auto">
                  <ResponsiveContainer>
                    <BarChart data={DATA}>
                      <CartesianGrid fill="white" fillOpacity={0.1} />
                      <ReferenceLine
                        x={205679}
                        stroke="#EC1C24"
                        isFront={true}
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        type="number"
                        dataKey="name"
                        fill="3F3F3F"
                        domain={["auto", "auto"]}
                        tickFormatter={moneyFormatter}
                      />
                      <Bar dataKey="amount" fill="#fff" minPointSize={1} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-5 b6">ปริมาณหนี้สิน (บาท)</p>
                <div className="mb-20 lg:mb-30 w-[90vw] lg:w-[70vw]">
                  <EntityBarCard
                    name="สุชาติ ภิญโญ"
                    title="สมาชิกวุฒิสภา"
                    color="white"
                    amount={1637239}
                    maxAmount={10000000}
                    imgPath="/icons/person.svg"
                  />
                  <EntityBarCard
                    name="สุชาติ ภิญโญ"
                    title="สมาชิกวุฒิสภา"
                    color="white"
                    amount={1637239}
                    maxAmount={10000000}
                    imgPath="/icons/person.svg"
                  />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
}
