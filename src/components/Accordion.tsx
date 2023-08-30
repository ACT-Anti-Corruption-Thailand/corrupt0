"use client";

import clsx from "clsx";

import { Disclosure } from "@headlessui/react";

import type { ReactNode } from "react";

interface AccordionProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  open?: boolean;
}

export default function Accordion({
  trigger,
  children,
  className,
  open = false,
}: AccordionProps) {
  return (
    <div className={className}>
      <Disclosure defaultOpen={open}>
        {({ open: _open }) => (
          <>
            <Disclosure.Button className="w-full">{trigger}</Disclosure.Button>
            <Disclosure.Panel
              static
              className={clsx(
                "grid will-change-[grid-template-rows] transition-all overflow-hidden grid-rows-[0fr]",
                _open && "grid-rows-[1fr]"
              )}
              aria-hidden={!_open}
            >
              <div className={clsx("min-h-0 transition-all", !_open && "!m-0")}>
                {children}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
