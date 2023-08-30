"use client";
import { Menu } from "@headlessui/react";
import PdfViewer from "./PdfViewer";
import { useState } from "react";

interface DownloadMenuProps {
  data: Record<
    string,
    {
      position: string;
      case: string;
      date: string;
      pdf: string;
    }
  >;
}

export default function DownloadMenu({ data }: DownloadMenuProps) {
  const dataEntries = Object.entries(data).filter((e) => e[1].pdf);

  const [isPdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [pdfData, setPdfData] = useState({
    nacc_id: "",
    year: "",
    situation: "",
  });

  if (dataEntries.length === 0) {
    return (
      <button
        className="flex-1 min-w-0 b4 w-full flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5 cursor-not-allowed"
        type="button"
        disabled
        title="ไม่พบเอกสาร"
      >
        <svg
          className="opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 20 21"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.375 2.544v3c0 .759-.616 1.374-1.375 1.374H4v9.626a1 1 0 001 1h10a1 1 0 001-1v-13a1 1 0 00-1-1H8.375zm-4 3.624H7c.345 0 .625-.28.625-.625V2.918l-3.25 3.25zm2.448 4.222H6.59v-.996h.255c.115 0 .218.003.311.01a.674.674 0 01.24.054c.066.03.117.078.152.141a.539.539 0 01.055.267.865.865 0 01-.02.218.384.384 0 01-.064.147.297.297 0 01-.11.088.6.6 0 01-.152.047c-.059.01-.124.016-.196.018-.072.003-.151.005-.238.006zM5.75 8.718v3.825h.84v-1.485h.33c.151-.002.294-.01.427-.022.134-.012.257-.033.37-.064.112-.031.213-.075.302-.13a.766.766 0 00.225-.218c.062-.09.11-.2.143-.33.033-.129.05-.282.05-.459a1.31 1.31 0 00-.052-.384.936.936 0 00-.141-.291.849.849 0 00-.214-.21 1.151 1.151 0 00-.275-.135 1.522 1.522 0 00-.315-.075 2.604 2.604 0 00-.34-.022H5.75zm2.966 0v3.825h1.357c.195 0 .368-.025.516-.077a1.238 1.238 0 00.665-.53c.075-.124.134-.256.18-.398.045-.143.077-.292.095-.447.02-.156.03-.312.03-.468 0-.162-.008-.32-.023-.476a2.332 2.332 0 00-.084-.447 1.607 1.607 0 00-.169-.392 1.079 1.079 0 00-.281-.31 1.283 1.283 0 00-.418-.205 1.969 1.969 0 00-.577-.075h-1.29zm1.26 3.157h-.42V9.394h.42c.12.004.221.023.304.059a.593.593 0 01.337.335c.032.074.055.154.07.24.014.084.023.171.027.261s.005.18.005.268c0 .245-.013.452-.04.62a1.2 1.2 0 01-.126.407.521.521 0 01-.23.223.796.796 0 01-.347.068zm2.014.668V8.718h2.175v.676h-1.334v.824h1.238v.683H12.83v1.642h-.84z"
            clipRule="evenodd"
          />
        </svg>
        <span className="opacity-50">ดูเอกสารจริง</span>
      </button>
    );
  }

  return (
    <>
      <Menu>
        <div className="flex-1 min-w-0">
          <Menu.Button className="b4 w-full flex gap-5 p-5 items-center border border-gray-6 justify-center rounded-5 hover:bg-white hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 20 21"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.375 2.544v3c0 .759-.616 1.374-1.375 1.374H4v9.626a1 1 0 001 1h10a1 1 0 001-1v-13a1 1 0 00-1-1H8.375zm-4 3.624H7c.345 0 .625-.28.625-.625V2.918l-3.25 3.25zm2.448 4.222H6.59v-.996h.255c.115 0 .218.003.311.01a.674.674 0 01.24.054c.066.03.117.078.152.141a.539.539 0 01.055.267.865.865 0 01-.02.218.384.384 0 01-.064.147.297.297 0 01-.11.088.6.6 0 01-.152.047c-.059.01-.124.016-.196.018-.072.003-.151.005-.238.006zM5.75 8.718v3.825h.84v-1.485h.33c.151-.002.294-.01.427-.022.134-.012.257-.033.37-.064.112-.031.213-.075.302-.13a.766.766 0 00.225-.218c.062-.09.11-.2.143-.33.033-.129.05-.282.05-.459a1.31 1.31 0 00-.052-.384.936.936 0 00-.141-.291.849.849 0 00-.214-.21 1.151 1.151 0 00-.275-.135 1.522 1.522 0 00-.315-.075 2.604 2.604 0 00-.34-.022H5.75zm2.966 0v3.825h1.357c.195 0 .368-.025.516-.077a1.238 1.238 0 00.665-.53c.075-.124.134-.256.18-.398.045-.143.077-.292.095-.447.02-.156.03-.312.03-.468 0-.162-.008-.32-.023-.476a2.332 2.332 0 00-.084-.447 1.607 1.607 0 00-.169-.392 1.079 1.079 0 00-.281-.31 1.283 1.283 0 00-.418-.205 1.969 1.969 0 00-.577-.075h-1.29zm1.26 3.157h-.42V9.394h.42c.12.004.221.023.304.059a.593.593 0 01.337.335c.032.074.055.154.07.24.014.084.023.171.027.261s.005.18.005.268c0 .245-.013.452-.04.62a1.2 1.2 0 01-.126.407.521.521 0 01-.23.223.796.796 0 01-.347.068zm2.014.668V8.718h2.175v.676h-1.334v.824h1.238v.683H12.83v1.642h-.84z"
                clipRule="evenodd"
              />
            </svg>
            <span>ดูเอกสารจริง</span>
          </Menu.Button>
          <Menu.Items className="absolute z-10 min-w-full w-max select-none rounded-5 overflow-hidden translate-y-5 shadow-dropdown">
            {dataEntries.map(([nacc_id, nacc_data]) => (
              <Menu.Item key={nacc_id}>
                <button
                  type="button"
                  className="px-10 py-5 bg-white text-black b7 ui-selected:bg-gray-2 ui-active:bg-gray-2 w-full text-left"
                  onClick={() => {
                    setPdfData({
                      nacc_id,
                      year: new Date(nacc_data.date).getFullYear() + 543 + "",
                      situation: nacc_data.case.replace("กรณี", "") + nacc_data.position,
                    });
                    setPdfViewerOpen(true);
                  }}
                >
                  <span className="b5 font-bold">
                    {new Date(nacc_data.date).getFullYear() + 543}
                  </span>{" "}
                  ({nacc_data.case.replace("กรณี", "") + nacc_data.position})
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
      {isPdfViewerOpen && (
        <PdfViewer
          setPdfViewerOpen={setPdfViewerOpen}
          nacc_id={pdfData.nacc_id}
          year={pdfData.year}
          situation={pdfData.situation}
        />
      )}
    </>
  );
}
