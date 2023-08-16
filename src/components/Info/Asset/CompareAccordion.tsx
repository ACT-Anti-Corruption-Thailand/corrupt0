import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Accordion from "@/components/Accordion";
import Image from "next/image";
import InfoAssetPopover from "./Popover";

import type { ReactNode } from "react";

const notUndefinedOrNull = (value: any) => value !== null && value !== undefined;

export interface InfoAssetStatement {
  actor: "ผู้ยื่น" | "คู่สมรส" | "บุตร";
  value: number;
}

interface TriggerProps {
  name: string;
  icon?: string;
  length1: number;
  length2: number;
  value1: number;
  value2: number;
  nameExtension?: ReactNode;
  className?: string;
  subClassName?: string;
  borderClassName?: string;
}

const Trigger = ({
  name,
  icon,
  nameExtension,
  length1,
  length2,
  value1,
  value2,
  className,
  subClassName,
  borderClassName,
}: TriggerProps) => {
  return (
    <>
      <div
        className={twMerge(
          clsx(
            "p-10 flex items-center justify-between bg-white border-b border-b-gray-3 gap-5",
            className
          )
        )}
      >
        {icon && <Image src={icon} width={20} height={20} alt="" />}
        <div className="b4 font-bold leading-1">{name}</div>
        {nameExtension}
        <Image
          className="accordion-arrow ml-auto"
          src="/icons/caret-g.svg"
          width={12}
          height={12}
          alt=""
        />
      </div>
      <div
        className={twMerge(clsx("flex border-b border-b-gray-3 bg-gray-1", subClassName))}
      >
        <div className="flex-1 flex justify-between items-baseline px-10">
          <div className="b6">{length1} รายการ</div>
          <div className="b4 font-bold">{value1.toLocaleString("th-TH")}</div>
        </div>
        <div className={twMerge(clsx("w-1 border-r border-r-gray-3", borderClassName))} />
        <div className="flex-1 flex justify-between items-baseline px-10">
          <div className="b6">{length2} รายการ</div>
          <div className="b4 font-bold">{value2.toLocaleString("th-TH")}</div>
        </div>
      </div>
    </>
  );
};

const DetailsBlock = ({ children }: { children: ReactNode }) => {
  return (
    <li className="py-5 px-10 bg-gray-1 border-b border-b-gray-2 flex flex-col">
      {children}
    </li>
  );
};

interface DetailsFirstLineProps extends InfoAssetStatement {
  name?: string;
}

const DetailsActor = ({ actor }: Omit<InfoAssetStatement, "value">) => {
  return (
    <span
      className={clsx(
        "block rounded-5 b7 px-5 mr-auto mb-5 whitespace-nowrap",
        actor === "ผู้ยื่น" && "bg-black text-white",
        actor === "คู่สมรส" && "bg-black/40",
        actor === "บุตร" && "bg-black/20"
      )}
    >
      {actor}
    </span>
  );
};

