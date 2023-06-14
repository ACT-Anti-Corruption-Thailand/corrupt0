import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={twMerge(
        `bg-white text-black rounded-t-5 px-12 py-10 flex flex-col gap-10 b7`,
        className
      )}
    >
      <a
        className="block mr-auto"
        href="https://actai.co/"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          className="w-auto h-20"
          src="/logos/actai-k.svg"
          width={26.8}
          height={20}
          alt="go to actai.co"
        />
      </a>
      <div className="flex gap-20 text-balance">
        <div className="flex flex-col gap-10">
          <div>
            <span className="block mb-5 font-bold">หน้าแรก</span>
            <a href="/">กลับไปที่หน้าแรก</a>
          </div>
          <div>
            <span className="block mb-5 font-bold">ข้อมูลบุคคล</span>
            <a href="/">ดูหน้าข้อมูลบุคคล</a>
          </div>
          <div>
            <span className="block mb-5 font-bold">ข้อมูลเงินบริจาค</span>
            <a href="/">ดูหน้าข้อมูลเงินบริจาค</a>
          </div>
        </div>
        <div>
          <span className="block mb-5 font-bold">แหล่งข้อมูล</span>
          <ul className="flex flex-col gap-5">
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                Open Data ACT Ai
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                คณะกรรมการป้องกันและปราบปรามการทุจริตแห่งชาติ
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                สำนักงานคณะกรรมการการเลือกตั้ง
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                They Work For Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className="block mb-5 font-bold">ติดต่อ</span>
          <ul className="flex gap-5">
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                <Image
                  className="w-10"
                  src="/logos/fb.svg"
                  width={10}
                  height={10}
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                <Image
                  className="w-10"
                  src="/logos/tw.svg"
                  width={10}
                  height={10}
                  alt="Twitter"
                />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                <Image
                  className="w-10"
                  src="/logos/ig.svg"
                  width={10}
                  height={10}
                  alt="Instagram"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-1 w-4/5 mx-auto mix-blend-multiply" />
      <a
        className="inline-block mx-auto"
        href="https://docs.google.com/document/d/1OfjTnljRZTppFzriPyKLbARAD--Dm-bZqi60AHuubTA"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Term & Conditions
      </a>
      <div className="flex flex-wrap items-center gap-5 justify-center">
        <span className="text-[#92989F]">Co-Developed by</span>
        <Image
          className="w-auto h-15"
          src="/logos/act.png"
          width={15}
          height={15}
          alt=""
        />
        <Image
          className="w-auto h-10"
          src="/logos/hand.svg"
          width={27.3}
          height={10}
          alt=""
        />
        <Image
          className="w-auto h-10"
          src="/logos/pu.svg"
          width={34.56}
          height={10}
          alt=""
        />
      </div>
    </footer>
  );
}
