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
    <div className="bg-white bg-opacity-10 text-gray-4 rounded-5 lg:b4 p-10 lg:p-20 mx-5 my-10 flex flex-row gap-5 lg:gap-20 items-start text-18 w-[90vw] min-w-[300px] max-w-[850px]">
      <div className="flex flex-col items-start grow-[2]">
        <p className="text-20 lg:b3 text-white text-left">{props.title}</p>
        <p>{props.number.join("")}</p>
      </div>
      <div className="w-[80%] h-[110px] lg:w-[300px] lg:h-[120px] grow-[2]">
      <ResponsiveContainer>
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
      </div>
      
      <div className="flex flex-col items-end min-w-[60px] lg:pl-40 grow-1">
        <p>{props.max[0]}</p>
        <p className="lg:b6">{props.max[1]}</p>
        <p>{props.min[0]}</p>
        <p className="lg:b6">{props.min[1]}</p>
      </div>
      <Image
        className="-rotate-90 ml-4 w-12 h-10 lg:w-[27px] lg:h-[23px]"
        src="/icons/arr-g.svg"
        width={27}
        height={23}
        alt="arrow"
      />
    </div>
  );
};

export default GraphCard;
