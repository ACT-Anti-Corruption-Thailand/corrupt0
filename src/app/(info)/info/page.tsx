"use client";
import ImgCard from "@/components/ImgCard";
import InfoPopover from "@/components/Info/Popover";
import InfoHistChart from "@/components/InfoHistChart";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Tab } from "@headlessui/react";
import Image from "next/image";

import DATA_PEOPLE from "@/data/people_search.json";

import { thaiMoneyFormatter } from "@/functions/moneyFormatter";

const PEOPLE = DATA_PEOPLE.filter((e) => e.at(-1) === "|").map((e) => {
  const [link, position] = e.split("|");
  return {
    name: link.replace(/-/g, " "),
    link: "/info/" + link,
    title: position,
  };
});

export default function Info() {
  return (
    <>
      <Navbar
        back={{
          href: "/",
          text: "หน้าหลัก",
        }}
      />
      <section className="flex flex-col items-center">
        <ImgCard imgPath="/images/asset_politician.png" className="w-full">
          <div className="flex flex-col justify-center my-auto py-30 lg:mx-[20vw] lg:p-[70px]">
            <Image
              className="self-center mb-10 h-[45px] lg:h-100"
              src="./icons/financial.svg"
              width={100}
              height={100}
              alt="financial"
            />
            <p className="text-center h1">ดูข้อมูลนักการเมืองเเละเจ้าหน้าที่รัฐ</p>
          </div>
        </ImgCard>
        <p className="text-gray-5 b3 lg:b6 mt-20">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </p>
        <Search placeholder="ค้นหาด้วยชื่อ/นามสกุล" data={PEOPLE} />
        <div className="w-[90vw] border-1 border-gray-4 lg:mt-20 lg:w-full" />
        <p className="h3 font-black text-white mt-15 mb-10 lg:mt-30 lg:mb-20 lg:h2">
          สำรวจตามกลุ่มตำแหน่ง
        </p>
        <div className="flex flex-col items-center text-center b6 lg:b5 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]">
          <Tab.Group>
            <Tab.List className="flex flex-row items-center">
              <p className="text-gray-4 mr-10 bg-black ">เเสดงข้อมูล</p>
              <div className="text-gray-4 bg-gray-6 rounded-5">
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20 outline-none">
                  ทรัพย์สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20 outline-none">
                  หนี้สิน
                </Tab>
                <Tab className="ui-selected:bg-white ui-selected:text-gray-6 rounded-5 py-5 px-20 outline-none">
                  ทั้งคู่
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels className="w-full">
              <Tab.Panel>
                {/* ทรัพย์สิน */}
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1.8 ล้านบาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="flex items-center justify-around py-10 text-gray-4 border-t-1 border-gray-6 leading-1">
                  <div>กลุ่มตำแหน่ง</div>
                  <div className="flex gap-2">
                    การกระจายตัว{" "}
                    <InfoPopover>
                      <p className="b5 no-balance">
                        บ่งบอกว่าคนในกลุ่มมีปริมาณทรัพย์สินอยู่ในช่วงไหนบ้าง
                      </p>
                    </InfoPopover>
                  </div>
                  <div>
                    <span className="text-value-positive-text">สูงสุด</span> - ต่ำสุด
                  </div>
                </div>
                <InfoHistChart
                  title="นายกรัฐมนตรีและรัฐมนตรี"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="สมาชิกสภาผู้แทนราษฎร"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="สมาชิกวุฒิสภา"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="สมาชิกสภานิติบัญญัติแห่งชาติ"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="ข้าราชการการเมือง"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="ตุลาการศาลรัฐธรรมนูญ"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="ผู้ดำรงตำแหน่งในองค์กรอิสระ"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="ผู้บริหารกระทรวงข้าราชการระดับสูง"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
                <InfoHistChart
                  title="องค์กรปกครองส่วนท้องถิ่น"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={1801090.878}
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* หนี้สิน */}
                <div className="flex items-center justify-center gap-5 my-10 lg:my-20 text-act no-balance">
                  <div className="w-20 border-1 border-dashed" />
                  <p className="leading-1">
                    หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>0.2 ล้านบาท</strong>
                  </p>
                  <InfoPopover buttonImg="/icons/info.svg">
                    <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                  </InfoPopover>
                </div>
                <div className="flex items-center justify-around py-10 text-gray-4 border-t-1 border-gray-6 leading-1">
                  <div>กลุ่มตำแหน่ง</div>
                  <div className="flex gap-2">
                    การกระจายตัว{" "}
                    <InfoPopover>
                      <p className="b5 no-balance">
                        บ่งบอกว่าคนในกลุ่มมีปริมาณหนี้สินอยู่ในช่วงไหนบ้าง
                      </p>
                    </InfoPopover>
                  </div>
                  <div>
                    <span className="text-value-positive-text">สูงสุด</span> - ต่ำสุด
                  </div>
                </div>
                <InfoHistChart
                  title="นายกรัฐมนตรีและรัฐมนตรี"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="สมาชิกสภาผู้แทนราษฎร"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="สมาชิกวุฒิสภา"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="สมาชิกสภานิติบัญญัติแห่งชาติ"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="ข้าราชการการเมือง"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="ตุลาการศาลรัฐธรรมนูญ"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="ผู้ดำรงตำแหน่งในองค์กรอิสระ"
                  number={[194, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="ผู้บริหารกระทรวงข้าราชการระดับสูง"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
                <InfoHistChart
                  title="องค์กรปกครองส่วนท้องถิ่น"
                  number={[491, "คน"]}
                  max={thaiMoneyFormatter(474816.92)}
                  min={thaiMoneyFormatter(5064)}
                  refValue={205679}
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* ทั้งคู่ Scatterplot */}
                <div className="flex flex-col w-fit my-10 lg:my-20 mx-auto text-left gap-5 no-balance">
                  <div className="flex gap-5 items-center">
                    <div className="w-20 h-0 border-1 border-dashed border-red" />
                    <p className="leading-1 text-red">
                      ทรัพย์สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>1.8 ล้านบาท</strong>
                    </p>
                    <InfoPopover buttonImg="/icons/info.svg">
                      <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                    </InfoPopover>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="w-20 h-0 border-1 border-dashed border-gray-4" />
                    <div>
                      <p className="leading-1 text-gray-4 inline">
                        ทรัพย์สินเฉลี่ย 50 อันดับเศรษฐีไทย ปี 2566 ={" "}
                        <strong>120,208.6 ล้านบาท</strong>
                      </p>{" "}
                      <InfoPopover buttonImg="/icons/info.svg">
                        <p className="b5 no-balance">ที่มา: Forbes</p>
                      </InfoPopover>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="w-20 h-0 border-1 border-dashed border-red" />
                    <p className="leading-1 text-red">
                      หนี้สินเฉลี่ยต่อครัวเรือน ปี 2564 = <strong>0.2 ล้านบาท</strong>
                    </p>
                    <InfoPopover buttonImg="/icons/info.svg">
                      <p className="b5 no-balance">ที่มา: สำนักงานสถิติแห่งชาติ</p>
                    </InfoPopover>
                  </div>
                </div>
                <div className="flex flex-col gap-10 lg:gap-30 lg:flex-row">
                  <div className="flex-1 py-50 border border-white border-dashed">
                    Chart
                  </div>
                  <div className="py-50 px-20 border border-white border-dashed">
                    ตัวกรอง
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
}
