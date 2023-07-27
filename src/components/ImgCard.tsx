import clsx from "clsx";
import Link from "next/link";

interface ImgCardProps {
  imgPath: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const ImgCard = (props: ImgCardProps) => {
  return props.href ? (
    <Link
      href={props.href}
      className={clsx(
        "flex flex-col py-10 px-20 rounded-10 bg-cover bg-center text-white text-left md:px-30 md:py-20 md:min-h-[260px]",
        props.className
      )}
      style={{
        backgroundImage: `url(${props.imgPath})`,
      }}
    >
      {props.children}
    </Link>
  ) : (
    <div
      className={clsx(
        "flex flex-col py-10 px-20 rounded-10 bg-cover bg-center text-white text-left md:px-30 md:py-20 md:min-h-[260px]",
        props.className
      )}
      style={{
        backgroundImage: `url(${props.imgPath})`,
      }}
    >
      {props.children}
    </div>
  );
};

export default ImgCard;
