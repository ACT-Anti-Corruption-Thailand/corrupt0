"use client";

import React from "react";
import Image from "next/image";

const Spotlight = () => {
  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    React.useEffect(() => {
      const updateMousePosition = (ev: MouseEvent) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };
      window.addEventListener("mousemove", updateMousePosition);
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
  };

  const mousePos = useMousePosition();

  return (
    <>
      <div
        style={
          {
            "--x": `clamp( -30px, calc((${
              mousePos.x ? mousePos.x + "px" : "50vw"
            } - 50vw)/10), 30px)`,
            "--y": `clamp( -30px, calc((${
              mousePos.y ? mousePos.y + "px" : "50vh"
            } - 50vh)/10), 30px)`,
            "--rec-x": `calc(var(--x) + 50%)`,
          } as React.CSSProperties
        }
        className="bg-black flex flex-col justify-center items-center h-[50vh] pt-[10vh] relative overflow-hidden"
      >
        <div className="bg-white opacity-50 w-[150vmax] h-[320px] blur-sm -rotate-45 absolute origin-[0%_50%] translate-x-[--rec-x] translate-y-[--y]" />
        <div className="bg-white w-[320px] h-[320px] rounded-full blur-sm absolute translate-x-[--x] translate-y-[--y]" />
        <Image
          className="w-[160px] absolute -translate-x-[calc((var(--x)/4)+10px)] -translate-y-[calc((var(--y)/4)+45px)]"
          src="/logos/actai-shadow.svg"
          alt="logo"
          width={240}
          height={240}
        />
        <Image
          className="w-[160px]"
          src="/logos/actai-k.svg"
          alt="logo"
          width={240}
          height={240}
        />

        {/* <p className="text-white fixed bg-black">{JSON.stringify(mousePos)}</p> */}
        <p className="text-black text-center text-24 mt-20">
          ค้นหาและตรวจสอบข้อมูล
          <br />
          ความโปร่งใสของนักการเมือง
          <br />
          และเจ้าหน้าที่รัฐ
        </p>
      </div>
      <div className="text-center pt-40">
        <p className="text-14 text-gray-5">ร่วมพัฒนาโดย ACT / HAND SE / PUNCH UP</p>
        <p className="text-20 text-gray-5 opacity-50">อัปเดตล่าสุด: 00/00/255</p>
      </div>
    </>
  );
};

export default Spotlight;
