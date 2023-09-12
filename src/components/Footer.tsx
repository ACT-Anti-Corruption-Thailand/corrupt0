import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  home?: boolean;
}

export default function Footer({ home }: FooterProps) {
  return (
    <footer
      className={clsx(
        `text-black px-12 pt-10 md:pt-30 md:pb-[120px] b7`,
        home ? "bg-gray-2" : "bg-white rounded-t-5"
      )}
    >
      <div className="mx-auto max-w-[600px] w-max md:w-auto flex flex-col gap-10 md:gap-20">
        <a
          className="block mr-auto"
          href="https://poldata.actai.co/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Image
            className="w-auto h-20 md:h-40"
            src="/logos/c0-k.svg"
            width={26.8}
            height={20}
            alt="หน้าหลัก"
          />
        </a>
        <div className="flex gap-20 text-balance justify-between">
          <ul className="flex flex-col gap-10 font-bold">
            <li className="nobr">
              <Link href="/">หน้าแรก</Link>
            </li>
            <li className="nobr">
              <Link href="/info">ข้อมูลบุคคล</Link>
            </li>
            <li className="nobr">
              <Link href="/donation">ข้อมูลเงินบริจาค</Link>
            </li>
          </ul>
          <div className="">
            <span className="block mb-5 font-bold">แหล่งข้อมูล</span>
            <ul className="md:columns-2 md:gap-5 [&>li]:mb-5">
              <li className="nobr">
                <a
                  href="https://asset.nacc.go.th/dcs-app/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  บัญชีทรัพย์สินหนี้สินฯ ป.ป.ช.
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://www.nacc.go.th/naccCulIncul/naccCulpability.php"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  คำชี้มูล ป.ป.ช.
                </a>
              </li>
              <li className="nobr">
                <a
                  href="http://www.supremecourt.or.th/division/แผนกคดีอาญาของผู้ดำรงตำแหน่งทางการเมือง/คำพิพากษาคดี"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  คำพิพากษาศาลฎีกา
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://market.sec.or.th/public/idisc/th/Enforce/Recent"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  การบังคับใช้กฎหมายของ ก.ล.ต.
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://www.ect.go.th/ect_th/th/db_119_ect_th_download_22"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  ข้อมูลเงินบริจาคพรรคการเมือง
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://ratchakitcha.soc.go.th"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  รายชื่อผู้บริหาร/ข้าราชการระดับสูง
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://www.soc.go.th/?page_id=538"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  รายชื่อข้าราชการการเมือง
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://opendata.actai.co"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  ฐานข้อมูลเปิดเพื่อการต่อต้านคอร์รัปชัน
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://theyworkforus.wevis.info"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  ข้อมูลการทำงานของสมาชิกรัฐสภา
                </a>
              </li>
              <li className="nobr">
                <a
                  href="https://creden.co/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  บริการด้านข้อมูลนิติบุคคล
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
                    className="w-20 h-auto md:w-30"
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
                    className="w-20 h-auto md:w-30"
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
                    className="w-20 h-auto md:w-30"
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
        <Link className="inline-block mx-auto font-bold" href="/terms">
          Term & Conditions
        </Link>
        {!home && (
          <>
            <hr className="border-gray-2 w-4/5 mx-auto mix-blend-multiply" />
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
              <span className="text-[#92989F]">Co-Developed by</span>
              <a
                href="http://www.anticorruption.in.th/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-auto h-20 md:h-[35px]"
                  src="/logos/act-w.svg"
                  width={20}
                  height={20}
                  alt="act"
                  priority
                />
              </a>
              <a
                href="https://hand.co.th/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-auto h-15 md:h-[21px]"
                  src="/logos/hand.svg"
                  width={33.71}
                  height={12}
                  alt="hand"
                  priority
                />
              </a>
              <a
                href="https://punchup.world/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-auto h-15 md:h-[21px]"
                  src="/logos/pu.svg"
                  width={43.43}
                  height={12.57}
                  alt="punch up"
                  priority
                />
              </a>
              <a
                href="https://www.boonmeelab.com/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  className="w-auto h-15 md:h-[21px]"
                  src="/logos/bml.svg"
                  width={41.48}
                  height={12}
                  alt="boonmee lab"
                  priority
                />
              </a>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
