"use client";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { histMoneyFormatter } from "@/functions/moneyFormatter";

const ChartLabelList = ({ props, maxYIndex }: { props: any; maxYIndex: number }) => {
  const { x, y, width, height, value, index } = props;

  if (index === 0 && value)
    return (
      <text
        x={x + width / 2}
        y={value >= 50 ? y + 15 : y - 25}
        width={width}
        height={height}
        fill={value >= 50 ? "#fff" : "#808080"}
        offset="5"
        className="recharts-text b8"
        textAnchor="middle"
      >
        <tspan x={x + width / 2} dy="0em">
          ไม่มี
        </tspan>
        <tspan x={x + width / 2} dy="1em">
          ข้อมูล
        </tspan>
      </text>
    );

  if (maxYIndex === index)
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
          {Math.round(+value * 100) / 100} %
        </tspan>
      </text>
    );
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
    const maxY = Math.max(...data.slice(1).map((e) => e.y ?? 0));
    const maxYIdx = data.slice(1).findIndex((e) => e.y === maxY) + 1;
    return (
      <ResponsiveContainer height={110}>
        <BarChart
          width={200}
          height={150}
          data={data}
          barGap={0}
          barCategoryGap={0}
          margin={{
            left: 10,
            right: 10,
            bottom: 5,
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
            tickFormatter={histMoneyFormatter}
            scale="log"
            ticks={[
              0.1, 1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
            ]}
            interval={0}
            domain={[1, 1e12]}
            tick={{
              textAnchor: "end",
            }}
            angle={-30}
            fill="#3F3F3F"
            className="b8"
            axisLine={{ style: { stroke: "#666", strokeWidth: 1 } }}
          />
          <Bar dataKey="y" fill="#fff" xAxisId="data">
            {data.map((_, index) =>
              index === 0 ? (
                <Cell
                  key={`cell-${index}`}
                  fill="#666"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "bottom",
                    transform: "scaleX(.75)",
                  }}
                />
              ) : (
                <Cell key={`cell-${index}`} />
              )
            )}
            <LabelList
              dataKey="y"
              content={(props) => <ChartLabelList props={props} maxYIndex={maxYIdx} />}
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
          barGap={0}
          barCategoryGap={0}
          margin={{
            left: 10,
            right: 10,
            bottom: 5,
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
            tickFormatter={histMoneyFormatter}
            scale="log"
            ticks={[
              0.1, 1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
            ]}
            interval={0}
            domain={[1, 1e12]}
            tick={{
              textAnchor: "end",
            }}
            angle={-30}
            fill="#3F3F3F"
            className="b8"
            axisLine={{ style: { stroke: "#666", strokeWidth: 1 } }}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center bg-white/10 text-white b7 md:b6">
        <span className="mb-20">ไม่มีข้อมูล</span>
      </div>
    </>
  );
}
