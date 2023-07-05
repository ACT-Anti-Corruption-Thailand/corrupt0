"use client";

import { useState } from "react";

import Checkbox from "../Checkbox";

export default function InfoFinancialCheckboxes() {
  const [showActor, setShowActor] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [showChild, setShowChild] = useState(true);

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
