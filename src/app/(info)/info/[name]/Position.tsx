import ImgCard from "@/components/ImgCard";
import PositionTab from "@/components/Info/PositionTab";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";

import DATA_PEOPLE from "@/data/people_search.json";

const PEOPLE = DATA_PEOPLE.filter((e) => e.at(-1) === "|").map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link: "/info/" + link,
    title: position,
  };
});

export default function Position({ params }: { params: { name: string } }) {
  const position = params.name;

  return (
    <>
      <Navbar
        back={{
          href: "/",
          text: "หน้าหลัก",
        }}
      />
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_politician.png" className="w-full">
          <div className="flex flex-col justify-center my-auto py-30 lg:mx-[20vw] lg:p-[70px]">
            <Image
              className="self-center mb-10 h-[45px] lg:h-100"
              src="../icons/financial.svg"
              width={100}
              height={100}
              alt="financial"
            />
            <p className="text-center h1">ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ</p>
          </div>
        </ImgCard>
        <p className="text-gray-5 b3 lg:b6 mt-20">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </p>
        <Search placeholder="ค้นหาด้วยชื่อ/นามสกุล" data={PEOPLE} />
        <div className="w-[90vw] border-1 border-gray-4 lg:mt-20 lg:w-full" />
        <Link
          href="/info"
          className="flex w-auto mr-auto ml-15 mt-10 gap-5 items-center b4 font-bold text-gray-4 lg:mt-20 lg:ml-20"
        >
          <Image
            className="w-auto h-[16px] rotate-90"
            src="/icons/arr-g.svg"
            width={18}
            height={16}
            alt=""
          />
          <span>สำรวจตามกลุ่มตำแหน่ง</span>
        </Link>
        <p className="h3 font-black text-white my-10 lg:my-20 lg:h2">{position}</p>
        <div className="text-center b6 lg:b5 pb-10 lg:pb-30 w-[90vw] lg:w-[70vw]">
          <PositionTab />
        </div>
      </section>
    </>
  );
}
