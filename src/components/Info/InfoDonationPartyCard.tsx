import Image from "next/image";
import Accordion from "../Accordion";

export default function InfoDonationPartyCard() {
  return (
    <Accordion
      className="bg-white-10 py-5 px-10 rounded-5"
      trigger={
        <div className="text-left flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Image
              className="border border-black rounded-full"
              src="/placeholders/party.png"
              alt=""
              width={25}
              height={25}
            />
            <span className="b2 font-bold">พลังประชารัฐ</span>
            <Image src="/icons/new_tab.svg" alt="" width={15} height={15} />
            <Image
              className="ui-open:rotate-180 ml-auto"
              src="/icons/caret-g.svg"
              width={12}
              height={12}
              alt=""
            />
          </div>
          <hr className="border-t-[3px] border-t-[rgb(73,147,254)] mb-5" />
          <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
            1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
          </div>
          <div className="flex gap-5 items-center leading-1 b4 -mt-5">
            <span className="font-bold">รวมยอดบริจาค</span>
            <span className="font-bold b1 ml-auto">000</span>
            <span>ล้านบาท</span>
          </div>
          <div className="flex gap-5 items-center leading-1 b4 -mt-10">
            <span className="font-bold">บริจาคจำนวน</span>
            <span className="font-bold b1 ml-auto">00</span>
            <span>ครั้ง</span>
          </div>
        </div>
      }
    >
      <div className="border-t border-t-gray-6 pt-5 mt-4">
        <div className="flex justify-between items-baseline b5 text-gray-5 -mb-4">
          <span>วันที่บริจาค</span>
          <span>จำนวน (บาท)</span>
        </div>
        <div className="flex justify-between items-baseline -mb-4">
          <span className="b6 font-bold">00/00/2566</span>
          <span className="b3">000</span>
        </div>
        <div className="flex justify-between items-baseline -mb-4">
          <span className="b6 font-bold">00/00/2566</span>
          <span className="b3">000</span>
        </div>
        <div className="flex justify-between items-baseline -mb-4">
          <span className="b6 font-bold">00/00/2566</span>
          <span className="b3">000</span>
        </div>
        <div className="h-4" />
      </div>
    </Accordion>
  );
}
