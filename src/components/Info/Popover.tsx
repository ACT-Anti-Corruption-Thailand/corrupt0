"use client";

import clsx from "clsx";
import { useState } from "react";

import { Popover } from "@headlessui/react";
import Image from "next/image";
import { usePopper } from "react-popper";

import type { ReactNode } from "react";

interface InfoPopoverProps {
  children: ReactNode;
  className?: string;
  triggerDiv?: boolean;
  buttonImg?: string;
}

export default function InfoPopover({
  className,
  children,
  triggerDiv,
  buttonImg = "/icons/question.svg",
}: InfoPopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 12],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top", "bottom"],
        },
      },
    ],
  });

  return (
    <Popover className={clsx("flex items-center", className)}>
      <Popover.Button
        ref={setReferenceElement}
        as={triggerDiv ? "div" : "button"}
        className="cursor-pointer"
      >
        <Image
          className="md:w-20 md:h-20"
          src={buttonImg}
          width={15}
          height={15}
          alt="อ่านรายละเอียดเพิ่มเติม"
        />
      </Popover.Button>

      <Popover.Panel
        className="group w-max max-w-[250px] p-10 bg-white rounded-5 shadow-dropdown z-10 text-black b4 font-normal text-left"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
        <div
          data-popper-arrow
          className="bg-white rotate-45 w-10 h-10 absolute top-0 group-data-[popper-placement=top]:top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Popover.Panel>
    </Popover>
  );
}
