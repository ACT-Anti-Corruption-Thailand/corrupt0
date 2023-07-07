import InfoDesktopAligner from "@/components/Info/DesktopAligner";
import InfoDonationSection from "@/components/Info/_Donation/Section";
import GoTop from "@/components/Info/GoTop";
import Sharer from "@/components/Sharer";
import Image from "next/image";

export default function Person({ params }: { params: { name: string } }) {
  return (
    <main>
      <GoTop name="กอบกุล ภิญโญ" />

      <InfoDesktopAligner
        left={
          <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
            {/* Basic Information */}
            <span className="b6 text-gray-5">
              อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
            </span>
            <span className="h2">กอบกุล ภิญโญ</span>
            <div className="flex gap-15 justify-center">
              <div className="flex flex-col">
                <Image
                  className="bg-gray-2 rounded-5 border border-black mb-5"
                  src="/placeholders/person.png"
                  width={90}
                  height={90}
                  alt=""
                />
                <span className="block b7 mb-2">แชร์โปรไฟล์นี้</span>
                <div className="flex gap-4 justify-center">
                  <Sharer />
                </div>
              </div>
              <div className="text-left">
                <span className="block b6 text-gray-5">อายุ ณ ปีที่ยื่น</span>
                <span className="block b4 font-bold">53 ปี</span>
                <span className="block b6 text-gray-5">อาชีพ</span>
                <span className="block b4 font-bold">ธุรกิจส่วนตัว</span>
              </div>
            </div>
          </section>
        }
      >
        {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
        <InfoDonationSection />
      </InfoDesktopAligner>
    </main>
  );
}
