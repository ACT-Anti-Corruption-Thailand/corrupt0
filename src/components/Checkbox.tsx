"use client";

import clsx from "clsx";

import Image from "next/image";
import { Switch } from "@headlessui/react";
import { ReactNode } from "react";

interface CheckboxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  children: ReactNode;
  checkSrc?: string;
  className?: {
    root?: string;
    checkbox?: string;
  };
}

export default function Checkbox({
  checked,
  setChecked,
  children,
  checkSrc,
  className,
}: CheckboxProps) {
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      className={clsx("flex items-center gap-5", className?.root)}
    >
      <div
        className={clsx(
          "w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center",
          className?.checkbox
        )}
        arid-hidden="true"
      >
        <Image
          className="ui-not-checked:opacity-0 w-10 h-8 transition-opacity duration-100"
          src={checkSrc ?? "/icons/check.svg"}
          width={10}
          height={8}
          alt=""
        />
      </div>
      {children}
    </Switch>
  );
}
