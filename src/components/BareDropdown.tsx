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
}: BareDropdownMultipleProps<T>): JSX.Element;
export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple = false,
  arrowSrc,
  className,
}: BareDropdownSingleProps<T>): JSX.Element;
export default function BareDropdown<T extends DropdownData>({
  data,
  value,
  setValue,
  multiple = undefined,
  arrowSrc,
  className,
}: BareDropdownSingleProps<T>): JSX.Element;
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
              ? value.length
                ? value.map((v) => (typeof v === "string" ? v : v.label)).join(", ")
                : "(ไม่มี)"
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
          className={clsx("absolute z-10 w-full select-none", className?.listbox)}
        >
          {data.map((d) => (
            <Listbox.Option
              className={clsx(
                "select-none cursor-pointer",
                multiple && "flex items-center gap-5",
                !multiple && "ui-selected:cursor-default",
                className?.option
              )}
              key={typeof d === "string" ? d : d.data}
              value={d}
            >
              {multiple && (
                <div
                  className={clsx(
                    "w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center",
                    value.some((v) => v === d) && "bg-black"
                  )}
                  arid-hidden="true"
                >
                  <Image
                    className={clsx(
                      "w-10 h-8 transition-opacity duration-100 opacity-0",
                      value.some((v) => v === d) && "opacity-100"
                    )}
                    src="/icons/check-w.svg"
                    width={10}
                    height={8}
                    alt=""
                  />
                </div>
              )}
              {typeof d === "string" ? d : d.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
