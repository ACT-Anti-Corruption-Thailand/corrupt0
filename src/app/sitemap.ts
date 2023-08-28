import type { MetadataRoute } from "next";

import BUSINESSES from "@/data/businesses.json";
import PARTIES from "@/data/parties.json";
import PEOPLE_GEN from "@/data/people_gen.json";
import PEOPLE_NACC from "@/data/people_nacc.json";

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

const URLS = [
  "https://corrupt0.actai.co/",
  "https://corrupt0.actai.co/terms",
  "https://corrupt0.actai.co/search",
  "https://corrupt0.actai.co/donation",
  "https://corrupt0.actai.co/info",
  ...[...POSITION_GROUP, ...PEOPLE_NACC, ...PEOPLE_GEN, ...BUSINESSES, ...PARTIES].map(
    (e) => "https://corrupt0.actai.co/info/" + e
  ),
  ...[...PEOPLE_NACC].map((e) => "https://corrupt0.actai.co/info/" + e + "/asset"),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return URLS.map((e) => ({
    url: e,
    lastModified: new Date(),
  }));
}
