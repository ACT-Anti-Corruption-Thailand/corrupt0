import Image from "next/image";
import { moneyFormatter, formatThousands } from "@/functions/moneyFormatter";
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import Link from "next/link";
import { MiniPositionChart } from "./Info/MiniPositionChart";

interface GraphCardProps {
  number: [number, string];
  max: [number, string];
  min: [number, string];
  title?: string;
  refValue?: number;
  data: {
    x: number;
    y?: number;
  }[];
}

const InfoHistChart = (props: GraphCardProps) => {
  return (
    <Link
      href={`/info/${props.title?.replace(/\//g, "")}`}
      className="bg-white/10 text-gray-4 rounded-5 p-10 lg:p-20 my-10 flex gap-5 lg:gap-20 w-full no-underline"
    >
      <div className="flex-2 flex flex-col text-left">
        <p className="b5 lg:b3 text-white font-bold">{props.title}</p>
        <p className="b6 lg:b4">{props.number.join(" ")}</p>
      </div>
      <div className="flex-2 min-w-0 pointer-events-none flex items-center">
        <MiniPositionChart
          data={props.data}
          refValue={props.refValue}
          hasData={props.number[0] > 0}
        />
      </div>
      <div className="flex-1 flex flex-col items-end min-w-[60px]">
        <p className="b6 lg:b4 text-value-positive-text">
          {formatThousands(props.max[0])}
        </p>
        <p className="b7 lg:b6 text-value-positive-text leading-1 mb-5">{props.max[1]}</p>
        <p className="b6 lg:b4">{formatThousands(props.min[0])}</p>
        <p className="b7 lg:b6 leading-1">{props.min[1]}</p>
      </div>
      <Image
        className="-rotate-90 w-12 h-auto lg:w-[27px] lg:-ml-10 self-start"
        src="/icons/arr-g.svg"
        width={27}
        height={23}
        alt=""
      />
    </Link>
  );
};

export default InfoHistChart;
