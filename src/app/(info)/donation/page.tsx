"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityBarCard from "@/components/EntityBarCard";
import EntityStackedBarCard from "@/components/EntityStackedBarCard";
import ImgCard from "@/components/ImgCard";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import SortByBtn from "@/components/SortByBtn";
import Image from "next/image";
import Link from "next/link";

//For Party Section
import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import _DONOR_DATA from "@data/donation/donor.json";
import _PARTY_DONATION from "@data/donation/partyPerYearWithTotal.json";

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

import type { CSSProperties } from "react";

const PARTY_DONATION = _PARTY_DONATION as any;
const DONOR_DATA = _DONOR_DATA as any;
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

const getFormalName = (donation_full_name: string) =>
  donation_full_name
    .replace(/ํา/g, "ำ")
    .replace(/บริษัท จำกัด \(มหาชน\)(.+)/g, "บริษัท $1 จำกัด (มหาชน)")
    .replace(/บริษัท จำกัด(.+)/g, "บริษัท $1 จำกัด")
    .replace("(มหาชน) จำกัด", "จำกัด (มหาชน)")
    .replace("หจก.", "ห้างหุ้นส่วนจำกัด ")
    .replace(/ห้างหุ้นส่วนจำกัด(.)/g, "ห้างหุ้นส่วนจำกัด $1")
    .replace(/\s+/g, " ")
    .trim();
const getFileName = (formal_name: string) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

const YEARS = Object.keys(PARTY_DONATION).reverse();
const DONATION_TYPES = [
  "ทุกประเภทบุคคล",
  ...new Set(DONOR_DATA.map((item: any) => item.title)),
] as string[];

// TODO: Manually Typing
type PartySearchSchema = (typeof PARTY_DONATION)[number];
type IndividualDonorSchema = (typeof DONOR_DATA)[number];

const removeNull = (element: any): element is Exclude<typeof element, null> => !!element;

const sortData = (data: any[], sortby: "asc" | "desc") =>
  sortby === "asc" ? [...data].reverse() : data;

