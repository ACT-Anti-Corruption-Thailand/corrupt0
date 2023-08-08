"use client";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MONTHS } from "@/constants/abbr";

import {
  formatThousands,
  moneyFormatter,
  thaiMoneyFormatter,
} from "@/functions/moneyFormatter";

import type { Payload } from "recharts/types/component/DefaultTooltipContent";

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
  <text
    x={x - 8}
    y={y}
    className="b7 fill-gray-5"
    dominantBaseline="middle"
    stroke="#000"
    strokeWidth={6}
    paintOrder="stroke"
  >
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

// Tooltip
const fmtThMoney = (value: number) => {
  const [val, unit] = thaiMoneyFormatter(value);
  return `${formatThousands(val)} ${unit}`;
};

interface TooltipProps {
  payload: Payload<string | number | (string | number)[], string | number>[];
  label: string;
  isMonth: boolean;
}

const StyledTooltip = ({ payload, label, isMonth }: TooltipProps) => (
  <div className="rounded-5 bg-black-50 text-white b6 p-5">
    <p className="font-bold leading-1">{isMonth ? MONTHS[+label - 1] : label}</p>
    <ul>
      {[...payload]
        .sort((a, z) => {
          if (typeof a.value === "number" && typeof z.value === "number")
            return z.value - a.value;
          return 0;
        })
        .map((e) => (
          <li key={e.name} className="leading-1">
            {e.name}: {fmtThMoney(+(e?.value ?? 0))}
          </li>
        ))}
    </ul>
  </div>
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
    <ResponsiveContainer height={200}>
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
        <Tooltip
          content={(e) =>
            e.active &&
            e.payload?.length && (
              <StyledTooltip isMonth={isMonth} label={e.label} payload={e.payload} />
            )
          }
        />
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
