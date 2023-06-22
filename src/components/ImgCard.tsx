import Image from "next/image";

interface ImgCardProps {
  title: string;
  imgPath: string;
  topic: Array<string>;
}

const ImgCard = (props: ImgCardProps) => {
  return (
    <div
      style={
        {
          backgroundImage: `url(${props.imgPath})`,
        } as React.CSSProperties
      }
      className="my-16 py-10 px-20 rounded-10 relative bg-cover flex flex-col text-white justify-start"
    >
      <div className="flex flex-row">
        <p className="text-32 self-start text-left">{props.title}</p>
        <Image
          className="ml-30 w-[17px] h-[17px] -rotate-90"
          src="/icons/arr-w.svg"
          width={17}
          height={17}
          alt=""
        />
      </div>
      <ul className="list-inside list-disc text-left">
        {props.topic.map((topic, index) => {
          return <li key={index}>{topic}</li>;
        })}
      </ul>
    </div>
  );
};

export default ImgCard;
