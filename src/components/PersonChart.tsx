"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

type DataRecord = { x: string; y1: number; y2: number };
const data: DataRecord[] = [
  { x: "2558", y1: 1, y2: 3 },
  { x: "2559", y1: 2, y2: 2 },
  { x: "2560", y1: 3, y2: 1 },
  { x: "2561", y1: 4, y2: 2 },
  { x: "2562", y1: 3, y2: 3 },
  { x: "2563", y1: 2, y2: 4 },
];

const XAxisLabel = (props: { x: number; y: number; payload: { value: any } }) => {
  const { x, y, payload } = props;

  return (
    <text x={x} y={y + 6} className="b7 fill-white" textAnchor="middle">
      {payload.value}
    </text>
  );
};

const YAxisLabel = (props: { x: number; y: number; payload: { value: any } }) => {
  const { x, y, payload } = props;

  return (
    <text x={x - 2} y={y} className="b7 fill-gray-5" dominantBaseline="middle">
      {payload.value}
    </text>
  );
};

export default function PersonChart() {
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 40, right: 10, bottom: 0, left: -40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          tick={XAxisLabel}
        >
          <Label className="b7" value="ปี" offset={0} position="right" />
        </XAxis>
        <YAxis tickLine={false} tick={YAxisLabel}>
          <Label
            className="b7"
            offset={10}
            position="top"
            value="จำนวนเงิน (ล้านบาท)"
            width={10}
            style={{
              transform: "translateX(40px)",
            }}
          />
        </YAxis>
        <Line dataKey="y1" stroke="#8884d8" isAnimationActive={false} type="linear" />
        <Line dataKey="y2" stroke="#82ca9d" isAnimationActive={false} type="linear" />
      </LineChart>
    </ResponsiveContainer>
  );
}
