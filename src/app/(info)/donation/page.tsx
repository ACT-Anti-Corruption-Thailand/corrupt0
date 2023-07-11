"use client";

import React from "react";
import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import EntityBarCard from "@/components/EntityBarCard";
import Search from "@/components/Search";
import EntityStackedBarCard from "@/components/EntityStackedBarCard";

import ChartSort from "@/components/ChartSort";
import Dropdown from "@/components/Dropdown";

//<----Mock Data---->
//Page Global
const YEARS = ["ทุกปี", "2566", "2565", "2564", "2563", "2562"];

//For Party Section
import PARTY_DONATION_Test from "@data/donation/partyPerYearWithTotal.json";
import PARTY_TOTAL_DONATION from "@data/donation/totalPerYearWithTotal.json"
import PARTY_COLOR from "@data/color/partyAssets.json";

const PARTY_DONATION = [
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
  },
];
// TODO: Manually Typing
type PartySearchSchema = (typeof PARTY_DONATION)[number];

//For individual section
const DONATION_TYPES = [
  "ทุกประเภท",
  "นิติบุคคล",
  "ตำเเหน่งทางการเมือง",
  "บุคคลทั่วไป",
  "สมาชิกสภาผู้แทนราษฏร",
];

const INDIVIDUAL_DONORS = [
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
    ],
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
      },
    ],
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
      },
    ],
  },
];
// TODO: Manually Typing
type IndividualDonorSchema = (typeof INDIVIDUAL_DONORS)[number];


export default function Donation() {
  const [partySearch, setPartySearch] = React.useState<PartySearchSchema | null>(null);
  const [partyFilterYear, setPartySortYear] = React.useState(YEARS[0]);

  const [individualSearch, setIndividualSearch] =
    React.useState<IndividualDonorSchema | null>(null);
  const [individualFilterYear, setIndividualFilterYear] = React.useState(YEARS[0]);
  const [individualFilterType, setIndividualFilterType] = React.useState(
    DONATION_TYPES[0]
  );

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
          <Dropdown data={YEARS} value={partyFilterYear} setValue={setPartySortYear} />
          <ChartSort name="party-donation-sort" />
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อพรรคการเมือง"
          data={PARTY_DONATION}
          selected={partySearch}
          setSelected={setPartySearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {
            partySearch ? (
              <div>Search</div>
          ) : (
            PARTY_DONATION_Test[partyFilterYear].map((party, index) => (
              <EntityBarCard
                name={party.party}
                title=""
                color={PARTY_COLOR.find((d) => d.Name === party.party)?.Color ?? "#ffffff"}
                amount={party.amount}
                maxAmount={PARTY_TOTAL_DONATION[partyFilterYear][0].total}
                imgPath={PARTY_COLOR.find((d) => d.Name === party.party)?.Images[0].url ?? "/icons/person.svg"}
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
        <p className="b6 text-gray-4">หมายเหตุ: แสดงเฉพาะยอดบริจากที่เกิน 5,000 บาท</p>
        <div className="flex flex-row items-center gap-10 my-10 lg:my-30">
          <p className="text-gray-4 b4 lg:b3">แสดง</p>
          <Dropdown
            data={DONATION_TYPES}
            value={individualFilterType}
            setValue={setIndividualFilterType}
          />
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown
            data={YEARS}
            value={individualFilterYear}
            setValue={setIndividualFilterYear}
          />
          <ChartSort name="individual-donation-sort" />
        </div>
        <div className="flex flex-col px-10 py-10 my-10 lg:my-30 border-1 rounded-5 border-gray-6 items-start w-[85vw] max-w-[800px]">
          <p className="b4 text-gray-3">สี = พรรค</p>
          <div className="flex gap-10 flex-wrap">
            {PARTY_COLOR.map((item, index) => (
              <div key={index} className="flex justify-center items-center gap-5">
                <div
                  style={
                    {
                      backgroundColor: item.Color,
                    } as React.CSSProperties
                  }
                  className="w-8 h-8"
                  key={index}
                />
                <p className="text-gray-3 b4">{item.Name}</p>
              </div>
            ))}
          </div>
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อบุคคล/นิติบุคคล"
          data={INDIVIDUAL_DONORS}
          selected={individualSearch}
          setSelected={setIndividualSearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {individualSearch ? (
            <EntityStackedBarCard
              name={individualSearch.name}
              title={individualSearch.title}
              data={individualSearch.donation}
              maxAmount={individualSearch.totalAmount}
              imgPath={individualSearch.img}
            />
          ) : (
            INDIVIDUAL_DONORS.filter((d) =>
              individualFilterYear === "ทุกปี" && individualFilterType === "ทุกประเภท"
                ? true
                : individualFilterYear === "ทุกปี" && individualFilterType !== "ทุกประเภท"
                ? d.title === individualFilterType
                : individualFilterYear !== "ทุกปี" && individualFilterType === "ทุกประเภท"
                ? d.year === individualFilterYear
                : d.year === individualFilterYear && d.title === individualFilterType
            ).map((individual, index) => (
              <EntityStackedBarCard
                name={individual.name}
                title={individual.title}
                data={individual.donation}
                maxAmount={individual.totalAmount}
                imgPath={individual.img}
                key={index}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
