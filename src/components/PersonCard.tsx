import Image from "next/image";
import { thaiMoneyFormatter } from "@/functions/moneyFormatter";

interface PersonCardProps {
  name: string;
  title: string;
  amount: number;
  maxAmount: number;
}

const PersonCard = (props: PersonCardProps) => {
  const [money, unit] = thaiMoneyFormatter(props.amount);
  const bar =
    Number((props.amount / props.maxAmount) * 100)
      .toFixed(0)
      .toString() + "%";

  return (
    <div className="bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 my-10 flex gap-5 items-start text-18 w-[90vw]">
      <Image src="/icons/person.svg" width={25} height={25} alt="person" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-2">
          <p className="b3">{props.name}</p>
          <p className="b4">{money}</p>
        </div>
        <div className="flex justify-between text-right">
          <p>{props.title}</p>
          <p>{unit}</p>
        </div>
        <div
          style={
            {
              "--bar": bar,
            } as React.CSSProperties
          }
          className="h-10 w-[var(--bar)] bg-white mt-10"
        />
      </div>
      <Image
        className="-rotate-90 ml-4"
        src="/icons/arr-g.svg"
        width={12}
        height={10}
        alt="arrow"
      />
    </div>
  );
};

export default PersonCard;
