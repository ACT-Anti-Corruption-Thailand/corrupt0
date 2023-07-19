import Image from "next/image";

interface CardProps {
  title: string;
  color: string;
  type: string;
  name?: string;
  icon?: string;
  amount: string;
  link?: string;
}

const IndexDataCard = (props: CardProps) => {
  return (
    <div className="rounded-10 min-w-[180px] md:min-w-[260px] bg-black flex flex-col text-white keen-slider__slide overflow-hidden">
      <div
        className="bg-[var(--color)] b5 min-h-[60px] flex items-center justify-center px-20 md:min-h-[80px] font-bold"
        style={
          {
            "--color": `${props.color}`,
          } as React.CSSProperties
        }
      >
        <span>{props.title}</span>
      </div>
      <div className="flex flex-row m-10 items-center gap-5">
        {props.icon ? (
          <Image
            src={props.icon}
            width={40}
            height={40}
            alt="icon"
            className="aspect-square w-auto h-[25px] lg:h-40"
          />
        ) : (
          <div className="aspect-square w-auto h-[25px] lg:h-40" />
        )}
        <div className="text-left">
          <p className="text-gray-5 b7 leading-1">{props.type}</p>
          <p className="b5 font-bold">{props.name}</p>
        </div>
      </div>
      <div className="w-[120px] border-b border-b-gray-5 mt-20 mb-5 mx-auto" />
      <p className="b4 font-bold">{props.amount}</p>
      <button className="my-10 bg-white rounded-10 text-black mx-auto px-8 py-2 flex items-center">
        <span>ดูข้อมูล</span>
        <Image
          src="/icons/caret-k.svg"
          alt=""
          className="ml-5 -rotate-90 w-8 h-8"
          width={8}
          height={8}
        />
      </button>
    </div>
  );
};

export default IndexDataCard;
