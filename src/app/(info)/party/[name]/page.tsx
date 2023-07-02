import { ChartYearDropdown } from "@/components/ChartDropdown";
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

export async function generateStaticParams() {
  return [{ name: "_test" }];
}

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

interface PartyPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Party({ params }: PartyPageProps) {
  const { name } = params;

  return (
    <main>
      <InfoGoTop name="พรรคพลังประชารัฐ" />

      <DesktopAligner
        left={
          <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
            {/* Basic Information */}
            <span className="b6 text-gray-5">
              อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
            </span>
            <span className="b3 -mb-5 leading-1">เงินบริจาคให้</span>
            <span className="h2">พรรคพลังประชารัฐ</span>
            <Image
              className="bg-gray-2 rounded-5 border border-black mb-5 mx-auto"
              src="/placeholders/party.png"
              width={90}
              height={90}
              alt=""
            />
            <div className="flex gap-5 justify-center">
              <span className="b7 -mr-1">แชร์โปรไฟล์นี้</span>
              <Sharer />
            </div>
          </section>
        }
      >
        {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
        <section id="donation">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
            <Image src="/icons/donate.svg" alt="" width={30} height={30} />
            <span className="w-auto">บริจาคให้พรรคการเมือง</span>
          </header>
          <div className="p-10">
            <div className="flex gap-5 items-center justify-center b5 mb-5">
              <span className="opacity-70">เลือกดูข้อมูลบริจาค</span>
              <ChartYearDropdown />
            </div>
            <p className="text-center mb-8">
              <span className="b4 font-bold">รวมยอดเงินบริจาค</span>
              <br />
              <span className="b2">000 ล้านบาท</span>
            </p>
            <PersonChart
              x="x"
              y={["y1", "y2"]}
              yColors={["#6DD4FF", "#4993FE"]}
              data={DATA}
            />
            <div className="flex gap-4 flex-col mt-10">{/* TODO: add search */}</div>
          </div>
        </section>
      </DesktopAligner>
    </main>
  );
}
