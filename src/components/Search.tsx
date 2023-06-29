"use client";

import React from "react";
import { useEffect, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";

const people = [
  { id: 1, name: "Wade Cooper", title: "Regional Paradigm Technician" },
  { id: 2, name: "Arlene Mccoy", title: "Hello" },
  { id: 3, name: "Devon Webb", title: "jasf" },
  { id: 4, name: "Tom Cook", title: "asf" },
  { id: 5, name: "Tanya Fox", title: "asf" },
  { id: 6, name: "Hellen Schmidt", title: "asf" },
];

const Search = () => {
  const [selected, setSelected] = React.useState(people[0]);
  const [query, setQuery] = React.useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative ">
        <div className="relative w-[80vw] my-10 cursor-default overflow-hidden rounded-lg text-left focus:outline-none">
          <Combobox.Input
            placeholder="ค้นหาด้วยชื่อ/นามสกุล"
            className="w-full border-none px-15 py-5 b3 text-black bg-white rounded-full"
            displayValue={(person: any) => person.name}
            onChange={(event) => setQuery(event.target.value)}
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
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-10 max-h-100 w-full overflow-auto rounded-5 bg-white py-1 ring-opacity-5 focus:outline-none z-[999]">
            {filteredPeople.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-black">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-1 text-black" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate text-black border-b-1 border-gray-2 py-5 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <div className="text-24">{person.name}</div>
                        <div className="b5 text-gray-4">{person.title}</div>
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Search;
