import Footer from "@/components/Footer";
import ImgCard from "@/components/ImgCard";
import IndexDataCard from "@/components/Index/IndexDataCard";
import Navbar from "@/components/Navbar";
import Sharer from "@/components/Sharer";
import Slider from "@/components/Slider";
import Spotlight from "@/components/Spotlight";
import Image from "next/image";

import PERSON_BUSINESS_COUNT from "@/data/business_count.json";
import PARTY_ASSETS from "@/data/color/partyAssets.json";
import PERSON_DONATION from "@/data/donation/donor.json";
import PARTY_DONATION from "@/data/donation/partyPerYearWithTotal.json";
import PERSON_LAWSUIT_COUNT from "@/data/lawsuit_count.json";
import NACC_PPL from "@/data/people_nacc.json";
import DATA_PEOPLE from "@/data/people_search.json";
import _POLITICIAN_IMAGES from "@/data/politicianImages.json";
import _TOP_INCOME_ASSETS from "@/data/top_income_assets.json";

const POLITICIAN_IMAGES = _POLITICIAN_IMAGES as Record<string, string | null>;

const TOP_INCOME_ASSETS = _TOP_INCOME_ASSETS as {
  assets: { name: string; value: number }[];
  income: { name: string; value: number }[];
};

const PEOPLE_POSITION = Object.fromEntries(
  DATA_PEOPLE.map((e) => e.split("|")).filter((e) => e[1])
);

const getFileName = (formal_name: string) =>
  formal_name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ํา/g, "ำ")
    .replace("ห้างหุ้นส่วนจำกัด", "หจก")
    .replace(/\s+|\/|\\/g, "-");

const TOP_POLITICIAN = PERSON_DONATION.find(
  (e) => e.title === "บุคคล" && NACC_PPL.includes(e.name.replace(/\s+/g, "-"))
);
const TOP_PERSON = PERSON_DONATION.find(
  (e) => e.title === "บุคคล" && !NACC_PPL.includes(e.name.replace(/\s+/g, "-"))
);
const TOP_BUSINESS = PERSON_DONATION.find((e) => e.title === "นิติบุคคล");
const TOP_PARTY = PARTY_DONATION.ทุกปี[0];

