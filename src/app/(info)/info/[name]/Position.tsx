"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityBarCard from "@/components/EntityBarCard";
import ImgCard from "@/components/ImgCard";
import InfoPopover from "@/components/Info/Popover";
import { PositionChart } from "@/components/Info/PositionChart";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import SortByBtn from "@/components/SortByBtn";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

import DATA_PEOPLE from "@/data/people_search.json";

const PEOPLE = DATA_PEOPLE.filter((e) => e.at(-1) === "|").map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link: "/info/" + link,
    title: position,
  };
});

const SUB_POSITION = ["ทุกตำแหน่ง", "นายกรัฐมนตรี", "รัฐมนตรี"];

export default function Position({ params }: { params: { name: string } }) {
  const position = params.name;

  const [subPositionShown, setSubPositionShown] = useState([...SUB_POSITION]);
  const [personSort, setPersonSort] = useState<"asc" | "desc">("desc");

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
        <Link
          href="/info"
          className="flex w-auto mr-auto ml-15 mt-10 gap-5 items-center b4 font-bold text-gray-4 lg:mt-20 lg:ml-20"
        >
          <Image
            className="w-auto h-[16px] rotate-90"
            src="/icons/arr-g.svg"
            width={18}
            height={16}
            alt=""
          />
          <span>สำรวจตามกลุ่มตำแหน่ง</span>
        </Link>
        <p className="h3 font-black text-white my-10 lg:my-20 lg:h2">{position}</p>
        <div className="text-center b6 lg:b5 pb-10 lg:pb-30 w-[90vw] lg:w-[70vw]">
          <Tab.Group>
            <Tab.List className="flex flex-row items-center justify-center">
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
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1.8 ล้านบาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="flex items-center gap-5 mb-5 text-center md:text-left">
                  <p>การกระจายตัวของคนในแต่ละช่วงทรัพย์สิน (%)</p>
                  <InfoPopover>
                    <p className="b5 no-balance">
                      บ่งบอกว่าคนในกลุ่มมีปริมาณทรัพย์สินอยู่ในช่วงไหนบ้าง
                    </p>
                  </InfoPopover>
                </div>
                <div className="-ml-10 -mr-10">
                  <PositionChart refValue={1801090.878} />
                </div>
                <p className="text-gray-5 b6">ปริมาณทรัพย์สิน (บาท)</p>
                <div className="flex flex-row items-center justify-center gap-10 my-10 lg:mb-20">
                  <p className="text-gray-4 b4 lg:b3">ดู</p>
                  <Dropdown
                    data={SUB_POSITION}
                    value={subPositionShown}
                    setValue={setSubPositionShown}
                    multiple
                  />
                  <SortByBtn sort={personSort} setSort={setPersonSort} />
                </div>
                <div className="mb-20 lg:mb-30">
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
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>0.2 ล้านบาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="flex items-center gap-5 mb-5 text-center md:text-left">
                  <p>การกระจายตัวของคนในแต่ละช่วงหนี้สิน (%)</p>
                  <InfoPopover>
                    <p className="b5 no-balance">
                      บ่งบอกว่าคนในกลุ่มมีปริมาณหนี้สินอยู่ในช่วงไหนบ้าง
                    </p>
                  </InfoPopover>
                </div>
                <div className="-ml-10 -mr-10">
                  <PositionChart refValue={205679} />
                </div>
                <p className="text-gray-5 b6">ปริมาณหนี้สิน (บาท)</p>
                <div className="flex flex-row items-center justify-center gap-10 my-10 lg:mb-20">
                  <p className="text-gray-4 b4 lg:b3">ในปี</p>
                  <Dropdown
                    data={SUB_POSITION}
                    value={subPositionShown}
                    setValue={setSubPositionShown}
                    multiple
                  />
                  <SortByBtn sort={personSort} setSort={setPersonSort} />
                </div>
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
