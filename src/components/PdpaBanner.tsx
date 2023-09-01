"use client";
import { initClarity } from "@/functions/clarity";
import { useLocalStorageValue } from "@react-hookz/web/esm/useLocalStorageValue";
import { useEffect } from "react";

interface ConsentList {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
}

export default function PdpaBanner() {
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

  const grantConsent = (consent: ConsentList) => {
    setConsentList(consent);
    setShowConsent(false);
  };

  useEffect(() => {
    if (
      consentList &&
      (consentList.ad_storage !== "denied" || consentList.analytics_storage !== "denied")
    ) {
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as any).gtag("consent", "update", consentList);
        if (consentList.analytics_storage === "granted") {
          initClarity();
        }
      }
    }
  }, [consentList]);

  return (
    showConsent && (
      <section className="fixed z-20 rounded-5 bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[850px] md:bottom-20 md:w-[calc(100%-40px)] p-10 bg-white text-black shadow-popover">
        <p>PDPA</p>
        <div className="flex gap-10">
          <button
            type="button"
            onClick={() =>
              grantConsent({
                ad_storage: "denied",
                analytics_storage: "granted",
              })
            }
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => {
              grantConsent({
                ad_storage: "denied",
                analytics_storage: "denied",
              });
            }}
          >
            Decline
          </button>
        </div>
      </section>
    )
  );
}
