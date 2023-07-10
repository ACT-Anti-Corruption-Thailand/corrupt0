import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

import Accordion from "@/components/Accordion";
import InfoBusinessCard from "@/components/Info/BusinessCard";
import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import GoTop from "@/components/Info/GoTop";
import InfoLawsuitCard from "@/components/Info/LawsuitCard";
import InfoDonationSection from "@/components/Info/_Donation/Section";
import InfoFinancialSection from "@/components/Info/_Financial/Section";
import Sharer from "@/components/Sharer";
import Image from "next/image";
import Link from "next/link";

import POLITICIAN_IMAGES from "@/data/politicianImages.json";

import { hasCorrupt0Page } from "@/functions/navigation";

function RelativeLink({ dashedFullName }: { dashedFullName: string }) {
  return (
    hasCorrupt0Page(dashedFullName) && (
      <Link href={"/info/" + dashedFullName} target="_blank">
        <Image className="ml-5" src="/icons/new_tab.svg" alt="" width={15} height={15} />
      </Link>
    )
  );
}

export default function Person({ params }: { params: { name: string } }) {
  const name = params.name;
  const spacedName = name.replace(/-/g, " ");
  const image = (POLITICIAN_IMAGES as Record<string, string | null>)[name];

  let politicianData: Record<any, any> = {};

  try {
    const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    politicianData = JSON.parse(fileContents); // pass this into the page
  } catch (e) {
    notFound();
  }

  // nacc_id will have: assets, relationship, statement
  // w/o nacc_id: lawsuit, company (comittee -> company), donation
  const { nacc_id, age, position, previous_jobs, relationship } = politicianData;

  const { sec, judgement, nacc } = politicianData.lawsuit;
  const totalLawsuit = sec.length + judgement.length + nacc.length;

  return (
    <main>
      <GoTop name={spacedName} />

      <InfoDesktopAligner
        left={
          <>
            {/* Basic Information */}
            <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
              <span className="b6 text-gray-5">
                อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
              </span>
              <span className="h2">{spacedName}</span>
              <div className="flex gap-15 justify-center">
                <div className="flex flex-col min-w-[105px] items-center">
                  <Image
                    className="bg-gray-2 rounded-5 border border-black mb-5"
                    src={image ?? "/placeholders/person.png"}
                    width={90}
                    height={90}
                    alt=""
                  />
                  <span className="block b7 mb-2">แชร์โปรไฟล์นี้</span>
                  <div className="flex gap-4 justify-center">
                    <Sharer />
                  </div>
                </div>
                {(age || position || previous_jobs) && (
                  <div className="text-left">
                    {age && (
                      <>
                        <span className="block b6 text-gray-5">อายุ ณ ปีที่ยื่น</span>
                        <span className="block b4 font-bold">
                          {politicianData.age} ปี
                        </span>
                      </>
                    )}
                    {position && (
                      <>
                        <span className="block b6 text-gray-5">ตำแหน่งปัจจุบัน</span>
                        <span className="block b4 no-balance">
                          <span className="font-bold">{politicianData.position}</span>
                        </span>
                      </>
                    )}
                    {previous_jobs && (
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
                          <ul className="flex flex-col gap-5 fake-bullet">
                            {politicianData.previous_jobs.map(
                              (job: any, i: number) =>
                                job.position_title && (
                                  <li key={i}>
                                    {job.position_title} ({job.start_year}
                                    {job.start_year && job.end_year && "–"}
                                    {job.end_year})
                                  </li>
                                )
                            )}
                          </ul>
                        </div>
                      </Accordion>
                    )}
                  </div>
                )}
              </div>

              {Object.keys(POLITICIAN_IMAGES).includes(name) && (
                <a
                  href={`https://theyworkforus.wevis.info/people/${name}`}
                  className="py-4 px-10 b7 border border-gray-2 rounded-5 block mx-auto"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <span className="flex gap-2 items-center justify-center">
                    <span>ดูประวัติการทำงานในรัฐสภา</span>
                    <Image src="/icons/external.svg" alt="" width={12} height={12} />
                  </span>
                  <span className="block text-gray-4">theyworkforus.wevis.info</span>
                </a>
              )}
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
              {totalLawsuit > 0 && (
                <a
                  className="block p-10 bg-black border-b border-b-gray-6"
                  href="#lawsuit"
                >
                  <span className="flex gap-5 items-center">
                    <Image src="/icons/lawsuit.svg" alt="" width={20} height={20} />
                    <span className="b4 font-bold">เกี่ยวข้องกับ {totalLawsuit} คดี</span>
                    <Image
                      className="ml-auto lg:-rotate-90"
                      src="/icons/arr-g.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </span>
                </a>
              )}

              {relationship.length > 0 && (
                <a className="block p-10 bg-black" href="#relative">
                  <span className="flex gap-5 items-center">
                    <Image src="/icons/relative.svg" alt="" width={20} height={20} />
                    <span>
                      <span className="b3 font-bold">
                        มีเครือญาติ {relationship.length} คน
                      </span>
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
              )}
            </section>
          </>
        }
      >
        {/* สถานะทางการเงิน */}
        <InfoFinancialSection name={spacedName} />

        {/* ปุ่มเอกสาร */}
        <div className="flex gap-5 px-10 mb-10">
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
          <div className="px-10 flex flex-col gap-10">
            <InfoBusinessCard
              name="บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
              isTop10
              mostDonatedParty="พลังประชารัฐ"
              totalDonation={1_234_567}
            />
            <InfoBusinessCard
              name="บริษัท ทีอาร์ อัลเคมิสท์ กรุ๊ป จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
              mostDonatedParty="พลังประชารัฐ"
              totalDonation={100}
            />
            <InfoBusinessCard
              name="บริษัท ทีอาร์ อัลเคมิสท์ กรุ๊ป จำกัด"
              type="อสังหาทรัพย์"
              relation="ผู้ถือหุ้น"
            />
          </div>
          <footer className="flex gap-2 items-center justify-center text-gray-5 my-10">
            <span>Credit:</span>
            <Image src="/logos/creden.svg" alt="" width={56} height={11} />
          </footer>
        </section>

        {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
        <InfoDonationSection />

        {/* ข้อมูลคดีความ */}
        {totalLawsuit > 0 && (
          <section id="lawsuit">
            <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
              <Image src="/icons/lawsuit.svg" alt="" width={30} height={30} />
              <span className="w-auto">ข้อมูลคดีความ</span>
            </header>
            <div className="p-10 flex flex-col gap-5">
              {nacc.length > 0 &&
                nacc.map((e: any, i: number) => (
                  <InfoLawsuitCard.Nacc
                    key={i}
                    description={e.indicment}
                    updateDate={
                      e.update_at
                        ? new Date(e.update_at).toLocaleDateString("th-TH")
                        : undefined
                    }
                    blackNumber={e.black_case_no}
                    redNumber={e.red_case_no}
                    meetingDate={
                      e.date_of_resolution
                        ? new Date(e.date_of_resolution).toLocaleDateString("th-TH")
                        : undefined
                    }
                    meetingResult={e.nacc_decision}
                    enforceResult={e.final_decision}
                    note={e.note}
                  />
                ))}
              {sec.length > 0 &&
                sec.map((e: any, i: number) => (
                  <InfoLawsuitCard.Sec
                    key={i}
                    description={e.law_name}
                    enforceDate={e.enforace_date}
                    cause={e.person_action}
                    actionType={e.enforce_type}
                    actionDetail={e.enforce_detail}
                  />
                ))}
              {judgement.length > 0 &&
                judgement.map((e: any, i: number) => (
                  <InfoLawsuitCard.Supreme
                    key={i}
                    description={e.offences_under_section}
                    blackNumber={e.black_case_no}
                    redNumber={e.red_case_no}
                    judgement={e.judgement}
                  />
                ))}
            </div>
          </section>
        )}

        {/* เครือญาติที่เปิดเผยในบัญชีทรัพย์สิน */}
        {relationship.length > 0 && (
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
              {relationship.map((r: any, i: number) => (
                <div key={i} className="flex py-10 items-center border-b border-b-gray-6">
                  <div className="b4 font-bold leading-1">{r.full_name}</div>
                  <div className="text-center ml-auto">
                    <div className="b5 font-bold">{r.relationship_name}</div>
                  </div>
                  <RelativeLink dashedFullName={r.full_name.replace(/\s+/g, "-")} />
                </div>
              ))}
            </div>
          </section>
        )}
      </InfoDesktopAligner>
    </main>
  );
}