export default function Donation() {
  const [partyView, setPartyView] = useState(5);
  const [individualView, setIndividualView] = useState(10);

  const [partySearch, setPartySearch] = useState<PartySearchSchema | null>(null);
  const [partyFilterYear, setPartySortYear] = useState(YEARS[0]);

  const [individualSearch, setIndividualSearch] = useState<IndividualDonorSchema | null>(
    null
  );
  const [individualFilterYear, setIndividualFilterYear] = useState(YEARS[0]);
  const [individualFilterType, setIndividualFilterType] = useState(DONATION_TYPES[0]);

  const selected_assets = PARTY_DONATION[partyFilterYear]
    .map((d: any) =>
      PARTY_ASSETS[d.party]?.color && PARTY_ASSETS[d.party]?.color != "#CCD8DD"
        ? {
            party: d.party,
            color: PARTY_ASSETS[d.party]?.color,
            image: PARTY_ASSETS[d.party]?.image,
          }
        : null
    )
    .filter(removeNull)
    .slice(0, 10);

  const [partySort, setPartySort] = useState<"asc" | "desc">("desc");
  const [individualSort, setIndividualSort] = useState<"asc" | "desc">("desc");

  const [displayTotal, displayUnit] = thaiMoneyFormatter(
    PARTY_DONATION[partyFilterYear].reduce(
      (a: number, c: { amount: number }) => a + c.amount,
      0
    )
  );

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
            <p className="font-black text-center h1">ดูข้อมูลเงินบริจากพรรคการเมือง</p>
          </div>
        </ImgCard>
        <p className="text-gray-5 b3 lg:b6 mt-20">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </p>

        <div
          id="parties"
          className="flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 h3"
        >
          <Image
            src="./icons/borrow.svg"
            width={60}
            height={60}
            alt="borrow"
            className="h-30 w-30 lg:h-60 lg:w-60"
          />
          พรรคที่ได้รับเงินบริจาค
        </div>
        <div className="flex flex-row items-center gap-10 my-10 lg:mb-20">
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown data={YEARS} value={partyFilterYear} setValue={setPartySortYear} />
          <SortByBtn sort={partySort} setSort={setPartySort} />
        </div>
        <p className="b2 my-20 text-center">
          <strong className="b4 block">
            ยอดบริจาคให้ {PARTY_DONATION[partyFilterYear].length} พรรคการเมือง รวม
          </strong>
          {formatThousands(displayTotal)} {displayUnit}
        </p>

        <Search
          className="lg:mb-20"
          placeholder="ค้นหาด้วยชื่อพรรคการเมือง"
          data={PARTY_DONATION[partyFilterYear].map((party: any) => ({
            name: party.party,
            ...party,
          }))}
          selected={partySearch}
          setSelected={setPartySearch}
        />
        <div className="flex flex-col items-center text-center b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {partySearch ? (
            <Link
              href={"/info/พรรค" + partySearch.name}
              className="block no-underline w-full"
            >
              <EntityBarCard
                name={partySearch.name}
                title=""
                color={PARTY_ASSETS[partySearch.name]?.color ?? "#fff"}
                amount={partySearch.amount}
                maxAmount={PARTY_DONATION[partyFilterYear][0].amount}
                imgPath={PARTY_ASSETS[partySearch.name]?.image ?? "/icons/person.svg"}
              />
            </Link>
          ) : (
            sortData(PARTY_DONATION[partyFilterYear], partySort)
              .slice(0, partyView)
              .map((party: any) => (
                <Link
                  href={"/info/พรรค" + party.party}
                  key={party.party}
                  className="block no-underline w-full"
                >
                  <EntityBarCard
                    name={party.party}
                    title=""
                    color={PARTY_ASSETS[party.party]?.color ?? "#fff"}
                    amount={party.amount}
                    maxAmount={PARTY_DONATION[partyFilterYear][0].amount}
                    imgPath={
                      PARTY_ASSETS[party.party]?.image ?? "/placeholders/party.png"
                    }
                  />
                </Link>
              ))
          )}
        </div>
        {partyView < PARTY_DONATION[partyFilterYear].length && (
          <button
            className="b4 text-gray-4 pb-20"
            onClick={() => {
              setPartyView((e) => e + 10);
            }}
          >
            + แสดงพรรคเพิ่มเติม
          </button>
        )}

        <div
          id="individuals"
          className="flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 h3"
        >
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
        <div className="flex flex-wrap items-center justify-center gap-10 my-10 lg:my-30 px-20">
          <div className="flex items-center gap-10">
            <p className="text-gray-4 b4 lg:b3">แสดง</p>
            <Dropdown
              data={DONATION_TYPES}
              value={individualFilterType}
              setValue={setIndividualFilterType}
            />
          </div>
          <div className="flex items-center gap-10">
            <p className="text-gray-4 b4 lg:b3">ในปี</p>
            <Dropdown
              data={YEARS}
              value={individualFilterYear}
              setValue={setIndividualFilterYear}
            />
          </div>
          <SortByBtn sort={individualSort} setSort={setIndividualSort} />
        </div>
        <div className="flex flex-col px-10 py-10 my-10 lg:my-30 border-1 rounded-5 border-gray-6 items-start w-[85vw] max-w-[800px]">
          <p className="b4 text-gray-3">สี = พรรค</p>
          <div className="flex gap-x-10 flex-wrap">
            {selected_assets.map((obj: any, index: number) => (
              <div key={index} className="flex justify-center items-center gap-5">
                <div
                  style={
                    {
                      backgroundColor: obj.color,
                    } as CSSProperties
                  }
                  className="w-8 h-8"
                  key={index}
                />
                <p className="text-gray-3 b4">{obj.party}</p>
              </div>
            ))}
            <div className="flex justify-center items-center gap-5">
              <div
                style={
                  {
                    backgroundColor: "#fff",
                  } as CSSProperties
                }
                className="w-8 h-8"
              />
              <p className="text-gray-3 b4">พรรคอื่น ๆ</p>
            </div>
          </div>
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อบุคคล/นิติบุคคล"
          data={DONOR_DATA}
          selected={individualSearch}
          setSelected={setIndividualSearch}
        />
        <div className="flex flex-col items-center text-center b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          {individualSearch ? (
            <Link
              href={
                "/info/" +
                (individualSearch.title === "นิติบุคคล"
                  ? getFileName(getFormalName(individualSearch.name))
                  : getFileName(individualSearch.name))
              }
              className="block no-underline w-full"
            >
              <EntityStackedBarCard
                name={individualSearch.name}
                title={individualSearch.title}
                data={individualSearch.donation}
                maxAmount={DONOR_DATA[0].total}
                imgPath="/icons/person.svg"
                assets={selected_assets}
              />
            </Link>
          ) : (
            sortData(DONOR_DATA, individualSort)
              .filter((items: any) =>
                individualFilterType === "ทุกประเภทบุคคล"
                  ? true
                  : items.title === individualFilterType
              )
              .slice(0, individualView)
              .map((individual: any, index: any, arr: any[]) => (
                <Link
                  href={
                    "/info/" +
                    (individual.title === "นิติบุคคล"
                      ? getFileName(getFormalName(individual.name))
                      : getFileName(individual.name))
                  }
                  className="block no-underline w-full"
                  key={index}
                >
                  <EntityStackedBarCard
                    name={individual.name}
                    title={individual.title}
                    data={individual.donation}
                    maxAmount={
                      DONOR_DATA.find((items: any) =>
                        individualFilterType === "ทุกประเภทบุคคล"
                          ? true
                          : items.title === individualFilterType
                      ).total
                    }
                    imgPath="/icons/person.svg"
                    assets={selected_assets}
                  />
                </Link>
              ))
          )}
        </div>
        {individualView < DONOR_DATA.length && (
          <button
            className="b4 text-gray-4 pb-20"
            onClick={() => {
              setIndividualView((e) => e + 10);
            }}
          >
            + แสดงผู้บริจาคเพิ่ม
          </button>
        )}
      </section>
    </>
  );
}
