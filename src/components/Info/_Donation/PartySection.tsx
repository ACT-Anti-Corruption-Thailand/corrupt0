"use client";
import { useState } from "react";

import SortByBtn from "@/components/SortByBtn";
import EntityBarCard from "@/components/EntityBarCard";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../../Dropdown";
import InfoDonationChart from "./Chart";

import _POLITICIAN_IMAGES from "@/data/politicianImages.json";

const POLITICIAN_IMAGES = _POLITICIAN_IMAGES as Record<string, string | null>;

import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

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

interface PartySectionProps {
  data: any;
  theme: string;
  party: string;
}

const sortData = (data: any[], sortby: "asc" | "desc") =>
  sortby === "asc" ? [...data].reverse() : data;

export default function InfoPartyDonationSection(props: PartySectionProps) {
  const DONATION_TYPES = [
    "ทุกประเภท",
    ...new Set(props.data.map((d: any) => d.donor_prefix)),
  ] as string[];
  const YEARS = ["ทุกปี", ...new Set(props.data.map((d: any) => String(d.year)))].sort(
    (a: any, b: any) => +b - +a
  ) as string[];

  const [year, setYear] = useState(YEARS[0]);
  const [type, setType] = useState(DONATION_TYPES[0]);

  const [individualView, setIndividualView] = useState(10);
  const [individualSort, setIndividualSort] = useState<"asc" | "desc">("desc");

  const totalDonation = props.data
    .filter(
      (items: any) =>
        (year === "ทุกปี" || String(items.year) === year) &&
        (type === "ทุกประเภท" || items.donor_prefix === type)
    )
    .reduce((acc: any, curr: any) => acc + curr.amount, 0);
  const [amount, unit] = thaiMoneyFormatter(totalDonation);

  let DATA = YEARS.slice(1)
    .reverse()
    .map((_year: string) => ({
      x: _year,
      [props.party]: props.data
        .filter((item: any) => String(item.year) === _year)
        .reduce((acc: any, curr: any) => acc + +curr.amount, 0),
    }));

  if (year !== "ทุกปี") {
    const unfilledMonthData = Object.values(
      props.data
        .filter((item: any) => String(item.year) === year)
        .reduce((acc: any, curr: any) => {
          const { amount: _amount, month } = curr;
          if (month in acc) {
            acc[month][props.party] += _amount;
          } else {
            acc[month] = { x: month, [props.party]: _amount };
          }
          return acc;
        }, {})
    );

    DATA = Array.from({ length: 12 }, (_, index) => index + 1)
      .reduce((acc: any, x: any) => {
        if (!acc.some((obj: any) => obj.x === x)) {
          acc.push({ x: x, [props.party]: 0 });
        }
        return acc;
      }, unfilledMonthData)
      .sort((a: any, b: any) => a.x - b.x);
  } else {
    DATA = YEARS.slice(1)
      .reverse()
      .map((_year: string) => ({
        x: _year,
        [props.party]: props.data
          .filter((item: any) => String(item.year) === _year)
          .reduce((acc: any, curr: any) => acc + +curr.amount, 0),
      }));
  }

  const displayData = Object.values(
    props.data
      .filter(
        (items: any) =>
          (year === "ทุกปี" || String(items.year) === year) &&
          (type === "ทุกประเภท" || items.donor_prefix === type)
      )
      .reduce(
        (acc: any, curr: any) => {
          const donor_fullname = curr.donor_fullname;
          if (acc[donor_fullname]) {
            acc[donor_fullname].amount += curr.amount;
          } else {
            acc[donor_fullname] = { ...curr };
          }
          return acc;
        },
        {} as {
          donor_fullname: string;
          donor_prefix: string;
          amount: number;
        }
      ) as {
      donor_fullname: string;
      donor_prefix: string;
      amount: number;
    }[]
  ).sort((a, b) => b.amount - a.amount);

  return (
    <section id="donation">
      <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
        <Image src="/icons/donate.svg" alt="" width={30} height={30} />
        <span className="w-auto">
          ประวัติการบริจาคเงิน
          <br />
          ให้พรรคการเมือง
        </span>
      </header>
      <div className="p-10 flex flex-col items-center">
        <div className="flex gap-5 items-center justify-center b5 mb-5">
          <span className="opacity-70">เลือกดูข้อมูลบริจาค</span>
          <Dropdown data={YEARS} value={year} setValue={setYear} />
        </div>
        <p className="text-center mb-8">
          <span className="b4 font-bold">เงินบริจาครวม</span>
          <br />
          <span className="b2">{formatThousands(amount) + " " + unit}</span>
        </p>
        <InfoDonationChart
          x="x"
          y={[props.party]}
          yColors={[props.theme]}
          data={DATA}
          isMonth={year === "ทุกปี" ? false : true}
        />
        <p className="b6 text-gray-4">หมายเหตุ: แสดงเฉพาะยอดบริจากที่เกิน 5,000 บาท</p>
        <div className="flex flex-row items-center gap-10 my-10 lg:my-30">
          <p className="text-gray-4 b4 lg:b3">แสดง</p>
          <Dropdown data={DONATION_TYPES} value={type} setValue={setType} />
          <SortByBtn sort={individualSort} setSort={setIndividualSort} />
        </div>
        <Search
          placeholder="ค้นหาด้วยชื่อ"
          data={displayData.map((d) => ({
            name: d.donor_fullname,
            link:
              d.donor_prefix === "นิติบุคคล"
                ? getFileName(getFormalName(d.donor_fullname))
                : getFileName(d.donor_fullname),
          }))}
        />
        <p className="b3 text-center text-gray-4 lg:pt-30">
          ทั้งหมด {displayData.length.toLocaleString()} คน
        </p>
        {sortData(displayData, individualSort)
          .slice(0, individualView)
          .map((d) => (
            <Link
              key={d.donor_fullname}
              href={
                "/info/" +
                (d.donor_prefix === "นิติบุคคล"
                  ? getFileName(getFormalName(d.donor_fullname))
                  : getFileName(d.donor_fullname))
              }
              className="block no-underline w-full"
            >
              <EntityBarCard
                name={d.donor_fullname}
                title={d.donor_prefix}
                color={props.theme}
                imgPath={
                  POLITICIAN_IMAGES[d.donor_fullname.replace(/\s/g, "-")] ||
                  (d.donor_prefix === "นิติบุคคล"
                    ? "/placeholders/business.png"
                    : "/placeholders/person.png")
                }
                amount={d.amount}
                maxAmount={displayData[0].amount}
              />
            </Link>
          ))}
        <button
          className="b4 text-gray-4 pb-20"
          onClick={() => {
            setIndividualView(individualView + 10);
          }}
        >
          + ดูเพิ่มเติมอีก 10 คน
        </button>
      </div>
    </section>
  );
}
