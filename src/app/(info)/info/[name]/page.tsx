// import fs from "fs";
// import path from "path";
import { notFound } from "next/navigation";

import Business from "./Business";
import Party from "./Party";
import Person from "./Person";
import Politician from "./Politician";
import Position from "./Position";

import { BUSINESS, PARTIES, PERSONS } from "@/data/pagelist";
import POLITICIANS from "@/data/politicians.json";

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

  // try {
  //   const filePath = path.join(process.cwd(), "src", "data", "info", `${name}.json`);
  //   const fileContents = fs.readFileSync(filePath, "utf8");
  //   const jsonData = JSON.parse(fileContents); // pass this into the page
  // } catch (e) {
  //   // Allow b/c testing
  // }

  if (POSITION_GROUP.includes(name)) return <Position params={params} />;
  if (POLITICIANS.includes(name)) return <Politician params={params} />;
  if (PERSONS.includes(name)) return <Person params={params} />;
  if (BUSINESS.includes(name)) return <Business params={params} />;
  if (PARTIES.includes(name)) return <Party params={params} />;

  notFound();
}
