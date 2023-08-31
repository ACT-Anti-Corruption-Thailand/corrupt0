import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

import Accordion from "@/components/Accordion";
import InfoBusinessCard from "@/components/Info/BusinessCard";
import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import { FinancialJumpnav } from "@/components/Info/FinancialJumpnav";
import GoTop from "@/components/Info/GoTop";
import InfoLawsuitCard from "@/components/Info/LawsuitCard";
import InfoDonationSection from "@/components/Info/_Donation/Section";
import InfoFinancialSection from "@/components/Info/_Financial/Section";
import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Image from "next/image";
import Link from "next/link";

import POLITICIAN_IMAGES from "@/data/politicianImages.json";

import { formatThousands } from "@/functions/moneyFormatter";
import { hasCorrupt0Page } from "@/functions/navigation";

import type { DropdownDetailedData } from "@/components/BareDropdown";

// from /data/functions/business.mjs
const getFileName = (formal_name: string) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

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

  const {
    age,
    position,
    previous_jobs,
    relationship,
    donation,
    business,
    statement,
    nacc,
    topAssets,
    latestStatement,
    names,
    group,
  } = politicianData;

  const { sec, judgement, nacc: nacc_lawsuit } = politicianData.lawsuit;
  const totalLawsuit = sec.length + judgement.length + nacc_lawsuit.length;

  const hasDonation = donation.length > 0;
  const donationAllYears = (
    hasDonation
      ? [
          ...new Set(
            donation
              .map((e: { year: number }) => e.year)
              .sort((a: number, z: number) => a - z)
          ),
        ]
      : []
  ) as number[];
  const donationAllParties = (
    hasDonation
      ? [
          ...new Set(
            donation
              .map((e: { party: string }) => e.party)
              .sort((a: string, z: string) => a.localeCompare(z))
          ),
        ]
      : []
  ) as string[];
  const totalDonation = hasDonation
    ? donation.reduce((a: number, c: { amount: number }) => a + c.amount, 0)
    : 0;

  const businessInCorrupt0 = business.filter((b: any) =>
    hasCorrupt0Page(getFileName(b.business_name))
  ).length;

  const NACC_YEAR = Object.fromEntries(
    Object.entries(nacc ?? {}).map((e) => [
      e[0],
      new Date((e[1] as { date: number })?.date).getFullYear() + 543,
    ])
  );

  const YEARS: DropdownDetailedData[] = Object.keys(statement ?? {}).map((nacc_id) => ({
    data: nacc_id,
    label: (
      <>
        <span className="b5 font-bold">{NACC_YEAR[nacc_id]}</span>{" "}
        {nacc[nacc_id]?.case.replace("กรณี", "")}
        {nacc[nacc_id]?.position}
      </>
    ),
  }));

  const COMPARE_YEARS: DropdownDetailedData[] = [
    {
      data: null,
      label: <span className="b6">เลือกปีเปรียบเทียบ</span>,
    },
    ...YEARS,
  ];

  return (
    <>
      <Navbar
        back={{
          href: group ? "/info/" + group : "/donation",
          text: group || "ข้อมูลเงินบริจาค",
        }}
      />
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
                <span className="h2 leading-1">{spacedName}</span>
                {names.length > 1 && (
                  <Accordion
                    className="-mt-5"
                    trigger={
                      <div className="flex b6 text-gray-5 items-center justify-center">
                        <span>ชื่อ-นามสกุล เดิม</span>
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
                        {names
                          .filter((n: string) => n !== name)
                          .map((n: string) => (
                            <li key={n}>{n.replace(/-/g, " ")}</li>
                          ))}
                      </ul>
                    </div>
                  </Accordion>
                )}
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
                      <Sharer fallback={`https://poldata.actai.co/info/${name}`} />
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
                              {[...politicianData.previous_jobs]
                                .sort((a, z) => +(z?.end_year ?? 0) - +(a?.end_year ?? 0))
                                .sort(
                                  (a, z) => +(z?.start_year ?? 0) - +(a?.start_year ?? 0)
                                )
                                .map(
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
                {nacc && latestStatement && (
                  <FinancialJumpnav latestStatement={latestStatement} />
                )}
                {business.length > 0 && (
                  <a
                    className="block p-10 bg-black border-b border-b-gray-6"
                    href="#business"
                  >
                    <span className="flex gap-5 items-center">
                      <Image src="/icons/business.svg" alt="" width={20} height={20} />
                      <span>
                        <span className="b3 font-bold">
                          เกี่ยวข้องกับ {business.length} ธุรกิจ
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
                      {businessInCorrupt0} ธุรกิจ เคยบริจาคให้พรรคการเมือง
                    </span>
                  </a>
                )}
                {hasDonation && (
                  <a
                    className="block p-10 bg-black border-b border-b-gray-6"
                    href="#donation"
                  >
                    <span className="flex gap-5 items-center">
                      <Image src="/icons/donate.svg" alt="" width={20} height={20} />
                      <span>
                        <span className="b3 font-bold">
                          เคยบริจาคให้ {donationAllParties.length} พรรคการเมือง
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
                      รวม {formatThousands(totalDonation)} บาท
                    </span>
                  </a>
                )}

                {totalLawsuit > 0 && (
                  <a
                    className="block p-10 bg-black border-b border-b-gray-6"
                    href="#lawsuit"
                  >
                    <span className="flex gap-5 items-center">
                      <Image src="/icons/lawsuit.svg" alt="" width={20} height={20} />
                      <span className="b4 font-bold">
                        เกี่ยวข้องกับ {totalLawsuit} คดี
                      </span>
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
          {nacc && latestStatement && (
            <InfoFinancialSection
              name={name}
              data={statement}
              years={YEARS}
              compareYears={COMPARE_YEARS}
              assetsData={topAssets}
              naccYear={NACC_YEAR}
              nacc={nacc}
            />
          )}

          {/* ความเกี่ยวข้องกับธุรกิจและโครงการภาครัฐ */}
          {business.length > 0 && (
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
                {business.map((e: any) => (
                  <InfoBusinessCard
                    key={e.business_name}
                    name={e.business_name}
                    type={e.type}
                    relation={e.position}
                  />
                ))}
              </div>
              <footer className="flex gap-2 items-baseline justify-center text-gray-5 my-10">
                <span>Credit:</span>
                <a
                  href="https://creden.co/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image
                    className="w-auto h-[11px] md:h-15"
                    src="/logos/creden.svg"
                    alt=""
                    width={56}
                    height={11}
                  />
                </a>
              </footer>
            </section>
          )}

          {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
          {hasDonation && (
            <InfoDonationSection
              name={spacedName}
              rawData={donation}
              allParties={donationAllParties}
              allYears={donationAllYears}
            />
          )}

          {/* ข้อมูลคดีความ */}
          {totalLawsuit > 0 && (
            <section id="lawsuit">
              <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
                <Image src="/icons/lawsuit.svg" alt="" width={30} height={30} />
                <span className="w-auto">ข้อมูลคดีความ</span>
              </header>
              <div className="p-10 flex flex-col gap-5">
                {nacc_lawsuit.length > 0 &&
                  nacc_lawsuit.map((e: any, i: number) => (
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
                {relationship.map((r: any) =>
                  hasCorrupt0Page(r.full_name.replace(/\s+/g, "-")) ? (
                    <Link
                      href={"/info/" + r.full_name.replace(/\s+/g, "-")}
                      target="_blank"
                      key={r.full_name}
                      className="flex py-10 items-center border-b border-b-gray-6"
                    >
                      <div className="b4 font-bold leading-1 flex gap-5 items-center">
                        <span>{r.full_name}</span>
                        <Image
                          className="w-15 h-auto aspect-square md:w-[18px]"
                          src="/icons/new_tab.svg"
                          alt=""
                          width={15}
                          height={15}
                        />
                      </div>
                      <div className="ml-auto b5 font-bold">{r.relationship_name}</div>
                    </Link>
                  ) : (
                    <div
                      key={r.full_name}
                      className="flex py-10 items-center border-b border-b-gray-6"
                    >
                      <div className="b4 font-bold leading-1 flex gap-5 items-center">
                        <span>{r.full_name}</span>
                      </div>
                      <div className="ml-auto b5 font-bold">{r.relationship_name}</div>
                    </div>
                  )
                )}
              </div>
            </section>
          )}
        </InfoDesktopAligner>
      </main>
    </>
  );
}
