import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Accordion from "@/components/Accordion";
import Image from "next/image";
import InfoAssetPopover from "./Popover";

import type { ReactNode } from "react";

export interface InfoAssetStatement {
  actor: "ผู้ยื่น" | "คู่สมรส" | "บุตร";
  value: number;
}

interface TriggerProps {
  name: string;
  icon?: string;
  length: number;
  value: number;
  nameExtension?: ReactNode;
  className?: string;
}

const Trigger = ({
  name,
  icon,
  nameExtension,
  length,
  value,
  className,
}: TriggerProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          "p-10 flex items-center justify-between bg-white border-b border-b-gray-3 gap-5",
          className
        )
      )}
    >
      {icon && <Image src={icon} width={20} height={20} alt="" />}
      <div className="b4 font-bold">{name}</div>
      {nameExtension}
      <span className="b7 text-black-50 nobr">{length} รายการ</span>
      <div className="ml-auto b4 font-bold">{value.toLocaleString("th-TH")}</div>
      <Image
        className="accordion-arrow"
        src="/icons/caret-g.svg"
        width={12}
        height={12}
        alt=""
      />
    </div>
  );
};

const DetailsBlock = ({ children }: { children: ReactNode }) => {
  return <li className="py-5 px-10 bg-gray-1 border-b border-b-gray-2">{children}</li>;
};

interface DetailsFirstLineProps extends InfoAssetStatement {
  name?: string;
}

const DetailsFirstLine = ({ actor, name, value }: DetailsFirstLineProps) => {
  return (
    <span className="flex items-center">
      <span
        className={clsx(
          "inline-block rounded-5 b7 px-5",
          actor === "ผู้ยื่น" && "bg-black text-white",
          actor === "คู่สมรส" && "bg-black-40",
          actor === "บุตร" && "bg-black-20"
        )}
      >
        {actor}
      </span>
      {name && <span className="b5 ml-5">{name}</span>}
      <span className="b5 font-bold ml-auto">{value.toLocaleString("th-TH")}</span>
    </span>
  );
};

const DetailsListContainer = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc list-outside ml-[2ch] b5 text-gray-5">{children}</ul>
);

const DetailsListList = ({
  label,
  value,
  extension,
}: {
  label?: string;
  value?: string | number;
  extension?: string;
}) =>
  value && (
    <li>
      <span className="-left-5">
        {label && `${label}: `}
        {value} {extension}
      </span>
    </li>
  );

const CASH_ICONS = {
  เงินสด: "/icons/cash.svg",
  เงินฝาก: "/icons/saving.svg",
  เงินลงทุน: "/icons/invest.svg",
  เงินให้กู้ยืม: "/icons/borrow.svg",
} as const;

export interface CashProps {
  name: "เงินสด" | "เงินฝาก" | "เงินลงทุน" | "เงินให้กู้ยืม";
  statements: InfoAssetStatement[];
}

const Cash = ({ name, statements }: CashProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          icon={CASH_ICONS[name]}
          name={name}
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {statements.map(({ value, actor }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} value={value} />
          </DetailsBlock>
        ))}
      </ul>
    </Accordion>
  );
};

export interface InfoAssetLandStatement extends InfoAssetStatement {
  type: "โฉนด" | "อื่น ๆ";
  name: string;
  address?: string;
  receiveDate?: string;
  receiveFrom?: string;
}

export interface LandProps {
  statements: InfoAssetLandStatement[];
}

const Land = ({ statements }: LandProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/land.svg"
          name="ที่ดิน"
          nameExtension={
            statements.some((e) => e.type !== "โฉนด") && (
              <div className="bg-value-negative-bg text-value-negative-text b7 px-10 rounded-full">
                มีที่ดินที่ไม่ใช่โฉนด
              </div>
            )
          }
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {statements.map(
          ({ value, actor, name, address, receiveDate, receiveFrom }, i) => (
            <DetailsBlock key={i}>
              <DetailsFirstLine actor={actor} name={name} value={value} />
              <DetailsListContainer>
                <DetailsListList value={address} />
                {receiveDate && (
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                )}
                {receiveFrom && <DetailsListList label="การได้มา" value={receiveFrom} />}
              </DetailsListContainer>
            </DetailsBlock>
          )
        )}
      </ul>
    </Accordion>
  );
};

export interface InfoAssetConcessionStatement extends InfoAssetStatement {
  name: string;
  fromDate: string;
  toDate: string;
}

export interface ConcessionProps {
  statements: InfoAssetConcessionStatement[];
}

