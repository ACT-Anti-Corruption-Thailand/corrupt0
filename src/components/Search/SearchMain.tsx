"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";

import Image from "next/image";
import { RadioGroup } from "@headlessui/react";

import DATA_PEOPLE from "@/data/people_search.json";
import DATA_PARTY from "@/data/parties.json";
import DATA_BUSINESS from "@/data/businesses.json";
import POLITICIAN_IMAGES from "@/data/politicianImages.json";
import PARTY_ASSETS from "@/data/color/partyAssets.json";
import PARTY_DONATION from "@/data/donation/partyPerYearWithTotal.json";
import BUSINESS_DONATION from "@/data/donation/donor.json";
import TOP_INCOME_ASSETS from "@/data/top_income_assets.json";

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const PEOPLE = DATA_PEOPLE.map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link,
    position,
    image: (POLITICIAN_IMAGES as Record<string, string | null>)[link],
  };
});
const PARTIES = DATA_PARTY.map((e) => ({
  name: e.replace("พรรค", ""),
  link: e,
  image: (PARTY_ASSETS as Record<string, { color: string | null; image: string | null }>)[
    e.replace("พรรค", "")
  ]?.image,
}));
const BUSINESSES = DATA_BUSINESS.map((e) => ({
  name: e.replace(/-/g, " "),
  link: e,
}));

const SEARCH_GROUP = ["ทั้งหมด", "บุคคล", "พรรค", "นิติบุคคล"] as const;

interface SearchRadiosProps {
  group: (typeof SEARCH_GROUP)[number];
  setGroup: Dispatch<SetStateAction<(typeof SEARCH_GROUP)[number]>>;
}

