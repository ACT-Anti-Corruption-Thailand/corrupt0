"use client";

import BareDropdown from "./BareDropdown";

import type { BareDropdownBaseProps, DropdownData } from "./BareDropdown";

const CLASSNAME = {
  button:
    "w-[110px] md:w-[165px] rounded-5 px-5 py-2 bg-white-10 border border-gray-6 text-white b4",
  listbox: "rounded-5 overflow-hidden translate-y-5",
  option:
    "px-5 py-2 bg-white border-b border-b-gray-5 last:border-b-0 text-black b4 ui-selected:bg-gray-2 ui-active:bg-gray-2",
};

type DropdownBaseProps<T extends DropdownData> = Omit<
  BareDropdownBaseProps<T>,
  "arrowSrc" | "className"
>;

export interface DropdownSingleProps<T extends DropdownData>
  extends DropdownBaseProps<T> {
  value: T[number];
  setValue: (value: T[number]) => void;
  multiple?: false;
}

export interface DropdownMultipleProps<T extends DropdownData>
  extends DropdownBaseProps<T> {
  value: T;
  setValue: (value: T) => void;
  multiple: true;
}

export default function Dropdown({
  data,
  value,
  setValue,
  multiple,
}: DropdownSingleProps<string[]> | DropdownMultipleProps<string[]>) {
  return multiple ? (
    <BareDropdown
      className={CLASSNAME}
      data={data}
      value={value}
      setValue={setValue}
      arrowSrc="/icons/caret-w.svg"
      multiple
    />
  ) : (
    <BareDropdown
      className={CLASSNAME}
      data={data}
      value={value}
      setValue={setValue}
      arrowSrc="/icons/caret-w.svg"
    />
  );
}
