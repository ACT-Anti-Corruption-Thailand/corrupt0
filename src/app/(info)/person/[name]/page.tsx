import Image from "next/image";
import Sharer from "@/components/Sharer";

export async function generateStaticParams() {
  return [{ name: "_test" }];
}

export default function Person() {
  return (
    <main>
      <section className="flex flex-col gap-5 bg-white text-black text-center py-15 px-30 mb-2">
        <span className="b6">
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
            <div className="flex gap-4">
              <Sharer />
            </div>
          </div>
          <div className="text-left">
            <span className="block b6 text-gray-5">อายุ ณ ปีที่ยื่น</span>
            <span className="block b4 font-bold">53 ปี</span>
            <span className="block b6 text-gray-5">สังกัดล่าสุด</span>
            <span className="block b4 font-bold">พลังประชารัฐ</span>
            <span className="block b6 text-gray-5">ตำแหน่งปัจจุบัน</span>
            <span className="block b4">
              <span className="font-bold">สมาชิกสภาผู้แทนราษฎร</span>{" "}
              <span>(2562-2566)</span>
            </span>
            <details>
              <summary className="b6 text-gray-5">ดูตำแหน่งที่ผ่านมา</summary>
              LOL
            </details>
          </div>
        </div>
      </section>
      <section className="p-10 bg-white mb-10">
        <a className="block p-10 bg-black border-b border-b-gray-6" href="#money">
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
      <section>
        <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 mb-10">
          <Image src="/icons/placeholder.svg" alt="" width={18} height={18} />
          <span>สถานะทางการเงิน</span>
        </header>

        <div className="p-10 text-center">
          <div className="mb-5">
            <span className="b3 font-bold inline-block mr-2">ปีที่ยื่นบัญชี</span>
            <span className="b5">(กรณีที่ยื่น)</span>
          </div>
          <div className="flex mb-15">
            <div className="flex-1">1</div>
            <div className="flex-1">2</div>
          </div>
          <div className="rounded-10 bg-white p-10 text-black">
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
        </div>
      </section>
    </main>
  );
}
