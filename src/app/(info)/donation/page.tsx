"use client";

import React from "react";
import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import EntityBarCard from "@/components/EntityBarCard";
import Search from "@/components/Search";
import EntityStackedBarCard from "@/components/EntityStackedBarCard";

import ChartSort from "@/components/ChartSort";
import Dropdown from "@/components/Dropdown";

export default function Donation() {
  const YEARS = ["ทุกปี", "2566", "2565", "2564", "2563", "2562"];

  const people = [
    { id: 1, name: "Wade Cooper", title: "Regional Paradigm Technician" },
    { id: 2, name: "Arlene Mccoy", title: "Hello" },
    { id: 3, name: "Devon Webb", title: "jasf" },
    { id: 4, name: "Tom Cook", title: "asf" },
    { id: 5, name: "Tanya Fox", title: "asf" },
    { id: 6, name: "Hellen Schmidt", title: "asf" },
  ];

  const color = [
    {
      name: "พลังประชารัฐ",
      color: "blue",
    },
    {
      name: "พลังไทยดี",
      color: "red",
    },
    {
      name: "เสรีรวมไทย",
      color: "yellow",
    },
    {
      name: "เศรษฐกิจใหม่",
      color: "green",
    },
    {
      name: "ประชาธิปัตย์",
      color: "purple",
    },
    {
      name: "เพื่อไทย",
      color: "orange",
    },
    {
      name: "ประชาชาติ",
      color: "pink",
    },
    {
      name: "เพื่อแผ่นดิน",
      color: "brown",
    }
  ];

  const DonationTypes = [
    "ทุกประเภท",
    "นิติบุคคล",
    "ตำเเหน่งทางการเมือง",
    "บุคคลทั่วไป",
  ];

  const Party = [
    {
      color: "blue",
      amount: 1000000,
    },
    {
      color: "red",
      amount: 100000,
    },
    {
      color: "yellow",
      amount: 500000,
    },
  ];

  const [selected, setSelected] = React.useState("");
  const [partySortYear, setPartySortYear] = React.useState(YEARS[0]);
  const [IndividualSortYear, setIndividualSortYear] = React.useState(YEARS[0]);
  const [donationType, setDonationType] = React.useState(DonationTypes[0]);

  return (
    <>
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_donation.png">
          <div className="flex flex-col justify-center my-auto py-30 lg:mx-[15vw] xl:mx-[25vw] lg:p-[70px]">
            <Image
              className="self-center mb-10 h-[45px] lg:h-100"
              src="./icons/donate.svg"
              width={100}
              height={100}
              alt="financial"
            />
            <p className="font-black text-40 text-center lg:h1">
              ดูข้อมูลเงินบริจากพรรคการเมือง
            </p>
          </div>
        </ImgCard>
        <p className="text-gray-5 text-18 mt-10 lg:mt-30">
          อัพเดทข้อมูลเมื่อวันที่ 00/00/2556
        </p>
        <div className="flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 text-24 lg:h3">
          <Image
            src="./icons/borrow.svg"
            width={60}
            height={60}
            alt="borrow"
            className="h-30 w-30 lg:h-60 lg:w-60"
          />
          พรรคที่ได้รับเงินบริจาค
        </div>
        <div className="flex flex-row items-center gap-10 my-10 lg:my-30">
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown
            data={YEARS}
            value={partySortYear}
            setValue={setPartySortYear}
          />
          <ChartSort name="party-donation-sort" />
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อพรรคการเมือง"
          data={people}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {/* TODO: New component named PartyCard */}
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
        <div className="flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 text-24 lg:h3">
          <Image
            src="./icons/donate.svg"
            width={60}
            height={60}
            alt="borrow"
            className="h-30 w-30 lg:h-60 lg:w-60"
          />
          ผู้บริจาคเงิน
        </div>
        <p className="b6 text-gray-4">
          หมายเหตุ: แสดงเฉพาะยอดบริจากที่เกิน 5,000 บาท
        </p>
        <div className="flex flex-row items-center gap-10 my-10 lg:my-30">
          <p className="text-gray-4 b4 lg:b3">แสดง</p>
          <Dropdown
            data={DonationTypes}
            value={donationType}
            setValue={setDonationType}
          />
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown
            data={YEARS}
            value={IndividualSortYear}
            setValue={setIndividualSortYear}
          />
          <ChartSort name="individual-donation-sort" />
        </div>
        <div className="flex flex-col px-10 py-10 my-10 lg:my-30 border-1 rounded-5 border-gray-6 items-start w-[85vw] max-w-[800px]">
          <p className="b4 text-gray-3">สี = พรรค</p>
          <div className="flex gap-10 flex-wrap">
            {color.map((item, index) => (
              <div className="flex justify-center items-center gap-5">
                <div
                  style={
                    {
                      backgroundColor: item.color,
                    } as React.CSSProperties
                  }
                  className="w-8 h-8"
                  key={index}
                />
                <p className="text-gray-3 b4">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อบุคคล/นิติบุคคล"
          data={people}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          <EntityStackedBarCard
            name="พลังประชารัฐ"
            title=""
            data={Party}
            maxAmount={2000000}
            imgPath="/icons/person.svg"
          />
        </div>
      </section>
    </>
  );
}
