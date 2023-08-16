"use client";
import type { ReactNode } from "react";

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps) => (
  <div className="overflow-x-auto pb-10 carousel-scrollbar">
    <div className="flex gap-10 w-max mx-auto">{children}</div>
  </div>
);

export default Slider;
