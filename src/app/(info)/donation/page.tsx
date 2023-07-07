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
  //<----Mock Data---->
  //Page Global
  const YEARS = ["ทุกปี", "2566", "2565", "2564", "2563", "2562"];

  //For Party Section
  const totalPartyDonationAmount = [ //sum of donation each year
    {
      year: "2566",
      amount: 1000000,
    },
    {
      year: "2565",
      amount: 1000000,
    }
  ];
  const PartyDonation = [
    {
      name: "พลังประชารัฐ",
      img: "/icons/person.svg",
      color: "blue",
      year: "2566",
      receiveAmount: 800000,
    },
    {
      name: "พลังไทยดี",
      img: "/icons/person.svg",
      color: "red",
      year: "2566",
      receiveAmount: 200000,
    },
    {
      name: "เสรีรวมไทย",
      img: "/icons/person.svg",
      color: "yellow",
      year: "2565",
      receiveAmount: 500000,
    }
  ]

  //For individual section
  const DonationTypes = [
    "ทุกประเภท",
    "นิติบุคคล",
    "ตำเเหน่งทางการเมือง",
    "บุคคลทั่วไป",
    "สมาชิกสภาผู้แทนราษฏร"
  ];
  const individualDonors = [
    {
      name: "นาย สมชาย ใจดี",
      title: "สมาชิกสภาผู้แทนราษฏร",
      img: "/icons/person.svg",
      year: "2566",
      totalAmount: 1000000,
      donation: [
        {
          color: "blue",
          amount: 400000,
        },
        {
          color: "red",
          amount: 100000,
        },
        {
          color: "yellow",
          amount: 500000,
        },
      ]
    },
    {
      name: "บริษัท เที่ยวมั้ยหนู จำกัด",
      title: "นิติบุคคล",
      img: "/icons/person.svg",
      year: "2566",
      totalAmount: 1000000,
      donation: [
        {
          color: "blue",
          amount: 1000000,
        }
      ]
    },
    {
      name: "บริษัท โห่จาร จำกัด",
      title: "นิติบุคคล",
      img: "/icons/person.svg",
      year: "2565",
      totalAmount: 1000000,
      donation: [
        {
          color: "red",
          amount: 1000000,
        }
      ]
    }
  ]
  //<-------------->

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

  const [partySearch, setPartySearch] = React.useState({});
  const [partyFilterYear, setPartySortYear] = React.useState(YEARS[0]);

  const [individualSearch, setIndividualSearch] = React.useState({});
  const [individualFilterYear, setIndividualFilterYear] = React.useState(YEARS[0]);
  const [individualFilterType, setIndividualFilterType] = React.useState(DonationTypes[0]);

  //TODO: Ascending and Descending sort approach (consult with p'mumu)
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
          <Dropdown.Single
            data={YEARS}
            value={partyFilterYear}
            setValue={setPartySortYear}
          />
          <ChartSort name="party-donation-sort" />
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อพรรคการเมือง"
          data={PartyDonation}
          selected={partySearch}
          setSelected={setPartySearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {Object.keys(partySearch).length ? (
            <EntityBarCard
              name={partySearch.name}
              title=""
              color={partySearch.color}
              amount={partySearch.receiveAmount}
              maxAmount={totalPartyDonationAmount.filter(e => e.year.includes(partySearch.year))[0].amount}
              imgPath={partySearch.img}
            />
          ) : (
            PartyDonation.filter((d) => partyFilterYear !== "ทุกปี" ? d.year === partyFilterYear : d.year).map((party, index) => (
              <EntityBarCard
                name={party.name}
                title=""
                color={party.color}
                amount={party.receiveAmount}
                maxAmount={totalPartyDonationAmount.filter(e => e.year.includes(party.year))[0].amount}
                imgPath={party.img}
                key={index}
              />
            ))
          )
          }
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
          <Dropdown.Single
            data={DonationTypes}
            value={individualFilterType}
            setValue={setIndividualFilterType}
          />
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown.Single
            data={YEARS}
            value={individualFilterYear}
            setValue={setIndividualFilterYear}
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
          data={individualDonors}
          selected={individualSearch}
          setSelected={setIndividualSearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {
            Object.keys(individualSearch).length ? (
              <EntityStackedBarCard
                name={individualSearch.name}
                title={individualSearch.title}
                data={individualSearch.donation}
                maxAmount={individualSearch.totalAmount}
                imgPath={individualSearch.img}
              />
            ) : (
              individualDonors.filter((d) => individualFilterYear === "ทุกปี" && individualFilterType === "ทุกประเภท" ? true : individualFilterYear === "ทุกปี" && individualFilterType !== "ทุกประเภท" ? (d.title === individualFilterType) : individualFilterYear !== "ทุกปี" && individualFilterType === "ทุกประเภท" ? (d.year === individualFilterYear) : (d.year === individualFilterYear && d.title === individualFilterType)).map((individual, index) => (
                <EntityStackedBarCard
                  name={individual.name}
                  title={individual.title}
                  data={individual.donation}
                  maxAmount={individual.totalAmount}
                  imgPath={individual.img}
                  key={index}
                />
              ))
            )

          }
        </div>
      </section>
    </>
  );
}
