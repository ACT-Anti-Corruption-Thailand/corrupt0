"use client";
import { useState } from "react";

import { Popover } from "@headlessui/react";
import Image from "next/image";
import { usePopper } from "react-popper";

import type { ReactNode } from "react";

interface PersonPropertyPopoverProps {
  children: ReactNode;
}

export default function AltNames({ children }: PersonPropertyPopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <Popover className="flex items-center justify-center -mt-5">
      <Popover.Button
        ref={setReferenceElement}
        className="flex b6 text-gray-5 items-center justify-center"
      >
        <span>ชื่อ-นามสกุล เดิม</span>
        <Image
          className="ui-open:rotate-180 ml-2"
          src="/icons/caret-g.svg"
          width={10}
          height={10}
          alt=""
        />
      </Popover.Button>
      <Popover.Panel
        // className="rounded-5 bg-gray-2 b7 text-gray-5 py-5 px-10 z-10"
        className="py-5 px-10 bg-white rounded-5 shadow-popover z-10 text-black b7 font-normal text-left"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
}
