"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Slider = (props: Props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: "auto",
      spacing: 10,
      origin: 0,
    },
    mode: "free",
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
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map(
            (idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  style={
                    {
                      "--dot-color": `${currentSlide === idx ? "#000" : "#AAAAAA"}`,
                    } as React.CSSProperties
                  }
                  className="border-none w-10 h-10 rounded-[50%] mb-5 mt-20 mx-2 p-5 cursor-pointer focus:outline-none bg-[var(--dot-color)]"
                />
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default Slider;
