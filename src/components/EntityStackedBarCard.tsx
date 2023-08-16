import Image from "next/image";
import { thaiMoneyFormatter } from "@/functions/moneyFormatter";

import _PARTY_ASSETS from "@data/color/partyAssets.json";

const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

interface PersonCardProps {
  name: string;
  title: string;
  data: { amount: number; party: string }[];
  maxAmount: number;
  imgPath: string;
  assets: { party: string; color: string | null; image: string | null }[];
}

interface barProps {
  party: string;
  amount: number;
  maxAmount: number;
  assets: { party: string; color: string | null; image: string | null }[];
}

const Bar = (props: barProps) => {
  const progress =
    Number((props.amount / props.maxAmount) * 100)
      .toFixed(0)
      .toString() + "%";

  return (
    <div
      style={
        {
          "--progress": progress,
          backgroundColor:
            props.assets.find((d) => d.party === props.party)?.color ?? "#fff",
        } as React.CSSProperties
      }
      className="h-10 lg:h-20 w-[var(--progress)]"
    />
  );
};

const EntityStackedBarCard = (props: PersonCardProps) => {
  const [money, unit] = thaiMoneyFormatter(props.data.reduce((a, b) => a + b.amount, 0));

  return (
    <div className="flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 b6 w-full">
      <div className="flex gap-5 lg:gap-10 items-start">
        <Image
          src={props.imgPath}
          width={40}
          height={40}
          alt=""
          className="aspect-square w-auto h-[25px] lg:h-40 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-gray-2">
            <p className="b3">{props.name}</p>
            <p className="b4">{money}</p>
          </div>
          <div className="flex justify-between text-right b6">
            <p>{props.title}</p>
            <p>{unit}</p>
          </div>
        </div>
        <Image
          className="block -rotate-90 aspect-square w-auto h-10 lg:h-[25px] object-center"
          src="/icons/arr-g.svg"
          width={12}
          height={10}
          alt=""
        />
      </div>
      <div className="mt-5 ml-30 mr-20 lg:ml-50 lg:mr-[35px] flex">
        {props.data
          .sort((a, b) => b.amount - a.amount)
          .sort((a, z) => a.party.localeCompare(z.party))
          .map((item, index) => (
            <Bar
              key={index}
              party={item.party}
              amount={item.amount}
              maxAmount={props.maxAmount}
              assets={props.assets}
            />
          ))}
      </div>
    </div>
  );
};

export default EntityStackedBarCard;
