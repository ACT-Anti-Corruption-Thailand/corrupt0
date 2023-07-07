import Accordion from "@/components/Accordion";
import Image from "next/image";

import type { ReactNode } from "react";

const CARDTYPE_TEXT = {
  sec: {
    bureau: "ก.ล.ต.",
    heading: "มาตรา",
  },
  nacc: {
    bureau: "ป.ป.ช.",
    heading: "ข้อกล่าวหา",
  },
  supreme: {
    bureau: "ศาลฎีกา",
    heading: "มาตรากฎหมายที่กระทำผิด",
  },
} as const;

interface InfoLawsuitCardProps {
  updateDate: string;
  description: string;
}

// CardBase

interface InfoLawsuitCardBaseProps extends InfoLawsuitCardProps {
  type: "sec" | "nacc" | "supreme";
  children: ReactNode;
}

const InfoLawsuitCardBase = ({
  type,
  updateDate,
  description,
  children,
}: InfoLawsuitCardBaseProps) => {
  return (
    <Accordion
      trigger={
        <div className="p-10 bg-white-20 rounded-5 text-left ui-open:rounded-b-0">
          <div className="b6 flex items-center leading-1">
            <span className="bg-white-10 border border-gray-5 rounded-5 py-2 px-8">
              {CARDTYPE_TEXT[type].bureau}
            </span>
            <span className="ml-auto text-gray-5 mr-4">
              วันที่ปรับปรุงข้อมูล {updateDate}
            </span>
            <Image
              className="ui-open:rotate-180"
              src="/icons/caret-g.svg"
              width={13}
              height={13}
              alt=""
            />
          </div>
          <div className="mt-5 b6">
            <span className="block b5 font-bold">{CARDTYPE_TEXT[type].heading}</span>
            <p className="text-gray-3 ui-not-open:line-clamp-3">{description}</p>
          </div>
        </div>
      }
    >
      <div className="bg-white-10 p-10 rounded-b-5 b6 text-gray-4">{children}</div>
    </Accordion>
  );
};

// SecCard

interface InfoLawsuitSecCardProps extends InfoLawsuitCardProps {
  enforceDate: string;
  cause: string;
  actionType: string;
  actionDetail: string;
}

const InfoLawsuitSecCard = ({
  description,
  updateDate,
  enforceDate,
  cause,
  actionType,
  actionDetail,
}: InfoLawsuitSecCardProps) => {
  return (
    <InfoLawsuitCardBase type="sec" description={description} updateDate={updateDate}>
      <span className="block">
        <span className="font-bold text-white">วันที่ดำเนินการ</span> {enforceDate}
      </span>
      <hr className="my-10 border-t-gray-5" />
      <span className="block font-bold text-white">การกระทำโดยสังเขป</span>
      <p>{cause}</p>
      <hr className="my-10 border-t-gray-5" />
      <span className="block font-bold text-white">ประเภทการดำเนินการ</span>
      <p>{actionType}</p>
      <span className="block font-bold text-white">รายละเอียดการดำเนินการ</span>
      <p>{actionDetail}</p>
    </InfoLawsuitCardBase>
  );
};

// NaccCard

interface InfoLawsuitNaccCardProps extends InfoLawsuitCardProps {
  blackNumber: string;
  redNumber: string;
  meetingDate: string;
  meetingResult: string;
  enforceResult: string;
  note: string;
}

const InfoLawsuitNaccCard = ({
  description,
  updateDate,
  blackNumber,
  redNumber,
  meetingDate,
  meetingResult,
  enforceResult,
  note,
}: InfoLawsuitNaccCardProps) => {
  return (
    <InfoLawsuitCardBase type="nacc" description={description} updateDate={updateDate}>
      <ul>
        <li>
          <span className="font-bold text-white">เลขคดีดำ</span> {blackNumber}
        </li>
        <li>
          <span className="font-bold text-white">เลขคดีแดง</span> {redNumber}
        </li>
        <li>
          <span className="font-bold text-white">วันที่มีมติ</span> {meetingDate}
        </li>
      </ul>
      <hr className="my-10 border-t-gray-5" />
      <span className="block font-bold text-white">ผลการพิจารณา</span>
      <p>{meetingResult}</p>
      <hr className="my-10 border-t-gray-5" />
      <span className="block font-bold text-white">ผลการดำเนินการ</span>
      <p>{enforceResult}</p>
      <p className="mt-10 py-10 px-8 rounded-5 border border-gray-5">{note}</p>
    </InfoLawsuitCardBase>
  );
};

// SupremeCard

interface InfoLawsuitSupremeCardProps extends InfoLawsuitCardProps {
  blackNumber: string;
  redNumber: string;
  judgement: string;
}

const InfoLawsuitSupremeCard = ({
  description,
  updateDate,
  blackNumber,
  redNumber,
  judgement,
}: InfoLawsuitSupremeCardProps) => {
  return (
    <InfoLawsuitCardBase type="supreme" description={description} updateDate={updateDate}>
      <ul>
        <li>
          <span className="font-bold text-white">เลขคดีดำ</span> {blackNumber}
        </li>
        <li>
          <span className="font-bold text-white">เลขคดีแดง</span> {redNumber}
        </li>
      </ul>
      <hr className="my-10 border-t-gray-5" />
      <span className="block font-bold text-white">คำพิพากษา</span>
      <p>{judgement}</p>
    </InfoLawsuitCardBase>
  );
};

// Export

const InfoLawsuitCard = {
  Sec: InfoLawsuitSecCard,
  Nacc: InfoLawsuitNaccCard,
  Supreme: InfoLawsuitSupremeCard,
};

export default InfoLawsuitCard;
