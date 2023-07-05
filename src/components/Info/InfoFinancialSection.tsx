"use client";

import InfoFinanceDialog from "@/components/Info/InfoFinanceDialog";
import InfoFinancialCheckboxes from "@/components/Info/InfoFinancialCheckboxes";
import InfoFinancialDropdowns from "@/components/Info/InfoFinancialDropdowns";
import Image from "next/image";

export default function InfoFinancialSection() {
  return (
    <section id="financial">
      <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6">
        <Image src="/icons/financial.svg" alt="" width={30} height={30} />
        <span>สถานะทางการเงิน</span>
      </header>

      <div className="p-10">
        <div className="mb-5 text-center">
          <span className="b3 font-bold inline-block mr-2">ปีที่ยื่นบัญชี</span>
          <span className="b5">(กรณีที่ยื่น)</span>
        </div>
        <div className="flex mb-10 gap-10">
          <InfoFinancialDropdowns />
        </div>
        {/* การ์ดเงิน */}
        <div className="rounded-10 bg-white p-10 text-black">
          <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
            <InfoFinancialCheckboxes />
          </div>
          <div className="py-5 mb-5 ml-10">
            <InfoFinanceDialog />
          </div>
          <div className="mb-10 bg-value-negative-bg p-10">
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
          <div className="mb-10 bg-value-positive-bg p-10">
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
          <div className="bg-gray-1 p-10">
            <div className="block b2 font-bold">การเสียภาษี</div>
            <section className="mb-10">
              <div className="block b3 font-bold mb-2">เงินได้พึงประเมิน</div>
              <div className="flex border border-black h-20 mr-auto w-fit mb-2">
                <div className="w-80 bg-black" />
                <div className="w-80 bg-black opacity-40" />
              </div>
              <div className="flex pt-5">
                <div className="flex-1">
                  <span className="block b7 leading-1">ผู้ยื่น</span>
                  <span className="block b4">1.36</span>
                </div>
                <div className="opacity-80 flex-1 flex justify-center">
                  <div>
                    <span className="block b7 leading-1">คู่สมรส x คน</span>
                    <span className="block b4">16.73</span>
                  </div>
                </div>
                <div className="text-right flex-1">
                  <span className="block b7 leading-1">
                    <span className="font-bold">รวม</span> (ล้านบาท)
                  </span>
                  <span className="block b4 font-bold">18.09</span>
                </div>
              </div>
            </section>
            <section className="border-t border-t-gray-4 pt-5">
              <div className="block b3 font-bold mb-5">เปรียบเทียบกับรายได้จริง</div>
              <div className="flex">
                <div className="b4 flex-1">
                  <span className="block leading-1">น้อยกว่า</span>
                  <span className="block">xx%</span>
                </div>
                <div className="opacity-80 b4 flex-1 flex justify-center">
                  <div>
                    <span className="block leading-1">น้อยกว่า</span>
                    <span className="block">xx%</span>
                  </div>
                </div>
                <div className="text-right b4 font-bold flex-1">
                  <span className="block leading-1">น้อยกว่า</span>
                  <span className="block">xx%</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