const SearchRadios = ({ group, setGroup }: SearchRadiosProps) => {
  return (
    <RadioGroup value={group} onChange={setGroup}>
      <RadioGroup.Label className="sr-only">กลุ่มค้นหา</RadioGroup.Label>
      <div className="flex gap-5 justify-center">
        {SEARCH_GROUP.map((g) => (
          <RadioGroup.Option key={g} value={g}>
            <span className="b5 rounded-full text-gray-5 bg-gray-2 py-5 px-15 inline-block ui-checked:bg-black ui-checked:text-white leading-1 cursor-pointer">
              {g}
            </span>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

interface DataEntry {
  name: string;
  link: string;
  position?: string;
  image?: string | null;
}

interface Top3Entry extends DataEntry {
  value: number;
}

const TOP3PERSON: Top3Entry[] = TOP_INCOME_ASSETS.assets.map((e) => {
  const data = PEOPLE.find((e) => e.link === e.name);

  return {
    name: e.name.replace(/-/g, " "),
    position: data?.position,
    image: data?.image,
    value: e.value,
    link: e.name,
  };
});

const TOP3PARTY: Top3Entry[] = PARTY_DONATION.ทุกปี.slice(0, 3).map((e) => ({
  name: e.party,
  value: e.amount,
  image: (PARTY_ASSETS as Record<string, { color: string | null; image: string | null }>)[
    e.party
  ]?.image,
  link: "พรรค" + e.party,
}));

const normalizeName = (name: string) =>
  name.trim().replace(/\s+/g, " ").replace(/ํา/g, "ำ");
const getFileName = (formal_name: string) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

const TOP3BUSINESS: Top3Entry[] = BUSINESS_DONATION.filter((e) => e.title === "นิติบุคคล")
  .slice(0, 3)
  .map((e) => ({
    name: e.name,
    value: e.total,
    link: getFileName(normalizeName(e.name)),
  }));

interface Top3ThingProps {
  name: string;
  placeholderImage: string;
  data: Top3Entry[];
  hidden: boolean;
}

function Top3Thing({ name, placeholderImage, data, hidden }: Top3ThingProps) {
  return (
    <section className={clsx("shadow-search", hidden && "hidden")}>
      <h2 className="py-5 px-10 bg-gray-3 border-b border-b-gray-4 b5 text-gray-6">
        3 อันดับ {name}
      </h2>
      <ul className="px-10 pt-5 bg-gray-1">
        {data.map((e, i) => {
          const [value, unit] = thaiMoneyFormatter(e.value);
          return (
            <li key={i} className="border-b border-b-gray-2 last:border-b-0">
              <Link href={"/info/" + e.link} className="flex gap-5 py-5">
                <Image
                  className="w-auto h-20 border rounded-full border-black mt-4"
                  src={e.image ?? placeholderImage}
                  width={20}
                  height={20}
                  alt=""
                />
                <div className="flex-1">
                  <span className="b3 leading-1 block">{e.name}</span>
                  {e.position && (
                    <span className="b5 leading-1 text-gray-6 block">{e.position}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="b3 leading-1 block">{formatThousands(value)}</span>
                  <span className="b5 leading-1 block">{unit}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const highlightChar = (name: string, char: string) =>
  name.replace(
    new RegExp(char, "g"),
    (match) => `<span class="font-bold">${match}</span>`
  );

interface SearchResultProps {
  type: (typeof SEARCH_GROUP)[number];
  placeholderImage: string;
  data: DataEntry[];
  hidden: boolean;
  query: string;
}

function SearchResult({
  type,
  placeholderImage,
  data,
  hidden,
  query,
}: SearchResultProps) {
  const [showCount, setShowCount] = useState(10);
  const limitedData = useMemo(() => data.slice(0, showCount), [data, showCount]);

  return (
    <section className={clsx("shadow-search overflow-hidden", hidden && "hidden")}>
      <h2 className="py-5 px-10 bg-gray-3 border-b border-b-gray-4 b5 text-gray-6">
        ชื่อ{type} (พบ {data.length.toLocaleString()} {type})
      </h2>
      {limitedData.length > 0 ? (
        <ul className="px-10 pt-5 bg-gray-1">
          {limitedData.map((e, i) => (
            <li key={i} className="border-b border-b-gray-2 last:border-b-0">
              <Link href={"/info/" + e.link} className={"flex gap-5 py-5"}>
                <Image
                  className="w-auto h-20 border rounded-full border-black mt-4"
                  src={e.image ?? placeholderImage}
                  width={20}
                  height={20}
                  alt=""
                />
                <div className="flex-1">
                  <span
                    className="b3 leading-1 block"
                    dangerouslySetInnerHTML={{
                      __html: highlightChar(e.name, query),
                    }}
                  />
                  {e.position && (
                    <span
                      className="b5 leading-1 text-gray-6 block"
                      dangerouslySetInnerHTML={{
                        __html: highlightChar(e.position, query),
                      }}
                    />
                  )}
                </div>
              </Link>
            </li>
          ))}
          {showCount < data.length && (
            <li className="flex gap-5 py-5 text-gray-4 justify-center items-center b4">
              <button
                type="button"
                className="border-b border-b-gray-4"
                onClick={() => setShowCount((e) => e + 10)}
              >
                {data.length - showCount < 10
                  ? `+ ดูอีก ${data.length - showCount} ${type}ที่เหลือ`
                  : `+ ดูเพิ่มอีก 10 ${type}`}
              </button>
            </li>
          )}
        </ul>
      ) : (
        <div className="p-10 bg-gray-1 b4 text-center">
          ไม่พบ{type} จากคำค้นหา &quot;{query}&quot;
        </div>
      )}
    </section>
  );
}

export const SearchMain = () => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof SEARCH_GROUP)[number]>(SEARCH_GROUP[0]);

  const peopleResult: DataEntry[] =
    query !== "" && (group === "ทั้งหมด" || group === "บุคคล")
      ? PEOPLE.filter((e) => e.name.includes(query) || e.position?.includes(query))
      : [];
  const businessResult: DataEntry[] =
    query !== "" && (group === "ทั้งหมด" || group === "นิติบุคคล")
      ? BUSINESSES.filter((e) => e.name.includes(query))
      : [];
  const partyResult: DataEntry[] =
    query !== "" && (group === "ทั้งหมด" || group === "พรรค")
      ? PARTIES.filter((e) => e.name.includes(query))
      : [];

  return (
    <>
      <div className="rounded-full bg-white py-4 px-15 flex gap-5 items-center mx-15">
        <input
          className="text-black b2 border-0 bg-transparent placeholder:text-gray-4 flex-1 outline-none"
          type="search"
          placeholder="ค้นหา..."
          onInput={(e) => setQuery(() => (e.target as HTMLInputElement).value)}
          value={query}
          autoFocus
        />
        <Image
          className="w-auto h-20"
          src="/icons/search-k.svg"
          width={20}
          height={20}
          alt=""
        />
      </div>
      <SearchRadios group={group} setGroup={setGroup} />

      {query !== "" && (
        <SearchResult
          data={peopleResult}
          placeholderImage="/placeholders/politician.png"
          type="บุคคล"
          hidden={!(group === "ทั้งหมด" || group === "บุคคล")}
          query={query}
        />
      )}

      {query !== "" && (
        <SearchResult
          data={partyResult}
          placeholderImage="/placeholders/party.png"
          type="พรรค"
          hidden={!(group === "ทั้งหมด" || group === "พรรค")}
          query={query}
        />
      )}

      {query !== "" && (
        <SearchResult
          data={businessResult}
          placeholderImage="/placeholders/business.png"
          type="นิติบุคคล"
          hidden={!(group === "ทั้งหมด" || group === "นิติบุคคล")}
          query={query}
        />
      )}

      <Top3Thing
        name="บุคคลที่มีทรัพย์สินมากที่สุด"
        placeholderImage="/placeholders/politician.png"
        data={TOP3PERSON}
        hidden={!(query === "" && (group === "ทั้งหมด" || group === "บุคคล"))}
      />

      <Top3Thing
        name="พรรคที่ได้รับเงินบริจาคมากที่สุด"
        placeholderImage="/placeholders/party.png"
        data={TOP3PARTY}
        hidden={!(query === "" && (group === "ทั้งหมด" || group === "พรรค"))}
      />

      <Top3Thing
        name="นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด"
        placeholderImage="/placeholders/business.png"
        data={TOP3BUSINESS}
        hidden={!(query === "" && (group === "ทั้งหมด" || group === "นิติบุคคล"))}
      />
    </>
  );
};
