"use client";
import clsx from "clsx";
import { useState } from "react";

import { Combobox, Switch } from "@headlessui/react";
import Image from "next/image";
import {
  CartesianGrid,
  Cell,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import _NACC_DEBTASSET from "@/data/nacc_debtasset.json";

const NACC_DEBTASSET = _NACC_DEBTASSET as {
  name: string;
  asset: number;
  debt: number;
  group: string;
}[];

import {
  formatThousands,
  moneyFormatter,
  thaiMoneyFormatter,
} from "@/functions/moneyFormatter";
import { highlightChar } from "@/functions/searchHighlighter";

import type { Dispatch, SetStateAction } from "react";

type PeopleType =
  | "สส"
  | "สว"
  | "สนช"
  | "นายก"
  | "ข้าราชการ"
  | "ตุลาการ"
  | "องค์กรอิสระ"
  | "กระทรวง"
  | "อปท";

const FILTERCHECKBOX_COLOR_CLASS: Record<PeopleType, string> = {
  สส: "border-position-สส ui-checked:bg-position-สส",
  สว: "border-position-สว ui-checked:bg-position-สว",
  สนช: "border-position-สนช ui-checked:bg-position-สนช",
  นายก: "border-position-นายก ui-checked:bg-position-นายก",
  ข้าราชการ: "border-position-ข้าราชการ ui-checked:bg-position-ข้าราชการ",
  ตุลาการ: "border-position-ตุลาการ ui-checked:bg-position-ตุลาการ",
  องค์กรอิสระ: "border-position-องค์กรอิสระ ui-checked:bg-position-องค์กรอิสระ",
  กระทรวง: "border-position-กระทรวง ui-checked:bg-position-กระทรวง",
  อปท: "border-position-อปท ui-checked:bg-position-อปท",
};

interface FilterCheckboxProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  name: string;
  count: number | undefined;
  color: PeopleType;
  disabled?: boolean;
}

function FilterCheckbox({
  show,
  setShow,
  name,
  count,
  color,
  disabled = false,
}: FilterCheckboxProps) {
  return (
    <Switch
      checked={show}
      onChange={setShow}
      disabled={disabled}
      className={clsx(
        "flex gap-5 items-center b4 text-white text-left",
        disabled && "opacity-40"
      )}
    >
      <div
        className={`w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center ${FILTERCHECKBOX_COLOR_CLASS[color]}`}
        arid-hidden="true"
      >
        <Image
          className="ui-checked:opacity-100 w-10 h-8 transition-opacity duration-100 opacity-0"
          src="/icons/check.svg"
          width={10}
          height={8}
          alt=""
        />
      </div>
      <span className="nobr">{name}</span>
      {count !== undefined && <span className="text-gray-4 nobr">{count} คน</span>}
    </Switch>
  );
}

// Tooltip
const StyledTooltip = ({ payload }: { payload: Record<any, any> }) => {
  if (!payload.active) return;

  const [assetVal, assetUnit] = thaiMoneyFormatter(payload.asset);
  const [debtVal, debtUnit] = thaiMoneyFormatter(payload.debt);

  return (
    <div className="rounded-5 bg-white text-left text-black b6 p-10">
      <h3 className="b3 font-bold">{payload.name.replace(/-/g, " ")}</h3>
      <p className="text-gray-5">{payload.group}</p>
      <hr className="py-5 border-t border-t-gray-2" />
      <p>
        ทรัพย์สิน
        <br />
        <span className="b4">
          <span className="font-bold">{formatThousands(assetVal)}</span> {assetUnit}
        </span>
      </p>
      <hr className="py-5 border-t border-t-gray-2" />
      <p>
        หนี้สิน
        <br />
        <span className="b4">
          <span className="font-bold">{formatThousands(debtVal)}</span> {debtUnit}
        </span>
      </p>
    </div>
  );
};

const POSITION_COLOR: Record<string, string | undefined> = {
  สมาชิกสภาผู้แทนราษฎร: "#5849FF",
  สมาชิกวุฒิสภา: "#62a1ff",
  สมาชิกสภานิติบัญญัติแห่งชาติ: "#0C832D",
  นายกรัฐมนตรีและรัฐมนตรี: "#FF6283",
  ข้าราชการการเมือง: "#F3AF00",
  ตุลาการศาลรัฐธรรมนูญ: "#CD6200",
  ผู้ดำรงตำแหน่งในองค์กรอิสระ: "#D88AFC",
  "ผู้บริหารกระทรวง/ข้าราชการระดับสูง": "#3CD59E",
  องค์กรปกครองส่วนท้องถิ่น: "#25939A",
};
const DISABLED_COLOR = "#3F3F3F";

