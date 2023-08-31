import Image from "next/image";
import { formatThousands, thaiMoneyFormatter } from "@/functions/moneyFormatter";

interface PersonCardProps {
  name: string;
  title: string;
  color: string;
  amount: number;
  maxAmount: number;
  imgPath: string;
}

const EntityBarCard = (props: PersonCardProps) => {
  const [money, unit] = thaiMoneyFormatter(props.amount);
  const bar =
    Number((props.amount / props.maxAmount) * 100)
      .toFixed(0)
      .toString() + "%";

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
          <div className="flex justify-between text-gray-2 leading-1">
            <p className="b3">{props.name}</p>
            <p className="b4">{formatThousands(money)}</p>
          </div>
          <div className="flex justify-between b6 text-left">
            <p>{props.title}</p>
            <p className="text-right">{unit}</p>
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
      <div className="h-10 lg:h-20 mt-5 ml-30 mr-20 lg:ml-50 lg:mr-[35px] flex">
        <div
          className="min-w-[1px]"
          style={{
            width: bar,
            backgroundColor: props.color,
          }}
        />
      </div>
    </div>
  );
};

export default EntityBarCard;
