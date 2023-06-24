"use client";

import clsx from "clsx";

import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { ReactNode } from "react";

type DropdownDataType =
  | string[]
  | {
      data: any;
      label: ReactNode;
    }[];

export interface DropdownProps<T extends DropdownDataType> {
  data: T;
  value: T[number];
  setValue: (value: T[number]) => void;
  arrowSrc?: string;
  className?: {
    root?: string;
    button?: string;
    listbox?: string;
    option?: string;
  };
}

export default function Dropdown<T extends DropdownDataType>({
  data,
  value,
  setValue,
  arrowSrc,
  className,
}: DropdownProps<T>) {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className={clsx("relative", className?.root)}>
        <Listbox.Button
          className={clsx(
            "cursor-pointer flex justify-between items-center select-none",
            className?.button
          )}
        >
          <span className="truncate min-w-0">
            {typeof value === "string" ? value : value.label}
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
              {typeof d === "string" ? d : d.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
