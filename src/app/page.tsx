import Image from "next/image";

import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";
import ImgCard from "@/components/ImgCard";
import Slider from "@/components/Slider";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <Navbar floating />
      <Spotlight />
      <main className="text-center pt-50">
        <p className="text-white text-30 mb-20 font-black ">
          มีอะไรให้ดูในเว็บไซต์นี้?
        </p>
        <section className="py-20 px-10 bg-white rounded-10 mb-10">
          <ImgCard imgPath="/images/asset_politician.png">
            <div className="flex flex-row items-center justify-between">
              <p className="text-32 self-start text-left">
                ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ
              </p>
              <Image
                className="w-[17px] h-[17px] -rotate-90"
                src="./icons/arr-w.svg"
                width={17}
                height={17}
                alt="arrow"
              />
            </div>
            <ul className="list-outside ml-[2ch] list-disc text-left">
              <li>สถานะทางการเงินเเละการยื่นบัญชีทรัพย์สินฯ</li>
              <li>ความเกี่ยวข้องกับธุรกิจและโครงการภาครัฐ</li>
              <li>เงินบริจาคพรรคการเมือง</li>
              <li>ความเกี่ยวข้องกับคดีความ</li>
            </ul>
          </ImgCard>
          <p className="text-black text-24 my-10">ข้อมูลที่น่าสนใจ</p>
          <Slider>
            <Card
              title="มีทรัพย์สินมากที่สุด"
              color="#ED1C24"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#ED1C24"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#ED1C24"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#ED1C24"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#ED1C24"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
          </Slider>
        </section>
        <section className="py-20 px-10 bg-white rounded-10 mb-10">
          <ImgCard imgPath="/images/asset_donation.png">
          <div className="flex flex-row items-center justify-between">
              <p className="text-32 self-start text-left">
                ดูข้อมูลเงินบริจาคพรรคการเมือง
              </p>
              <Image
                className="w-[17px] h-[17px] -rotate-90"
                src="./icons/arr-w.svg"
                width={17}
                height={17}
                alt="arrow"
              />
            </div>
            <ul className="list-outside ml-[2ch] list-disc text-left">
              <li>ยอดบริจาคที่น่าสังเกตของบุคคล/นิติบุคคล</li>
            </ul>
          </ImgCard>
          <p className="text-black text-24 my-10">ข้อมูลที่น่าสนใจ</p>
          <Slider>
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#9B8CCD"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#9B8CCD"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#9B8CCD"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#9B8CCD"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
            <Card
              title="พรรคที่ได้รับบริจาคมากที่สุด"
              color="#9B8CCD"
              type="พรรค"
              name="พลังประชารัฐ"
              amount="500 ล้านบาท"
              icon="/icons/person.svg"
            />
          </Slider>
        </section>
        <Image
          className="h-[380px] object-cover"
          src="/images/asset_political_transparency.png"
          width={1281}
          height={500}
          alt="political-transparency"
        />
        <section className="mb-20 b5 px-10">
          <p className="mb-20">
            ความโปร่งใสทางการเมือง (Political Transparency)
            คือการเปิดโอกาสให้ประชาชนทุกคนเข้าถึงและตั้งคำถาม เกี่ยวกับที่มา
            อำนาจ และการปฏิบัติหน้าที่ ของนักการเมืองและเจ้าหน้าที่รัฐได้
          </p>
          <p className="mb-20">
            ACT Ai จึงถูกพัฒนาขึ้น เพื่อเป็นฐานข้อมูลความโปร่งใส
            ของนักการเมืองและเจ้าหน้าที่รัฐ ที่ประชาชนทุกคนสามารถค้นหา
            และตรวจสอบข้อมูลได้โดยง่าย เพื่อปกป้องสิทธิของตัวเอง
            และผลประโยชน์ของส่วนรวมร่วมกัน
          </p>
          <p>
            นอกจากนี้ คุณยังสามารถช่วยสร้างฐานข้อมูลนี้
            ด้วยการช่วยแปลงข้อมูลเป็นดิจิทัล ข้อมูลในฐานข้อมูล ความโปร่งใสของ
            ACT Ai
          </p>
          <div
            style={
              {
                backgroundImage: `url('/images/asset_digital_data.png')`,
              } as React.CSSProperties
            }
            className="my-30 py-10 px-20 rounded-10 relative bg-cover bg-center bg-no-repeat flex flex-col text-white justify-start mx-20"
          >
            <div className="flex flex-row justify-center items-center p-20">
              <p className="text-32 self-start text-left">
                ร่วมแปลงข้อมูลเป็นดิจิตอล
              </p>
              <Image
                src="/icons/external-w.svg"
                className="w-[25px] h-[22px] pl-10"
                width={25}
                height={22}
                alt=""
              />
            </div>
          </div>
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
            src="/logos/actai-k.svg"
            width={26.8}
            height={20}
            alt="act ai"
          />
        </div>
        <div className="flex gap-8 items-center justify-center">
          <span>Co-Developed by</span>
          <Image
            className="w-auto h-10"
            src="/logos/pu.svg"
            width={50.12}
            height={14.5}
            alt="punch up"
          />
          <Image
            className="w-auto h-10"
            src="/logos/hand.svg"
            width={43.68}
            height={16}
            alt="hand"
          />
        </div>
      </section>
      <Footer className="bg-gray-2 !rounded-0" />
    </>
  );
}
