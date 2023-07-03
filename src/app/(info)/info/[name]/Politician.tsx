import Accordion from "@/components/Accordion";
import { ChartPartyDropdown, ChartYearDropdown } from "@/components/ChartDropdown";
import FinancialCheckboxes from "@/components/FinancialCheckboxes";
import FinancialDropdowns from "@/components/FinancialDropdowns";
import InfoGoTop from "@/components/InfoGoTop";
import PersonBusinessCard from "@/components/PersonBusinessCard";
import PersonChart from "@/components/PersonChart";
import PersonFinanceNoticeDialog from "@/components/PersonFinanceNoticeDialog";
import PersonLawsuitCard from "@/components/PersonLawsuitCard";
import Sharer from "@/components/Sharer";
import Image from "next/image";
import Link from "next/link";

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

export default function Politician({ params }: { params: { name: string } }) {
  const { name } = params;

  if (decodeURI(name).includes("บริษัท")) {
    return <main>LOL</main>;
  }

  return (
    <main>
      <InfoGoTop name="สุชาติ ภิญโญ" />

      <DesktopAligner
        left={
          <>
            {/* Basic Information */}
            <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
              <span className="b6 text-gray-5">
                อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
              </span>
              <span className="h2">สุชาติ ภิญโญ</span>
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
                  <span className="block b6 text-gray-5">สังกัดล่าสุด</span>
                  <span className="block b4 font-bold">พลังประชารัฐ</span>
                  <span className="block b6 text-gray-5">ตำแหน่งปัจจุบัน</span>
                  <span className="block b4 no-balance">
                    <span className="font-bold">สมาชิกสภาผู้แทนราษฎร</span>{" "}
                    <span className="nobr">(2562-2566)</span>
                  </span>
                  <Accordion
                    trigger={
                      <div className="flex b6 text-gray-5 items-center">
                        <span>ดูตำแหน่งที่ผ่านมา</span>
                        <Image
                          className="ui-open:rotate-180 ml-2"
                          src="/icons/caret-g.svg"
                          width={10}
                          height={10}
                          alt=""
                        />
                      </div>
                    }
                  >
                    <div className="rounded-5 bg-gray-2 b7 text-gray-5 p-5">
                      <ul className="flex flex-col gap-5 list-disc">
                        <li>สมาชิกสภาผู้แทนราษฎร (2500-2500)</li>
                        <li>สมาชิกสภาผู้แทนราษฎร (2500-2500)</li>
                      </ul>
                    </div>
                  </Accordion>
                </div>
              </div>
              <a
                href="https://theyworkforus.wevis.info/"
                className="py-4 px-10 b7 border border-gray-2 rounded-5 block mx-auto"
              >
                <span className="flex gap-2 items-center justify-center">
                  <span>ดูประวัติการทำงานในรัฐสภา</span>
                  <Image src="/icons/external.svg" alt="" width={12} height={12} />
                </span>
                <span className="block text-gray-4">theyworkforus.wevis.info</span>
              </a>
            </section>

            {/* Jumpnav */}
            <section className="p-10 bg-white">
              <a
                className="block p-10 bg-black border-b border-b-gray-6"
                href="#financial"
              >
                <span className="flex gap-5 items-center mb-5">
                  <Image src="/icons/financial.svg" alt="" width={20} height={20} />
                  <span>
                    <span className="b4 font-bold">สถานะการเงินปี 25xx</span>{" "}
                    <span className="b7 text-gray-5">(ปีล่าสุดที่มีข้อมูลในระบบ)</span>
                  </span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <div className="flex gap-2">
                  <div className="flex-1 bg-value-negative-bg py-5 px-[7px] flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <span className="opacity-60 b5">ทรัพย์สิน</span>
                      <span className="text-value-negative-text b1 font-bold">x,xxx</span>
                      <span className="opacity-60 b6 text-value-negative-text">
                        ล้านบาท
                      </span>
                    </div>
                    <span className="text-value-negative-text b5 font-bold">&lt;</span>
                    <div className="flex flex-col items-center flex-1">
                      <span className="opacity-60 b5">หนี้สิน</span>
                      <span className="text-value-negative-text b1 font-bold">x,xxx</span>
                      <span className="opacity-60 b6 text-value-negative-text">
                        ล้านบาท
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-value-positive-bg py-5 px-[7px] flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <span className="opacity-60 b5">รายได้</span>
                      <span className="text-value-positive-text b1 font-bold">x,xxx</span>
                      <span className="opacity-60 b6 text-value-positive-text">
                        ล้านบาท
                      </span>
                    </div>
                    <span className="text-value-positive-text b5 font-bold">&gt;</span>
                    <div className="flex flex-col items-center flex-1">
                      <span className="opacity-60 b5">รายจ่าย</span>
                      <span className="text-value-positive-text b1 font-bold">x,xxx</span>
                      <span className="opacity-60 b6 text-value-positive-text">
                        ล้านบาท
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a
                className="block p-10 bg-black border-b border-b-gray-6"
                href="#business"
              >
                <span className="flex gap-5 items-center">
                  <Image src="/icons/business.svg" alt="" width={20} height={20} />
                  <span>
                    <span className="b3 font-bold">เกี่ยวข้องกับ 5 ธุรกิจ</span>
                  </span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <span className="b5 text-gray-5 ml-[21px]">
                  3 ธุรกิจ เคยบริจาคให้พรรคการเมือง
                </span>
              </a>
              <a
                className="block p-10 bg-black border-b border-b-gray-6"
                href="#donation"
              >
                <span className="flex gap-5 items-center">
                  <Image src="/icons/donate.svg" alt="" width={20} height={20} />
                  <span>
                    <span className="b3 font-bold">เคยบริจาคให้ 4 พรรคการเมือง</span>
                  </span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <span className="b5 text-gray-5 ml-[21px]">รวม 2,900,000 บาท</span>
              </a>
              <a className="block p-10 bg-black border-b border-b-gray-6" href="#lawsuit">
                <span className="flex gap-5 items-center">
                  <Image src="/icons/lawsuit.svg" alt="" width={20} height={20} />
                  <span className="b4 font-bold">เกี่ยวข้องกับ 4 คดี</span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              </a>
              <a className="block p-10 bg-black" href="#relative">
                <span className="flex gap-5 items-center">
                  <Image src="/icons/relative.svg" alt="" width={20} height={20} />
                  <span>
                    <span className="b3 font-bold">มีเครือญาติ 5 คน</span>
                  </span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <span className="b5 text-gray-5 ml-[21px]">
                  ที่เปิดเผยในบัญชีทรัพย์สิน
                </span>
              </a>
            </section>
          </>
        }
      >
        {/* สถานะทางการเงิน */}
        <section id="financial">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10">
            <Image src="/icons/financial.svg" alt="" width={30} height={30} />
            <span>สถานะทางการเงิน</span>
          </header>

          <div className="p-10">
            <div className="mb-5 text-center">
              <span className="b3 font-bold inline-block mr-2">ปีที่ยื่นบัญชี</span>
              <span className="b5">(กรณีที่ยื่น)</span>
            </div>
            <div className="flex mb-15 gap-10">
              <FinancialDropdowns />
            </div>
            {/* การ์ดเงิน */}
            <div className="rounded-10 bg-white p-10 text-black mb-15">
              <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
                <FinancialCheckboxes />
              </div>
              <div className="py-5 mb-5 ml-10">
                <PersonFinanceNoticeDialog />
              </div>
              <div className="mb-10 bg-value-negative-bg p-10">
                <section className="mb-5">
                  <div className="block b3 font-bold mb-2">ทรัพย์สิน</div>
                  <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                    <div className="w-50 bg-black" />
                    <div className="w-50 bg-black opacity-40" />
                    <div className="w-50 bg-black opacity-20" />
                  </div>
                  <div className="flex pt-5 justify-between">
                    <div>
                      <span className="block b7 leading-1">ผู้ยื่น</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-80">
                      <span className="block b7 leading-1">คู่สมรส x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-60">
                      <span className="block b7 leading-1">บุตร x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="text-right">
                      <span className="block b7 leading-1">
                        <span className="font-bold">รวม</span> (ล้านบาท)
                      </span>
                      <span className="block b4 font-bold">x,xxx.xx</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto block text-gray-5 b6 underline"
                  >
                    รายละเอียด
                  </button>
                </section>
                <section className="mb-10">
                  <div className="block b3 font-bold mb-2">หนี้สิน</div>
                  <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                    <div className="w-50 bg-black" />
                    <div className="w-50 bg-black opacity-40" />
                    <div className="w-50 bg-black opacity-20" />
                  </div>
                  <div className="flex pt-5 justify-between">
                    <div>
                      <span className="block b7 leading-1">ผู้ยื่น</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-80">
                      <span className="block b7 leading-1">คู่สมรส x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-60">
                      <span className="block b7 leading-1">บุตร x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="text-right">
                      <span className="block b7 leading-1">
                        <span className="font-bold">รวม</span> (ล้านบาท)
                      </span>
                      <span className="block b4 font-bold">x,xxx.xx</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto block text-gray-5 b6 underline"
                  >
                    รายละเอียด
                  </button>
                </section>
                <p className="b4 text-value-negative-text font-bold">
                  ทรัพย์สิน น้อยกว่า หนี้สิน x,xxx ล้านบาท
                </p>
              </div>
              <div className="mb-10 bg-value-positive-bg p-10">
                <section className="mb-5">
                  <div className="block b3 font-bold mb-2">รายได้</div>
                  <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                    <div className="w-50 bg-black" />
                    <div className="w-50 bg-black opacity-40" />
                    <div className="w-50 bg-black opacity-20" />
                  </div>
                  <div className="flex pt-5 justify-between">
                    <div>
                      <span className="block b7 leading-1">ผู้ยื่น</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-80">
                      <span className="block b7 leading-1">คู่สมรส x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-60">
                      <span className="block b7 leading-1">บุตร x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="text-right">
                      <span className="block b7 leading-1">
                        <span className="font-bold">รวม</span> (ล้านบาท)
                      </span>
                      <span className="block b4 font-bold">x,xxx.xx</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto block text-gray-5 b6 underline"
                  >
                    รายละเอียด
                  </button>
                </section>
                <section className="mb-10">
                  <div className="block b3 font-bold mb-2">รายจ่าย</div>
                  <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                    <div className="w-50 bg-black" />
                    <div className="w-50 bg-black opacity-40" />
                    <div className="w-50 bg-black opacity-20" />
                  </div>
                  <div className="flex pt-5 justify-between">
                    <div>
                      <span className="block b7 leading-1">ผู้ยื่น</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-80">
                      <span className="block b7 leading-1">คู่สมรส x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="opacity-60">
                      <span className="block b7 leading-1">บุตร x คน</span>
                      <span className="block b4">x,xxx.xx</span>
                    </div>
                    <div className="text-right">
                      <span className="block b7 leading-1">
                        <span className="font-bold">รวม</span> (ล้านบาท)
                      </span>
                      <span className="block b4 font-bold">x,xxx.xx</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto block text-gray-5 b6 underline"
                  >
                    รายละเอียด
                  </button>
                </section>
                <p className="b4 text-value-positive-text font-bold">
                  รายได้ มากกว่า รายจ่าย x,xxx ล้านบาท
                </p>
              </div>
              <div className="bg-gray-1 p-10">
                <div className="block b2 font-bold">การเสียภาษี</div>
                <section className="mb-10">
                  <div className="block b3 font-bold mb-2">เงินได้พึงประเมิน</div>
                  <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                    <div className="w-80 bg-black" />
                    <div className="w-80 bg-black opacity-40" />
                  </div>
                  <div className="flex pt-5">
                    <div className="flex-1">
                      <span className="block b7 leading-1">ผู้ยื่น</span>
                      <span className="block b4">1.36</span>
                    </div>
                    <div className="opacity-80 flex-1 flex justify-center">
                      <div>
                        <span className="block b7 leading-1">คู่สมรส x คน</span>
                        <span className="block b4">16.73</span>
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <span className="block b7 leading-1">
                        <span className="font-bold">รวม</span> (ล้านบาท)
                      </span>
                      <span className="block b4 font-bold">18.09</span>
                    </div>
                  </div>
                </section>
                <section className="border-t border-t-gray-4 pt-5">
                  <div className="block b3 font-bold mb-5">เปรียบเทียบกับรายได้จริง</div>
                  <div className="flex">
                    <div className="b4 flex-1">
                      <span className="block leading-1">น้อยกว่า</span>
                      <span className="block">xx%</span>
                    </div>
                    <div className="opacity-80 b4 flex-1 flex justify-center">
                      <div>
                        <span className="block leading-1">น้อยกว่า</span>
                        <span className="block">xx%</span>
                      </div>
                    </div>
                    <div className="text-right b4 font-bold flex-1">
                      <span className="block leading-1">น้อยกว่า</span>
                      <span className="block">xx%</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            {/* เจาะลึกทรัพย์สิน */}
            <Link
              href={`${name}/asset`}
              className="block rounded-10 bg-white border border-white overflow-hidden mb-15"
            >
              <header className="py-[17px] px-10 bg-asset_explore bg-center bg-cover">
                <div className="flex justify-between h3">
                  <span>เจาะลึกทรัพย์สิน</span>
                  <Image
                    className="-rotate-90"
                    src="/icons/arr-w.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </div>
              </header>
              <div className="p-10">
                <span className="b4 text-gray-4 font-bold block mb-10">
                  ทรัพย์สินที่แพงที่สุด
                </span>
                <div className="flex gap-5 items-start">
                  <Image src="/icons/placeholder.svg" alt="" width={40} height={40} />
                  <div className="flex-1 text-black">
                    <span className="block b5">ห้องชุดเพนท์เฮาส์</span>
                    <span className="block b3 font-bold">92.12 ล้านบาท</span>
                  </div>
                </div>
              </div>
            </Link>
            {/* ปุ่มเอกสาร */}
            <div className="flex gap-5">
              <button
                type="button"
                className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
              >
                <Image src="/icons/pdf.svg" alt="" width={20} height={20} />
                <span>ดูเอกสารจริง</span>
              </button>
              <button
                type="button"
                className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
              >
                <Image src="/icons/sheet.svg" alt="" width={20} height={20} />
                <span>ดาวน์โหลดข้อมูล</span>
              </button>
            </div>
          </div>
        </section>

        {/* ความเกี่ยวข้องกับธุรกิจและโครงการภาครัฐ */}
        <section id="business">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10 text-balance">
            <Image src="/icons/business.svg" alt="" width={30} height={30} />
            <span className="w-auto">
              ความเกี่ยวข้องกับธุรกิจ
              <br />
              และโครงการภาครัฐ
            </span>
          </header>
          <div className="mt-5 px-15 flex flex-col gap-5">
            <PersonBusinessCard
              name="บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
              isTop10
              mostDonatedParty="พลังประชารัฐ"
              totalDonation={1_234_567}
            />
            <PersonBusinessCard
              name="บริษัท ทีอาร์ อัลเคมิสท์ กรุ๊ป จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
              mostDonatedParty="พลังประชารัฐ"
              totalDonation={100}
            />
            <PersonBusinessCard
              name="บริษัท ทีอาร์ อัลเคมิสท์ กรุ๊ป จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
            />
          </div>
          <footer className="flex gap-2 items-center justify-center text-gray-5 mt-8 mb-10">
            <span>Credit:</span>
            <Image src="/logos/creden.svg" alt="" width={56} height={11} />
          </footer>
        </section>

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

        {/* ข้อมูลคดีความ */}
        <section id="lawsuit">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
            <Image src="/icons/lawsuit.svg" alt="" width={30} height={30} />
            <span className="w-auto">ข้อมูลคดีความ</span>
          </header>
          <div className="p-10 flex flex-col gap-5">
            <PersonLawsuitCard.Nacc
              description="สั่งการและอนุมัติให้จัดจ้างโครงการที่ได้รับ จัดสรรจากงบประมาณรายจ่ายประจำ ปีงบประมาณ พ.ศ.2554 งบเงินอุดหนุน เงินอุดหนุนเฉพาะกิจของเทศบาลตำบลโพนสวรรค์ ด้วยวิธีพิเศษ เมื่อปีงบประมาณ พ.ศ.2554 จำนวน 5 โครงการ โดยมุ่งหมายมิให้มีการ- แข่งขันราคาอย่างเป็นธรรม เอื้ออำนวยแก่ ผู้เสนอราคาบางรายให้เป็นผู้มีสิทธิทำสัญญา"
              updateDate="03/08/2564"
              blackNumber="5590260873 26-1-313 /2561"
              redNumber="2-359-61 656-1-50 /2563"
              meetingDate="01/10/2563"
              meetingResult="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat sapiente, fuga assumenda error iste, necessitatibus dignissimos hic ratione quia voluptate nulla nam velit animi quo magnam natus! Tenetur, hic pariatur?"
              enforceResult="สำหรับการกระทำของ หจก.วิบูลย์ภัณฑ์ก่อสร้าง, หจก.ยงยุทธกาฬสินธุ์ และ หจก.กาฬสินธุ์ก่อสร้าง มีเหตุอันควรเชื่อได้ว่ามีการ สมยอมกันในการเข้าเสนอ ราคากับเทศบาลเมือง กาฬสินธุ์ ทำให้ทางราชการ เสียประโยชน์ จึงมีเหตุที่จะ พิจารณาลงโทษ หจก. ทั้งสามเสมือนเป็นผู้ทิ้งงาน ตามระเบียบกระทรวง มหาดไทยว่าด้วยการพัสดุ ของหน่วยการบริหารราชการ ส่วนท้องถิ่น พ.ศ. 2535 ข้อ 138 ซึ่งแก้ไขเพิ่มเติม โดยระเบียบกระทรวง มหาดไทยว่าด้วยการพัสดุ ของหน่วยการบริหารราชการ ส่วนท้องถิ่น (ฉบับที่ 2) พ.ศ. 2539 ให้แจ้งประสาน งานไปยังปลัดกระทรวง มหาดไทย ต่อไป"
              note="การชี้มูลความผิดทางอาญาของคณะกรรมการ ป.ป.ช. ยังไม่ถือเป็นที่สุดผู้ถูกกล่าวหายังเป็นผู้บริสุทธิ์จนกว่าจะมีคำพิพากษาของศาลอันถึงที่สุด"
            />
            <PersonLawsuitCard.Sec
              description="300 ประกอบ 240 / พ.ร.บ. หลักทรัพย์ฯ (แก้ไขโดย พ.ร.บ. หลักทรัพย์ ฉบับที่ 5)"
              updateDate="03/08/2564"
              enforceDate="29/05/2566"
              cause="ในวันที่ 2 สิงหาคม 2562 บริษัท พีพี ไพร์ม จำกัด (มหาชน) (?PPPM?) ได้เปิดเผยสารสนเทศผ่านระบบข้อมูลของตลาดหลักทรัพย์แห่งประเทศไทยว่า PPPM จะไม่ผิดนัดชำระหนี้หุ้นกู้ลำดับที่ 2 จำนวน 319.50 ล้านบาท ซึ่งครบกำหนดไถ่ถอนวันที่ 2 สิงหาคม 2562 และบริษัทจะชำระทั้งเงินต้นและดอกเบี้ยภายในวันที่ 7 สิงหาคม 2562 ทั้งที่ ในช่วงเวลานั้น PPPM มิได้มีสภาพคล่องเพียงพอที่จะนำมาชำระหนี้หุ้นกู้ได้ตามที่เปิดเผยสารสนเทศ ซึ่งข้อความที่ PPPM เผยแพร่ดังกล่าวอาจทำให้ประชาชนและผู้ลงทุนเข้าใจผิดในสาระสำคัญเกี่ยวกับข้อมูลของ PPPM ที่น่าจะทำให้มีผลกระทบต่อราคาหรือต่อการตัดสินใจลงทุนใน PPPM โดยในขณะเกิดเหตุ พลเอกเชาวฤทธิ์ ประภาจิตร์ นายประวีณ ดีขจรเดช นางสาวภัทชรดา จุฑาประทีป และนางกนกวัลย์ วรรณบุตร ซึ่งเป็นบุคคลที่รับผิดชอบในการดำเนินงานของ PPPM ทราบข้อเท็จจริงว่า PPPM มิได้มีสภาพคล่องเพียงพอในการชำระหนี้หุ้นกู้ดังกล่าว รวมทั้งมีส่วนร่วมในการดำเนินการอันนำไปสู่การเปิดเผยสารสนเทศของ PPPM"
              actionType="การดำเนินการทางแพ่ง"
              actionDetail="29/05/2566 ตกลงยินยอมปฏิบัติตามมาตรการลงโทษทางแพ่งตามที่คณะกรรมการพิจารณามาตรการลงโทษทางแพ่งกำหนด ดังนี้- ชำระค่าปรับทางแพ่ง 1,000,000.00 บาท- ห้ามเป็นกรรมการหรือผู้บริหารของบริษัทที่ออกหลักทรัพย์ ตั้งแต่วันที่ 29/05/2566 ถึงวันที่ 28/01/2568- ห้ามเป็นกรรมการหรือผู้บริหารของบริษัทหลักทรัพย์ ตั้งแต่วันที่ 29/05/2566 ถึงวันที่ 28/01/2568- ชดใช้ค่าใช้จ่ายของสำนักงานในการตรวจสอบ 30,662.00 บาท"
            />
            <PersonLawsuitCard.Supreme
              description="ความผิดตามพระราชบัญญัติประกอบรัฐธรรมนูญว่าด้วยการป้องกันและปราบปรามทุจริตปี พ.ศ.2542 มาตรา 4 และมาตรา 80(1)"
              updateDate="03/08/2564"
              blackNumber="อม. 1/2545"
              redNumber="อม. 1/2546"
              judgement="มีความผิด"
            />
          </div>
        </section>

        {/* เครือญาติที่เปิดเผยในบัญชีทรัพย์สิน */}
        <section id="relative">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10 text-balance">
            <Image src="/icons/relative.svg" alt="" width={30} height={30} />
            <span className="w-auto">
              เครือญาติที่เปิดเผย
              <br />
              ในบัญชีทรัพย์สิน
            </span>
          </header>
          <div className="mt-5 px-15 flex flex-col mb-20">
            <div className="flex b6 text-gray-5">
              <span>ชื่อ นามสกุล</span>
              <span className="ml-auto">ความเกี่ยวข้อง</span>
            </div>
            <div className="flex py-10 items-center border-b border-b-gray-6">
              <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
              <div className="text-center ml-auto">
                <div className="b5 font-bold">คู่สมรส</div>
              </div>
              <Image
                className="ml-5"
                src="/icons/new_tab.svg"
                alt=""
                width={15}
                height={15}
              />
            </div>
            <div className="flex py-10 items-center border-b border-b-gray-6">
              <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
              <div className="text-center ml-auto">
                <div className="b5 font-bold">บุตร</div>
              </div>
              <div className="ml-5 w-15 h-15" />
            </div>
            <div className="flex py-10 items-center border-b border-b-gray-6">
              <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
              <div className="text-center ml-auto">
                <div className="b5 font-bold">บุตร</div>
              </div>
              <Image
                className="ml-5"
                src="/icons/new_tab.svg"
                alt=""
                width={15}
                height={15}
              />
            </div>
          </div>
        </section>
      </DesktopAligner>
    </main>
  );
}