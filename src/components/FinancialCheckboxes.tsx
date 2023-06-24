"use client";

import { useState } from "react";

import Checkbox from "./Checkbox";

export default function FinancialCheckboxes() {
  const [self, setSelf] = useState(true);
  const [spouse, setSpouse] = useState(true);
  const [child, setChild] = useState(true);

  return (
    <div className="flex gap-10 items-center justify-center b6 py-5 mb-5">
      <Checkbox
        checked={self}
        setChecked={setSelf}
        checkSrc="/icons/check-w.svg"
        className={{
          checkbox: "bg-black",
        }}
      >
        <span>ผู้ยื่น</span>
      </Checkbox>
      <Checkbox
        checked={spouse}
        setChecked={setSpouse}
        className={{
          checkbox: "bg-black-40",
        }}
      >
        <span>คู่สมรส</span>
      </Checkbox>
      <Checkbox
        checked={child}
        setChecked={setChild}
        className={{
          checkbox: "bg-black-20",
        }}
      >
        <span>บุตรที่ยังไม่บรรลุนิติภาวะ</span>
      </Checkbox>
    </div>
  );
}
