// TODO!!
// Find a way to pass query parameter (consult with p'mumu)
"use client";

import ImgCard from "@/components/ImgCard";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { moneyFormatter } from "@/functions/moneyFormatter";
import PersonCard from "@/components/PersonCard";

export default function IndividualDetails() {
  const data = [
    {
      name: 1000000,
      amount: 2,
    },
    {
      name: 4234567,
      amount: 13,
    },
    {
      name: 5000000,
      amount: 8,
    },
  ];
  return (
    <>
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_politician.png">
          <Image
            className="self-center mb-10 mt-30"
            src="/icons/financial.svg"
            width={45}
            height={45}
            alt="financial"
          />
          <p className="font-black text-40 text-center mb-30">
            ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ
          </p>
        </ImgCard>
        <p className="text-gray-5 text-18 mt-20 mb-10">
          อัพเดทข้อมูลเมื่อวันที่ 00/00/2556
        </p>
        <div>Search</div>
        <div className="w-[85vw] border-1 border-gray-4" />
        <p className="text-30 font-black text-white my-15">
          สมาชิกวุฒิสภา
          {/* todo: change to dynamic routing */}
        </p>
        <div className="flex flex-col items-center text-center text-18">
          <Tab.Group>
            <Tab.List className="flex flex-row items-center">
              <p className="text-gray-4 mr-10 bg-black">เเสดงข้อมูล</p>
              <div className="text-gray-4 bg-gray-6 rounded-5">
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20">
                  ทรัพย์สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20">
                  หนี้สิน
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex flex-row items-center justify-center my-10 text-act">
                  <div className="w-20 border-1 border-dashed mr-5" />
                  <p>ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2562 = 1.64 ล้านบาท</p>
                </div>
                <ResponsiveContainer
                  width="90%"
                  height={270}
                  className="grow-[2] mx-auto"
                >
                  <BarChart data={data}>
                    <CartesianGrid fill="white" fillOpacity={0.1} />
                    <ReferenceLine
                      x={1637239}
                      stroke="#EC1C24"
                      isFront={true}
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      type="number"
                      dataKey="name"
                      fill="3F3F3F"
                      domain={["auto", "auto"]}
                      tickFormatter={moneyFormatter}
                    />
                    <Bar dataKey="amount" fill="#fff" minPointSize={1}></Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-gray-5 b6">ปริมาณทรัพย์สิน (บาท)</p>
                <PersonCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  amount={1637239}
                  maxAmount={10000000}
                />
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-row items-center justify-center my-10 text-act">
                  <div className="w-20 border-1 border-dashed mr-5" />
                  <p>ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2562 = 1.64 ล้านบาท</p>
                </div>
                <ResponsiveContainer
                  width="90%"
                  height={270}
                  className="grow-[2] mx-auto"
                >
                  <BarChart data={data}>
                    <CartesianGrid fill="white" fillOpacity={0.1} />
                    <ReferenceLine
                      x={1637239}
                      stroke="#EC1C24"
                      isFront={true}
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      type="number"
                      dataKey="name"
                      fill="3F3F3F"
                      domain={["auto", "auto"]}
                      tickFormatter={moneyFormatter}
                    />
                    <Bar dataKey="amount" fill="#fff" minPointSize={1}></Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-gray-5 b6">ปริมาณหนี้สิน (บาท)</p>
                <PersonCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  amount={1637239}
                  maxAmount={10000000}
                />
                <PersonCard
                  name="สุชาติ ภิญโญ"
                  title="สมาชิกวุฒิสภา"
                  amount={1637239}
                  maxAmount={10000000}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
}
