import Image from "next/image";

interface ImgCardProps {
  imgPath: string;
  children?: React.ReactNode;
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
      {props.children}
    </div>
  );
};

export default ImgCard;