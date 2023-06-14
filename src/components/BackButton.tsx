"use client";

import Image from "next/image";

export default function BackButton() {
  return (
    <button
      className="flex w-auto mr-auto px-15 h-32 gap-5 items-center"
      type="button"
      onClick={() => window.history.back()}
    >
      <Image src="/icons/arr-l.svg" width={18} height={16} alt="" />
      <span>กลับ</span>
    </button>
  );
}
