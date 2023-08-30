"use client";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface PdfViewerProps {
  nacc_id: string | number;
  year: string;
  situation: string;
  setPdfViewerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PdfViewer({
  nacc_id,
  year,
  situation,
  setPdfViewerOpen,
}: PdfViewerProps) {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setPageCount(numPages);
  }

  function onDocumentLoadError() {
    setIsError(true);
  }

  return (
    <Dialog
      open
      className="fixed z-50 inset-0 flex items-center justify-center"
      onClose={() => setPdfViewerOpen(false)}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20" aria-hidden="true" />

      <Dialog.Panel className="flex flex-col rounded-5 md:rounded-10 border-2 border-white max-h-[80vh] w-4/5 md:max-w-[850px] shadow-pdf bg-black overflow-hidden">
        <Dialog.Title className="b3 py-10 px-50 text-center">
          <span className="font-bold">{year}</span> ({situation})
        </Dialog.Title>
        <button
          className="absolute top-10 right-10"
          onClick={() => setPdfViewerOpen(false)}
        >
          <Image src="/icons/cross-w.svg" alt="ปิด" width={20} height={20} />
        </button>
        <div className="flex-1 overflow-scroll p-10 bg-gray-3 text-black flex flex-col min-h-0 min-w-0">
          {isError ? (
            <span className="text-red text-center">
              เกิดข้อผิดพลาดขึ้นขณะโหลดไฟล์ กรุณาลองใหม่อีกครั้ง
            </span>
          ) : (
            <Document
              file={`/pdf/${nacc_id}.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {Array.from(new Array(pageCount), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="select-none"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                  onDragStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
              ))}
            </Document>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
