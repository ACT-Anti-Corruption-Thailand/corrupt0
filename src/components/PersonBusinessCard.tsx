import { thaiMoneyFormatter } from "@/functions/moneyFormatter";
import Image from "next/image";

// TODO: Click and open URL

interface PersonBusinessCardProps {
  name: string;
  type: string;
  relation: string;
  isTop10?: boolean;
  mostDonatedParty?: string;
  totalDonation?: number;
}

export default function PersonBusinessCard({
  name,
  type,
  relation,
  isTop10,
  mostDonatedParty,
  totalDonation,
}: PersonBusinessCardProps) {
  const [donationAmount, donationUnit] = thaiMoneyFormatter(totalDonation ?? 0);

  return (
    <article className="rounded-5 bg-white-10 p-10 flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="b3 font-bold">{name}</span>
        <span>
          <Image src="/icons/new_tab.svg" alt="" width={15} height={15} />
        </span>
      </div>
      <ul className="b6 -mt-5">
        <li>
          <span className="opacity-50">ประเภทธุรกิจ</span> <span>{type}</span>
        </li>
        <li>
          <span className="opacity-50">ตำแหน่ง</span> <span>{relation}</span>
        </li>
      </ul>
      {isTop10 && (
        <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
          1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
        </div>
      )}
      {(mostDonatedParty || totalDonation) && <hr className="border-t-gray-5" />}
      {mostDonatedParty && (
        <div className="flex justify-between">
          <span className="b5 opacity-50">พรรคที่บริจาคให้บ่อยที่สุด</span>
          <span className="b4 font-bold">พลังปะชารัฐ</span>
        </div>
      )}
      {totalDonation && (
        <div className="flex justify-between -mt-5">
          <span className="b5 opacity-50">รวมยอดบริจาค</span>
          <span className="b4">
            <span className="font-bold">{donationAmount}</span> {donationUnit}
          </span>
        </div>
      )}
    </article>
  );
}
