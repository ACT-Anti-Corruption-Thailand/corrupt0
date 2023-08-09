"use client";
import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Slider = (props: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: "auto",
      spacing: 10,
    },
    mode: "free-snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {props.children}
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="flex px-10 justify-center">
          {Array(instanceRef.current.track.details.maxIdx + 1).fill``.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={clsx(
                "border-none w-10 h-10 rounded-[50%] mb-5 mt-20 mx-2 p-5 cursor-pointer focus:outline-none",
                currentSlide === idx ? "bg-black" : "bg-gray-4"
              )}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Slider;
