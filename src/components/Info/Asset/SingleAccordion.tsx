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
      <span className="b7 text-black/50 nobr">{length} รายการ</span>
      {notUndefinedOrNull(value) && (
        <div className="ml-auto b4 font-bold">{value.toLocaleString("th-TH")}</div>
      )}
      <Image
        className={clsx("accordion-arrow", !notUndefinedOrNull(value) && "ml-auto")}
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
  statements?: InfoAssetStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Cash = ({ name, statements = [], showActor, showSpouse, showChild }: CashProps) => {
  const filteredS = statements.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((f) => f)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon={CASH_ICONS[name]}
          name={name}
          length={filteredS.length}
          value={filteredS.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {filteredS.map(({ value, actor }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} value={value} />
          </DetailsBlock>
        ))}
      </ul>
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
  rai?: string;
  ngan?: string;
  sq_wa?: string;
}

export interface LandProps {
  statements?: InfoAssetLandStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Land = ({ statements = [], showActor, showSpouse, showChild }: LandProps) => {
  const filteredS = statements.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((f) => f)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/land.svg"
          name="ที่ดิน"
          nameExtension={
            filteredS.some((e) => e.type !== "โฉนด") && (
              <div className="bg-value-negative-bg text-value-negative-text b7 px-10 rounded-full">
                มีที่ดินที่ไม่ใช่โฉนด
              </div>
            )
          }
          length={filteredS.length}
          value={filteredS.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {filteredS.map(
          (
            {
              value,
              actor,
              name,
              address,
              receiveDate,
              receiveFrom,
              land_doc_number,
              rai,
              ngan,
              sq_wa,
            },
            i
          ) => (
            <DetailsBlock key={i}>
              <DetailsFirstLine
                actor={actor}
                name={land_doc_number ? `${name} เลขที่ ${land_doc_number}` : name}
                value={value}
              />
              <DetailsListContainer>
                <DetailsListList
                  value={[
                    rai && `${rai} ไร่`,
                    ngan && `${ngan} งาน`,
                    sq_wa && `${sq_wa} ตร.ว`,
                  ]
                    .filter((e) => e)
                    .join(" ")
                    .trim()}
                />
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
  receiveDate: string;
  endDate: string;
}

export interface ConcessionProps {
  statements?: InfoAssetConcessionStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Concession = ({
  statements = [],
  showActor,
  showSpouse,
  showChild,
}: ConcessionProps) => {
  const filteredS = statements.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((f) => f)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/concession.svg"
          name="สิทธิและสัมปทาน"
          length={filteredS.length}
          value={filteredS.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {filteredS.map(({ value, actor, name, receiveDate, endDate }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} name={name} value={value} />
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
          </DetailsBlock>
        ))}
      </ul>
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
  statements?: InfoAssetBuildingStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Building = ({
  statements = [],
  showActor,
  showSpouse,
  showChild,
}: BuildingProps) => {
  const filteredS = statements.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((f) => f)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/building.svg"
          name="โรงเรือนและสิ่งปลูกสร้าง"
          length={filteredS.length}
          value={filteredS.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {filteredS.map(
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
              <DetailsFirstLine actor={actor} name={name} value={value} />
              <DetailsListContainer>
                <DetailsListList label="เอกสารสิทธิ์เลขที่" value={building_doc_number} />
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
  registration_number?: string;
  province?: string;
  receiveDate?: string;
  vehicle_model?: string;
}

export interface VehicleProps {
  statements?: InfoAssetVehicleStatement[];

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Vehicle = ({ statements = [], showActor, showSpouse, showChild }: VehicleProps) => {
  const filteredS = statements.filter((e) =>
    [showActor && "ผู้ยื่น", showSpouse && "คู่สมรส", showChild && "บุตร"]
      .filter((f) => f)
      .includes(e.actor)
  );

  return (
    <Accordion
      trigger={
        <Trigger
          icon="/icons/vehicle.svg"
          name="ยานพาหนะ"
          length={filteredS.length}
          value={filteredS.reduce((a, c) => a + c.value, 0)}
        />
      }
    >
      <ul>
        {filteredS.map(
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
              <DetailsFirstLine
                actor={actor}
                name={name + " " + (vehicle_model ?? "")}
                value={value}
              />
              <DetailsListContainer>
                <DetailsListList value={registration_number} />
                <DetailsListList value={province} />
                <DetailsListList label="วันที่ได้มา" value={receiveDate} />
              </DetailsListContainer>
            </DetailsBlock>
          )
        )}
      </ul>
    </Accordion>
  );
};

const VALUABLE_GROUPS = [
  "กระเป๋า",
  "อาวุธปืน",
  "นาฬิกา",
  "เครื่องประดับ",
  "วัตถุมงคล",
  "ทองคำ",
  "งานศิลปะ โบราณวัตถุ",
  "ของสะสมอื่น",
] as const;

export interface InfoAssetValuableGroupStatement extends InfoAssetStatement {
  name: string;
  count?: number | string;
  unit?: string;
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
        {statements.map(({ value, actor, name: sname, count, receiveDate, unit }, i) => (
          <DetailsBlock key={i}>
            <DetailsFirstLine actor={actor} name={sname} value={value} />
            <DetailsListContainer>
              <DetailsListList value={count} extension={unit ?? "หน่วย"} />
              <DetailsListList label="วันที่ได้มา" value={receiveDate} />
            </DetailsListContainer>
          </DetailsBlock>
        ))}
      </ul>
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
        .filter((f) => f)
        .includes(e.actor)
    );
  }
  return s;
};

export type InfoAssetValuableStatement = Partial<
  Record<(typeof VALUABLE_GROUPS)[number], InfoAssetValuableGroupStatement[]>
>;

export interface ValuableProps {
  statements?: InfoAssetValuableStatement;

  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
}

const Valuable = ({
  statements = {},
  showActor,
  showSpouse,
  showChild,
}: ValuableProps) => {
  const filteredS = filterValuableStatement(statements, showActor, showSpouse, showChild);

  const itemLength = Object.values(filteredS).reduce((a, c) => a + c.length, 0);
  const itemValue = Object.values(filteredS).reduce(
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
        const groupStatement = filteredS[name];

        return (
          groupStatement &&
          groupStatement.length > 0 && (
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
