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
    <div className="flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 text-18 w-full">
      <div className="flex gap-5 items-start">
        <Image src={props.imgPath} width={40} height={40} alt="person" className="h-[25px] w-[25px] lg:h-40 lg:w-40 rounded-full" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-gray-2">
            <p className="b3">{props.name}</p>
            <p className="b4">{formatThousands(money)}</p>
          </div>
          <div className="flex justify-between text-right b6">
            <p>{props.title}</p>
            <p>{unit}</p>
          </div>

        </div>
        <Image
          className="-rotate-90 ml-4 h-10 w-12 lg:h-[23px] lg:w-[27px]"
          src="/icons/arr-g.svg"
          width={12}
          height={10}
          alt="arrow"
        />
      </div>
      <div
        style={
          {
            "--bar": bar,
            backgroundColor: props.color,
          } as React.CSSProperties
        }
        className="h-10 lg:h-20 w-[var(--bar)] mt-10"
      />
    </div>
  );
};

export default EntityBarCard;
