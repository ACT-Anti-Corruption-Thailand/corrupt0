"use client";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";
import EntityBarCard from "@/components/EntityBarCard";
import InfoPopover from "@/components/Info/Popover";
import { PositionChart } from "@/components/Info/PositionChart";
import SortByBtn from "@/components/SortByBtn";
import { Tab } from "@headlessui/react";

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

interface PositionTabProps {
  position: string;
}

export default function PositionTab({ position }: PositionTabProps) {
  const [subPositionShown, setSubPositionShown] = useState([
    ...PEOPLE_GROUP_METADATA[position].subgroup,
  ]);
  const [personSort, setPersonSort] = useState<"asc" | "desc">("desc");

  return (
    <Tab.Group>
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
          <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5">
            <div className="w-20 border-1 border-dashed" />
            <p className="leading-1">
              ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1.8 ล้านบาท</strong>
            </p>
            <InfoPopover buttonImg="/icons/info.svg">
              <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
            </InfoPopover>
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
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
              </div>
            </>
          )}
        </Tab.Panel>
        <Tab.Panel>
          {/* หนี้สิน */}
          <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance -mx-5">
            <div className="w-20 border-1 border-dashed" />
            <p className="leading-1">
              หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>0.2 ล้านบาท</strong>
            </p>
            <InfoPopover buttonImg="/icons/info.svg">
              <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
            </InfoPopover>
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
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
                <EntityBarCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  color="white"
                  amount={1637239}
                  maxAmount={10000000}
                  imgPath="/placeholders/person.png"
                />
              </div>
            </>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
