import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import _DONOR from "@/data/donation/donor.json";
const DONOR = _DONOR as {
  name: string;
  top10: string[];
}[];

import { thaiMoneyFormatter } from "@/functions/moneyFormatter";
import { hasCorrupt0Page } from "@/functions/navigation";

// from /data/functions/business.mjs
const getFileName = (formal_name: string) =>
  formal_name.replace("ห้างหุ้นส่วนจำกัด", "หจก").replace(/\s+|\/|\\/g, "-");

interface InfoBusinessCardProps {
  name: string;
  type?: string;
  relation: string;
}

export default function InfoBusinessCard({
  name,
  type,
  relation,
}: InfoBusinessCardProps) {
  const fileName = getFileName(name);
  const hasPage = hasCorrupt0Page(fileName);

  let pageData: Record<any, any> = {};
  if (hasPage) {
    try {
      const filePath = path.join(
        process.cwd(),
        "src",
        "data",
        "info",
        `${fileName}.json`
      );
      const fileContents = fs.readFileSync(filePath, "utf8");
      pageData = JSON.parse(fileContents); // pass this into the page
    } catch (e) {
      notFound();
    }
  }
  const { donation } = pageData;
  const hasDonation = donation?.length > 0;

  const mostDonatedParty = hasDonation
    ? Object.entries(
        donation.reduce((a: Record<string, number>, c: { party: string }) => {
          if (a[c.party]) a[c.party] += 1;
          else a[c.party] = 1;
          return a;
        }, {} as Record<string, number>)
      ).sort((a, z) => (z[1] as number) - (a[1] as number))[0][0]
    : "";
  const totalDonation = hasDonation
    ? donation.reduce((a: number, c: { amount: number }) => a + c.amount, 0)
    : 0;
  const [donationAmount, donationUnit] = thaiMoneyFormatter(totalDonation);

  const isTop10 = DONOR.find((e) => e.name === name)?.top10?.includes(mostDonatedParty);

  return (
    <article className="rounded-5 bg-white-10 p-10 flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="b3 font-bold">{name}</span>
        {hasPage && (
          <Link href={`/info/${fileName}`} target="_blank">
            <Image
              src="/icons/new_tab.svg"
              alt=""
              width={15}
              height={15}
              className="w-15 h-auto md:w-20"
            />
          </Link>
        )}
      </div>
      <ul className="b6 -mt-5">
        {type && (
          <li>
            <span className="opacity-50">ประเภทธุรกิจ</span> <span>{type}</span>
          </li>
        )}
        <li>
          <span className="opacity-50">ตำแหน่ง</span> <span>{relation}</span>
        </li>
      </ul>
      {isTop10 && (
        <div className="rounded-full b7 text-yellow bg-yellow-10 py-1 px-5 mr-auto leading-1">
          1 ใน 10 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
        </div>
      )}
      {(mostDonatedParty || !!totalDonation) && <hr className="border-t-gray-5" />}
      {mostDonatedParty && (
        <div className="flex justify-between items-baseline">
          <span className="b5 opacity-50">พรรคที่บริจาคให้บ่อยที่สุด</span>
          <span className="b4 font-bold">{mostDonatedParty}</span>
        </div>
      )}
      {!!totalDonation && (
        <div
          className={clsx(
            "flex justify-between items-baseline",
            mostDonatedParty && "-mt-5"
          )}
        >
          <span className="b5 opacity-50">รวมยอดบริจาค</span>
          <span className="b4">
            <span className="font-bold">{donationAmount}</span> {donationUnit}
          </span>
        </div>
      )}
    </article>
  );
}
