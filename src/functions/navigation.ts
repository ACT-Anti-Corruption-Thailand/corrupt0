import POLITICIANS from "@/data/politicians.json";

export const hasCorrupt0Page = (dash_separated_name: string) =>
  [...POLITICIANS].includes(dash_separated_name);
