import Footer from "@/components/Footer";
import ImgCard from "@/components/ImgCard";
import IndexDataCard from "@/components/Index/IndexDataCard";
import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Slider from "@/components/Slider";
import Spotlight from "@/components/Spotlight";
import Image from "next/image";

import PARTY_ASSETS from "@/data/color/partyAssets.json";
import PERSON_DONATION from "@/data/donation/donor.json";
import PARTY_DONATION from "@/data/donation/partyPerYearWithTotal.json";
import PERSON_BUSINESS_COUNT from "@/data/business_count.json";
import TOP_INCOME_ASSETS from "@/data/top_income_assets.json";

import DATA_PEOPLE from "@/data/people_search.json";
const PEOPLE_POSITION = Object.fromEntries(
  DATA_PEOPLE.map((e) => e.split("|")).filter((e) => e[1])
);

const normalizeName = (name: string) =>
  name.trim().replace(/\s+/g, " ").replace(/ํา/g, "ำ");
const getFileName = (formal_name: string) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

const TOP_PERSON = PERSON_DONATION.filter((e) => e.title === "บุคคลธรรมดา")[0];
const TOP_BUSINESS = PERSON_DONATION.filter((e) => e.title === "นิติบุคคล")[0];
const TOP_PARTY = PARTY_DONATION.ทุกปี[0];

