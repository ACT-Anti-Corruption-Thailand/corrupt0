import Image from "next/image";
import { thaiMoneyFormatter } from "@/functions/moneyFormatter";

import _PARTY_ASSETS from "@data/color/partyAssets.json"

const PARTY_ASSETS = _PARTY_ASSETS as Record<
  string,
  { color: string | null; image: string | null }
>;

interface PersonCardProps {
    name: string;
    title: string;
    data: { amount: number; party: string }[];
    maxAmount: number;
    imgPath: string;
}

interface barProps {
    party: string;
    amount: number;
    maxAmount: number;
}

const Bar = (props: barProps) => {
    const progress =
        Number((props.amount / props.maxAmount) * 100)
            .toFixed(0)
            .toString() + "%";

    return (
        <div
            style={
                {
                    "--progress": progress,
                    backgroundColor: PARTY_ASSETS[props.party]?.color ?? "#fff",
                } as React.CSSProperties
            }
            className="h-10 lg:h-20 w-[var(--progress)]"
        />
    )
}

const EntityStackedBarCard = (props: PersonCardProps) => {
    const [money, unit] = thaiMoneyFormatter(props.maxAmount);

    return (
        <div className="flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 text-18 w-full">
            <div className="flex gap-5 items-start">
                <Image src={props.imgPath} width={40} height={40} alt="person" className="h-[25px] lg:h-40" />
                <div className="flex flex-col w-full">
                    <div className="flex justify-between text-gray-2">
                        <p className="b3">{props.name}</p>
                        <p className="b4">{money}</p>
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
            <div className="mt-10 flex">
                {
                    props.data.sort((a, b) => b.amount - a.amount).map((item, index) => (
                        <Bar key={index} party={item.party} amount={item.amount} maxAmount={props.maxAmount} />
                    ))
                }
            </div>
        </div>
    );
};

export default EntityStackedBarCard;