export default function Home() {
  return (
    <>
      <Navbar />
      <Spotlight update={new Date().toLocaleDateString("th")} />
      <main className="text-center pt-50">
        <p className="text-white h3 mb-20 lg:h1">มีอะไรให้ดูในเว็บไซต์นี้?</p>
        <section className="flex flex-col lg:flex-row justify-center gap-10 px-10 md:px-20">
          <div className="flex-1 min-w-0 p-10 bg-white rounded-10 mb-10 flex flex-col">
            <ImgCard
              href="/info"
              imgPath="/images/asset_politician.webp"
              className="hover:grayscale hover:contrast-150 transition-all duration-100 ease-linear"
            >
              <div className="flex justify-between">
                <p className="h3">
                  ดูข้อมูลนักการเมือง
                  <br />
                  เเละเจ้าหน้าที่รัฐ
                </p>
                <Image
                  className="w-auto h-[17px] -rotate-90 md:h-40"
                  src="/icons/arr-w.svg"
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
              {TOP_INCOME_ASSETS.assets.length > 0 ? (
                <IndexDataCard
                  title="มีทรัพย์สินมากที่สุด"
                  color="red"
                  name={TOP_INCOME_ASSETS.assets[0].name.replace(/-/g, " ")}
                  type={
                    PEOPLE_POSITION[TOP_INCOME_ASSETS.assets[0].name] ?? "ไม่พบตำแหน่ง"
                  }
                  amount={TOP_INCOME_ASSETS.assets[0].value}
                  icon={
                    POLITICIAN_IMAGES[TOP_INCOME_ASSETS.assets[0].name] ||
                    "/placeholders/person.webp"
                  }
                  link={TOP_INCOME_ASSETS.assets[0].name}
                />
              ) : (
                <IndexDataCard
                  title="มีทรัพย์สินมากที่สุด"
                  color="red"
                  name="ไม่มีข้อมูล"
                  icon="/placeholders/person.webp"
                />
              )}
              {TOP_INCOME_ASSETS.income.length > 0 ? (
                <IndexDataCard
                  title="มีรายได้มากที่สุด"
                  color="red"
                  name={TOP_INCOME_ASSETS.income[0].name.replace(/-/g, " ")}
                  type={
                    PEOPLE_POSITION[TOP_INCOME_ASSETS.income[0].name] ?? "ไม่พบตำแหน่ง"
                  }
                  amount={TOP_INCOME_ASSETS.income[0].value}
                  icon={
                    POLITICIAN_IMAGES[TOP_INCOME_ASSETS.income[0].name] ||
                    "/placeholders/person.webp"
                  }
                  link={TOP_INCOME_ASSETS.income[0].name}
                />
              ) : (
                <IndexDataCard
                  title="มีรายได้มากที่สุด"
                  color="red"
                  name="ไม่มีข้อมูล"
                  icon="/placeholders/person.webp"
                />
              )}
              <IndexDataCard
                title="มีความเกี่ยวข้องกับธุรกิจมากที่สุด"
                color="red"
                name={PERSON_BUSINESS_COUNT[0].name.replace(/-/g, " ")}
                type={PEOPLE_POSITION[PERSON_BUSINESS_COUNT[0].name] ?? "ไม่พบตำแหน่ง"}
                amount={PERSON_BUSINESS_COUNT[0].count}
                unit="ธุรกิจ"
                icon={
                  POLITICIAN_IMAGES[PERSON_BUSINESS_COUNT[0].name] ||
                  "/placeholders/person.webp"
                }
                link={PERSON_BUSINESS_COUNT[0].name}
              />
              <IndexDataCard
                title="มีคดีความมากที่สุด"
                color="red"
                name={PERSON_LAWSUIT_COUNT[0].name.replace(/-/g, " ")}
                type={PEOPLE_POSITION[PERSON_LAWSUIT_COUNT[0].name] ?? "ไม่พบตำแหน่ง"}
                amount={PERSON_LAWSUIT_COUNT[0].count}
                unit="คดีความ"
                icon={
                  POLITICIAN_IMAGES[PERSON_LAWSUIT_COUNT[0].name] ||
                  "/placeholders/person.webp"
                }
                link={PERSON_LAWSUIT_COUNT[0].name}
              />
            </Slider>
          </div>
          <div className="flex-1 min-w-0 p-10 bg-white rounded-10 mb-10 flex flex-col">
            <ImgCard
              href="/donation"
              imgPath="/images/asset_donation.webp"
              className="hover:grayscale hover:contrast-150 transition-all duration-100 ease-linear"
            >
              <div className="flex justify-between">
                <p className="h3">
                  ดูข้อมูลเงินบริจาค
                  <br />
                  พรรคการเมือง
                </p>
                <Image
                  className="w-auto h-[17px] -rotate-90 md:h-40"
                  src="/icons/arr-w.svg"
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
                  )[TOP_PARTY.party]?.image ?? "/placeholders/party.webp"
                }
                link={"พรรค" + TOP_PARTY.party}
              />
              <IndexDataCard
                title="นิติบุคคลที่บริจาคให้พรรคการเมืองมากที่สุด"
                color="purple"
                name={TOP_BUSINESS.name}
                amount={TOP_BUSINESS.total}
                icon="/placeholders/business.webp"
                link={getFileName(TOP_BUSINESS.name)}
              />
              <IndexDataCard
                title="ผู้ดำรงตำแหน่งทางการเมืองที่บริจาคเงินเยอะที่สุด"
                color="purple"
                name={TOP_POLITICIAN.name}
                type={
                  PEOPLE_POSITION[TOP_POLITICIAN.name.replace(/\s/g, "-")] ??
                  "ไม่พบตำแหน่ง"
                }
                amount={TOP_POLITICIAN.total}
                icon={
                  POLITICIAN_IMAGES[TOP_POLITICIAN.name.replace(/\s/g, "-")] ||
                  "/placeholders/person.webp"
                }
                link={TOP_POLITICIAN.name.replace(/\s/g, "-")}
              />
              <IndexDataCard
                title="บุคคลที่บริจาคให้พรรคการเมืองมากที่สุด"
                color="purple"
                name={TOP_PERSON.name}
                type="บุคคล"
                amount={TOP_PERSON.total}
                icon="/placeholders/person.webp"
                link={TOP_PERSON.name.replace(/\s/g, "-")}
              />
            </Slider>
          </div>
        </section>

        <section
          style={{
            backgroundImage: "url('/images/asset_political_transparency_bg.webp')",
          }}
          className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mb-20 lg:mb-30 b5 lg:b3 px-10 lg:px-[12.5vw]"
        >
          <Image
            className="h-[208px] w-[208px] lg:h-[310px] lg:w-[310px] object-cover mb-20 mt-40 lg:mb-40 lg:mt-[200px]"
            src="/images/asset_glass.webp"
            width={310}
            height={310}
            alt="political-transparency"
          />
          <p className="mb-20 lg:mb-30">
            ความโปร่งใสทางการเมือง (Political Transparency) คือ
            <span className="nobr">การเปิด</span>โอกาสให้ประชาชนทุกคนเข้าถึงและตั้งคำถาม
            เกี่ยวกับที่มา อำนาจ และการปฏิบัติหน้าที่ ของนักการเมืองและเจ้าหน้าที่รัฐได้
          </p>
          <p className="mb-20 lg:mb-30">
            ACT Ai จึงถูกพัฒนาขึ้น เพื่อเป็นฐานข้อมูลความโปร่งใส
            ของนักการเมืองและเจ้าหน้าที่รัฐ ที่ประชาชนทุกคนสามารถค้นหา
            และตรวจสอบข้อมูลได้โดยง่าย เพื่อปกป้องสิทธิของตัวเอง
            และผลประโยชน์ของส่วนรวมร่วมกัน
          </p>
          <p>
            นอกจากนี้ คุณยังสามารถช่วยสร้างฐานข้อมูลนี้ด้วยการช่วยแปลงข้อมูลเป็นดิจิทัล
            ในฐานข้อมูลความโปร่งใสของ ACT Ai
          </p>
          <a
            href="https://bit.ly/actdataentry"
            className="flex items-center my-30 py-[25px] px-30 md:py-[65px] md:px-[150px] bg-cover bg-center text-white border border-gray-5 rounded-5"
            style={{
              backgroundImage: `url('/images/asset_digital_data.webp')`,
            }}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <span className="b3">ร่วมแปลงข้อมูลเป็นดิจิทัล</span>
            <Image
              src="/icons/external-w.svg"
              className="w-[25px] h-auto pl-10 md:w-30"
              width={25}
              height={22}
              alt=""
            />
          </a>
        </section>
      </main>

      <section className="bg-white text-black rounded-t-5 py-30 px-[25px] text-center flex flex-col gap-10 b4 md:gap-20">
        <p className="font-bold mx-auto max-w-[600px]">
          แชร์ชวนเพื่อน ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบ
          เพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai
        </p>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-5 items-center justify-center leading-1">
          <span>Share</span>
          <Sharer desktopBigger fallback="https://poldata.actai.co/" />
        </div>
        <hr className="w-3/5 mx-auto" />
        <div className="flex gap-8 items-center justify-center">
          <span>Powered by</span>
          <a href="https://actai.co/" target="_blank" rel="nofollow noopener noreferrer">
            <Image
              className="w-auto h-30 md:h-40"
              src="/logos/actai.svg"
              width={26.8}
              height={20}
              alt="act ai"
            />
          </a>
        </div>
        <div className="flex gap-8 items-center justify-center">
          <span>Co-Developed by</span>
          <a
            href="https://hand.co.th/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-20 md:h-30"
              src="/logos/hand.svg"
              width={43.68}
              height={16}
              alt="hand"
            />
          </a>
          <a
            href="https://punchup.world/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-20 md:h-30"
              src="/logos/pu.svg"
              width={50.12}
              height={14.5}
              alt="punch up"
            />
          </a>
          <a
            href="https://www.boonmeelab.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              className="w-auto h-20 md:h-30"
              src="/logos/bml.svg"
              width={50.12}
              height={14.5}
              alt="boonmee lab"
            />
          </a>
        </div>
      </section>
      <Footer home />
    </>
  );
}
