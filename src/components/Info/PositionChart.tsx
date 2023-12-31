"use client";
import { histMoneyFormatter } from "@/functions/moneyFormatter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const ChartLabelList = ({ props }: { props: any }) => {
  const { x, y, width, height, value, index } = props;

  if (index === 0 && value)
    return (
      <text
        x={x + width / 2}
        y={value >= 50 ? y + 15 : y - 45}
        width={width}
        height={height}
        fill="#808080"
        offset="5"
        className="recharts-text b7"
        textAnchor="middle"
      >
        <tspan x={x + width / 2} dy="0em">
          ไม่มี
        </tspan>
        <tspan x={x + width / 2} dy="1em">
          ข้อมูล
        </tspan>
        <tspan x={x + width / 2} dy="1em">
          {Math.round(+value * 100) / 100} %
        </tspan>
      </text>
    );

  if (value)
    return (
      <text
        x={x + width / 2}
        y={value > 60 ? y + 15 : y - 5}
        width={width}
        height={height}
        fill="#808080"
        offset="5"
        className="recharts-text b7"
        textAnchor="middle"
      >
        <tspan x={x + width / 2} dy="0em">
          {Math.round(+value * 100) / 100} %
        </tspan>
      </text>
    );
};

const ChartTick = ({ props }: { props: any }) =>
  props.index !== 0 && (
    <g transform={`translate(${props.x},${props.y})`}>
      <text
        fill="#666"
        className="recharts-text recharts-cartesian-axis-tick-value b7"
        textAnchor="end"
        style={{
          transformBox: "fill-box",
          transformOrigin: "top right",
          transform: "rotate(-30deg)",
        }}
      >
        <tspan dy="0.71em">{histMoneyFormatter(props.payload.value)}</tspan>
      </text>
    </g>
  );

interface PositionChartProps {
  refValue?: number;
  data: {
    x: number;
    y?: number;
  }[];
  hasData: boolean;
}

export function PositionChart({ refValue, data, hasData }: PositionChartProps) {
  return (
    <>
      <ResponsiveContainer height={200}>
        <BarChart
          width={500}
          height={300}
          data={data}
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
          <YAxis dataKey="y" type="number" domain={[0, 100]} hide />
          <XAxis dataKey="x" xAxisId="data" hide />
          <XAxis
            type="number"
            dataKey="x"
            scale="log"
            ticks={[
              0.1, 1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
            ]}
            domain={[1, 1e12]}
            interval={0}
            tick={(props) => <ChartTick props={props} />}
            axisLine={false}
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
              content={(props) => <ChartLabelList props={props} />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {!hasData && (
        <div className="absolute inset-10 top-0 bottom-0 flex items-center justify-center bg-white/10 text-white b7 md:b6">
          <span className="mb-30">ไม่มีข้อมูล</span>
        </div>
      )}
    </>
  );
}
