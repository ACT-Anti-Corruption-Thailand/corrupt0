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
        <div className="rounded-5 w-[180px] bg-black flex flex-col text-white text-20">
            <div style={{
                '--color': `${props.color}`,
            } as React.CSSProperties} className="w-[180px] rounded-t-5 bg-[var(--color)] py-12">
                {props.title}
            </div>
            <div className="flex flex-row m-10">
                <Image src={props.icon!} width={25} height={25} alt="icon" />
                <div className="text-left ml-5">
                    <p className="text-gray-3 text-14">{props.type}</p>
                    <p className="">{props.name}</p>
                </div>
            </div>
            <div className="w-[120px] border-solid border-1 border-gray-3 self-center mt-20 mb-10"></div>
            <p className="text-22">{props.amount}</p>
            <button className="my-10 bg-white rounded-10 text-black w-[65px] h-[25px] self-center flex flex-row justify-center">ดูข้อมูล<img src="./icons/triangle.svg" className="my-auto ml-2" /></button>
        </div>
    )


}

export default Card