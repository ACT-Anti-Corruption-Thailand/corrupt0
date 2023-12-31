"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

export default function InfoFinanceDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 text-gray-5 b6"
        onClick={() => setIsOpen(true)}
      >
        <Image src="/icons/question.svg" alt="" width={16} height={16} />
        <span className="underline">ดูวิธีตั้งข้อสังเกต</span>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="translate-y-5 opacity-0"
            enterTo="-translate-y-1/2 opacity-100"
            leave="ease-in duration-100"
            leaveFrom="-translate-y-1/2 opacity-100"
            leaveTo="translate-y-5 opacity-0"
          >
            <Dialog.Panel className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-5 bg-white p-20 text-black w-4/5 max-w-[850px] transition">
              <Dialog.Title className="flex b3 font-bold gap-5 items-center">
                <Image src="/icons/question.svg" alt="" width={20} height={20} />
                <span>วิธีตั้งข้อสังเกต</span>
                <button
                  className="ml-auto -top-10 -right-10"
                  onClick={() => setIsOpen(false)}
                >
                  <Image src="/icons/cross.svg" alt="ปิด" width={20} height={20} />
                </button>
              </Dialog.Title>

              <ol className="list-decimal list-outside ml-[2ch]">
                <li>สัดส่วนรายได้หรือทรัพย์สินระหว่างผู้ยื่น คู่สมรส และบุตร</li>
                <li>
                  สัดส่วนของรายได้และรายจ่าย กับสัดส่วนของทรัพย์สินและหนี้สิน
                  ที่เปลี่ยนแปลงไประหว่างการเข้ารับตำแหน่งและพ้นจากตำแหน่ง
                </li>
                <li>
                  มูลค่าของรายได้ รายจ่าย ทรัพย์สิน และหนี้สิน
                  ที่เปลี่ยนแปลงไประหว่างการเข้ารับตำแหน่งและพ้นจากตำแหน่ง
                </li>
                <li>
                  รายการทรัพย์สินที่เปลี่ยนแปลงไประหว่างการเข้ารับตำแหน่งและพ้นจากตำแหน่ง
                </li>
              </ol>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