export default function Home() {
  return (
    <>
      <Navbar floating />
      <Spotlight />
      <main className="text-center pt-50">
        <p className="text-white h3 mb-20 lg:h1">มีอะไรให้ดูใน ACT Ai?</p>
        <section className="flex flex-wrap justify-center gap-10">
          <div className="py-20 px-10 bg-white rounded-10 mb-10 w-[100vw] lg:max-w-[47vw]">
            <ImgCard href="/info" imgPath="/images/asset_politician.png">
              <div className="flex justify-between">
                <p className="h3">
                  ดูข้อมูลนักการเมือง
                  <br />
                  เเละเจ้าหน้าที่รัฐ
                </p>
                <Image
                  className="w-auto h-[17px] -rotate-90 md:h-40"
                  src="./icons/arr-w.svg"
                  width={17}
                  height={17}
                  alt=""
                />
              </div>
              <ul className="list-outside list-disc ml-[2ch] b4">
                <li>สถานะทางการเงินเเละการยื่นบัญชีทรัพย์สินฯ</li>
                <li>ความเกี่ยวข้องกับธุรกิจและโครงการภาครัฐ</li>
                <li>เงินบริจาคพรรคการเมือง</li>
                <li>ความเกี่ยวข้องกับคดีความ</li>
              </ul>
            </ImgCard>
            <p className="text-black b3 font-bold my-10">ข้อมูลที่น่าสนใจ</p>
            <Slider>
              <IndexDataCard
                title="มีทรัพย์สินมากที่สุด"
                color="red"
                name={TOP_INCOME_ASSETS.assets[0].name.replace(/-/g, " ")}
                type={PEOPLE_POSITION[TOP_INCOME_ASSETS.assets[0].name]}
                amount={TOP_INCOME_ASSETS.assets[0].value}
                icon="/placeholders/person.png"
                link={TOP_INCOME_ASSETS.assets[0].name}
              />
              <IndexDataCard
                title="มีรายได้มากที่สุด"
                color="red"
                name={TOP_INCOME_ASSETS.income[0].name.replace(/-/g, " ")}
                type={PEOPLE_POSITION[TOP_INCOME_ASSETS.income[0].name]}
                amount={TOP_INCOME_ASSETS.income[0].value}
                icon="/placeholders/person.png"
                link={TOP_INCOME_ASSETS.income[0].name}
              />
              <IndexDataCard
                title="มีความเกี่ยวข้องกับธุรกิจมากที่สุด"
                color="red"
                name={PERSON_BUSINESS_COUNT[0].name.replace(/-/g, " ")}
                type={PEOPLE_POSITION[PERSON_BUSINESS_COUNT[0].name]}
                amount={PERSON_BUSINESS_COUNT[0].count}
                unit="ธุรกิจ"
                icon="/placeholders/person.png"
                link={PERSON_BUSINESS_COUNT[0].name}
              />
            </Slider>
          </div>
          <div className="py-20 px-10 bg-white rounded-10 mb-10 w-[100vw] lg:max-w-[47vw]">
            <ImgCard href="/donation" imgPath="/images/asset_donation.png">
              <div className="flex justify-between">
                <p className="h3">
                  ดูข้อมูลเงินบริจาค
                  <br />
                  พรรคการเมือง
                </p>
                <Image
                  className="w-auto h-[17px] -rotate-90 md:h-40"
                  src="./icons/arr-w.svg"
                  width={17}
                  height={17}
                  alt=""
                />
              </div>
              <ul className="list-outside list-disc ml-[2ch] b4">
                <li>ยอดบริจาคที่น่าสังเกตของบุคคล/นิติบุคคล</li>
              </ul>
            </ImgCard>
            <p className="text-black b3 font-bold my-10">ข้อมูลที่น่าสนใจ</p>
            <Slider>
              <IndexDataCard
                title="พรรคที่ได้รับบริจาคมากที่สุด"
                color="purple"
                name={"พรรค" + TOP_PARTY.party}
                amount={TOP_PARTY.amount}
                icon={
                  (
                    PARTY_ASSETS as Record<
                      string,
                      { color: string | null; image: string | null }
                    >
                  )[TOP_PARTY.party]?.image ?? "/placeholders/party.png"
                }
                link={"พรรค" + TOP_PARTY.party}
              />
              <IndexDataCard
                title="นิติบุคคลที่บริจาคให้พรรคการเมืองมากที่สุด"
                color="purple"
                name={TOP_BUSINESS.name}
                amount={TOP_BUSINESS.total}
                icon="/placeholders/business.png"
                link={getFileName(normalizeName(TOP_BUSINESS.name))}
              />
              <IndexDataCard
                title="บุคคลที่บริจาคให้พรรคการเมืองมากที่สุด"
                color="purple"
                name={TOP_PERSON.name}
                type={PEOPLE_POSITION[TOP_PERSON.name]}
                amount={TOP_PERSON.total}
                icon="/placeholders/person.png"
                link={TOP_PERSON.name.replace(/\s/g, "-")}
              />
            </Slider>
          </div>
        </section>

        <section
          style={{
            backgroundImage: "url('/images/asset_political_transparency_bg.png')",
          }}
          className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mb-20 lg:mb-30 b5 lg:b3 px-10 lg:px-[30vw]"
        >
          <Image
            className="h-[208px] w-[208px] lg:h-[310px] lg:w-[310px] object-cover mb-20 mt-40 lg:mb-40 lg:mt-[200px]"
            src="/images/asset_glass.png"
            width={310}
            height={310}
            alt="political-transparency"
          />
          <p className="mb-20 lg:mb-30">
            ความโปร่งใสทางการเมือง (Political Transparency)
            คือการเปิดโอกาสให้ประชาชนทุกคนเข้าถึงและตั้งคำถาม เกี่ยวกับที่มา อำนาจ
            และการปฏิบัติหน้าที่ ของนักการเมืองและเจ้าหน้าที่รัฐได้
          </p>
          <p className="mb-20 lg:mb-30">
            ACT Ai จึงถูกพัฒนาขึ้น เพื่อเป็นฐานข้อมูลความโปร่งใส
            ของนักการเมืองและเจ้าหน้าที่รัฐ ที่ประชาชนทุกคนสามารถค้นหา
            และตรวจสอบข้อมูลได้โดยง่าย เพื่อปกป้องสิทธิของตัวเอง
            และผลประโยชน์ของส่วนรวมร่วมกัน
          </p>
          <p>
            นอกจากนี้ คุณยังสามารถช่วยสร้างฐานข้อมูลนี้ ด้วยการช่วยแปลงข้อมูลเป็นดิจิทัล
            ข้อมูลในฐานข้อมูล ความโปร่งใสของ ACT Ai
          </p>
          <div
            style={{
              backgroundImage: `url('/images/asset_digital_data.png')`,
            }}
            className="my-30 py-[25px] px-30 rounded-5 bg-cover bg-center flex items-center text-white mx-20 border border-gray-5"
          >
            <p className="b3 text-right">ร่วมแปลงข้อมูลเป็นดิจิทัล</p>
            <Image
              src="/icons/external-w.svg"
              className="w-[25px] h-auto pl-10 md:w-30"
              width={25}
              height={22}
              alt=""
            />
          </div>
        </section>
      </main>

      <section className="bg-white text-black rounded-t-5 py-30 px-[25px] text-center flex flex-col gap-10 b4 md:gap-20">
        <p className="font-bold">
          แชร์ชวนเพื่อน ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบ
          เพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai
        </p>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-5 items-center justify-center leading-1">
          <span>Share</span>
          <Sharer desktopBigger />
        </div>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-8 items-center justify-center">
          <span>Powered by</span>
          <Image
            className="w-auto h-30 md:h-40"
            src="/logos/actai-k.svg"
            width={26.8}
            height={20}
            alt="act ai"
          />
        </div>
        <div className="flex gap-8 items-center justify-center">
          <span>Co-Developed by</span>
          <Image
            className="w-auto h-20 md:h-30"
            src="/logos/pu.svg"
            width={50.12}
            height={14.5}
            alt="punch up"
          />
          <Image
            className="w-auto h-20 md:h-30"
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
