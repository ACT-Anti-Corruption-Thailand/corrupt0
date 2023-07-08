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

const Card = (props: CardProps) => {
  return (
    <div className="rounded-10 min-w-[180px] lg:min-w-[260px] bg-black flex flex-col text-white text-20 keen-slider__slide">
      <div
        style={
          {
            "--color": `${props.color}`,
          } as React.CSSProperties
        }
        className="w-full rounded-t-10 bg-[var(--color)] py-12 lg:b5 lg:min-h-[80px]"
      >
        <div className="mx-40">{props.title}</div>
      </div>
      <div className="flex flex-row mx-10 my-15">
        {props.icon ? (
          <Image
            src={props.icon}
            width={40}
            height={40}
            alt="icon"
            className="aspect-square w-auto h-[25px] lg:h-[40px]"
          />
        ) : (
          <div className="aspect-square w-auto h-[25px] lg:h-[40px]" />
        )}
        <div className="text-left ml-5">
          <p className="text-gray-5 text-14">{props.type}</p>
          <p className="">{props.name}</p>
        </div>
      </div>
      <div className="w-[120px] border-solid border-1 border-gray-5 self-center mt-20 mb-10" />
      <p className="text-22">{props.amount}</p>
      <button className="my-10 bg-white rounded-10 text-black w-[65px] h-[25px] self-center flex flex-row justify-center">
        ดูข้อมูล
        <Image
          src="/icons/caret-k.svg"
          alt=""
          className="my-auto ml-2 -rotate-90 w-8 h-8"
          width={8}
          height={8}
        />
      </button>
    </div>
  );
};

export default Card;
