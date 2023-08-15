import Image from "next/image";
import { moneyFormatter, formatThousands } from "@/functions/moneyFormatter";
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import Link from "next/link";

interface GraphCardProps {
  number: [number, string];
  max: [number, string];
  min: [number, string];
  title?: string;
  refValue?: number;
}

const data = [
  {
    name: 1000000,
    amount: 2,
  },
  {
    name: 4234567,
    amount: 13,
  },
  {
    name: 5000000,
    amount: 8,
  },
];

const InfoHistChart = (props: GraphCardProps) => {
  return (
    <Link
      href={`/info/${props.title}`}
      className="bg-white-10 text-gray-4 rounded-5 p-10 lg:p-20 my-10 flex gap-5 lg:gap-20 w-full no-underline"
    >
      <div className="flex-2 flex flex-col text-left">
        <p className="b5 lg:b3 text-white font-bold">{props.title}</p>
        <p className="b6 lg:b4">{props.number.join(" ")}</p>
      </div>
      <div className="flex-2 min-w-0 pointer-events-none flex items-center">
        <ResponsiveContainer height={110}>
          <BarChart width={200} height={150} data={data}>
            {props.refValue && (
              <ReferenceLine
                x={props.refValue}
                stroke="#EC1C24"
                isFront
                strokeDasharray="3 3"
              />
            )}
            <XAxis
              type="number"
              dataKey="name"
              fill="3F3F3F"
              domain={["auto", "auto"]}
              tickFormatter={moneyFormatter}
            />
            <Bar dataKey="amount" fill="#fff" minPointSize={1} />
          </BarChart>
        </ResponsiveContainer>
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
