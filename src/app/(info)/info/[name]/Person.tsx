import Accordion from "@/components/Accordion";
import { ChartPartyDropdown, ChartYearDropdown } from "@/components/ChartDropdown";
import InfoGoTop from "@/components/InfoGoTop";
import PersonChart from "@/components/PersonChart";
import Sharer from "@/components/Sharer";
import Image from "next/image";

import { ReactNode } from "react";

const DATA = [
  { x: "2558", y1: 1, y2: 3 },
  { x: "2559", y1: 2, y2: 2 },
  { x: "2560", y1: 3, y2: 1 },
  { x: "2561", y1: 4, y2: 2 },
  { x: "2562", y1: 3, y2: 3 },
  { x: "2563", y1: 2, y2: 4 },
];

const DesktopAligner = ({ left, children }: { left: ReactNode; children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:max-w-[1280px] lg:mx-auto lg:mb-40">
      <div className="lg:max-w-[400px] min-w-0">
        <div className="person-scrollbar sticky top-0 lg:h-screen overflow-y-auto overflow-x-hidden">
          <div>{left}</div>
        </div>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};

export default function Person({ params }: { params: { name: string } }) {
  return (
    <main>
      <InfoGoTop name="กอบกุล ภิญโญ" />

      <DesktopAligner
        left={
          <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
            {/* Basic Information */}
            <span className="b6 text-gray-5">
              อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
            </span>
            <span className="h2">กอบกุล ภิญโญ</span>
            <div className="flex gap-15 justify-center">
              <div className="flex flex-col">
                <Image
                  className="bg-gray-2 rounded-5 border border-black mb-5"
                  src="/placeholders/person.png"
                  width={90}
                  height={90}
                  alt=""
                />
                <span className="block b7 mb-2">แชร์โปรไฟล์นี้</span>
                <div className="flex gap-4 justify-center">
                  <Sharer />
                </div>
              </div>
              <div className="text-left">
                <span className="block b6 text-gray-5">อายุ ณ ปีที่ยื่น</span>
                <span className="block b4 font-bold">53 ปี</span>
                <span className="block b6 text-gray-5">อาชีพ</span>
                <span className="block b4 font-bold">ธุรกิจส่วนตัว</span>
              </div>
            </div>
          </section>
        }
      >
        {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
        <section id="donation">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
            <Image src="/icons/donate.svg" alt="" width={30} height={30} />
            <span className="w-auto">
              ประวัติการบริจาคเงิน
              <br />
              ให้พรรคการเมือง
            </span>
          </header>
          <div className="p-10">
            <div className="flex gap-10 items-center justify-center mb-8 b4">
              <div className="flex gap-5 items-center">
                <span>ดู</span>
                <ChartYearDropdown />
              </div>
              <div className="flex gap-5 items-center">
                <span>ดู</span>
                <ChartPartyDropdown />
              </div>
            </div>
            <p className="text-center mb-8">
              <span className="b4 font-bold">รวมบริจาคให้พรรคการเมือง</span>
              <br />
              <span className="b2">000 ล้านบาท</span>
            </p>
            <PersonChart
              x="x"
              y={["y1", "y2"]}
              yColors={["#6DD4FF", "#4993FE"]}
              data={DATA}
            />
            <div className="flex gap-4 flex-col mt-10">
              <Accordion
                className="bg-white-10 py-5 px-10 rounded-5"
                trigger={
                  <div className="text-left flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <Image
                        className="border border-black rounded-full"
                        src="/placeholders/party.png"
                        alt=""
                        width={25}
                        height={25}
                      />
                      <span className="b2 font-bold">พลังประชารัฐ</span>
                      <Image src="/icons/new_tab.svg" alt="" width={15} height={15} />
                      <Image
                        className="ui-open:rotate-180 ml-auto"
                        src="/icons/caret-g.svg"
                        width={12}
                        height={12}
                        alt=""
                      />
                    </div>
                    <hr className="border-t-[3px] border-t-[rgb(73,147,254)] mb-5" />
                    <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
                      1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
                    </div>
                    <div className="flex gap-5 items-center leading-1 b4 -mt-5">
                      <span className="font-bold">รวมยอดบริจาค</span>
                      <span className="font-bold b1 ml-auto">000</span>
                      <span>ล้านบาท</span>
                    </div>
                    <div className="flex gap-5 items-center leading-1 b4 -mt-10">
                      <span className="font-bold">บริจาคจำนวน</span>
                      <span className="font-bold b1 ml-auto">00</span>
                      <span>ครั้ง</span>
                    </div>
                  </div>
                }
              >
                <div className="border-t border-t-gray-6 pt-5 mt-4">
                  <div className="flex justify-between items-baseline b5 text-gray-5 -mb-4">
                    <span>วันที่บริจาค</span>
                    <span>จำนวน (บาท)</span>
                  </div>
                  <div className="flex justify-between items-baseline -mb-4">
                    <span className="b6 font-bold">00/00/2566</span>
                    <span className="b3">000</span>
                  </div>
                  <div className="flex justify-between items-baseline -mb-4">
                    <span className="b6 font-bold">00/00/2566</span>
                    <span className="b3">000</span>
                  </div>
                  <div className="flex justify-between items-baseline -mb-4">
                    <span className="b6 font-bold">00/00/2566</span>
                    <span className="b3">000</span>
                  </div>
                  <div className="h-4" />
                </div>
              </Accordion>
            </div>
          </div>
        </section>
      </DesktopAligner>
    </main>
  );
}
