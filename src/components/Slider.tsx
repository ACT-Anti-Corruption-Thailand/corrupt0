"use client";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import type { MutableRefObject, ReactNode } from "react";

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps) => {
  const elSlider = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(elSlider);

  return (
    <div
      ref={elSlider}
      {...events}
      className="overflow-x-auto pb-10 carousel-scrollbar flex-1 cursor-grab"
    >
      <div className="flex gap-10 w-max mx-auto h-full">{children}</div>
    </div>
  );
};

export default Slider;
