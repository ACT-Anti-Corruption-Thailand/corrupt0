import Image from "next/image";
import { moneyFormatter } from "@/functions/moneyFormatter";

import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from "recharts";

interface GraphCardProps {
  title?: string;
  number: [string | number, string];
  max: [string | number, string];
  min: [string | number, string];
  ref?: number;
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

const GraphCard = (props: GraphCardProps) => {
  return (
    <div className="bg-white bg-opacity-10 text-gray-4 rounded-5 p-10 m-5 flex flex-row gap-5 items-start text-18 w-[90vw] min-w-[300px] max-w-[850px]">
      <div className="flex flex-col items-start grow-[2]">
        <p className="text-20 text-white text-left">{props.title}</p>
        <p>{props.number.join("")}</p>
      </div>
      <ResponsiveContainer width="80%" height={110} className="grow-[2]">
        <BarChart width={200} height={150} data={data}>
          <ReferenceLine
            x={1637239}
            stroke="#EC1C24"
            isFront={true}
            strokeDasharray="3 3"
          />
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
      <div className="flex flex-col items-end min-w-[60px] grow-1">
        <p>{props.max[0]}</p>
        <p>{props.max[1]}</p>
        <p>{props.min[0]}</p>
        <p>{props.min[1]}</p>
      </div>
      <Image
        className="-rotate-90 ml-4"
        src="/icons/arr-g.svg"
        width={12}
        height={10}
        alt="arrow"
      />
    </div>
  );
};

export default GraphCard;
