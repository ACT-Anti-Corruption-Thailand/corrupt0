"use client";
import { useLocalStorageValue } from "@react-hookz/web/esm/useLocalStorageValue";
import { useEffect, useState } from "react";

import { Switch } from "@headlessui/react";
import Image from "next/image";

import { initClarity } from "@/functions/clarity";

interface ConsentList {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
}

export default function PdpaBanner() {
  const [showDetails, setShowDetails] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const { value: showConsent, set: setShowConsent } = useLocalStorageValue("pdpa-show", {
    defaultValue: true,
    initializeWithValue: false,
  });
  const { value: consentList, set: setConsentList } = useLocalStorageValue<ConsentList>(
    "pdpa-data",
    {
      defaultValue: {
        ad_storage: "denied",
        analytics_storage: "denied",
      },
      initializeWithValue: false,
    }
  );

  const grantConsent = (forceAllowAnalytics = false) => {
    const consent: ConsentList = {
      ad_storage: "denied",
      analytics_storage: forceAllowAnalytics || allowAnalytics ? "granted" : "denied",
    };
    setConsentList(consent);
    setShowConsent(false);
  };

  useEffect(() => {
    if (consentList && consentList.analytics_storage === "granted") {
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as any).gtag("consent", "update", consentList);
      }
      initClarity();
    }
  }, [consentList]);

  return (
    showConsent && (
      <section className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] b5 text-black">
        <div className="flex flex-col items-center md:flex-row md:gap-5 rounded-t-10 p-15 bg-white md:p-20 mt-auto border-0 shadow-dropdown">
          <div className="flex-1">
            <p>
              เว็บไซต์นี้ใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์
            </p>
            <button
              className="text-sky underline leading-1"
              type="button"
              onClick={() => setShowDetails((e) => !e)}
            >
              อ่านรายละเอียด
            </button>
          </div>
          <button
            type="button"
            className="b4 font-bold px-20 py-2 bg-black text-white rounded-full self-end md:m-auto"
            onClick={() => grantConsent(true)}
          >
            ยอมรับ
          </button>
        </div>
        {showDetails && (
          <div className="bg-gray-2 p-15 md:p-20 overflow-y-auto h-full max-h-[60vh] md:max-h-[40vh]">
            <p>
              <strong className="block b4">องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)</strong>
              มีความจำเป็นต้องใช้คุกกี้ในการทำงานหลายส่วนของเว็บไซต์เพื่อรับประกันการให้บริการของเว็บไซต์ที่จะอำนวยความสะดวกในการใช้บริการเว็บไซต์ของท่าน
              โดยองค์กรรับประกันว่าจะใช้คุกกี้เท่าที่จำเป็น
              และมีมาตรการรักษาความมั่นคงปลอดภัยของข้อมูลของท่านโดยสอดคล้องกับกฎหมายที่เกี่ยวข้อง
              และจะไม่เปิดเผยข้อมูลดังกล่าวให้แก่บุคคลอื่น
              เว้นแต่เป็นกรณีการใช้คุกกี้บางประเภทที่อาจดำเนินการโดยผู้ให้บริการภายนอก
              ทั้งนี้เมื่อท่านเข้าใช้บริการเว็บไซต์องค์กรจะถือว่าท่านรับทราบและตกลงนโยบายข้อมูลส่วนบุคคลฉบับนี้แล้ว
              โดยองค์กรสงวนสิทธิ์ในการปรับปรุงนโยบายฉบับนี้ตามแต่ละระยะเวลาที่องค์กรเห็นสมควร
              โดยองค์กรจะแจ้งให้ท่านทราบถึงการเปลี่ยนแปลงดังกล่าวผ่านทางเว็บไซต์นี้ประเภทและวัตถุประสงค์การใช้คุกกี้ขององค์กร
              องค์กรมีความจำเป็นต้องใช้คุกกี้หลายประเภทเพื่อจุดประสงค์ที่แตกต่างกันไป
              โดยแบ่งออกเป็น 2 ประเภท ดังต่อไปนี้
            </p>
            <ol className="list-decimal ml-[2ch]">
              <li>
                <strong>Strictly Necessary Cookies</strong>{" "}
                ซึ่งเป็นคุกกี้ประเภทที่มีความจำเป็นอย่างมากต่อการทำงานให้บริการของเว็บไซต์แก่ผู้ใช้บริการ
              </li>
              <li>
                <strong>Performance Cookies</strong>{" "}
                ซึ่งเป็นคุกกี้ประเภทที่ประเมินประสิทธิภาพในการทำงานแต่ละส่วนของเว็บไซต์
                ทั้งนี้คุกกี้ประเภทดังกล่าวอาจดำเนินการโดยผู้ให้บริการภายนอก
              </li>
            </ol>
            <p>
              สำหรับคุกกี้ประเภทอื่นนอกเหนือจาก Strictly Necessary Cookies
              หากได้รับความยินยอมจากท่าน
              องค์กรจะใช้คุกกี้ดังกล่าวเพื่อวัตถุประสงค์เฉพาะที่ได้ระบุไว้ทั้งนี้องค์กรใช้โปรแกรม
              Google Analytics, Plausible และ Clarity
              ในการเก็บข้อมูลการใช้บริการเว็บไซต์ของท่าน
            </p>
            <p className="mt-15">
              <strong className="block b4">สิทธิของเจ้าของข้อมูล</strong>
              องค์กรรับทราบ และเคารพสิทธิของท่านในฐานะเจ้าของข้อมูลตามกฎหมาย
              โดยเฉพาะสิทธิถอนความยินยอมได้ทางหน้าเว็บไซต์
              และท่านสามารถลบการตั้งค่าคุกกี้บน Browser ของตนเองได้เช่นกัน
              หรือหากมีข้อสงสัยสามารถติดต่อได้ที่:{" "}
              <span className="nobr">อีเมล privacy@punchup.world</span>
            </p>
            <hr className="my-15 border-t-gray-4" />
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="flex-1">
                <div
                  className="mb-5 flex gap-10 items-center leading-1 select-none cursor-not-allowed"
                  aria-hidden="true"
                >
                  <div className="w-20 h-20 border border-gray-4 rounded-[4px] bg-gray-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 8"
                      width="12"
                      height="12"
                    >
                      <path
                        className="fill-gray-2"
                        fillRule="evenodd"
                        d="M3.714 7.186L.5 3.97l.9-.9 2.314 2.315L8.6.5l.9.9-5.786 5.786z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-5">Strictly Necessary Cookies</span>
                </div>
                <Switch
                  checked={allowAnalytics}
                  onChange={setAllowAnalytics}
                  className="flex gap-10 items-center leading-1"
                >
                  <div
                    className="w-20 h-20 border ui-checked:bg-black rounded-[4px] flex items-center justify-center"
                    arid-hidden="true"
                  >
                    <Image
                      className="ui-not-checked:opacity-0 transition-opacity duration-100"
                      src={"/icons/check-w.svg"}
                      width={12}
                      height={12}
                      alt=""
                    />
                  </div>
                  <span>Performance Cookies</span>
                </Switch>
              </div>
              <div className="self-end flex gap-5 flex-wrap items-center my-auto">
                <button
                  type="button"
                  className="b4 px-20 py-2 border hover:bg-black hover:text-white rounded-full self-end md:m-auto"
                  onClick={() => grantConsent()}
                >
                  บันทึกการตั้งค่า
                </button>
                <button
                  type="button"
                  className="b4 font-bold px-20 py-2 border border-black bg-black text-white rounded-full self-end md:m-auto"
                  onClick={() => grantConsent(true)}
                >
                  ยอมรับทั้งหมด
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  );
}
