"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityBarCard from "@/components/EntityBarCard";
import InfoPopover from "@/components/Info/Popover";
import { PositionChart } from "@/components/Info/PositionChart";
import SortByBtn from "@/components/SortByBtn";
import { Tab } from "@headlessui/react";
import Link from "next/link";

import POLITICIAN_IMAGES from "@/data/politicianImages.json";
import _PEOPLE_GROUP_METADATA from "@/data/people_group_metadata.json";
const PEOPLE_GROUP_METADATA = _PEOPLE_GROUP_METADATA as Record<
  string,
  {
    asset: {
      chartData: {
        x: number;
        y?: number;
      }[];
      max: number;
      min: number;
    };
    debt: {
      chartData: {
        x: number;
        y?: number;
      }[];
      max: number;
      min: number;
    };
    count: number;
    subgroup: string[];
  }
>;

import _PEOPLE_GROUP from "@/data/people_group.json";
const PEOPLE_GROUP = _PEOPLE_GROUP as Record<
  string,
  {
    name: string;
    group: string;
    asset: number;
    debt: number;
    subgroup: string;
  }[]
>;

interface PositionTabProps {
  position: string;
}

export default function PositionTab({ position }: PositionTabProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const [subPositionShown, setSubPositionShown] = useState([
    ...PEOPLE_GROUP_METADATA[position].subgroup,
  ]);
  const [personSort, setPersonSort] = useState<"asc" | "desc">("desc");
  const [displayLimit, setDisplayLimit] = useState(10);

  const data_group =
    currentTab === 1
      ? [...PEOPLE_GROUP[position]].sort((a, z) => z.debt - a.debt)
      : PEOPLE_GROUP[position];
  const data_filter = data_group.filter((e) => subPositionShown.includes(e.subgroup));
  const display_data = personSort === "asc" ? [...data_filter].reverse() : data_filter;

  return (
    <Tab.Group
      onChange={(i: number) => {
        setCurrentTab(i);
        setSubPositionShown([...PEOPLE_GROUP_METADATA[position].subgroup]);
        setPersonSort("desc");
        setDisplayLimit(10);
      }}
    >
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
          <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5 text-left">
            <div className="w-20 border-1 border-dashed flex-[0_0_20px]" />
            <div>
              <p className="leading-1 inline mr-5">
                ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1,801,090.878 บาท</strong>
              </p>
              <InfoPopover buttonImg="/icons/info.svg" className="top-[3px]">
                <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
              </InfoPopover>
            </div>
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
            <PositionChart
              refValue={1801090.878}
              data={PEOPLE_GROUP_METADATA[position].asset.chartData}
              hasData={PEOPLE_GROUP_METADATA[position].count > 0}
            />
          </div>
          <p className="text-gray-5 b6 mt-5">ปริมาณทรัพย์สิน (บาท)</p>
          {PEOPLE_GROUP_METADATA[position].count > 0 && (
            <>
              <div className="flex flex-row items-center justify-center gap-10 my-10 lg:mb-20">
                <p className="text-gray-4 b4 lg:b3">ดู</p>
                <Dropdown
                  data={PEOPLE_GROUP_METADATA[position].subgroup}
                  value={subPositionShown}
                  setValue={setSubPositionShown}
                  multiple
                />
                <SortByBtn sort={personSort} setSort={setPersonSort} />
              </div>
              <div className="mb-20 lg:mb-30">
                {display_data.length > 0 &&
                  display_data.slice(0, displayLimit).map((e) => (
                    <Link
                      key={e.name}
                      href={"/info/" + e.name}
                      className="block no-underline w-full"
                    >
                      <EntityBarCard
                        name={e.name.replace(/-/g, " ")}
                        title={e.subgroup}
                        color="white"
                        amount={e.asset}
                        maxAmount={data_filter[0].asset}
                        imgPath={
                          (POLITICIAN_IMAGES as Record<string, string | null>)[e.name] ??
                          "/placeholders/person.png"
                        }
                      />
                    </Link>
                  ))}
                {displayLimit < display_data.length && (
                  <button
                    type="button"
                    className="border-b border-b-gray-4 text-gray-4"
                    onClick={() => setDisplayLimit((e) => e + 10)}
                  >
                    {display_data.length - displayLimit < 10
                      ? `+ ดูอีก ${display_data.length - displayLimit} คนที่เหลือ`
                      : `+ ดูเพิ่มอีก 10 คน`}
                  </button>
                )}
              </div>
            </>
          )}
        </Tab.Panel>
        <Tab.Panel>
          {/* หนี้สิน */}
          <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5 text-left">
            <div className="w-20 border-1 border-dashed flex-[0_0_20px]" />
            <div>
              <p className="leading-1 inline mr-5">
                หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>205,679 บาท</strong>
              </p>
              <InfoPopover buttonImg="/icons/info.svg" className="top-[3px]">
                <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
              </InfoPopover>
            </div>
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
            <PositionChart
              refValue={205679}
              data={PEOPLE_GROUP_METADATA[position].debt.chartData}
              hasData={PEOPLE_GROUP_METADATA[position].count > 0}
            />
          </div>
          <p className="text-gray-5 b6 mt-5">ปริมาณหนี้สิน (บาท)</p>
          {PEOPLE_GROUP_METADATA[position].count > 0 && (
            <>
              <div className="flex flex-row items-center justify-center gap-10 my-10 lg:mb-20">
                <p className="text-gray-4 b4 lg:b3">ดู</p>
                <Dropdown
                  data={PEOPLE_GROUP_METADATA[position].subgroup}
                  value={subPositionShown}
                  setValue={setSubPositionShown}
                  multiple
                />
                <SortByBtn sort={personSort} setSort={setPersonSort} />
              </div>
              <div className="mb-20 lg:mb-30 w-[90vw] lg:w-[70vw]">
                {display_data.length > 0 &&
                  display_data.slice(0, displayLimit).map((e) => (
                    <Link
                      key={e.name}
                      href={"/info/" + e.name}
                      className="block no-underline w-full"
                    >
                      <EntityBarCard
                        name={e.name.replace(/-/g, " ")}
                        title={e.subgroup}
                        color="white"
                        amount={e.debt}
                        maxAmount={data_filter[0].debt}
                        imgPath={
                          (POLITICIAN_IMAGES as Record<string, string | null>)[e.name] ??
                          "/placeholders/person.png"
                        }
                      />
                    </Link>
                  ))}
                {displayLimit < display_data.length && (
                  <button
                    type="button"
                    className="border-b border-b-gray-4 text-gray-4"
                    onClick={() => setDisplayLimit((e) => e + 10)}
                  >
                    {display_data.length - displayLimit < 10
                      ? `+ ดูอีก ${display_data.length - displayLimit} คนที่เหลือ`
                      : `+ ดูเพิ่มอีก 10 คน`}
                  </button>
                )}
              </div>
            </>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
