import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import Politician from "./Politician";
import Person from "./Person";
import Business from "./Business";
import Party from "./Party";

import { POLITICIANS, PERSONS, BUSINESS, PARTIES } from "@/data/pagelist";

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
  return [...POSITION_GROUP, ...POLITICIANS, ...PERSONS, ...BUSINESS, ...PARTIES].map(
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

  const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(fileContents); // pass this into the page

  // if (POSITION_GROUP.some(pos => pos === name)) return หน้ากลุ่มตำแหน่ง
  if (name.startsWith("ก-")) return <Politician params={params} />;
  if (name.startsWith("ข-")) return <Person params={params} />;
  if (name.startsWith("บริษัท-")) return <Business params={params} />;
  if (name.startsWith("พรรค")) return <Party params={params} />;

  notFound();
}
