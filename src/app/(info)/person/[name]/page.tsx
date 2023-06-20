import Image from "next/image";
import Sharer from "@/components/Sharer";
import InfoGoTop from "@/components/InfoGoTop";
import Accordion from "@/components/Accordion";

export async function generateStaticParams() {
  return [{ name: "_test" }];
}

export default function Person() {
  return (
    <main>
      <InfoGoTop name="สุชาติ ภิญโญ" />

      {/* Basic Information */}
      <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
        <span className="b6 text-gray-5">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </span>
        <span className="h2">สุชาติ ภิญโญ</span>
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
            <span className="block b6 text-gray-5">สังกัดล่าสุด</span>
            <span className="block b4 font-bold">พลังประชารัฐ</span>
            <span className="block b6 text-gray-5">ตำแหน่งปัจจุบัน</span>
            <span className="block b4 no-balance">
              <span className="font-bold">สมาชิกสภาผู้แทนราษฎร</span>{" "}
              <span className="nobr">(2562-2566)</span>
            </span>
            <Accordion
              trigger={
                <div className="flex b6 text-gray-5 items-center">
                  <span>ดูตำแหน่งที่ผ่านมา</span>
                  <Image
                    className="group-aria-expanded/accordion:rotate-180 ml-2"
                    src="/icons/caret-d-g.svg"
                    width={10}
                    height={10}
                    alt=""
                  />
                </div>
              }
            >
              <div className="rounded-5 bg-gray-2 b7 text-gray-5 p-5">
                <ul className="flex flex-col gap-5 list-disc">
                  <li>สมาชิกสภาผู้แทนราษฎร (2500-2500)</li>
                  <li>สมาชิกสภาผู้แทนราษฎร (2500-2500)</li>
                </ul>
              </div>
            </Accordion>
          </div>
        </div>
        <a
          href="www.theyworkforus.wevis.info"
          className="py-4 px-10 b7 border border-gray-2 rounded-5 block mx-auto"
        >
          <span className="flex gap-2 items-center justify-center">
            <span>ดูประวัติการทำงานในรัฐสภา</span>
            <Image src="/icons/external.svg" alt="" width={12} height={12} />
          </span>
          <span className="block text-gray-4">www.theyworkforus.wevis.info</span>
        </a>
      </section>

      {/* Jumpnav */}
      <section className="p-10 bg-white mb-10">
        <a className="block p-10 bg-black border-b border-b-gray-6" href="#financial">
          <span className="flex gap-5 items-center mb-5">
            <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
            <span>
              <span className="b4 font-bold">สถานะการเงินปี 25xx</span>{" "}
              <span className="b7 text-gray-5">(ปีล่าสุดที่มีข้อมูลในระบบ)</span>
            </span>
            <Image
              className="ml-auto"
              src="/icons/arr-d-g.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
          <div className="flex gap-2">
            <div className="flex-1 bg-value-negative-bg py-5 px-[7px] flex items-center">
              <div className="flex flex-col items-center flex-1">
                <span className="opacity-60 b5">ทรัพย์สิน</span>
                <span className="text-value-negative-text b1 font-bold">x,xxx</span>
                <span className="opacity-60 b6 text-value-negative-text">ล้านบาท</span>
              </div>
              <span className="text-value-negative-text b5 font-bold">&lt;</span>
              <div className="flex flex-col items-center flex-1">
                <span className="opacity-60 b5">หนี้สิน</span>
                <span className="text-value-negative-text b1 font-bold">x,xxx</span>
                <span className="opacity-60 b6 text-value-negative-text">ล้านบาท</span>
              </div>
            </div>
            <div className="flex-1 bg-value-positive-bg py-5 px-[7px] flex items-center">
              <div className="flex flex-col items-center flex-1">
                <span className="opacity-60 b5">รายได้</span>
                <span className="text-value-positive-text b1 font-bold">x,xxx</span>
                <span className="opacity-60 b6 text-value-positive-text">ล้านบาท</span>
              </div>
              <span className="text-value-positive-text b5 font-bold">&gt;</span>
              <div className="flex flex-col items-center flex-1">
                <span className="opacity-60 b5">รายจ่าย</span>
                <span className="text-value-positive-text b1 font-bold">x,xxx</span>
                <span className="opacity-60 b6 text-value-positive-text">ล้านบาท</span>
              </div>
            </div>
          </div>
        </a>
        <a className="block p-10 bg-black border-b border-b-gray-6" href="#business">
          <span className="flex gap-5 items-center">
            <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
            <span>
              <span className="b3 font-bold">เกี่ยวข้องกับ 5 ธุรกิจ</span>
            </span>
            <Image
              className="ml-auto"
              src="/icons/arr-d-g.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
          <span className="b5 text-gray-5 ml-[21px]">
            3 ธุรกิจ เคยบริจาคให้พรรคการเมือง
          </span>
        </a>
        <a className="block p-10 bg-black border-b border-b-gray-6" href="#donation">
          <span className="flex gap-5 items-center">
            <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
            <span>
              <span className="b3 font-bold">เคยบริจาคให้ 4 พรรคการเมือง</span>
            </span>
            <Image
              className="ml-auto"
              src="/icons/arr-d-g.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
          <span className="b5 text-gray-5 ml-[21px]">รวม 2,900,000 บาท</span>
        </a>
        <a className="block p-10 bg-black border-b border-b-gray-6" href="#lawsuit">
          <span className="flex gap-5 items-center">
            <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
            <span className="b4 font-bold">เกี่ยวข้องกับ 4 คดี</span>
            <Image
              className="ml-auto"
              src="/icons/arr-d-g.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
        </a>
        <a className="block p-10 bg-black" href="#relative">
          <span className="flex gap-5 items-center">
            <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
            <span>
              <span className="b3 font-bold">มีเครือญาติ 5 คน</span>
            </span>
            <Image
              className="ml-auto"
              src="/icons/arr-d-g.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
          <span className="b5 text-gray-5 ml-[21px]">ที่เปิดเผยในบัญชีทรัพย์สิน</span>
        </a>
      </section>

      {/* สถานะทางการเงิน */}
      <section id="financial">
        <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10">
          <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
          <span>สถานะทางการเงิน</span>
        </header>

        <div className="p-10 text-center">
          <div className="mb-5">
            <span className="b3 font-bold inline-block mr-2">ปีที่ยื่นบัญชี</span>
            <span className="b5">(กรณีที่ยื่น)</span>
          </div>
          {/* select compare */}
          <div className="flex mb-15">
            <div className="flex-1">1</div>
            <div className="flex-1">2</div>
          </div>
          {/* การ์ดเงิน */}
          <div className="rounded-10 bg-white p-10 text-black mb-15">
            <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
              <label className="flex gap-5 items-center">
                <input type="checkbox" />
                <span>ผู้ยื่น</span>
              </label>
              <label className="flex gap-5 items-center">
                <input type="checkbox" />
                <span>คู่สมรส</span>
              </label>
              <label className="flex gap-5 items-center">
                <input type="checkbox" />
                <span>บุตรที่ยังไม่บรรลุนิติภาวะ</span>
              </label>
            </div>
            <div className="py-5 mb-5 ml-10">
              <button type="button" className="flex items-center gap-2 text-gray-5 b6">
                <Image src="/icons/thinking.png" alt="" width={14} height={14} />
                <span className="underline">ดูวิธีตั้งข้อสังเกต</span>
              </button>
            </div>
            <div className="mb-10 bg-value-negative-bg p-10 text-left">
              <section className="mb-5">
                <div className="block b3 font-bold mb-2">ทรัพย์สิน</div>
                <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                  <div className="w-50 bg-black" />
                  <div className="w-50 bg-black opacity-40" />
                  <div className="w-50 bg-black opacity-20" />
                </div>
                <div className="flex pt-5 justify-between">
                  <div>
                    <span className="block b7 leading-1">ผู้ยื่น</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-80">
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-60">
                    <span className="block b7 leading-1">บุตร x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="text-right">
                    <span className="block b7 leading-1">
                      <span className="font-bold">รวม</span> (ล้านบาท)
                    </span>
                    <span className="block b4 font-bold">x,xxx.xx</span>
                  </div>
                </div>
                <button type="button" className="ml-auto block text-gray-5 b6 underline">
                  รายละเอียด
                </button>
              </section>
              <section className="mb-10">
                <div className="block b3 font-bold mb-2">หนี้สิน</div>
                <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                  <div className="w-50 bg-black" />
                  <div className="w-50 bg-black opacity-40" />
                  <div className="w-50 bg-black opacity-20" />
                </div>
                <div className="flex pt-5 justify-between">
                  <div>
                    <span className="block b7 leading-1">ผู้ยื่น</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-80">
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-60">
                    <span className="block b7 leading-1">บุตร x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="text-right">
                    <span className="block b7 leading-1">
                      <span className="font-bold">รวม</span> (ล้านบาท)
                    </span>
                    <span className="block b4 font-bold">x,xxx.xx</span>
                  </div>
                </div>
                <button type="button" className="ml-auto block text-gray-5 b6 underline">
                  รายละเอียด
                </button>
              </section>
              <p className="b4 text-value-negative-text font-bold">
                ทรัพย์สิน น้อยกว่า หนี้สิน x,xxx ล้านบาท
              </p>
            </div>
            <div className="mb-10 bg-value-positive-bg p-10 text-left">
              <section className="mb-5">
                <div className="block b3 font-bold mb-2">รายได้</div>
                <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                  <div className="w-50 bg-black" />
                  <div className="w-50 bg-black opacity-40" />
                  <div className="w-50 bg-black opacity-20" />
                </div>
                <div className="flex pt-5 justify-between">
                  <div>
                    <span className="block b7 leading-1">ผู้ยื่น</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-80">
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-60">
                    <span className="block b7 leading-1">บุตร x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="text-right">
                    <span className="block b7 leading-1">
                      <span className="font-bold">รวม</span> (ล้านบาท)
                    </span>
                    <span className="block b4 font-bold">x,xxx.xx</span>
                  </div>
                </div>
                <button type="button" className="ml-auto block text-gray-5 b6 underline">
                  รายละเอียด
                </button>
              </section>
              <section className="mb-10">
                <div className="block b3 font-bold mb-2">รายจ่าย</div>
                <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                  <div className="w-50 bg-black" />
                  <div className="w-50 bg-black opacity-40" />
                  <div className="w-50 bg-black opacity-20" />
                </div>
                <div className="flex pt-5 justify-between">
                  <div>
                    <span className="block b7 leading-1">ผู้ยื่น</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-80">
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="opacity-60">
                    <span className="block b7 leading-1">บุตร x คน</span>
                    <span className="block b4">x,xxx.xx</span>
                  </div>
                  <div className="text-right">
                    <span className="block b7 leading-1">
                      <span className="font-bold">รวม</span> (ล้านบาท)
                    </span>
                    <span className="block b4 font-bold">x,xxx.xx</span>
                  </div>
                </div>
                <button type="button" className="ml-auto block text-gray-5 b6 underline">
                  รายละเอียด
                </button>
              </section>
              <p className="b4 text-value-positive-text font-bold">
                รายได้ มากกว่า รายจ่าย x,xxx ล้านบาท
              </p>
            </div>
            <div className="bg-gray-1 p-10 text-left">
              <div className="block b2 font-bold">การเสียภาษี</div>
              <section className="mb-10">
                <div className="block b3 font-bold mb-2">เงินได้พึงประเมิน</div>
                <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                  <div className="w-80 bg-black" />
                  <div className="w-80 bg-black opacity-40" />
                </div>
                <div className="flex pt-5 justify-between">
                  <div>
                    <span className="block b7 leading-1">ผู้ยื่น</span>
                    <span className="block b4">1.36</span>
                  </div>
                  <div className="opacity-80">
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">16.73</span>
                  </div>
                  <div className="text-right">
                    <span className="block b7 leading-1">
                      <span className="font-bold">รวม</span> (ล้านบาท)
                    </span>
                    <span className="block b4 font-bold">18.09</span>
                  </div>
                </div>
              </section>
              <section className="border-t border-t-gray-4 pt-5">
                <div className="block b3 font-bold mb-5">เปรียบเทียบกับรายได้จริง</div>
                <div className="flex justify-between">
                  <div className="b4">
                    <span className="block leading-1">น้อยกว่า</span>
                    <span className="block">xx%</span>
                  </div>
                  <div className="opacity-80 b4">
                    <span className="block leading-1">น้อยกว่า</span>
                    <span className="block">xx%</span>
                  </div>
                  <div className="text-right b4 font-bold">
                    <span className="block leading-1">น้อยกว่า</span>
                    <span className="block">xx%</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* เจาะลึกทรัพย์สิน */}
          <div className="rounded-10 bg-white border border-white overflow-hidden mb-15">
            <header className="py-[17px] px-10 bg-asset_explore bg-center bg-cover">
              <div className="flex justify-between h3">
                <span>เจาะลึกทรัพย์สิน</span>
                <span>→</span>
              </div>
            </header>
            <div className="p-10 text-left">
              <span className="b4 text-gray-4 font-bold block mb-10">
                ทรัพย์สินที่แพงที่สุด
              </span>
              <div className="flex gap-5 items-start">
                <Image src="/icons/placeholder.svg" alt="" width={40} height={40} />
                <div className="flex-1 text-black">
                  <span className="block b5">ห้องชุดเพนท์เฮาส์</span>
                  <span className="block b3 font-bold">92.12 ล้านบาท</span>
                </div>
              </div>
            </div>
          </div>
          {/* ปุ่มเอกสาร */}
          <div className="flex gap-5">
            <button
              type="button"
              className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
            >
              <Image src="/icons/pdf.svg" alt="" width={20} height={20} />
              <span>ดูเอกสารจริง</span>
            </button>
            <button
              type="button"
              className="b4 flex-1 flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5"
            >
              <Image src="/icons/sheet.svg" alt="" width={20} height={20} />
              <span>ดาวน์โหลดข้อมูล</span>
            </button>
          </div>
        </div>
      </section>

      {/* ความเกี่ยวข้องกับธุรกิจและโครงการภาครัฐ */}
      <section id="business">
        <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10 text-balance">
          <Image src="/icons/placeholder.svg" alt="" width={30} height={30} />
          <span className="w-auto">
            ความเกี่ยวข้องกับธุรกิจ
            <br />
            และโครงการภาครัฐ
          </span>
        </header>
        <div className="mt-5 px-15 flex flex-col gap-5">
          <article className="rounded-5 bg-white-10 p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <span className="b3 font-bold">บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด</span>
              <span>
                <Image src="/icons/new_tab.svg" alt="" width={15} height={15} />
              </span>
            </div>
            <ul className="b6 -mt-5">
              <li>
                <span className="opacity-50">ประเภทธุรกิจ</span> <span>อสังหาทรัพย์</span>
              </li>
              <li>
                <span className="opacity-50">ตำแหน่ง</span> <span>ผู้ถือหุ้น</span>
              </li>
            </ul>
            <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
              1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
            </div>
            <hr className="border-t-gray-5" />
            <div className="flex justify-between">
              <span className="b5 opacity-50">พรรคที่บริจาคให้บ่อยที่สุด</span>
              <span className="b4 font-bold">พลังปะชารัฐ</span>
            </div>
            <div className="flex justify-between -mt-5">
              <span className="b5 opacity-50">รวมยอดบริจาค</span>
              <span className="b4">
                <span className="font-bold">000</span> ล้านบาท
              </span>
            </div>
          </article>
          <article className="rounded-5 bg-white-10 p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <span className="b3 font-bold">บริษัท ทีอาร์ อัลเคมิสท์ กรุ๊ป จำกัด</span>
              <span>
                <Image src="/icons/new_tab.svg" alt="" width={15} height={15} />
              </span>
            </div>
            <ul className="b6 -mt-5">
              <li>
                <span className="opacity-50">ประเภทธุรกิจ</span> <span>อสังหาทรัพย์</span>
              </li>
              <li>
                <span className="opacity-50">ตำแหน่ง</span> <span>ผู้ถือหุ้น</span>
              </li>
            </ul>
          </article>
        </div>
        <footer className="flex gap-2 items-center justify-center text-gray-5 mt-8 mb-10">
          <span>Credit:</span>
          <Image src="/logos/creden.svg" alt="" width={56} height={11} />
        </footer>
      </section>

      {/* ข้อมูลคดีความ */}
      <section id="lawsuit">
        <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
          <Image src="/icons/placeholder.svg" alt="" width={30} height={30} />
          <span className="w-auto">ข้อมูลคดีความ</span>
        </header>
        <div className="mb-10 p-10 flex flex-col gap-5">
          <Accordion
            className="py-10 px-15 bg-white-20 rounded-5"
            trigger={
              <div className="b6 flex items-center leading-1">
                <span className="bg-white-10 border border-gray-5 rounded-5 py-2 px-8">
                  ป.ป.ช.
                </span>
                <span className="ml-auto text-gray-5 mr-4">
                  วันที่ปรับปรุงข้อมูล 03/08/2564
                </span>
                <Image
                  className="group-aria-expanded/accordion:rotate-180"
                  src="/icons/caret-d-g.svg"
                  width={13}
                  height={13}
                  alt=""
                />
              </div>
            }
          >
            <div className="mt-5 b6">
              <span className="block b5 font-bold">ข้อกล่าวหา</span>
              <p>
                สั่งการและอนุมัติให้จัดจ้างโครงการที่ได้รับ จัดสรรจาก งบประมาณรายจ่ายประจำ
                ปีงบประมาณ พ.ศ.2554 งบเงินอุดหนุน เงินอุดหนุนเฉพาะกิจของเทศบาล
                ตำบลโพนสวรรค์ ด้วยวิธีพิเศษ เมื่อปีงบประมาณ พ.ศ.2554 จำนวน 5 โครงการ
                โดยมุ่งหมายมิให้มีการ- แข่งขันราคาอย่างเป็นธรรม เอื้ออำนวยแก่
                ผู้เสนอราคาบางรายให้เป็นผู้มีสิทธิทำสัญญา
              </p>
            </div>
          </Accordion>
        </div>
      </section>

      {/* เครือญาติที่เปิดเผยในบัญชีทรัพย์สิน */}
      <section id="relative">
        <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10 text-balance">
          <Image src="/icons/placeholder.svg" alt="" width={30} height={30} />
          <span className="w-auto">
            เครือญาติที่เปิดเผย
            <br />
            ในบัญชีทรัพย์สิน
          </span>
        </header>
        <div className="mt-5 px-15 flex flex-col mb-20">
          <div className="flex b6 text-gray-5">
            <span>ชื่อ นามสกุล</span>
            <span className="ml-auto">ความเกี่ยวข้อง</span>
          </div>
          <div className="flex py-10 items-center border-b border-b-gray-6">
            <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
            <div className="text-center ml-auto">
              <div className="b5 font-bold">คู่สมรส</div>
            </div>
            <Image
              className="ml-5"
              src="/icons/new_tab.svg"
              alt=""
              width={15}
              height={15}
            />
          </div>
          <div className="flex py-10 items-center border-b border-b-gray-6">
            <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
            <div className="text-center ml-auto">
              <div className="b5 font-bold">บุตร</div>
            </div>
            <div className="ml-5 w-15 h-15" />
          </div>
          <div className="flex py-10 items-center border-b border-b-gray-6">
            <div className="b4 font-bold leading-1">ชื่อ นามสกุล</div>
            <div className="text-center ml-auto">
              <div className="b5 font-bold">บุตร</div>
            </div>
            <Image
              className="ml-5"
              src="/icons/new_tab.svg"
              alt=""
              width={15}
              height={15}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
