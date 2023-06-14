import Image from "next/image";

import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <>
      <Navbar floating />
      <Spotlight />
      <main className="text-center py-50">
        <section className="mb-20 b5 px-10">
          <p className="mb-20">
            ความโปร่งใสทางการเมือง (Political Transparency)
            คือการเปิดโอกาสให้ประชาชนทุกคนเข้าถึงและตั้งคำถาม เกี่ยวกับที่มา อำนาจ
            และการปฏิบัติหน้าที่ ของนักการเมืองและเจ้าหน้าที่รัฐได้
          </p>
          <p className="mb-20">
            ACT Ai จึงถูกพัฒนาขึ้น เพื่อเป็นฐานข้อมูลความโปร่งใส
            ของนักการเมืองและเจ้าหน้าที่รัฐ ที่ประชาชนทุกคนสามารถค้นหา
            และตรวจสอบข้อมูลได้โดยง่าย เพื่อปกป้องสิทธิของตัวเอง
            และผลประโยชน์ของส่วนรวมร่วมกัน
          </p>
          <p>
            นอกจากนี้ คุณยังสามารถช่วยสร้างฐานข้อมูลนี้ ด้วยการช่วยแปลงข้อมูลเป็นดิจิทัล
            ข้อมูลในฐานข้อมูล ความโปร่งใสของ ACT Ai
          </p>
        </section>
      </main>

      <section className="bg-white text-black font-bold rounded-t-5 py-30 px-[36px] text-center flex flex-col gap-10 b7">
        <p>
          แชร์ชวนเพื่อน ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบ
          เพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai
        </p>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-5 items-center justify-center leading-1">
          <span>Share</span>
          <Sharer />
        </div>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-8 items-center justify-center">
          <span>Powered by</span>
          <Image
            className="w-auto h-20"
            src="./logos/actai-k.svg"
            width={26.8}
            height={20}
            alt="act ai"
          />
        </div>
        <div className="flex gap-8 items-center justify-center">
          <span>Co-Developed by</span>
          <Image
            className="w-auto h-10"
            src="./logos/pu.svg"
            width={50.12}
            height={14.5}
            alt="punch up"
          />
          <Image
            className="w-auto h-10"
            src="./logos/hand.svg"
            width={43.68}
            height={16}
            alt="hand"
          />
        </div>
      </section>
      <Footer className="bg-gray-1 !rounded-0" />
    </>
  );
}
