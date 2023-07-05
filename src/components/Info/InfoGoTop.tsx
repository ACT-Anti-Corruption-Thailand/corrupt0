"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { inView } from "motion";

import Image from "next/image";

export default function GoTop({ name }: { name: string }) {
  const elHitbox = useRef(null);
  const [showGoTopBar, setShowGoTopBar] = useState(false);

  useEffect(() => {
    if (elHitbox.current) {
      document.documentElement.style.scrollPaddingTop = "50px";

      const stop = inView(elHitbox.current, () => {
        setShowGoTopBar(() => false);

        return () => setShowGoTopBar(() => true);
      });

      return () => {
        document.documentElement.style.scrollPaddingTop = "";
        stop();
      };
    }
  }, [elHitbox]);

  return (
    <>
      {/* hitbox */}
      <div
        ref={elHitbox}
        className="absolute top-0 left-0 w-full h-[50svh] pointer-events-none"
      />
      <button
        type="button"
        className={clsx(
          "fixed top-0 lg:hidden left-0 bg-black w-full flex items-center justify-between py-10 px-15 transition-transform z-10",
          !showGoTopBar && "-translate-y-full"
        )}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="b3 font-bold">{name}</span>
        <Image
          className="h-[17px] w-auto rotate-180"
          src="/icons/arr-w.svg"
          alt=""
          width={17}
          height={17}
        />
      </button>
    </>
  );
}
