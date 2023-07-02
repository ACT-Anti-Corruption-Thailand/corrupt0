import FinancialCheckboxes from "@/components/FinancialCheckboxes";
import FinancialDropdowns from "@/components/FinancialDropdowns";
import PersonPropertyDropdown from "@/components/PersonPropertyAccordion";
import Image from "next/image";

import {
  PersonPropertyBuildingStatement,
  PersonPropertyConcessionStatement,
  PersonPropertyLandStatement,
  PersonPropertyStatement,
  PersonPropertyValuableStatement,
  PersonPropertyVehicleStatement,
} from "@/components/PersonPropertyAccordion";

const EXAMPLE_CASH_STATEMENTS: PersonPropertyStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
  },
  {
    actor: "บุตร",
    value: 300000,
  },
];

const EXAMPLE_LAND_STATEMENTS: PersonPropertyLandStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    type: "โฉนด",
    name: "โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    type: "อื่น ๆ",
    name: "ไม่ใช่โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
  {
    actor: "บุตร",
    value: 300000,
    type: "โฉนด",
    name: "โฉนด เลขที่ 5744",
    address: "อ. ศรีประจันต์ จ. สุพรรณบุรี",
    receiveDate: "28/06/2560",
    receiveFrom: "ผู้จัดการมรดก",
  },
];

const EXAMPLE_CONCESSION_STATEMENTS: PersonPropertyConcessionStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "กรมธรรม์ เลขที่ T230301731",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "FWD ประกันชีวิต เลขที่ 41463739",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "FWD ประกันชีวิต เลขที่ 41463739",
    fromDate: "28/06/2560",
    toDate: "28/06/2560",
  },
];

const EXAMPLE_BUILDING_STATEMENTS: PersonPropertyBuildingStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "บ้านเดี่ยว 2 ชั้น",
    docNumber: 19476,
    address: "อ. เมือง จ. สุพรรณบุรี",
    receiveDate: "1/10/2557",
    receiveFrom: "ปลูกสร้างเอง",
  },
];

const EXAMPLE_VEHICLE_STATEMENTS: PersonPropertyVehicleStatement[] = [
  {
    actor: "ผู้ยื่น",
    value: 10000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
  {
    actor: "คู่สมรส",
    value: 2000000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
  {
    actor: "บุตร",
    value: 300000,
    name: "บ้านเดี่ยว 2 ชั้น",
    plate: "ภฉ 1098",
    province: "จ. ฉะเชิงเทรา",
    receiveDate: "1/10/2557",
  },
];

const EXAMPLE_VALUABLE_STATEMENTS: PersonPropertyValuableStatement = {
  ของสะสมอื่น: [
    {
      actor: "ผู้ยื่น",
      name: "กริ่งปวเรศ ทองคำ 3 บาท",
      value: 10000,
      count: 1,
      receiveDate: "20/03/2557",
    },
    {
      actor: "คู่สมรส",
      name: "พระร่วงหลังรางปืน จ. สุโขทัย ทอง 2 บาท",
      value: 741963,
      count: 3,
      receiveDate: "20/03/2557",
    },
    {
      actor: "บุตร",
      name: "พระสมเด็จไกเซอร์เลี่ยมทอง 2 บาท",
      value: 20,
      count: 200,
      receiveDate: "20/03/2557",
    },
  ],
  "งานศิลปะ โบราณวัตถุ": [
    {
      actor: "ผู้ยื่น",
      name: "กริ่งปวเรศ ทองคำ 3 บาท",
      value: 1000000,
      count: 1,
      receiveDate: "20/03/2557",
    },
    {
      actor: "คู่สมรส",
      name: "พระร่วงหลังรางปืน จ. สุโขทัย ทอง 2 บาท",
      value: 1000000,
      count: 3,
      receiveDate: "20/03/2557",
    },
    {
      actor: "บุตร",
      name: "พระสมเด็จไกเซอร์เลี่ยมทอง 2 บาท",
      value: 1000000,
      count: 200,
      receiveDate: "20/03/2557",
    },
  ],
};

export default function Property() {
  return (
    <main>
      <header className="p-10 text-center">
        <span className="block mb-10 b6 text-gray-5">
          อัปเดตข้อมูลเมื่อวันที่ 00/00/2556
        </span>
        <h1 className="h2">เจาะลึกทรัพย์สินรวม</h1>
      </header>

      <section className="bg-gray-2 pt-10 rounded-5 text-black max-w-[850px] mx-auto overflow-hidden">
        <h2 className="b5 text-center mb-5">
          <span className="b3 font-bold">ปีที่ยื่นบัญชี</span> (กรณีที่ยื่น)
        </h2>
        <div className="flex mb-10 gap-10 px-10">
          <FinancialDropdowns light />
        </div>
        <div className="flex gap-10 items-center justify-center b6 py-5">
          <FinancialCheckboxes />
        </div>
        <span className="block text-center b5 mb-10">หน่วย: บาท</span>
        <PersonPropertyDropdown.Cash name="เงินสด" statements={EXAMPLE_CASH_STATEMENTS} />
        <PersonPropertyDropdown.Cash
          name="เงินฝาก"
          statements={EXAMPLE_CASH_STATEMENTS}
        />
        <PersonPropertyDropdown.Cash
          name="เงินลงทุน"
          statements={EXAMPLE_CASH_STATEMENTS}
        />
        <PersonPropertyDropdown.Cash
          name="เงินให้กู้ยืม"
          statements={EXAMPLE_CASH_STATEMENTS}
        />
        <PersonPropertyDropdown.Land statements={EXAMPLE_LAND_STATEMENTS} />
        <PersonPropertyDropdown.Concession statements={EXAMPLE_CONCESSION_STATEMENTS} />
        <PersonPropertyDropdown.Building statements={EXAMPLE_BUILDING_STATEMENTS} />
        <PersonPropertyDropdown.Vehicle statements={EXAMPLE_VEHICLE_STATEMENTS} />
        <PersonPropertyDropdown.Valuable statements={EXAMPLE_VALUABLE_STATEMENTS} />
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