const POSITION_COUNT: Record<string, number> = {
  สมาชิกสภาผู้แทนราษฎร: 0,
  สมาชิกวุฒิสภา: 0,
  สมาชิกสภานิติบัญญัติแห่งชาติ: 0,
  นายกรัฐมนตรีและรัฐมนตรี: 0,
  ข้าราชการการเมือง: 0,
  ตุลาการศาลรัฐธรรมนูญ: 0,
  ผู้ดำรงตำแหน่งในองค์กรอิสระ: 0,
  "ผู้บริหารกระทรวง/ข้าราชการระดับสูง": 0,
  องค์กรปกครองส่วนท้องถิ่น: 0,
};
NACC_DEBTASSET.forEach((e) => {
  POSITION_COUNT[e.group] = (POSITION_COUNT[e.group] ?? 0) + 1;
});

const PEOPLE = NACC_DEBTASSET.map((e) => e.name.replace(/-/g, " "));

export default function AssetDebtChart() {
  const [selectedPeople, setSelectedPeople] = useState<typeof PEOPLE>([]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? PEOPLE
      : PEOPLE.filter((person) => {
          return person.includes(query);
        });

  const [showCatg1, setShowCatg1] = useState(true);
  const [showCatg2, setShowCatg2] = useState(true);
  const [showCatg3, setShowCatg3] = useState(true);
  const [showCatg4, setShowCatg4] = useState(true);
  const [showCatg5, setShowCatg5] = useState(true);
  const [showCatg6, setShowCatg6] = useState(true);
  const [showCatg7, setShowCatg7] = useState(true);
  const [showCatg8, setShowCatg8] = useState(true);
  const [showCatg9, setShowCatg9] = useState(true);

  const ACTIVE_CATG = [
    showCatg1 && "นายกรัฐมนตรีและรัฐมนตรี",
    showCatg2 && "สมาชิกสภาผู้แทนราษฎร",
    showCatg3 && "สมาชิกวุฒิสภา",
    showCatg4 && "สมาชิกสภานิติบัญญัติแห่งชาติ",
    showCatg5 && "ข้าราชการการเมือง",
    showCatg6 && "ตุลาการศาลรัฐธรรมนูญ",
    showCatg7 && "ผู้ดำรงตำแหน่งในองค์กรอิสระ",
    showCatg8 && "ผู้บริหารกระทรวง/ข้าราชการระดับสูง",
    showCatg9 && "องค์กรปกครองส่วนท้องถิ่น",
  ].filter((e) => e);

  const FILTERED_CHARTDATA = NACC_DEBTASSET.map((e) => ({
    ...e,
    active:
      selectedPeople.length > 0
        ? selectedPeople.includes(e.name.replace(/-/g, " "))
        : ACTIVE_CATG.includes(e.group),
  }));

  return (
    <div className="flex flex-col gap-10 lg:gap-30 lg:flex-row">
      <div className="flex-1 min-w-0">
        <div className="-mx-10 h-[345px] md:h-[590px]">
          <ResponsiveContainer>
            <ScatterChart
              width={330}
              height={345}
              margin={{
                left: 15,
                right: 15,
                bottom: 15,
                top: 30,
              }}
            >
              <CartesianGrid />
              <ReferenceLine
                x={1801090.878}
                stroke="#EC1C24"
                isFront
                strokeDasharray="3 3"
              />
              <ReferenceLine
                x={120208600000}
                stroke="#AAA"
                isFront
                strokeDasharray="3 3"
              />
              <ReferenceLine y={205679} stroke="#EC1C24" isFront strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="asset"
                tickFormatter={moneyFormatter}
                scale="log"
                ticks={[
                  1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
                ]}
                domain={[1, 1e12]}
                interval={0}
                fill="#3F3F3F"
                className="b7"
                angle={-45}
                axisLine={false}
              >
                <Label
                  value="ทรัพย์สิน (บาท)"
                  offset={-5}
                  position="bottom"
                  fill="#fff"
                  className="b6"
                />
              </XAxis>
              <YAxis
                type="number"
                dataKey="debt"
                tickFormatter={moneyFormatter}
                scale="log"
                ticks={[
                  1, 10, 100, 1e3, 10e3, 100e3, 1e6, 10e6, 100e6, 1e9, 10e9, 100e9, 1e12,
                ]}
                domain={[1, 1e12]}
                interval={0}
                fill="#3F3F3F"
                className="b7"
                mirror
                axisLine={false}
              >
                <Label
                  value="หนี้สิน (บาท)"
                  offset={10}
                  position="top"
                  fill="#fff"
                  className="b6"
                />
              </YAxis>
              <Tooltip
                cursor={false}
                content={(e) =>
                  e.active &&
                  e.payload?.length && <StyledTooltip payload={e.payload[0].payload} />
                }
              />
              <Scatter data={FILTERED_CHARTDATA} fill="transparent" strokeWidth={1}>
                {FILTERED_CHARTDATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    stroke={
                      entry.active
                        ? POSITION_COLOR[entry.group] ?? "#fff"
                        : DISABLED_COLOR
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-left">
        <div className="text-white b3 font-bold">ดูเฉพาะ</div>
        <div>
          <Combobox
            value={selectedPeople}
            onChange={(v) => setSelectedPeople(v)}
            multiple
          >
            <div className="flex items-center gap-5 min-w-0 md:min-w-[310px] my-5">
              <Combobox.Input
                className="flex-1 min-w-0 b4 rounded-full placeholder:text-gray-5 placeholder:opacity-100 px-10 py-2 bg-white text-black placeholder-shown:bg-gray-4 outline-none truncate"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(people: string[]) => people.join(", ")}
                placeholder="พิมพ์ชื่อ-นามสกุล"
              />
              {selectedPeople.length > 0 && (
                <button type="button" onClick={() => setSelectedPeople([])}>
                  <Image
                    src="/icons/circle-cross.svg"
                    width={20}
                    height={20}
                    alt="ล้าง"
                  />
                </button>
              )}
            </div>
            <Combobox.Options className="absolute rounded-5 bg-white w-full text-black p-5 z-10 mt-5 max-h-[250px] overflow-y-auto">
              {filteredPeople.length > 0 ? (
                <>
                  {filteredPeople.slice(0, 10).map((person) => (
                    <Combobox.Option
                      className="b3 p-5 border-b border-b-gray-2 last:border-b-0 cursor-pointer hover:bg-gray-3 rounded-5"
                      key={person}
                      value={person}
                      dangerouslySetInnerHTML={{
                        __html: highlightChar(person, query),
                      }}
                    />
                  ))}
                  {filteredPeople.length > 10 && (
                    <li className="b3 p-5 select-none">
                      ...อีก {filteredPeople.length - 10} คน
                    </li>
                  )}
                </>
              ) : (
                <div className="b3 p-5 select-none">ไม่พบชื่อ</div>
              )}
            </Combobox.Options>
          </Combobox>
        </div>
        <div
          className={clsx(
            "text-white b3 font-bold",
            selectedPeople.length > 0 && "opacity-40"
          )}
        >
          กลุ่มตำแหน่ง
        </div>
        <FilterCheckbox
          show={showCatg1}
          setShow={setShowCatg1}
          color="นายก"
          name="นายกรัฐมนตรีและรัฐมนตรี"
          count={POSITION_COUNT["นายกรัฐมนตรีและรัฐมนตรี"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg2}
          setShow={setShowCatg2}
          color="สส"
          name="สมาชิกสภาผู้แทนราษฎร"
          count={POSITION_COUNT["สมาชิกสภาผู้แทนราษฎร"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg3}
          setShow={setShowCatg3}
          color="สว"
          name="สมาชิกวุฒิสภา"
          count={POSITION_COUNT["สมาชิกวุฒิสภา"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg4}
          setShow={setShowCatg4}
          color="สนช"
          name="สมาชิกสภานิติบัญญัติแห่งชาติ"
          count={POSITION_COUNT["สมาชิกสภานิติบัญญัติแห่งชาติ"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg5}
          setShow={setShowCatg5}
          color="ข้าราชการ"
          name="ข้าราชการการเมือง"
          count={POSITION_COUNT["ข้าราชการการเมือง"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg6}
          setShow={setShowCatg6}
          color="ตุลาการ"
          name="ตุลาการศาลรัฐธรรมนูญ"
          count={POSITION_COUNT["ตุลาการศาลรัฐธรรมนูญ"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg7}
          setShow={setShowCatg7}
          color="องค์กรอิสระ"
          name="ผู้ดำรงตำแหน่งในองค์กรอิสระ"
          count={POSITION_COUNT["ผู้ดำรงตำแหน่งในองค์กรอิสระ"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg8}
          setShow={setShowCatg8}
          color="กระทรวง"
          name="ผู้บริหารกระทรวง/ข้าราชการระดับสูง"
          count={POSITION_COUNT["ผู้บริหารกระทรวง/ข้าราชการระดับสูง"]}
          disabled={selectedPeople.length > 0}
        />
        <FilterCheckbox
          show={showCatg9}
          setShow={setShowCatg9}
          color="อปท"
          name="องค์กรปกครองส่วนท้องถิ่น"
          count={POSITION_COUNT["องค์กรปกครองส่วนท้องถิ่น"]}
          disabled={selectedPeople.length > 0}
        />
      </div>
    </div>
  );
}
