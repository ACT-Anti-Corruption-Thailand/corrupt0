import { notFound } from "next/navigation";

import Business from "./Business";
import Party from "./Party";
import Person from "./Person";
import Politician from "./Politician";
import Position from "./Position";

import POLITICIANS from "@/data/politicians.json";
import BUSINESS from "@/data/businesses.json";
import PEOPLE from "@/data/people.json";
import PARTIES from "@/data/parties.json";

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
  return [...POSITION_GROUP, ...POLITICIANS, ...PEOPLE, ...BUSINESS, ...PARTIES].map(
    (pos) => ({
      name: pos,
    })
  );
}

interface InfoPageProps {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
}

export default function Info({ params }: InfoPageProps) {
  const name = decodeURI(params.name);
  const decodedParams = Object.assign(params, { name });

  if (POSITION_GROUP.includes(name)) return <Position params={decodedParams} />;
  if (POLITICIANS.includes(name)) return <Politician params={decodedParams} />;
  if (PEOPLE.includes(name)) return <Person params={decodedParams} />;
  if (BUSINESS.includes(name)) return <Business params={decodedParams} />;
  if (PARTIES.includes(name)) return <Party params={decodedParams} />;

  notFound();
}
