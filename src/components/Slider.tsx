"use client";
import type { ReactNode } from "react";

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps) => (
  <div className="overflow-x-auto pb-10 carousel-scrollbar flex-1">
    <div className="flex gap-10 w-max mx-auto h-full">{children}</div>
  </div>
);

export default Slider;