const DetailsFirstLine = ({ actor, name, value }: DetailsFirstLineProps) => {
  return (
    <span className="flex items-center">
      <span
        className={clsx(
          "inline-block rounded-5 b7 px-5 whitespace-nowrap",
          actor === "ผู้ยื่น" && "bg-black text-white",
          actor === "คู่สมรส" && "bg-black/40",
          actor === "บุตร" && "bg-black/20"
        )}
      >
        {actor}
      </span>
      {name && <span className="b5 ml-5">{name}</span>}
      {notUndefinedOrNull(value) && (
        <span className="b5 font-bold ml-auto">{value.toLocaleString("th-TH")}</span>
      )}
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
  statements1?: InfoAssetStatement[];
  statements2?: InfoAssetStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Cash = ({
  name,
  statements1 = [],
  statements2 = [],
  showActor,
  showSpouse,
  showChild,
}: CashProps) => {
  const filteredS1 = statements1.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );
  const filteredS2 = statements2.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon={CASH_ICONS[name]}
          name={name}
          length1={filteredS1.length}
          length2={filteredS2.length}
          value1={filteredS1.reduce((a, c) => a + c.value, 0)}
          value2={filteredS2.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {filteredS1.map(({ value, actor }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {filteredS2.map(({ value, actor }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
      </div>
    </Accordion>
  );
};

export interface InfoAssetLandStatement extends InfoAssetStatement {
  type: "โฉนด" | string;
  name: string;
  address?: string;
  receiveDate?: string;
  receiveFrom?: string;
  land_doc_number?: string;
}

export interface LandProps {
  statements1?: InfoAssetLandStatement[];
  statements2?: InfoAssetLandStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Land = ({
  statements1 = [],
  statements2 = [],
  showActor,
  showSpouse,
  showChild,
}: LandProps) => {
  const filteredS1 = statements1.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );
  const filteredS2 = statements2.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/land.svg"
          name="ที่ดิน"
          nameExtension={
            [...filteredS1, ...filteredS2].some((e) => e.type !== "โฉนด") && (
              <div className="bg-value-negative-bg text-value-negative-text b7 px-10 rounded-full">
                มีที่ดินที่ไม่ใช่โฉนด
              </div>
            )
          }
          length1={filteredS1.length}
          value1={filteredS1.reduce((a, c) => a + c.value, 0)}
          length2={filteredS2.length}
          value2={filteredS2.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {filteredS1.map(
            (
              { value, actor, name, address, receiveDate, receiveFrom, land_doc_number },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">{`${name} เลขที่ ${land_doc_number}`}</span>
                <DetailsListContainer>
                  <DetailsListList value={address} />
                  {receiveDate && (
                    <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                  )}
                  {receiveFrom && (
                    <DetailsListList label="การได้มา" value={receiveFrom} />
                  )}
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {filteredS2.map(
            (
              { value, actor, name, address, receiveDate, receiveFrom, land_doc_number },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">{`${name} เลขที่ ${land_doc_number}`}</span>
                <DetailsListContainer>
                  <DetailsListList value={address} />
                  {receiveDate && (
                    <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                  )}
                  {receiveFrom && (
                    <DetailsListList label="การได้มา" value={receiveFrom} />
                  )}
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
      </div>
    </Accordion>
  );
};

export interface InfoAssetConcessionStatement extends InfoAssetStatement {
  name: string;
  receiveDate: string;
  endDate: string;
}

export interface ConcessionProps {
  statements1?: InfoAssetConcessionStatement[];
  statements2?: InfoAssetConcessionStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Concession = ({
  statements1 = [],
  statements2 = [],
  showActor,
  showSpouse,
  showChild,
}: ConcessionProps) => {
  const filteredS1 = statements1.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );
  const filteredS2 = statements2.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/concession.svg"
          name="สิทธิและสัมปทาน"
          length1={filteredS1.length}
          value1={filteredS1.reduce((a, c) => a + c.value, 0)}
          length2={filteredS2.length}
          value2={filteredS2.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {filteredS1.map(({ value, actor, name, receiveDate, endDate }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              <span className="b5">{name}</span>
              <DetailsListContainer>
                {receiveDate && endDate ? (
                  <DetailsListList
                    label="วันที่ได้มา–วันที่สิ้นสุด"
                    value={receiveDate + "–" + endDate}
                  />
                ) : receiveDate ? (
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                ) : (
                  <DetailsListList label="วันที่สิ้นสุด" value={endDate} />
                )}
              </DetailsListContainer>
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {filteredS2.map(({ value, actor, name, receiveDate, endDate }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              <span className="b5">{name}</span>
              <DetailsListContainer>
                {receiveDate && endDate ? (
                  <DetailsListList
                    label="วันที่ได้มา–วันที่สิ้นสุด"
                    value={receiveDate + "–" + endDate}
                  />
                ) : receiveDate ? (
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                ) : (
                  <DetailsListList label="วันที่สิ้นสุด" value={endDate} />
                )}
              </DetailsListContainer>
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
      </div>
    </Accordion>
  );
};

export interface InfoAssetBuildingStatement extends InfoAssetStatement {
  name: string;
  building_doc_number?: string | number;
  address?: string;
  receiveDate?: string;
  receiveFrom?: string;
}

export interface BuildingProps {
  statements1?: InfoAssetBuildingStatement[];
  statements2?: InfoAssetBuildingStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Building = ({
  statements1 = [],
  statements2 = [],
  showActor,
  showSpouse,
  showChild,
}: BuildingProps) => {
  const filteredS1 = statements1.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );
  const filteredS2 = statements2.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/building.svg"
          name="โรงเรือนและสิ่งปลูกสร้าง"
          length1={filteredS1.length}
          value1={filteredS1.reduce((a, c) => a + c.value, 0)}
          length2={filteredS2.length}
          value2={filteredS2.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {filteredS1.map(
            (
              {
                value,
                actor,
                name,
                building_doc_number,
                address,
                receiveDate,
                receiveFrom,
              },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">{name}</span>
                <DetailsListContainer>
                  <DetailsListList
                    label="เอกสารสิทธิ์เลขที่"
                    value={building_doc_number}
                  />
                  <DetailsListList value={address} />
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                  <DetailsListList label="การได้มา" value={receiveFrom} />
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {filteredS2.map(
            (
              {
                value,
                actor,
                name,
                building_doc_number,
                address,
                receiveDate,
                receiveFrom,
              },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">{name}</span>
                <DetailsListContainer>
                  <DetailsListList
                    label="เอกสารสิทธิ์เลขที่"
                    value={building_doc_number}
                  />
                  <DetailsListList value={address} />
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                  <DetailsListList label="การได้มา" value={receiveFrom} />
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
      </div>
    </Accordion>
  );
};

export interface InfoAssetVehicleStatement extends InfoAssetStatement {
  name: string;
  registration_number?: string;
  province?: string;
  receiveDate?: string;
  vehicle_model?: string;
}

export interface VehicleProps {
  statements1?: InfoAssetVehicleStatement[];
  statements2?: InfoAssetVehicleStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Vehicle = ({
  statements1 = [],
  statements2 = [],
  showActor,
  showSpouse,
  showChild,
}: VehicleProps) => {
  const filteredS1 = statements1.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );
  const filteredS2 = statements2.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((e) => e)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/vehicle.svg"
          name="ยานพาหนะ"
          length1={filteredS1.length}
          value1={filteredS1.reduce((a, c) => a + c.value, 0)}
          length2={filteredS2.length}
          value2={filteredS2.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {filteredS1.map(
            (
              {
                value,
                actor,
                name,
                vehicle_model,
                registration_number,
                province,
                receiveDate,
              },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">
                  {name} {vehicle_model}
                </span>
                <DetailsListContainer>
                  <DetailsListList value={registration_number} />
                  <DetailsListList value={province} />
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {filteredS2.map(
            (
              {
                value,
                actor,
                name,
                vehicle_model,
                registration_number,
                province,
                receiveDate,
              },
              i
            ) => (
              <DetailsBlock key={i}>
                <DetailsActor actor={actor} />
                <span className="b5">
                  {name} {vehicle_model}
                </span>
                <DetailsListContainer>
                  <DetailsListList value={registration_number} />
                  <DetailsListList value={province} />
                  <DetailsListList label="วันที่ได้มา" value={receiveDate} />
                </DetailsListContainer>
                {notUndefinedOrNull(value) && (
                  <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
                )}
              </DetailsBlock>
            )
          )}
        </ul>
      </div>
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
  statements1: InfoAssetValuableGroupStatement[];
  statements2: InfoAssetValuableGroupStatement[];
}

const ValuableGroup = ({ name, statements1, statements2 }: ValuableGroupProps) => {
  return (
    <Accordion
      trigger={
        <Trigger
          name={name}
          length1={statements1.length}
          value1={statements1.reduce((a, c) => a + c.value, 0)}
          length2={statements2.length}
          value2={statements2.reduce((a, c) => a + c.value, 0)}
          className="bg-gray-2 border-b-gray-4"
          subClassName="bg-gray-3 border-b-gray-4"
          borderClassName="border-r-gray-4"
        />
      }
    >
      <div className="flex">
        <ul className="flex-1">
          {statements1.map(({ value, actor, name, count, receiveDate }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              <span className="b5">{name}</span>
              <DetailsListContainer>
                <DetailsListList value={count} extension="หน่วย" />
                <DetailsListList label="วันที่ได้มา" value={receiveDate} />
              </DetailsListContainer>
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
        <div className="w-1 bg-gray-3" />
        <ul className="flex-1">
          {statements2.map(({ value, actor, name, count, receiveDate }, i) => (
            <DetailsBlock key={i}>
              <DetailsActor actor={actor} />
              <span className="b5">{name}</span>
              <DetailsListContainer>
                <DetailsListList value={count} extension="หน่วย" />
                <DetailsListList label="วันที่ได้มา" value={receiveDate} />
              </DetailsListContainer>
              {notUndefinedOrNull(value) && (
                <span className="b5 font-bold">{value.toLocaleString("th-TH")}</span>
              )}
            </DetailsBlock>
          ))}
        </ul>
      </div>
    </Accordion>
  );
};

const filterValuableStatement = (
  statements: InfoAssetValuableStatement,

  showActor: boolean,
  showSpouse: boolean,
  showChild: boolean
) => {
  const s: InfoAssetValuableStatement = JSON.parse(JSON.stringify(statements));
  for (const catg in s) {
    const c = catg as keyof InfoAssetValuableStatement;
    s[c] = s[c]?.filter((e) =>
      [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
        .filter((e) => e)
        .includes(e.actor)
    );
  }
  return s;
};

export type InfoAssetValuableStatement = Partial<
  Record<(typeof VALUABLE_GROUPS)[number], InfoAssetValuableGroupStatement[]>
>;

export interface ValuableProps {
  statements1?: InfoAssetValuableStatement;
  statements2?: InfoAssetValuableStatement;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Valuable = ({
  statements1 = {},
  statements2 = {},
  showActor,
  showSpouse,
  showChild,
}: ValuableProps) => {
  const filteredS1 = filterValuableStatement(
    statements1,
    showActor,
    showSpouse,
    showChild
  );
  const filteredS2 = filterValuableStatement(
    statements2,
    showActor,
    showSpouse,
    showChild
  );

  const itemLength1 = Object.values(filteredS1).reduce((a, c) => a + c.length, 0);
  const itemValue1 = Object.values(filteredS1).reduce(
    (a, c) => a + c.reduce((b, d) => b + d.value, 0),
    0
  );
  const itemLength2 = Object.values(filteredS2).reduce((a, c) => a + c.length, 0);
  const itemValue2 = Object.values(filteredS2).reduce(
    (a, c) => a + c.reduce((b, d) => b + d.value, 0),
    0
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/valuable.svg"
          name="ทรัพย์สินอื่น"
          length1={itemLength1}
          value1={itemValue1}
          length2={itemLength2}
          value2={itemValue2}
          nameExtension={
            <InfoAssetPopover triggerDiv>
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
        const groupStatement1 = filteredS1[name];
        const groupStatement2 = filteredS2[name];

        return (
          groupStatement1 &&
          groupStatement2 &&
          groupStatement1.length + groupStatement2.length > 0 && (
            <ValuableGroup
              key={i}
              name={name}
              statements1={groupStatement1}
              statements2={groupStatement2}
            />
          )
        );
      })}
    </Accordion>
  );
};

const InfoAssetCompareAccordion = {
  Cash,
  Land,
  Concession,
  Building,
  Vehicle,
  Valuable,
};

export default InfoAssetCompareAccordion;
