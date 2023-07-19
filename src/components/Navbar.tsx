import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";

interface NavbarProps {
  floating?: boolean;
}

export default function Navbar({ floating = false }: NavbarProps) {
  return (
    <>
      <nav
        className={clsx(
          "h-50 flex items-center px-10 gap-5 z-10 b5 md:h-[75px] md:px-20",
          floating ? "-mb-50 md:-mb-[75px]" : "bg-black border-b border-b-gray-6"
        )}
      >
        <Link className="mr-auto" href="/">
          <Image
            className="w-auto h-[43px] md:h-[64px]"
            src="/logos/actai-w.svg"
            width={40.54}
            height={43}
            alt="Act AI"
          />
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full px-10 py-5"
          href="/info"
        >
          ข้อมูลบุคคล
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full px-10 py-5"
          href="/donation"
        >
          ข้อมูลเงินบริจาค
        </Link>
        <Link
          className="border border-gray-6 bg-black rounded-full p-8 inline-flex items-center justify-center"
          href="/search"
        >
          <Image src="/icons/search.svg" width={18} height={18} alt="ค้นหา" />
        </Link>
      </nav>
      {!floating && <BackButton />}
    </>
  );
}
