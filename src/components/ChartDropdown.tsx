"use client";

import { useState } from "react";

import Dropdown from "./Dropdown";

import type { DropdownProps } from "./Dropdown";

const YEARS = ["ทุกปี", "2566", "2565", "2564", "2563", "2562"];
const PARTIES = [
  "ทุกพรรค",
  "พลังประชารัฐ",
  "รวมไทยสร้างชาติ",
  "ภูมิใจไทย",
  "ประชาธิปัตย์",
];

const StyledChartDropdown = <T extends string[]>({
  data,
  value,
  setValue,
}: Omit<DropdownProps<T>, "className">) => {
  return (
    <Dropdown
      data={data}
      value={value}
      setValue={setValue}
      arrowSrc="/icons/caret-w.svg"
      className={{
        button:
          "w-[110px] md:w-[165px] rounded-5 px-5 py-2 bg-white-10 border border-gray-6 text-white b4",
        listbox: "rounded-5 overflow-hidden translate-y-5",
        option:
          "px-5 py-2 bg-white border-b border-b-gray-5 last:border-b-0 text-black b4 ui-selected:bg-gray-2 ui-active:bg-gray-2",
      }}
    />
  );
};

export const ChartYearDropdown = () => {
  const [year, setYear] = useState(YEARS[0]);

  return <StyledChartDropdown data={YEARS} value={year} setValue={setYear} />;
};

export const ChartPartyDropdown = () => {
  const [party, setParty] = useState(PARTIES[0]);

  return <StyledChartDropdown data={PARTIES} value={party} setValue={setParty} />;
};
