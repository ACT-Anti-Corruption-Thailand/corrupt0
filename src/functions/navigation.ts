import PEOPLE_NACC from "@/data/people_nacc.json";
import PEOPLE_GEN from "@/data/people_gen.json";
import BUSINESS from "@/data/businesses.json";
import PARTIES from "@/data/parties.json";

export const hasCorrupt0Page = (dash_separated_name: string) =>
  [...PEOPLE_NACC, ...PEOPLE_GEN, ...BUSINESS, ...PARTIES].includes(dash_separated_name);

export const getFullBusinessPage = (name: string) =>
  BUSINESS.find((e) => e.includes(name));
