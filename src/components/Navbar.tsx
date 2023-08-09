import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavbarProps {
  back?: {
    text: string;
    href: string;
  };
}

export default function Navbar({ back }: NavbarProps) {
  return (
    <>
      <nav
        className={twMerge(
          clsx(
            "h-50 flex items-center px-10 gap-5 z-10 b5 md:h-[100px] md:px-20 border-b border-b-transparent md:b2 md:gap-10",
            back ? "bg-black border-b-gray-6" : "-mb-50 md:-mb-[100px]"
          )
        )}
      >
        <Link className="mr-auto" href="/">
          <Image
            className="w-auto h-[43px] md:h-[75px]"
            src="/logos/c0-w.svg"
            width={40.54}
            height={43}
            alt="Act AI"
          />
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full px-10 py-5 md:px-15"
          href="/info"
        >
          ข้อมูลบุคคล
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full px-10 py-5 md:px-15"
          href="/donation"
        >
          ข้อมูลเงินบริจาค
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full p-8 inline-flex items-center justify-center md:p-[13px]"
          href="/search"
        >
          <Image
            className="h-auto w-[18px] md:w-[23px]"
            src="/icons/search.svg"
            width={18}
            height={18}
            alt="ค้นหา"
          />
        </Link>
      </nav>
      {back && (
        <Link
          href={back.href}
          className="flex w-auto mr-auto px-15 h-40 gap-5 items-center b4 font-bold"
        >
          <Image
            className="w-auto h-[16px] rotate-90"
            src="/icons/arr-w.svg"
            width={18}
            height={16}
            alt=""
          />
          <span>{back.text}</span>
        </Link>
      )}
    </>
  );
}
