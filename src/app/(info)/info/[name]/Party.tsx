import React from "react";
import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import GoTop from "@/components/Info/GoTop";
import InfoPartyDonationSection from "@/components/Info/_Donation/PartySection";
import Sharer from "@/components/Sharer";
import Image from "next/image";

import _PARTY_ASSETS from "@/data/color/partyAssets.json";
import Dropdown from "@/components/Dropdown";
import ChartSort from "@/components/ChartSort";
const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

export default function Party({ params }: { params: { name: string } }) {
  const name = params.name;
  const spacedName = name.replace(/-/g, " ");

  //importing data
  let partyData: Record<any, any> = {};
  try {
    const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    partyData = JSON.parse(fileContents); // pass this into the page
  } catch (e) {
    notFound();
  }

  const partyInfo = PARTY_ASSETS[name.replace("พรรค", "")];
  const logo = partyInfo?.image ?? "/placeholders/party.png";
  const color = partyInfo?.color ?? "#CCD8DD";

  return (
    <main>
      <GoTop name={spacedName} />

      <InfoDesktopAligner
        left={
          <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
            {/* Basic Information */}
            <span className="b6 text-gray-5">
              อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
            </span>
            <span className="b3 -mb-5 leading-1">เงินบริจาคให้</span>
            <span className="h2">{spacedName}</span>
            <Image
              className="bg-gray-2 rounded-5 border border-black mb-5 mx-auto"
              src={logo}
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
        <InfoPartyDonationSection data={partyData} theme={color}/>
      </InfoDesktopAligner>
    </main>
  );
}
