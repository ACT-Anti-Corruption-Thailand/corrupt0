"use client";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Combobox } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

import { highlightChar } from "@/functions/searchHighlighter";

import type { Dispatch, ReactNode, SetStateAction } from "react";

type SearchData = {
  name: string;
  title?: string;
  link?: string;
};

interface ComboboxOptProps {
  person: SearchData;
  children: ReactNode;
}

const ComboboxOpt = ({ person, children }: ComboboxOptProps) => {
  return person.link ? (
    <Link href={person.link} target="_blank">
      {children}
    </Link>
  ) : (
    children
  );
};

interface SearchProps<T extends SearchData> {
  data: T[];
  placeholder: string;
  selected?: T;
  setSelected?: Dispatch<SetStateAction<T | null>>;
  className?: string;
}

function Search<T extends SearchData>(props: SearchProps<T>) {
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(() => {
    if (query === "") {
      props.setSelected?.(null);
      return [];
    }
    return props.data.filter((e) => e.name.includes(query));
  }, [props, query]);

  return (
    <Combobox value={props.selected} onChange={props.setSelected}>
      <div className={clsx("relative", props.className)}>
        <div className="relative w-[80vw] lg:w-[40vw] my-10 cursor-default overflow-hidden rounded-lg text-left focus:outline-none">
          <Combobox.Input
            placeholder={props.placeholder}
            className="w-full border-none placeholder:text-gray-5 placeholder:b3 px-15 py-5 b3 text-black focus:bg-white bg-gray-4 rounded-full"
            displayValue={(person: SearchData | null) => person?.name ?? ""}
            onChange={(event) => setQuery(event.target.value?.trim() ?? "")}
          />
          <Combobox.Button className="absolute inset-y-0 right-15 flex items-center">
            <Image
              className="h-[19px]"
              src="/icons/search-k.svg"
              alt="search"
              width={19}
              height={19}
            />
          </Combobox.Button>
        </div>
        <Combobox.Options className="text-black absolute max-h-[400px] w-full overflow-auto rounded-5 bg-white py-1 ring-opacity-5 focus:outline-none z-[999] select-none">
          {query === "" ? (
            <div className="cursor-default py-5 px-10 b3">กรุณากรอกคำค้นหา</div>
          ) : filteredPeople.length === 0 ? (
            <div className="cursor-default py-5 px-10 b3">
              ไม่พบชื่อ &quot;{query}&quot;
            </div>
          ) : (
            <>
              {filteredPeople.slice(0, 10).map((person) => (
                <Combobox.Option
                  key={person.name}
                  className={({ active }) =>
                    clsx(
                      "cursor-pointer select-none",
                      active ? "bg-gray-1" : "text-gray-900"
                    )
                  }
                  value={person}
                >
                  <ComboboxOpt person={person}>
                    <div className="border-b-1 border-gray-2 py-5 mx-10">
                      <div
                        className="b3"
                        dangerouslySetInnerHTML={{
                          __html: highlightChar(person.name, query),
                        }}
                      />
                      <div className="b5 text-gray-4">{person?.title}</div>
                    </div>
                  </ComboboxOpt>
                </Combobox.Option>
              ))}
              {filteredPeople.length > 10 && (
                <div className="b3 py-5 px-10 cursor-default">
                  ... อีก {(filteredPeople.length - 10).toLocaleString("th-TH")} คน
                </div>
              )}
            </>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

export default Search;
