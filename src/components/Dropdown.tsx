"use client";

import BareDropdown from "./BareDropdown";

import type { BareDropdownMultipleProps, BareDropdownSingleProps } from "./BareDropdown";

const CLASSNAME = {
  button:
    "w-[110px] md:w-[165px] rounded-5 px-5 py-2 bg-white-10 border border-gray-6 text-white b4",
  listbox: "rounded-5 overflow-hidden translate-y-5",
  option:
    "px-5 py-2 bg-white border-b border-b-gray-5 last:border-b-0 text-black b4 ui-selected:bg-gray-2 ui-active:bg-gray-2",
};

function Single({
  data,
  value,
  setValue,
}: Omit<BareDropdownSingleProps<string[]>, "multiple" | "arrowSrc" | "className">) {
  return (
    <BareDropdown
      data={data}
      value={value}
      setValue={setValue}
      arrowSrc="/icons/caret-w.svg"
      className={CLASSNAME}
    />
  );
}

function Multiple({
  data,
  value,
  setValue,
}: Omit<BareDropdownMultipleProps<string[]>, "multiple" | "arrowSrc" | "className">) {
  return (
    <BareDropdown
      data={data}
      value={value}
      setValue={setValue}
      multiple
      arrowSrc="/icons/caret-w.svg"
      className={CLASSNAME}
    />
  );
}

const Dropdown = {
  Single,
  Multiple,
};

export default Dropdown;
