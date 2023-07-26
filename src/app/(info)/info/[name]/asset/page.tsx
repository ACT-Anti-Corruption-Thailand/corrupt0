import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import InfoAssetMain from "@/components/Info/Asset/Main";
import InfoAssetPopover from "@/components/Info/Asset/Popover";
import Image from "next/image";
import DownloadMenu from "@/components/Info/DownloadMenu";

import PEOPLE_NACC from "@/data/people_nacc.json";

import type { DropdownDetailedData } from "@/components/BareDropdown";
import type {
  InfoAssetBuildingStatement,
  InfoAssetConcessionStatement,
  InfoAssetLandStatement,
  InfoAssetStatement,
  InfoAssetValuableStatement,
  InfoAssetVehicleStatement,
} from "@/components/Info/Asset/SingleAccordion";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return PEOPLE_NACC.map((name) => ({
    name,
  }));
}

export async function generateMetadata({ params }: AssetPageProps): Promise<Metadata> {
  const name = decodeURI(params.name);
  const spacedName = name.replace(/-/g, " ");

  return {
    title: `เจาะลึกทรัพย์สิน ${spacedName} | Corrupt0 — ACT Ai`,
  };
}

interface AssetPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Asset({ params }: AssetPageProps) {
  const name = decodeURI(params.name);

  let file: Record<any, any> = {};

  try {
    const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    file = JSON.parse(fileContents); // pass this into the page
  } catch (e) {
    notFound();
  }

  const { assets, nacc } = file;

  if (JSON.stringify(assets) === "{}") notFound();

  const YEARS: DropdownDetailedData[] = Object.keys(assets).map((nacc_id) => ({
    data: nacc_id,
    label: (
      <>
        <span className="b5 font-bold">
          {new Date(nacc[nacc_id]?.date).getFullYear() + 543}
        </span>{" "}
        ({nacc[nacc_id]?.case.replace("กรณี", "")}
        {nacc[nacc_id]?.position})
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
    <main>
      <header className="p-10 text-center">
        <span className="block mb-10 b6 text-gray-5">
          อัปเดตข้อมูลเมื่อวันที่ 00/00/2556
        </span>
        <h1 className="h2 flex gap-5 items-center justify-center">
          เจาะลึกทรัพย์สินรวม
          <InfoAssetPopover>
            <span className="font-bold block">รายการทรัพย์สิน ประกอบด้วย</span>
            <ol className="list-decimal ml-[2ch]">
              <li>เงินสด</li>
              <li>เงินฝาก</li>
              <li>เงินลงทุน</li>
              <li>เงินให้กู้ยืม</li>
              <li>ที่ดิน</li>
              <li>โรงเรือนและสิ่งปลูกสร้าง</li>
              <li>ยานพาหนะ</li>
              <li>สิทธิสัมปทาน</li>
              <li>ทรัพย์สินอื่น</li>
            </ol>
          </InfoAssetPopover>
        </h1>
      </header>

      <InfoAssetMain years={YEARS} compare_years={COMPARE_YEARS} statements={assets} />

      <div className="flex gap-5 mt-10 mb-20 max-w-[850px] mx-auto">
        <DownloadMenu data={nacc} />
        <Link
          href={`/data/${name}.json`}
          className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5 no-underline text-white hover:bg-white hover:text-black"
          download
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 21"
            width={20}
            height={20}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8.375 2.544v3c0 .759-.616 1.374-1.375 1.374H4v9.626a1 1 0 001 1h10a1 1 0 001-1v-13a1 1 0 00-1-1H8.375zm-4 3.624H7c.345 0 .625-.28.625-.625V2.918l-3.25 3.25zM9.5 9.543H7v2h2.5v-2zm-2.5 5v-2h2.5v2H7zm3.5 0v-2H13v2h-2.5zm2.5-5v2h-2.5v-2H13zm-7-1v7h8v-7H6z"
              clipRule="evenodd"
            />
          </svg>
          <span>ดาวน์โหลดข้อมูล</span>
        </Link>
      </div>
    </main>
  );
}
