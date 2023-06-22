"use client";

import { VisAxis, VisLine, VisXYContainer } from "@unovis/react";
import { CurveType } from "@unovis/ts";

type DataRecord = { x: number; y1: number; y2: number };
const data: DataRecord[] = [
  { x: 2558, y1: 1, y2: 3 },
  { x: 2559, y1: 2, y2: 2 },
  { x: 2560, y1: 3, y2: 1 },
  { x: 2561, y1: 4, y2: 2 },
  { x: 2562, y1: 3, y2: 3 },
  { x: 2563, y1: 2, y2: 4 },
];

export default function PersonChart() {
  const x = (d: DataRecord) => d.x;
  const y = [(d: DataRecord) => d.y1, (d: DataRecord) => d.y2];

  return (
    <VisXYContainer data={data} height={150}>
      <VisLine x={x} y={y} curveType={CurveType.Linear} />
      <VisAxis type="x" numTicks={data.length} tickLine={undefined} />
      <VisAxis type="y" tickLine={undefined} />
    </VisXYContainer>
  );
}
