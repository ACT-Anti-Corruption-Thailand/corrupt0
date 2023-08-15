"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { moneyFormatter } from "@/functions/moneyFormatter";

const DATA = [
  {
    x0: 1,
  },
  {
    x0: 10,
  },
  {
    x0: 100,
  },
  {
    x0: 1e3,
  },
  {
    x0: 10e3,
  },
  {
    y: 6.7,
    x0: 100e3,
  },
  {
    y: 4.5,
    x0: 1e6,
  },
  {
    y: 61.2,
    x0: 10e6,
  },
  {
    y: 23.9,
    x0: 100e6,
  },
  {
    y: 3.7,
    x0: 1e9,
  },
  {
    x0: 10e9,
  },
  {
    x0: 100e9,
  },
];

interface PositionChartProps {
  refValue?: number;
}

export function PositionChart({ refValue }: PositionChartProps) {
  return (
    <ResponsiveContainer height={200}>
      <BarChart
        width={500}
        height={300}
        data={DATA}
        barGap={1}
        barCategoryGap={1}
        margin={{
          left: 10,
          right: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid fill="white" fillOpacity={0.1} />
        {refValue && (
          <ReferenceLine x={refValue} stroke="#EC1C24" isFront strokeDasharray="3 3" />
        )}
        <XAxis dataKey="x0" xAxisId="data" hide />
        <XAxis
          type="number"
          dataKey="x0"
          tickFormatter={moneyFormatter}
          scale="log"
          ticks={[1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12]}
          domain={[1, 1e12]}
          interval={0}
          tick={{
            textAnchor: "end",
          }}
          fill="#3F3F3F"
          className="b7"
          angle={-45}
          axisLine={false}
        />
        <Bar dataKey="y" fill="#fff" minPointSize={1} xAxisId="data">
          <LabelList dataKey="y" position="top" fill="#808080" className="b7" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
