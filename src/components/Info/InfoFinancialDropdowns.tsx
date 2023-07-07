"use client";

import Image from "next/image";
import BareDropdown, { type DropdownDetailedData } from "../BareDropdown";

import type { Dispatch, SetStateAction } from "react";

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
  data: DropdownDetailedData[];
  compare: DropdownDetailedData[];
  currentYear: DropdownDetailedData;
  setCurrentYear: Dispatch<SetStateAction<DropdownDetailedData>>;
  compareYear: DropdownDetailedData;
  setCompareYear: Dispatch<SetStateAction<DropdownDetailedData>>;
  light?: boolean;
}

export default function InfoFinancialDropdowns({
  data,
  compare,
  currentYear,
  setCurrentYear,
  compareYear,
  setCompareYear,
  light = false,
}: FinancialDropdownsProps) {
  return (
    <>
      <BareDropdown
        data={data}
        value={currentYear}
        setValue={setCurrentYear}
        arrowSrc={light ? "/icons/caret-k.svg" : "/icons/caret-w.svg"}
        className={light ? CLASSNAMES_BLACK : CLASSNAMES_WHITE}
      />
      <div className="flex-1 flex items-center gap-10">
        <BareDropdown
          data={compare}
          value={compareYear}
          setValue={setCompareYear}
          arrowSrc={light ? "/icons/caret-k.svg" : "/icons/caret-w.svg"}
          className={light ? CLASSNAMES_BLACK : CLASSNAMES_WHITE}
        />
        {compareYear.data && (
          <button type="button" onClick={() => setCompareYear(compare[0])}>
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
