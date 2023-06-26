import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

interface GraphCardProps {
  title?: string;
  number?: string;
  max?: string;
  min?: string;
  ref?: number;
}

const data = [
  {
    label: "1M",
    name: 1000000,
    amount: 2,
  },
  {
    label: "4M",
    name: 4000000,
    amount: 13,
  },
  {
    label: "5M",
    name: 5000000,
    amount: 8,
  }
];

const GraphCard = (props: GraphCardProps) => {
  return (
    <div className="bg-white bg-opacity-10 text-gray-4 rounded-5 p-10 m-5 flex flex-row gap-5 items-start text-18 w-[90vw] min-w-[300px] max-w-[850px]">
      <div className="flex flex-col items-start grow-[2]">
        <p className="text-20 text-white text-left">{props.title}</p>
        <p>{props.number}</p>
      </div>
      <ResponsiveContainer width="80%" height={110} className="grow-[2]" >
        <BarChart
          width={200}
          height={150}
          data={data}
        >
          <ReferenceLine x={1637239} stroke="#EC1C24" isFront={true} strokeDasharray="3 3" />
          <XAxis type="number" dataKey="name" fill="3F3F3F" domain={['auto', 'auto']}/>
          <Bar dataKey="amount" fill="#fff" minPointSize={1}></Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-col items-end min-w-[60px] grow-1">
        <p>{props.max?.split(" ")[0]}</p>
        <p>{props.max?.split(" ")[1]}</p>
        <p>{props.min?.split(" ")[0]}</p>
        <p>{props.min?.split(" ")[1]}</p>
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
