import { notFound } from "next/navigation";

import Business from "./Business";
import Party from "./Party";
import Person from "./Person";
import Position from "./Position";

import { openGraph, twitter } from "@/app/layout";
import BUSINESSES from "@/data/businesses.json";
import PARTIES from "@/data/parties.json";
import PEOPLE_GEN from "@/data/people_gen.json";
import PEOPLE_NACC from "@/data/people_nacc.json";

import type { Metadata } from "next";

const PEOPLE = [...PEOPLE_NACC, ...PEOPLE_GEN];

const POSITION_GROUP = [
  "นายกรัฐมนตรีและรัฐมนตรี",
  "สมาชิกสภาผู้แทนราษฎร",
  "สมาชิกวุฒิสภา",
  "สมาชิกสภานิติบัญญัติแห่งชาติ",
  "ข้าราชการการเมือง",
  "ตุลาการศาลรัฐธรรมนูญ",
  "ผู้ดำรงตำแหน่งในองค์กรอิสระ",
  "ผู้บริหารกระทรวงข้าราชการระดับสูง",
  "องค์กรปกครองส่วนท้องถิ่น",
];

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [...POSITION_GROUP, ...PEOPLE, ...BUSINESSES, ...PARTIES].map((name) => ({
      name: encodeURIComponent(name),
    }));
  }

  return [...POSITION_GROUP, ...PEOPLE, ...BUSINESSES, ...PARTIES].map((name) => ({
    name,
  }));
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const name = decodeURI(params.name);
  const spacedName = name.replace(/-/g, " ").replace("กระทรวงข้าราช", "กระทรวง/ข้าราช");

  let ogImageUrl;
  switch (true) {
    case PEOPLE_NACC.includes(name):
      ogImageUrl = "https://poldata.actai.co/og_politician.png";
      break;
    case PEOPLE_GEN.includes(name):
      ogImageUrl = "https://poldata.actai.co/og_person.png";
      break;
    case BUSINESSES.includes(name):
      ogImageUrl = "https://poldata.actai.co/og_business.png";
      break;
    case PARTIES.includes(name):
      ogImageUrl = "https://poldata.actai.co/og_party.png";
      break;
  }
  const ogEntry = ogImageUrl
    ? {
        images: {
          url: ogImageUrl,
          type: "image/png",
          width: 1201,
          height: 630,
        },
      }
    : {};

  return {
    title: `${spacedName} | ACT Ai Politics Data — ACT Ai`,
    openGraph: {
      ...openGraph,
      title: `${spacedName} | ACT Ai Politics Data — ACT Ai`,
      ...ogEntry,
    },
    twitter: {
      ...twitter,
      title: `${spacedName} | ACT Ai Politics Data — ACT Ai`,
      ...ogEntry,
    },
  };
}

interface InfoPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Info({ params }: InfoPageProps) {
  const name = decodeURI(params.name);
  const decodedParams = Object.assign(params, { name });

  // NOTE - ห้ามเปลี่ยนลำดับ Functions
  // คนบางคนชื่อเหมือนบริษัท (อาจจะหลุดมาจากตอนกรอกข้อมูล) ต้องดักเคส "คน" ก่อน "บริษัท"
  if (POSITION_GROUP.includes(name)) return <Position params={decodedParams} />;
  if (PEOPLE.includes(name)) return <Person params={decodedParams} />;
  if (BUSINESSES.includes(name)) return <Business params={decodedParams} />;
  if (PARTIES.includes(name)) return <Party params={decodedParams} />;

  notFound();
}
