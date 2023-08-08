"use client";
import clsx from "clsx";
import { useState } from "react";
import { usePopper } from "react-popper";

import { Popover } from "@headlessui/react";
import Image from "next/image";

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
          offset: [0, 5],
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
    <Popover className={clsx("inline-flex items-center", className)}>
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
      </Popover.Panel>
    </Popover>
  );
}
