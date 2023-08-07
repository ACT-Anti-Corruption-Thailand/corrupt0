import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import GoTop from "@/components/Info/GoTop";
import InfoLawsuitCard from "@/components/Info/LawsuitCard";
import InfoDonationSection from "@/components/Info/_Donation/Section";
import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Image from "next/image";

import { formatThousands } from "@/functions/moneyFormatter";

export default function Business({ params }: { params: { name: string } }) {
  let politicianData: Record<any, any> = {};

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "info",
      `${params.name}.json`
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    politicianData = JSON.parse(fileContents); // pass this into the page
  } catch (e) {
    notFound();
  }

  const {
    name,
    operating_status,
    register_date,
    address,
    mission,
    businessdomain,
    donation,
  } = politicianData;

  const { sec, judgement, nacc } = politicianData.lawsuit;
  const totalLawsuit = sec.length + judgement.length + nacc.length;

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

  return (
    <>
      <Navbar
        back={{
          href: "/donation#individuals",
          text: "ผู้บริจาคเงิน",
        }}
      />
      <main>
        <GoTop name={name} />

        <InfoDesktopAligner
          left={
            <>
              {/* Basic Information */}
              <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
                <span className="b6 text-gray-5">
                  อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
                </span>
                <h1 className="h2">{name}</h1>
                <div className="flex gap-15 justify-center">
                  <div className="text-left">
                    {mission && (
                      <>
                        <p className="block b4 text-center">{mission}</p>
                        <hr className="border-t-gray-2 my-10" />
                      </>
                    )}
                    <dl>
                      {businessdomain && (
                        <>
                          <dt className="block b6 text-gray-5">ประเภทธุรกิจ</dt>
                          <dd className="block b4 font-bold">{businessdomain}</dd>
                        </>
                      )}
                      {address && (
                        <>
                          <dt className="block b6 text-gray-5">ที่ตั้งของบริษัท</dt>
                          <dd className="block b4 font-bold">{address}</dd>
                        </>
                      )}
                      {register_date && (
                        <>
                          <dt className="block b6 text-gray-5">ก่อตั้ง</dt>
                          <dd className="block b4 no-balance">
                            <span className="font-bold">
                              {new Date(register_date).toLocaleDateString("th-TH")}
                            </span>{" "}
                            {operating_status && (
                              <span className="nobr">({operating_status})</span>
                            )}
                          </dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mb-5 items-center">
                  <span className="block b7 mr-4">แชร์โปรไฟล์นี้</span>
                  <Sharer />
                </div>
                <div className="flex justify-center gap-5">
                  <a
                    href={`https://data.creden.co/search?q=${encodeURIComponent(name)}`}
                    className="py-4 px-10 b7 border border-gray-2 rounded-5 flex flex-col justify-center"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <span>
                      <Image
                        className="mr-2 inline-block"
                        src="/icons/external.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                      ดูข้อมูลบริษัทเพิ่มเติม
                    </span>
                    <Image
                      className="h-[9px] w-auto mx-auto mt-5 mb-1 md:h-[12px] md:mb-4"
                      src="/logos/creden.svg"
                      width={49.5}
                      height={9}
                      alt=""
                    />
                  </a>
                  <a
                    href={`https://actai.co/Project?search="${encodeURIComponent(name)}"`}
                    className="py-4 px-10 b7 border border-gray-2 rounded-5 flex flex-col justify-center"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <span>
                      <Image
                        className="mr-2 inline-block"
                        src="/icons/external.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                      ดูข้อมูลความเกี่ยวข้องกับโครงการภาครัฐ
                    </span>
                    <span className="block text-gray-4">www.actai.co</span>
                  </a>
                </div>
              </section>

              {/* Jumpnav */}
              <section className="p-10 bg-white">
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
              </section>
            </>
          }
        >
          {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
          {hasDonation && (
            <InfoDonationSection
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
        </InfoDesktopAligner>
      </main>
    </>
  );
}
