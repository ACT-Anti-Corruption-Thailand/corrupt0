"use client";

import BareDropdown from "./BareDropdown";

import type { BareDropdownProps } from "./BareDropdown";

export default function Dropdown<T extends string[]>({
  data,
  value,
  setValue,
}: Omit<BareDropdownProps<T>, "className" | "arrowSrc">) {
  return (
    <BareDropdown
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
}
