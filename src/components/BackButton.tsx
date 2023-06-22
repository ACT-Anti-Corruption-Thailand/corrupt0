"use client";

import Image from "next/image";

export default function BackButton() {
  return (
    <button
      className="flex w-auto mr-auto px-15 h-32 gap-5 items-center b4 font-bold"
      type="button"
      onClick={() => window.history.back()}
    >
      <Image
        className="w-auto h-[16px] rotate-90"
        src="/icons/arr-w.svg"
        width={18}
        height={16}
        alt=""
      />
      <span>กลับ</span>
    </button>
  );
}
