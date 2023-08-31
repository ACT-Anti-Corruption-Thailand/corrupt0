"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityBarCard from "@/components/EntityBarCard";
import Search from "@/components/Search";
import SortByBtn from "@/components/SortByBtn";
import Image from "next/image";
import Link from "next/link";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import _PARTY_DONATION from "@data/donation/partyPerYearWithTotal.json";

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

type PartySearchSchema = (typeof PARTY_DONATION)[number];

const PARTY_DONATION = _PARTY_DONATION as any;
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;
const YEARS = Object.keys(PARTY_DONATION).reverse();

export const sortData = (data: any[], sortby: "asc" | "desc") =>
  sortby === "asc" ? [...data].reverse() : data;

export function PartySection() {
  const [partyView, setPartyView] = useState(5);
  const [partySearch, setPartySearch] = useState<PartySearchSchema | null>(null);
  const [partyFilterYear, setPartySortYear] = useState(YEARS[0]);

  const [partySort, setPartySort] = useState<"asc" | "desc">("desc");
  const [displayTotal, displayUnit] = thaiMoneyFormatter(
    PARTY_DONATION[partyFilterYear].reduce(
      (a: number, c: { amount: number }) => a + c.amount,
      0
    )
  );

  return (
    <>
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
        <Dropdown
          data={YEARS}
          value={partyFilterYear}
          setValue={(year) => {
            setPartySortYear(year);
            setPartyView(5);
          }}
        />
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
        unit="พรรค"
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
              imgPath={PARTY_ASSETS[partySearch.name]?.image ?? "/placeholders/party.png"}
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
                  imgPath={PARTY_ASSETS[party.party]?.image ?? "/placeholders/party.png"}
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
    </>
  );
}
