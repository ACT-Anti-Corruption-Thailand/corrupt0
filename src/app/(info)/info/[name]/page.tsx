import { notFound } from "next/navigation";

import Business from "./Business";
import Party from "./Party";
import Person from "./Person";
import Position from "./Position";

import PEOPLE_NACC from "@/data/people_nacc.json";
import PEOPLE_GEN from "@/data/people_gen.json";
import BUSINESSES from "@/data/businesses.json";
import PARTIES from "@/data/parties.json";

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
  return [...POSITION_GROUP, ...PEOPLE, ...BUSINESSES, ...PARTIES].map((name) => ({
    name,
  }));
}

interface InfoPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Info({ params }: InfoPageProps) {
  const name = decodeURI(params.name);
  const decodedParams = Object.assign(params, { name });

  if (POSITION_GROUP.includes(name)) return <Position params={decodedParams} />;
  if (PEOPLE.includes(name)) return <Person params={decodedParams} />;
  if (BUSINESSES.includes(name)) return <Business params={decodedParams} />;
  if (PARTIES.includes(name)) return <Party params={decodedParams} />;

  notFound();
}
