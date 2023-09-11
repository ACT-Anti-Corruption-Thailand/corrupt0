"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import type { CSSProperties } from "react";
import type { Engine } from "tsparticles-engine";

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

const Backgroud = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      className="static h-0"
      options={{
        style: {
          position: "absolute",
          width: "100%",
          height: "100%",
        },
        particles: {
          number: {
            value: 10,
            density: {
              enable: true,
              value_area: 100,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "image",
            image: {
              src: "/images/node.png",
              width: 22,
              height: 22,
            },
          },
          opacity: {
            value: 1,
          },
          size: {
            value: 11,
          },
          line_linked: {
            enable: true,
            distance: 200,
            color: "#4A4A4A",
            opacity: 1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

const Spotlight = ({ update }: { update: string }) => {
  const mousePos = useMousePosition();

  return (
    <>
      <div
        style={
          {
            "--mouse-x": mousePos.x ? mousePos.x + "px" : "50vw",
            "--mouse-y": mousePos.y ? mousePos.y + "px" : "50vh",
            "--x": `clamp(-30px,calc((var(--mouse-x) - 50vw)/10),30px)`,
            "--y": `clamp(-30px,calc((var(--mouse-y) - 50vh)/10),30px)`,
            "--rec-x": `calc(var(--x) + 50%)`,
          } as CSSProperties
        }
        className="flex flex-col justify-center items-center min-h-[400px] h-[70vh] lg:min-h-[700px] lg:h-[90vh] relative overflow-hidden"
      >
        <Backgroud />
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black to-black/0" />
        <div className="bg-white opacity-50 w-[150vmax] h-[320px] md:h-[450px] lg:h-[600px] blur-sm -rotate-45 absolute origin-[0%_50%] translate-x-[--rec-x] translate-y-[--y]" />
        <div className="bg-white aspect-square w-auto h-[320px] md:h-[450px] lg:h-[600px] rounded-full blur-sm absolute translate-x-[--x] translate-y-[--y]" />
        <Image
          className="h-auto w-[160px] md:w-[250px] lg:w-[350px] absolute -translate-x-[calc((var(--x)/4)+10px)] -translate-y-[calc((var(--y)/4)+45px)]"
          src="/logos/c0-shadow.svg"
          alt="logo"
          width={240}
          height={240}
          priority
        />
        <Image
          className="h-auto w-[160px] md:w-[250px] lg:w-[350px]"
          src="/logos/c0-k.svg"
          alt="logo"
          width={240}
          height={240}
          priority
        />
        <p className="text-black text-center b3 select-none md:-mt-5 lg:-mt-10">
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
          <a
            href="http://www.anticorruption.in.th/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-20 md:h-[35px]"
              src="/logos/act-w.svg"
              width={20}
              height={20}
              alt="act"
              priority
            />
          </a>
          <a
            href="https://hand.co.th/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-[12px] md:h-[21px]"
              src="/logos/hand-w.svg"
              width={33.71}
              height={12}
              alt="hand"
              priority
            />
          </a>
          <a
            href="https://punchup.world/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-[12.57px] md:h-[21px]"
              src="/logos/pu-w.svg"
              width={43.43}
              height={12.57}
              alt="punch up"
              priority
            />
          </a>
          <a
            href="https://www.boonmeelab.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-[12px] md:h-[21px]"
              src="/logos/bml.svg"
              width={41.48}
              height={12}
              alt="boonmee lab"
              priority
            />
          </a>
        </div>
        <p className="opacity-50 b5">อัปเดตล่าสุด: {update}</p>
      </div>
    </>
  );
};

export default Spotlight;
