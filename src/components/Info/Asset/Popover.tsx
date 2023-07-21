"use client";

import clsx from "clsx";
import { useState } from "react";

import { Popover } from "@headlessui/react";
import Image from "next/image";
import { usePopper } from "react-popper";

import type { ReactNode } from "react";

interface PersonPropertyPopoverProps {
  children: ReactNode;
  className?: string;
  triggerDiv?: boolean;
}

export default function InfoAssetPopover({
  className,
  children,
  triggerDiv,
}: PersonPropertyPopoverProps) {
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
          offset: [0, 10],
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
          src="/icons/question-light.svg"
          width={15}
          height={15}
          alt="อ่านรายละเอียดเพิ่มเติม"
        />
      </Popover.Button>

      <Popover.Panel
        className="w-[200px] p-10 bg-white rounded-5 shadow-popover z-10 text-black b4 font-normal text-left"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
}
