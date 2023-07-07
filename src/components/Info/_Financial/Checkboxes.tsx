"use client";

import Checkbox from "../../Checkbox";

import type { Dispatch, SetStateAction } from "react";

interface InfoFinancialCheckboxesProps {
  showActor: boolean;
  showSpouse: boolean;
  showChild: boolean;
  setShowActor: Dispatch<SetStateAction<boolean>>;
  setShowSpouse: Dispatch<SetStateAction<boolean>>;
  setShowChild: Dispatch<SetStateAction<boolean>>;
}

export default function InfoFinancialCheckboxes({
  showActor,
  showSpouse,
  showChild,
  setShowActor,
  setShowSpouse,
  setShowChild,
}: InfoFinancialCheckboxesProps) {
  return (
    <>
      <Checkbox
        checked={showActor}
        setChecked={setShowActor}
        checkSrc="/icons/check-w.svg"
        className={{
          checkbox: "bg-black",
        }}
      >
        <span>ผู้ยื่น</span>
      </Checkbox>
      <Checkbox
        checked={showSpouse}
        setChecked={setShowSpouse}
        className={{
          checkbox: "bg-black-40",
        }}
      >
        <span>คู่สมรส</span>
      </Checkbox>
      <Checkbox
        checked={showChild}
        setChecked={setShowChild}
        className={{
          checkbox: "bg-black-20",
        }}
      >
        <span>บุตรที่ยังไม่บรรลุนิติภาวะ</span>
      </Checkbox>
    </>
  );
}
