import Image from "next/image";

interface ChartSortProps {
  name: string;
}

export default function ChartSort(props: ChartSortProps) {
  return (
    <div className="flex">
      <label>
        <input name={props.name} className="peer hidden" type="radio" defaultChecked/>
        <div className="border-1 lg:border-2 border-white border-opacity-50 peer-checked:border-opacity-100 peer-checked:opacity-100 opacity-50 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-l-5 flex justify-center items-center">
          <Image
            src="/icons/ascending.svg"
            width={20}
            height={15}
            alt="ascending"
            className="w-12 h-[9px] lg:w-20 lg:h-15"
          />
        </div>
      </label>
      <label>
        <input name={props.name} className="peer hidden" type="radio" />
        <div className="border-1 lg:border-2 border-white border-opacity-50 peer-checked:border-opacity-100 peer-checked:opacity-100 opacity-50 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-r-5 flex justify-center items-center">
          <Image
            src="/icons/descending.svg"
            width={20}
            height={15}
            alt="descending"
            className="w-12 h-[9px] lg:w-20 lg:h-15"
          />
        </div>
      </label>
    </div>
  );
}
