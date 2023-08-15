import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

interface SortByBtnProps {
  sort: "asc" | "desc";
  setSort: Dispatch<SetStateAction<"asc" | "desc">>;
}

export default function SortByBtn({ sort, setSort }: SortByBtnProps) {
  return (
    <RadioGroup value={sort} onChange={setSort}>
      <RadioGroup.Label className="sr-only">เรียงจาก</RadioGroup.Label>
      <div className="flex">
        <RadioGroup.Option
          value="desc"
          className="cursor-pointer border lg:border-2 border-white opacity-50 ui-checked:opacity-100 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-l-5 flex justify-center items-center"
        >
          <Image
            src="/icons/ascending.svg"
            width={20}
            height={15}
            alt="ascending"
            className="w-12 h-[9px] lg:w-20 lg:h-15"
          />
          <span className="sr-only">มากไปน้อย</span>
        </RadioGroup.Option>
        <RadioGroup.Option
          value="asc"
          className="cursor-pointer border lg:border-2 -ml-1 lg:-ml-2 border-white opacity-50 ui-checked:opacity-100 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-r-5 flex justify-center items-center"
        >
          <Image
            src="/icons/descending.svg"
            width={20}
            height={15}
            alt="descending"
            className="w-12 h-[9px] lg:w-20 lg:h-15"
          />
          <span className="sr-only">น้อยไปมาก</span>
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
}
