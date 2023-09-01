import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

import Accordion from "@/components/Accordion";
import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import GoTop from "@/components/Info/GoTop";
import InfoPartyDonationSection from "@/components/Info/_Donation/PartySection";
import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Image from "next/image";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

export default function Party({ params }: { params: { name: string } }) {
  const name = params.name;
  const spacedName = name.replace(/-/g, " ");

  //importing data
  let partyData: {
    donor: any[];
    ect_id: number;
    names: string[];
  } = {
    donor: [],
    ect_id: 0,
    names: [],
  };
  try {
    const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    partyData = JSON.parse(fileContents); // pass this into the page
  } catch (e) {
    notFound();
  }

  const partyInfo = PARTY_ASSETS[name.replace("พรรค", "")];
  const logo = partyInfo?.image ?? "/placeholders/party.webp";
  const color = partyInfo?.color ?? "#CCD8DD";

  return (
    <>
      <Navbar
        back={{
          href: "/donation#parties",
          text: "พรรคที่ได้รับเงินบริจาค",
        }}
      />
      <main>
        <GoTop name={spacedName} />

        <InfoDesktopAligner
          left={
            <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30 flex-1">
              {/* Basic Information */}
              <span className="b6 text-gray-5">
                อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
              </span>
              <span className="b3 -mb-5 leading-1">เงินบริจาคให้</span>
              <span className="h2">{spacedName}</span>
              <div className="flex gap-15 justify-center">
                <div className="flex flex-col min-w-[105px] items-center">
                  <Image
                    className="bg-gray-2 rounded-5 border border-black mb-5 mx-auto"
                    src={logo}
                    width={90}
                    height={90}
                    alt=""
                  />
                  <div className="flex gap-5 justify-center">
                    <span className="b7 -mr-1">แชร์โปรไฟล์นี้</span>
                    <Sharer fallback={`https://poldata.actai.co/info/${name}`} />
                  </div>
                </div>
                <div className="text-left">
                  <span className="block b6 text-gray-5">รหัสพรรคการเมือง</span>
                  <span className="block b4 font-bold">
                    {(partyData.ect_id + "").padStart(3, "0")}
                  </span>
                  {partyData.names.length > 1 && (
                    <Accordion
                      trigger={
                        <div className="flex b6 text-gray-5 items-center">
                          <span>ชื่อเดิมของพรรค</span>
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
                          {partyData.names
                            .filter((n: string) => n !== name.replace("พรรค", ""))
                            .map((n: string) => (
                              <li key={n}>{n}</li>
                            ))}
                        </ul>
                      </div>
                    </Accordion>
                  )}
                </div>
              </div>
            </section>
          }
        >
          {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
          <InfoPartyDonationSection
            data={partyData.donor}
            theme={color}
            party={spacedName.replace("พรรค", "")}
          />
        </InfoDesktopAligner>
      </main>
    </>
  );
}
