"use client";

import { useState } from "react";

import Image from "next/image";
import BareDropdown from "../BareDropdown";

const YEARS = [
  {
    data: "2566",
    label: (
      <>
        <span className="b5 font-bold">2566</span> (พ้นตำแหน่ง)
      </>
    ),
  },
  {
    data: "2562",
    label: (
      <>
        <span className="b5 font-bold">2562</span> (ดำรงตำแหน่ง)
      </>
    ),
  },
];

const COMPARE_YEAR = [
  {
    data: null,
    label: <span className="b6">เลือกปีเปรียบเทียบ</span>,
  },
  ...YEARS,
];

const CLASSNAMES_BLACK = {
  root: "flex-1",
  button: "w-full rounded-5 h-50 p-10 bg-gray-1 border b7 text-black",
  listbox: "rounded-5 overflow-hidden translate-y-5 shadow-dropdown",
  option: "px-10 py-5 bg-white text-black b7 ui-selected:bg-gray-2 ui-active:bg-gray-2",
};

const CLASSNAMES_WHITE = {
  root: "flex-1",
  button: "w-full rounded-5 h-50 p-10 bg-white-10 border border-white text-white b7",
  listbox: "rounded-5 overflow-hidden translate-y-5 shadow-dropdown",
  option: "px-10 py-5 bg-white text-black b7 ui-selected:bg-gray-2 ui-active:bg-gray-2",
};

interface FinancialDropdownsProps {
  light?: boolean;
}

export default function InfoFinancialDropdowns({
  light = false,
}: FinancialDropdownsProps) {
  const [year, setYear] = useState(YEARS[0]);
  const [compareYear, setCompareYear] = useState(COMPARE_YEAR[0]);

  return (
    <>
      <BareDropdown
        data={YEARS}
        value={year}
        setValue={setYear}
        arrowSrc={light ? "/icons/caret-k.svg" : "/icons/caret-w.svg"}
        className={light ? CLASSNAMES_BLACK : CLASSNAMES_WHITE}
      />
      <div className="flex-1 flex items-center gap-10">
        <BareDropdown
          data={COMPARE_YEAR}
          value={compareYear}
          setValue={setCompareYear}
          arrowSrc={light ? "/icons/caret-k.svg" : "/icons/caret-w.svg"}
          className={light ? CLASSNAMES_BLACK : CLASSNAMES_WHITE}
        />
        {compareYear.data && (
          <button type="button" onClick={() => setCompareYear(COMPARE_YEAR[0])}>
            <Image
              src={light ? "/icons/circle-cross-k.svg" : "/icons/circle-cross.svg"}
              width={20}
              height={20}
              alt="ล้าง"
            />
          </button>
        )}
      </div>
    </>
  );
}
