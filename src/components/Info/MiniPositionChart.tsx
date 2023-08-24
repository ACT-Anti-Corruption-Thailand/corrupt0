"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { moneyFormatter } from "@/functions/moneyFormatter";

const ChartLabelList = ({ props, maxY }: { props: any; maxY: number }) => {
  const { x, y, width, height, value } = props;

  if (value && maxY === value)
    return (
      <text
        x={x + width / 2}
        y={value > 60 ? y + 15 : y - 5}
        width={width}
        height={height}
        fill="#808080"
        offset="5"
        className="recharts-text b8"
        textAnchor="middle"
      >
        <tspan x={x + width / 2} dy="0em">
          {value} %
        </tspan>
      </text>
    );
  return;
};

interface MiniPositionChartProps {
  refValue?: number;
  data: {
    x: number;
    y?: number;
  }[];
  hasData: boolean;
}

export function MiniPositionChart({ refValue, data, hasData }: MiniPositionChartProps) {
  if (hasData) {
    const maxY = Math.max(...data.map((e) => e.y ?? 0));
    return (
      <ResponsiveContainer height={110}>
        <BarChart
          width={200}
          height={150}
          data={data}
          barGap={1}
          barCategoryGap={1}
          margin={{
            left: 10,
            right: 10,
            bottom: -5,
          }}
        >
          {refValue && (
            <ReferenceLine x={refValue} stroke="#EC1C24" isFront strokeDasharray="3 3" />
          )}
          <YAxis dataKey="y" type="number" domain={[0, 100]} hide />
          <XAxis dataKey="x" xAxisId="data" hide />
          <XAxis
            type="number"
            dataKey="x"
            tickFormatter={moneyFormatter}
            scale="log"
            ticks={[
              1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
            ]}
            interval={1}
            domain={[1, 1e12]}
            fill="#3F3F3F"
            className="b8"
            axisLine={{ style: { stroke: "#666", strokeWidth: 1 } }}
          />
          <Bar dataKey="y" fill="#fff" minPointSize={0} xAxisId="data">
            <LabelList
              dataKey="y"
              position="top"
              content={(props) => <ChartLabelList props={props} maxY={maxY} />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <>
      <ResponsiveContainer height={110}>
        <BarChart
          width={200}
          height={150}
          data={data}
          barGap={1}
          barCategoryGap={1}
          margin={{
            left: 10,
            right: 10,
            bottom: -5,
          }}
        >
          {refValue && (
            <ReferenceLine x={refValue} stroke="#EC1C24" isFront strokeDasharray="3 3" />
          )}
          <YAxis dataKey="y" type="number" domain={[0, 100]} hide />
          <XAxis dataKey="x" xAxisId="data" hide />
          <XAxis
            type="number"
            dataKey="x"
            tickFormatter={moneyFormatter}
            scale="log"
            ticks={[
              1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
            ]}
            interval={1}
            domain={[1, 1e12]}
            fill="#3F3F3F"
            className="b8"
            axisLine={{ style: { stroke: "#666", strokeWidth: 1 } }}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center bg-white/10 text-white">
        <span className="mb-20">ไม่มีข้อมูล</span>
      </div>
    </>
  );
}
