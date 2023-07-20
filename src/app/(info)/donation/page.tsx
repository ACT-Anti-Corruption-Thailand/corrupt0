"use client";

import React from "react";
import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import EntityBarCard from "@/components/EntityBarCard";
import Search from "@/components/Search";
import EntityStackedBarCard from "@/components/EntityStackedBarCard";

import ChartSort from "@/components/ChartSort";
import Dropdown from "@/components/Dropdown";

//For Party Section
import _PARTY_DONATION_Test from "@data/donation/partyPerYearWithTotal.json";
import _PARTY_TOTAL_DONATION from "@data/donation/totalPerYearWithTotal.json";
import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import _DONOR_DATA from "@data/donation/donor.json";

const PARTY_DONATION_Test = _PARTY_DONATION_Test as any;
const PARTY_TOTAL_DONATION = _PARTY_TOTAL_DONATION as any;
const DONOR_DATA = _DONOR_DATA as any;
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

const YEARS = Object.keys(PARTY_DONATION_Test).reverse();
const DONATION_TYPES = ["ทุกกลุ่มตำแหน่ง", ...new Set(DONOR_DATA.map((item: any) => item.title))] as string[];

// TODO: Manually Typing
type PartySearchSchema = (typeof PARTY_DONATION_Test)[number];
type IndividualDonorSchema = (typeof DONOR_DATA)[number];


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
          data={PARTY_DONATION_Test[partyFilterYear].map((party: any) => ({ name: party.party, ...party }))}
          selected={partySearch}
          setSelected={setPartySearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {partySearch ? (
            <EntityBarCard
              name={partySearch.name}
              title=""
              color={PARTY_ASSETS[partySearch.name]?.color ?? "#fff"}
              amount={partySearch.amount}
              maxAmount={PARTY_TOTAL_DONATION[partyFilterYear][0].total}
              imgPath={PARTY_ASSETS[partySearch.name]?.image ?? "/icons/person.svg"}
            />
          ) : (
            PARTY_DONATION_Test[partyFilterYear].filter((item: any, idx: any) => idx < 10).map((party: any, index: number) => (
              <EntityBarCard
                name={party.party}
                title=""
                color={PARTY_ASSETS[party.party]?.color ?? "#fff"}
                amount={party.amount}
                maxAmount={PARTY_TOTAL_DONATION[partyFilterYear][0].total}
                imgPath={PARTY_ASSETS[party.party]?.image ?? "/icons/person.svg"}
                key={index}
              />
            ))
          )}
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
            {
              PARTY_DONATION_Test["ทุกปี"].map((d: any, index: number) => PARTY_ASSETS[d.party]?.color && PARTY_ASSETS[d.party]?.color != "#CCD8DD" ? (
                <div key={index} className="flex justify-center items-center gap-5">
                  <div
                    style={
                      {
                        backgroundColor: PARTY_ASSETS[d.party].color,
                      } as React.CSSProperties
                    }
                    className="w-8 h-8"
                    key={index}
                  />
                  <p className="text-gray-3 b4">{d.party}</p>
                </div>
              ) : (<></>))
            }
            <div className="flex justify-center items-center gap-5">
                  <div
                    style={
                      {
                        backgroundColor: "#fff",
                      } as React.CSSProperties
                    }
                    className="w-8 h-8"
                  />
                  <p className="text-gray-3 b4">พรรคอื่น ๆ</p>
                </div>
            {/* {Object.entries(PARTY_ASSETS).map(([name, { color }], index: number) => (
              <div key={index} className="flex justify-center items-center gap-5">
                <div
                  style={
                    {
                      backgroundColor: color ?? "#fff",
                    } as React.CSSProperties
                  }
                  className="w-8 h-8"
                  key={index}
                />
                <p className="text-gray-3 b4">{name}</p>
              </div>
            ))} */}
          </div>
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อบุคคล/นิติบุคคล"
          data={DONOR_DATA}
          selected={individualSearch}
          setSelected={setIndividualSearch}
        />
        <div className="flex flex-col items-center text-center text-18 lg:b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {individualSearch ? (
            <EntityStackedBarCard
              name={individualSearch.name}
              title={individualSearch.title}
              data={individualSearch.donation}
              maxAmount={DONOR_DATA[0].total}
              imgPath="/icons/person.svg"
            />
          ) : (
            DONOR_DATA.filter((items: any) => individualFilterType === "ทุกกลุ่มตำแหน่ง" ? true : items.title === individualFilterType).filter((item: any, idx: any) => idx < 10).map((individual: any, index: any) => (
              <EntityStackedBarCard
                name={individual.name}
                title={individual.title}
                data={individual.donation}
                maxAmount={DONOR_DATA[0].total}
                imgPath="/icons/person.svg"
                key={index}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
