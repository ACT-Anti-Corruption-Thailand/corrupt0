"use client";

import Image from "next/image";

export default function SearchBackButton() {
  return (
    <button
      className="absolute top-10 right-10 z-10"
      type="button"
      onClick={() => window.history.back()}
    >
      <Image
        className="w-auto h-15"
        src="/icons/cross.svg"
        width={15}
        height={15}
        alt="กลับ"
      />
    </button>
  );
}
