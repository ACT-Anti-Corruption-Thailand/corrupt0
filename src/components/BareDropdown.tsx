"use client";

import clsx from "clsx";

import { Listbox } from "@headlessui/react";
import Image from "next/image";

import type { ReactNode } from "react";

export type DropdownDetailedData = {
  data: any;
  label: ReactNode;
};

export type DropdownData = string[] | DropdownDetailedData[];

export interface BareDropdownBaseProps<T extends DropdownData> {
  data: T;
  arrowSrc?: string;
  className?: {
    root?: string;
    button?: string;
    listbox?: string;
    option?: string;
  };
}

export interface BareDropdownSingleProps<T extends DropdownData>
  extends BareDropdownBaseProps<T> {
  value: T[number];
  setValue: (value: T[number]) => void;
  multiple?: false;
}

export interface BareDropdownMultipleProps<T extends DropdownData>
  extends BareDropdownBaseProps<T> {
  value: T;
  setValue: (value: T) => void;
  multiple: true;
}

export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple = true,
  arrowSrc,
  className,
}: BareDropdownMultipleProps<T>): JSX.Element
export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple = false,
  arrowSrc,
  className,
}: BareDropdownSingleProps<T>): JSX.Element
export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple = undefined,
  arrowSrc,
  className,
}: BareDropdownSingleProps<T>): JSX.Element
export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple,
  arrowSrc,
  className,
}: BareDropdownSingleProps<T> | BareDropdownMultipleProps<T>) {
  return (
    <Listbox
      value={value}
      onChange={multiple ? setValue : setValue}
      multiple={multiple ?? false}
    >
      <div className={clsx("relative", className?.root)}>
        <Listbox.Button
          className={clsx(
            "cursor-pointer flex justify-between items-center select-none",
            className?.button
          )}
        >
          <span className="truncate min-w-0">
            {multiple
              ? value.map((v) => (typeof v === "string" ? v : v.label)).join(", ")
              : typeof value === "string"
              ? value
              : value.label}
          </span>
          {arrowSrc && (
            <Image
              className="ui-open:rotate-180"
              src={arrowSrc}
              width={8}
              height={8}
              alt=""
            />
          )}
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            "absolute z-10 min-w-full w-max select-none",
            className?.listbox
          )}
        >
          {data.map((d) => (
            <Listbox.Option
              className={clsx(
                "ui-not-selected:cursor-pointer select-none",
                className?.option
              )}
              key={typeof d === "string" ? d : d.data}
              value={d}
            >
              {multiple && (value.some((v) => v === d) ? "✅" : "⬛️")}
              {typeof d === "string" ? d : d.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
