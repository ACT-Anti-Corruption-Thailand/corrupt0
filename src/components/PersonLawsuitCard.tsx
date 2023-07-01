import Accordion from "@/components/Accordion";
import Image from "next/image";
import { ReactNode } from "react";

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

interface PersonLawsuitCardProps {
  updateDate: string;
  description: string;
}

// CardBase

interface PersonLawsuitCardBaseProps extends PersonLawsuitCardProps {
  type: "sec" | "nacc" | "supreme";
  children: ReactNode;
}

const PersonLawsuitCardBase = ({
  type,
  updateDate,
  description,
  children,
}: PersonLawsuitCardBaseProps) => {
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
            <p className="text-gray-3">{description}</p>
          </div>
        </div>
      }
    >
      <div className="bg-white-10 p-10 rounded-b-5 b6 text-gray-4">{children}</div>
    </Accordion>
  );
};

// SecCard

interface PersonLawsuitSecCardProps extends PersonLawsuitCardProps {
  enforceDate: string;
  cause: string;
  actionType: string;
  actionDetail: string;
}

const PersonLawsuitSecCard = ({
  description,
  updateDate,
  enforceDate,
  cause,
  actionType,
  actionDetail,
}: PersonLawsuitSecCardProps) => {
  return (
    <PersonLawsuitCardBase type="sec" description={description} updateDate={updateDate}>
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
    </PersonLawsuitCardBase>
  );
};

// NaccCard

interface PersonLawsuitNaccCardProps extends PersonLawsuitCardProps {
  blackNumber: string;
  redNumber: string;
  meetingDate: string;
  meetingResult: string;
  enforceResult: string;
  note: string;
}

const PersonLawsuitNaccCard = ({
  description,
  updateDate,
  blackNumber,
  redNumber,
  meetingDate,
  meetingResult,
  enforceResult,
  note,
}: PersonLawsuitNaccCardProps) => {
  return (
    <PersonLawsuitCardBase type="nacc" description={description} updateDate={updateDate}>
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
    </PersonLawsuitCardBase>
  );
};

// SupremeCard

interface PersonLawsuitSupremeCardProps extends PersonLawsuitCardProps {
  blackNumber: string;
  redNumber: string;
  judgement: string;
}

const PersonLawsuitSupremeCard = ({
  description,
  updateDate,
  blackNumber,
  redNumber,
  judgement,
}: PersonLawsuitSupremeCardProps) => {
  return (
    <PersonLawsuitCardBase
      type="supreme"
      description={description}
      updateDate={updateDate}
    >
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
    </PersonLawsuitCardBase>
  );
};

// Export

const PersonLawsuitCard = {
  Sec: PersonLawsuitSecCard,
  Nacc: PersonLawsuitNaccCard,
  Supreme: PersonLawsuitSupremeCard,
};

export default PersonLawsuitCard;
