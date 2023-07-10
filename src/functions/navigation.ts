import POLITICIANS from "@/data/politicians.json";
import BUSINESS from "@/data/businesses.json";
import PEOPLE from "@/data/people.json";
import PARTIES from "@/data/parties.json";

export const hasCorrupt0Page = (dash_separated_name: string) =>
  [...POLITICIANS, ...BUSINESS, ...PEOPLE, ...PARTIES].includes(dash_separated_name);
