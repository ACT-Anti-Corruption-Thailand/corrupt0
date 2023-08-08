"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { CSSProperties } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

const Spotlight = () => {
  const mousePos = useMousePosition();

  return (
    <>
      <div
        style={
          {
            backgroundImage: 'url("/images/bg_desktop.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maskImage: "linear-gradient(rgba(0, 0, 0, 1) 80%, transparent)",
            "--x": `clamp( -30px, calc((${
              mousePos.x ? mousePos.x + "px" : "50vw"
            } - 50vw)/10), 30px)`,
            "--y": `clamp( -30px, calc((${
              mousePos.y ? mousePos.y + "px" : "50vh"
            } - 50vh)/10), 30px)`,
            "--rec-x": `calc(var(--x) + 50%)`,
          } as CSSProperties
        }
        className="bg-black flex flex-col justify-center items-center h-[70vh] lg:h-[90vh] py-[10vh] relative overflow-hidden"
      >
        <div className="bg-white opacity-50 w-[150vmax] h-[320px] lg:h-[600px] blur-sm -rotate-45 absolute origin-[0%_50%] translate-x-[--rec-x] translate-y-[--y]" />
        <div className="bg-white w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full blur-sm absolute translate-x-[--x] translate-y-[--y]" />
        <Image
          className="w-[160px] lg:w-[400px] absolute -translate-x-[calc((var(--x)/4)+10px)] -translate-y-[calc((var(--y)/4)+45px)]"
          src="/logos/c0-shadow.svg"
          alt="logo"
          width={240}
          height={240}
        />
        <Image
          className="w-[160px] lg:w-[400px]"
          src="/logos/c0-k.svg"
          alt="logo"
          width={240}
          height={240}
        />

        {/* <p className="text-white fixed bg-black">{JSON.stringify(mousePos)}</p> */}
        <p className="text-black text-center b3 mt-20">
          ค้นหาและตรวจสอบข้อมูล
          <br />
          ความโปร่งใสของนักการเมือง
          <br />
          และเจ้าหน้าที่รัฐ
        </p>
      </div>
      <div className="text-center">
        <div className="b4 flex flex-wrap items-center justify-center gap-5 md:gap-10">
          <span className="font-bold">ร่วมพัฒนาโดย</span>
          <Image
            className="w-auto h-20 md:h-[35px]"
            src="/logos/act-w.svg"
            width={20}
            height={20}
            alt="act"
          />
          <Image
            className="w-auto h-[12px] md:h-[21px]"
            src="/logos/hand-w.svg"
            width={33.71}
            height={12}
            alt="hand"
          />
          <Image
            className="w-auto h-[12.57px] md:h-[21px]"
            src="/logos/pu-w.svg"
            width={43.43}
            height={12.57}
            alt="punch up"
          />
        </div>
        <p className="opacity-50 b5">
          อัปเดตล่าสุด: {new Date().toLocaleDateString("th")}
        </p>
      </div>
    </>
  );
};

export default Spotlight;