const Concession = ({ statements }: ConcessionProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/concession.svg"
          name="สิทธิและสัมปทาน"
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {statements.map(({ value, actor, name, fromDate, toDate }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} name={name} value={value} />
            <DetailsListContainer>
              {fromDate && toDate ? (
                <DetailsListList
                  label="วันที่ได้มา–วันที่สิ้นสุด"
                  value={fromDate + "–" + toDate}
                />
              ) : fromDate ? (
                <DetailsListList label="วันที่ได้มา" value={fromDate} />
              ) : (
                <DetailsListList label="วันที่สิ้นสุด" value={toDate} />
              )}
            </DetailsListContainer>
          </DetailsBlock>
        ))}
      </ul>
    </Accordion>
  );
};

export interface InfoAssetBuildingStatement extends InfoAssetStatement {
  name: string;
  docNumber?: string | number;
  address?: string;
  receiveDate?: string;
  receiveFrom?: string;
}

export interface BuildingProps {
  statements: InfoAssetBuildingStatement[];
}

const Building = ({ statements }: BuildingProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/building.svg"
          name="โรงเรือนและสิ่งปลูกสร้าง"
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {statements.map(
          ({ value, actor, name, docNumber, address, receiveDate, receiveFrom }, i) => (
            <DetailsBlock key={i}>
              <DetailsFirstLine actor={actor} name={name} value={value} />
              <DetailsListContainer>
                <DetailsListList label="เอกสารสิทธิ์เลขที่" value={docNumber} />
                <DetailsListList value={address} />
                <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                <DetailsListList label="การได้มา" value={receiveFrom} />
              </DetailsListContainer>
            </DetailsBlock>
          )
        )}
      </ul>
    </Accordion>
  );
};

export interface InfoAssetVehicleStatement extends InfoAssetStatement {
  name: string;
  plate?: string;
  province?: string;
  receiveDate?: string;
}

export interface VehicleProps {
  statements: InfoAssetVehicleStatement[];
}

const Vehicle = ({ statements }: VehicleProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/vehicle.svg"
          name="ยานพาหนะ"
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {statements.map(({ value, actor, name, plate, province, receiveDate }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} name={name} value={value} />
            <DetailsListContainer>
              <DetailsListList value={plate} />
              <DetailsListList value={province} />
              <DetailsListList label="วันที่ได้มา" value={receiveDate} />
            </DetailsListContainer>
          </DetailsBlock>
        ))}
      </ul>
    </Accordion>
  );
};

const VALUABLE_GROUPS = [
  "กระเป๋า",
  "เครื่องประดับ",
  "งานศิลปะ โบราณวัตถุ",
  "ทองคำ",
  "นาฬิกา",
  "วัตถุมงคล",
  "อาวุธปืน",
  "ของสะสมอื่น",
] as const;

export interface InfoAssetValuableGroupStatement extends InfoAssetStatement {
  name: string;
  count?: number | string;
  receiveDate?: string;
}

export interface ValuableGroupProps {
  name: (typeof VALUABLE_GROUPS)[number];
  statements: InfoAssetValuableGroupStatement[];
}

const ValuableGroup = ({ name, statements }: ValuableGroupProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          name={name}
          length={statements.length}
          value={statements.reduce((a, c) => a + c.value, 0)}
          className="bg-gray-2 border-b-gray-4"
        />
      }
    >
      <ul>
        {statements.map(({ value, actor, name, count, receiveDate }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} name={name} value={value} />
            <DetailsListContainer>
              <DetailsListList value={count} extension="หน่วย" />
              <DetailsListList label="วันที่ได้มา" value={receiveDate} />
            </DetailsListContainer>
          </DetailsBlock>
        ))}
      </ul>
    </Accordion>
  );
};

export type InfoAssetValuableStatement = Partial<
  Record<(typeof VALUABLE_GROUPS)[number], InfoAssetValuableGroupStatement[]>
>;

export interface ValuableProps {
  statements: InfoAssetValuableStatement;
}

const Valuable = ({ statements }: ValuableProps) => {
  const itemLength = Object.values(statements).reduce((a, c) => a + c.length, 0);
  const itemValue = Object.values(statements).reduce(
    (a, c) => a + c.reduce((b, d) => b + d.value, 0),
    0
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/valuable.svg"
          name="ทรัพย์สินอื่น"
          length={itemLength}
          value={itemValue}
          nameExtension={
            <InfoAssetPopover>
              <p>
                <span className="font-bold block mb-5">ทรัพย์สินอื่น</span>
                คือทรัพย์สินที่นอกจากที่ระบุ ในรายการทรัพย์สินที่ 1-8
                และมีมูลค่ารวมกันตั้งแต่ สองแสนบาทขึ้นไป
              </p>
            </InfoAssetPopover>
          }
        />
      }
    >
      {VALUABLE_GROUPS.map((name, i) => {
        const groupStatement = statements[name];

        return (
          groupStatement && (
            <ValuableGroup key={i} name={name} statements={groupStatement} />
          )
        );
      })}
    </Accordion>
  );
};

const InfoAssetSingleAccordion = {
  Cash,
  Land,
  Concession,
  Building,
  Vehicle,
  Valuable,
};

export default InfoAssetSingleAccordion;
