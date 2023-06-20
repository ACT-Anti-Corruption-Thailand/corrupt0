import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

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
        <ul className="flex flex-col gap-10 font-bold">
          <li>
            <Link href="/">หน้าแรก</Link>
          </li>
          <li>
            <Link href="/individual">ข้อมูลบุคคล</Link>
          </li>
          <li>
            <Link href="/donation">ข้อมูลเงินบริจาค</Link>
          </li>
        </ul>
        <div className="flex-1">
          <span className="block mb-5 font-bold">แหล่งข้อมูล</span>
          <ul className="flex flex-col gap-5">
            <li>
              <a href="/" target="_blank" rel="nofollow noopener noreferrer">
                Open Data ACT Ai
              </a>
            </li>
            <li>
              <a
                href="https://asset.nacc.go.th/dcs-app/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                บัญชีทรัพย์สินหนี้สินฯ ป.ป.ช.
              </a>
            </li>
            <li>
              <a
                href="https://www.nacc.go.th/naccCulIncul/naccCulpability.php"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                คำชี้มูล ป.ป.ช.
              </a>
            </li>
            <li>
              <a
                href="http://www.supremecourt.or.th/division/แผนกคดีอาญาของผู้ดำรงตำแหน่งทางการเมือง/คำพิพากษาคดี"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                คำพิพากษาศาลฎีกา
              </a>
            </li>
            <li>
              <a
                href="https://market.sec.or.th/public/idisc/th/Enforce/Recent"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                การบังคับใช้กฎหมายของ ก.ล.ต.
              </a>
            </li>
            <li>
              <a
                href="https://www.ect.go.th/ect_th/news_all.php?cid=22"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                ข้อมูลเงินบริจาคพรรคการเมือง
              </a>
            </li>
            <li>
              <a
                href="https://ratchakitcha.soc.go.th"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                รายชื่อผู้บริหาร/ข้าราชการระดับสูง
              </a>
            </li>
            <li>
              <a
                href="https://www.soc.go.th/?page_id=538"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                รายชื่อข้าราชการการเมือง
              </a>
            </li>
            <li>
              <a
                href="https://theyworkforus.wevis.info"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                They Work for Us
              </a>
            </li>
            <li>
              <a
                href="https://creden.co/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                ข้อมูลนิติบุคคล
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className="block mb-5 font-bold">ติดต่อ</span>
          <ul className="flex flex-col gap-[8px]">
            <li>
              <a
                href="https://www.facebook.com/act.anticorruptionThailand"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-20 h-20"
                  src="/logos/fb.svg"
                  width={20}
                  height={20}
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/ACT_Thailand"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-20 h-20"
                  src="/logos/tw.svg"
                  width={20}
                  height={20}
                  alt="Twitter"
                />
              </a>
            </li>
            <li>
              <a
                href="http://www.anticorruption.in.th/2016/th/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-20 h-20"
                  src="/icons/web.svg"
                  width={20}
                  height={20}
                  alt="Instagram"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-2 w-4/5 mx-auto mix-blend-multiply" />
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
          alt="act"
        />
        <Image
          className="w-auto h-10"
          src="/logos/hand.svg"
          width={27.3}
          height={10}
          alt="hand"
        />
        <Image
          className="w-auto h-10"
          src="/logos/pu.svg"
          width={34.56}
          height={10}
          alt="punch up"
        />
      </div>
    </footer>
  );
}
