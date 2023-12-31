"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityStackedBarCard from "@/components/EntityStackedBarCard";
import Search from "@/components/Search";
import SortByBtn from "@/components/SortByBtn";
import Image from "next/image";
import Link from "next/link";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import DATA_PEOPLE from "@/data/people_search.json";
import _POLITICIAN_IMAGES from "@/data/politicianImages.json";
import _DONOR_DATA from "@data/donation/donor.json";
import _PARTY_DONATION from "@data/donation/partyPerYearWithTotal.json";

const POLITICIAN_IMAGES = _POLITICIAN_IMAGES as Record<string, string | null>;

const PEOPLE_POSITION = Object.fromEntries(
  DATA_PEOPLE.map((e) => e.split("|")).filter((e) => e[2] === "" && e[1])
);

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

const PARTY_DONATION = _PARTY_DONATION as any;
const DONOR_DATA = _DONOR_DATA as any;
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

const YEARS = Object.keys(PARTY_DONATION).reverse();
const DONATION_TYPES = ["ทุกประเภท", "บุคคล", "นิติบุคคล"];

type IndividualDonorSchema = (typeof DONOR_DATA)[number];

const sortData = (data: any[], sortby: "asc" | "desc") =>
  sortby === "asc" ? [...data].reverse() : data;

export function IndividualSection() {
  const [individualView, setIndividualView] = useState(10);

  const [individualSearch, setIndividualSearch] = useState<IndividualDonorSchema | null>(
    null
  );
  const [individualFilterYear, setIndividualFilterYear] = useState(YEARS[0]);
  const [individualFilterType, setIndividualFilterType] = useState(DONATION_TYPES[0]);

  const selected_assets = PARTY_DONATION["ทุกปี"].map((d: any) => ({
    party: d.party,
    color: PARTY_ASSETS[d.party]?.color ?? "#fff",
    image: PARTY_ASSETS[d.party]?.image,
  }));
  const [showAllPartyColor, setShowAllPartyColor] = useState(false);

  const [individualSort, setIndividualSort] = useState<"asc" | "desc">("desc");

  const donorResult = DONOR_DATA.filter((items: any) =>
    individualFilterType === "ทุกประเภท" ? true : items.title === individualFilterType
  );

  return (
    <>
      <div
        id="individuals"
        className="flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 h3"
      >
        <Image
          src="/icons/donate.svg"
          width={60}
          height={60}
          alt="borrow"
          className="h-30 w-30 lg:h-60 lg:w-60"
        />
        ผู้บริจาคเงิน
      </div>
      <p className="b6 text-gray-4">
        หมายเหตุ: แสดงข้อมูลตามเอกสารที่ถูกประกาศอยู่บน
        <a
          className="underline"
          href="https://www.ect.go.th/ect_th/th/db_119_ect_th_download_22"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          เว็บไซต์ของ กกต.
        </a>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 my-10 lg:my-30 px-20">
        <div className="flex items-center gap-10">
          <p className="text-gray-4 b4 lg:b3">แสดง</p>
          <Dropdown
            data={DONATION_TYPES}
            value={individualFilterType}
            setValue={(type) => {
              setIndividualFilterType(type);
              setIndividualView(10);
            }}
          />
        </div>
        <div className="flex items-center gap-10">
          <p className="text-gray-4 b4 lg:b3">ในปี</p>
          <Dropdown
            data={YEARS}
            value={individualFilterYear}
            setValue={(year) => {
              setIndividualFilterYear(year);
              setIndividualView(10);
            }}
          />
        </div>
        <SortByBtn sort={individualSort} setSort={setIndividualSort} />
      </div>
      <div className="flex flex-col px-10 py-10 my-10 lg:my-30 border-1 rounded-5 border-gray-6 items-start w-[85vw] max-w-[800px]">
        <p className="b4 text-gray-3">สี = พรรค</p>
        <div className="w-full xs:columns-2 sm:columns-3">
          {(showAllPartyColor ? selected_assets : selected_assets.slice(0, 10)).map(
            (obj: any) => (
              <div key={obj.party} className="flex items-center gap-5">
                <div
                  style={{
                    backgroundColor: obj.color,
                  }}
                  className="w-8 h-8"
                />
                <p className="text-gray-3 b4">{obj.party}</p>
              </div>
            )
          )}
          <button
            className="text-gray-3 b4 underline"
            type="button"
            onClick={() => setShowAllPartyColor((e) => !e)}
          >
            {showAllPartyColor ? "ซ่อน..." : "ดูทั้งหมด..."}
          </button>
        </div>
      </div>
      <Search
        placeholder="ค้นหาด้วยชื่อบุคคล/นิติบุคคล"
        data={DONOR_DATA}
        selected={individualSearch}
        setSelected={setIndividualSearch}
        unit="ราย"
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
              title={PEOPLE_POSITION[individualSearch.name.replace(/\s/g, "-")]}
              data={individualSearch.donation}
              maxAmount={DONOR_DATA[0].total}
              imgPath={
                POLITICIAN_IMAGES[individualSearch.name.replace(/\s/g, "-")] ||
                (individualSearch.title === "นิติบุคคล"
                  ? "/placeholders/business.webp"
                  : "/placeholders/person.webp")
              }
              assets={selected_assets}
            />
          </Link>
        ) : (
          sortData(donorResult, individualSort)
            .slice(0, individualView)
            .map((individual: any) => (
              <Link
                href={
                  "/info/" +
                  (individual.title === "นิติบุคคล"
                    ? getFileName(getFormalName(individual.name))
                    : getFileName(individual.name))
                }
                className="block no-underline w-full"
                key={individual.name}
              >
                <EntityStackedBarCard
                  name={individual.name}
                  title={PEOPLE_POSITION[individual.name.replace(/\s/g, "-")]}
                  data={individual.donation}
                  maxAmount={donorResult[0].total}
                  imgPath={
                    POLITICIAN_IMAGES[individual.name.replace(/\s/g, "-")] ||
                    (individual.title === "นิติบุคคล"
                      ? "/placeholders/business.webp"
                      : "/placeholders/person.webp")
                  }
                  assets={selected_assets}
                />
              </Link>
            ))
        )}
      </div>
      {individualView < donorResult.length && (
        <button
          className="b4 text-gray-4 pb-20"
          onClick={() => {
            setIndividualView((e) => e + 10);
          }}
        >
          + แสดงผู้บริจาคเพิ่ม
        </button>
      )}
    </>
  );
}
