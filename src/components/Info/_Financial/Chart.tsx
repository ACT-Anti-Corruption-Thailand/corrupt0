"use client";
import type { CSSProperties } from "react";
import { safePercent } from "./Section";

interface InfoFinancialChartProps {
  actor: number;
  spouse: number;
  child: number;
  max: number;
}

export const InfoFinancialChart = ({
  actor,
  spouse,
  child,
  max,
}: InfoFinancialChartProps) => {
  const total = actor + spouse + child;

  return (
    <div
      className="flex border border-black h-20 mb-2 w-[--w]"
      style={{ "--w": `${safePercent(total, max)}%` } as CSSProperties}
    >
      {actor > 0 && (
        <div
          className="w-[--w] bg-black"
          style={{ "--w": `${safePercent(actor, total)}%` } as CSSProperties}
        />
      )}
      {spouse > 0 && (
        <div
          className="w-[--w] bg-black opacity-40"
          style={{ "--w": `${safePercent(spouse, total)}%` } as CSSProperties}
        />
      )}
      {child > 0 && (
        <div
          className="w-[--w] bg-black opacity-20"
          style={{ "--w": `${safePercent(child, total)}%` } as CSSProperties}
        />
      )}
    </div>
  );
};
