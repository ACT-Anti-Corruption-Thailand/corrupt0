"use client";

import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// AxisTick
interface TickProps {
  key?: any;
  x: number;
  y: number;
  payload: { value: string };
}

const XTickLabel = ({ x, y, payload }: TickProps) => (
  <text x={x} y={y + 8} className="b7 fill-white" textAnchor="middle">
    {payload.value}
  </text>
);

const YTickLabel = ({ x, y, payload }: TickProps) => (
  <text x={x - 8} y={y} className="b7 fill-gray-5" dominantBaseline="middle">
    {payload.value}
  </text>
);

// LineDot
interface LineDotProps {
  key: any;
  cx: number;
  cy: number;
  width: number;
  height: number;
  stroke: string;
  r: number;
}

const LineDot = ({ key, cx, cy, width, height, stroke, r }: LineDotProps) => (
  <circle
    key={key}
    r={r}
    stroke={stroke}
    fill={stroke}
    width={width}
    height={height}
    cx={cx}
    cy={cy}
  />
);

// Main
interface PersonChartProps<X extends string, Y extends readonly string[]> {
  x: X;
  y: Y;
  yColors: string[];
  data: (Record<X, string> | Record<Y[number], number>)[];
}

export default function PersonChart<X extends string, Y extends readonly string[]>({
  x,
  y,
  yColors,
  data,
}: PersonChartProps<X, Y>) {
  if (y.length !== yColors.length)
    throw new Error(
      `PersonChart: \`y\` and \`yColors\` length don't match. Found ${y.length} and ${yColors.length}`
    );

  return (
    <ResponsiveContainer height={150}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 40, right: 20, bottom: 0, left: -40 }}
      >
        <CartesianGrid offset={0} />
        <XAxis
          dataKey={x}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          tick={XTickLabel}
        >
          <Label
            className="b7 -translate-y-4 md:-translate-y-5"
            value="ปี"
            offset={0}
            position="right"
          />
        </XAxis>
        <YAxis padding={{ top: 10 }} tickLine={false} tick={YTickLabel}>
          <Label
            className="b7 translate-x-40"
            offset={8}
            position="top"
            value="จำนวนเงิน (ล้านบาท)"
            width={1}
          />
        </YAxis>
        {y.map((yKey, i) => (
          <Line
            key={yKey}
            dataKey={yKey}
            type="linear"
            stroke={yColors?.[i] ?? "#fff"}
            strokeWidth={2}
            dot={LineDot}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
