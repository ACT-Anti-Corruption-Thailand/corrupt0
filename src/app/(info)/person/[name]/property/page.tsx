import FinancialDropdowns from "@/components/FinancialDropdowns";
import FinancialCheckboxes from "@/components/FinancialCheckboxes";
import Image from "next/image";

export default function Property() {
  return (
    <main>
      <header className="p-10 text-center">
        <span className="block mb-10 b6 text-gray-5">
          อัปเดตข้อมูลเมื่อวันที่ 00/00/2556
        </span>
        <h1 className="h2">เจาะลึกทรัพย์สินรวม</h1>
      </header>

      <section className="bg-gray-2 py-10 rounded-5 text-black max-w-[850px] mx-auto">
        <h2 className="b5 text-center mb-5">
          <span className="b3 font-bold">ปีที่ยื่นบัญชี</span> (กรณีที่ยื่น)
        </h2>
        <div className="flex mb-10 gap-10 px-10">
          <FinancialDropdowns light />
        </div>
        <div className="flex gap-10 items-center justify-center b6 py-5">
          <FinancialCheckboxes />
        </div>
        <span className="block text-center b5">หน่วย: บาท</span>
      </section>

      <div className="flex gap-5 mt-10 mb-20 max-w-[850px] mx-auto">
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
    </main>
  );
}
