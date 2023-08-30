import Image from "next/image";
import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

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

const Bar = ({ amount, assets, maxAmount, party }: barProps) => {
  const progress = (amount / maxAmount) * 100 + "%";

  return (
    <div
      style={{
        width: progress,
        backgroundColor: assets.find((d) => d.party === party)?.color ?? "#fff",
      }}
      className="h-10 lg:h-20"
    />
  );
};

const groupBy = <T, K extends keyof any>(
  arr: T[],
  groupFn: (element: T) => K
): Record<K, T[]> =>
  arr.reduce(
    (r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {} as Record<K, T[]>
  );

const EntityStackedBarCard = ({
  assets,
  data,
  imgPath,
  maxAmount,
  name,
  title,
}: PersonCardProps) => {
  const total = data.reduce((a, b) => a + b.amount, 0);
  const [money, unit] = thaiMoneyFormatter(total);

  const grouppedData = Object.entries(groupBy(data, (e) => e.party))
    .map(
      ([party, entries]) =>
        [party, entries.reduce((a, b) => a + b.amount, 0)] as [string, number]
    )
    .sort((a, z) => z[1] - a[1]);

  return (
    <div className="flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 b6 w-full">
      <div className="flex gap-5 lg:gap-10 items-start">
        <Image
          src={imgPath}
          width={40}
          height={40}
          alt=""
          className="aspect-square w-auto h-[25px] lg:h-40 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-gray-2">
            <p className="b3">{name}</p>
            <p className="b4">{formatThousands(money)}</p>
          </div>
          <div className="flex justify-between text-right b6">
            <p>{title}</p>
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
      <div className="mt-5 ml-30 mr-20 lg:ml-50 lg:mr-[35px]">
        <div
          className="flex min-w-[1px]"
          style={{
            width: (total / maxAmount) * 100 + "%",
          }}
        >
          {grouppedData.map(([party, amount]) => (
            <Bar
              key={party}
              party={party}
              amount={amount}
              maxAmount={total}
              assets={assets}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntityStackedBarCard;
