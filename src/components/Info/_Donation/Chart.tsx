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
import { moneyFormatter } from "@/functions/moneyFormatter";

import { MONTHS } from "@/constants/abbr";

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

const XTickMonthLabel = ({ x, y, payload }: TickProps) => (
  <XTickLabel
    x={x}
    y={y}
    payload={{
      value: MONTHS[+payload.value - 1],
    }}
  />
);

const YTickLabel = ({ x, y, payload }: TickProps) => (
  <text x={x - 8} y={y} className="b7 fill-gray-5" dominantBaseline="middle">
    {Number.isNaN(+payload.value) ? payload.value : moneyFormatter(+payload.value)}
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
  value: any;
}

const LineDot = ({ key, cx, cy, width, height, stroke, r, value }: LineDotProps) =>
  value && (
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
interface InfoDonationChartProps<X extends string, Y extends readonly string[]> {
  x: X;
  y: Y;
  yColors: string[];
  data: (Record<X, string> | Record<Y[number], number>)[];
  isMonth?: boolean;
}

export default function InfoDonationChart<X extends string, Y extends readonly string[]>({
  x,
  y,
  yColors,
  data,
  isMonth = false,
}: InfoDonationChartProps<X, Y>) {
  if (y.length !== yColors.length)
    throw new Error(
      `PersonChart: \`y\` and \`yColors\` length don't match. Found ${y.toString()} and ${yColors.toString()}`
    );

  return (
    <ResponsiveContainer height={150}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 40, right: 30, bottom: 0, left: -40 }}
      >
        <CartesianGrid offset={0} />
        <XAxis
          dataKey={x}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          tick={isMonth ? XTickMonthLabel : XTickLabel}
        >
          <Label
            className="b7 -translate-y-4 md:-translate-y-5"
            value={isMonth ? "เดือน" : "ปี"}
            offset={0}
            position="right"
          />
        </XAxis>
        <YAxis padding={{ top: 10 }} tickLine={false} tick={YTickLabel}>
          <Label
            className="b7 translate-x-40"
            offset={8}
            position="top"
            value="จำนวนเงิน"
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
            animationDuration={500}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
