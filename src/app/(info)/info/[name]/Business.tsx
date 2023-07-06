import InfoDesktopAligner from "@/components/Info/InfoDesktopAligner";
import InfoDonationSection from "@/components/Info/InfoDonationSection";
import GoTop from "@/components/Info/InfoGoTop";
import InfoLawsuitCard from "@/components/Info/InfoLawsuitCard";
import Sharer from "@/components/Sharer";
import Image from "next/image";

export default function Business({ params }: { params: { name: string } }) {
  return (
    <main>
      <GoTop name="บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด" />

      <InfoDesktopAligner
        left={
          <>
            {/* Basic Information */}
            <section className="flex flex-col gap-5 bg-white text-black text-center pt-15 pb-10 px-30">
              <span className="b6 text-gray-5">
                อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
              </span>
              <span className="h2">บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด</span>
              <div className="flex gap-15 justify-center">
                <div className="flex flex-col">
                  <Image
                    className="bg-gray-2 rounded-5 border border-black mb-5"
                    src="/placeholders/business.png"
                    width={90}
                    height={90}
                    alt=""
                  />
                  <span className="block b7 mb-2">แชร์โปรไฟล์นี้</span>
                  <div className="flex gap-4 justify-center">
                    <Sharer />
                  </div>
                </div>
                <div className="text-left">
                  <span className="block b6 text-gray-5">ประเภทธุรกิจ</span>
                  <span className="block b4 font-bold">รับเหมาก่อสร้าง</span>
                  <span className="block b6 text-gray-5">ที่ตั้งของบริษัท</span>
                  <span className="block b4 font-bold">จ.สิงห์บุรีี อ.บางระจัน</span>
                  <span className="block b6 text-gray-5">รายได้รวมปีล่าสุด</span>
                  <span className="block b4 font-bold">1,000,000 บาท</span>
                  <span className="block b6 text-gray-5">ก่อตั้ง</span>
                  <span className="block b4 no-balance">
                    <span className="font-bold">2540-2564</span>{" "}
                    <span className="nobr">(ปิดกิจการ)</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-5">
                <a
                  href="https://theyworkforus.wevis.info/"
                  className="py-4 px-10 b7 border border-gray-2 rounded-5 flex flex-col justify-center"
                >
                  <span className="flex gap-2 items-center justify-center">
                    <span>ดูข้อมูลบริษัทเพิ่มเติม</span>
                    <Image src="/icons/external.svg" alt="" width={12} height={12} />
                  </span>
                  <Image
                    className="h-[9px] w-auto mx-auto"
                    src="/logos/creden.svg"
                    width={49.5}
                    height={9}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.actai.co/"
                  className="py-4 px-10 b7 border border-gray-2 rounded-5 flex flex-col justify-center"
                >
                  <span className="flex gap-2 items-center justify-center">
                    <span>ดูข้อมูลงานในโครงการภาครัฐ</span>
                    <Image src="/icons/external.svg" alt="" width={12} height={12} />
                  </span>
                  <span className="block text-gray-4">www.actai.co</span>
                </a>
              </div>
            </section>

            {/* Jumpnav */}
            <section className="p-10 bg-white">
              <a
                className="block p-10 bg-black border-b border-b-gray-6"
                href="#donation"
              >
                <span className="flex gap-5 items-center">
                  <Image src="/icons/donate.svg" alt="" width={20} height={20} />
                  <span>
                    <span className="b3 font-bold">เคยบริจาคให้ 4 พรรคการเมือง</span>
                  </span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <span className="b5 text-gray-5 ml-[21px]">รวม 2,900,000 บาท</span>
              </a>
              <a className="block p-10 bg-black border-b border-b-gray-6" href="#lawsuit">
                <span className="flex gap-5 items-center">
                  <Image src="/icons/lawsuit.svg" alt="" width={20} height={20} />
                  <span className="b4 font-bold">เกี่ยวข้องกับ 4 คดี</span>
                  <Image
                    className="ml-auto lg:-rotate-90"
                    src="/icons/arr-g.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              </a>
            </section>
          </>
        }
      >
        {/* ประวัติการบริจาคเงินให้พรรคการเมือง */}
        <InfoDonationSection />

        {/* ข้อมูลคดีความ */}
        <section id="lawsuit">
          <header className="py-8 flex gap-10 h4 justify-center items-center bg-gray-6 text-balance">
            <Image src="/icons/lawsuit.svg" alt="" width={30} height={30} />
            <span className="w-auto">ข้อมูลคดีความ</span>
          </header>
          <div className="p-10 flex flex-col gap-5">
            <InfoLawsuitCard.Nacc
              description="สั่งการและอนุมัติให้จัดจ้างโครงการที่ได้รับ จัดสรรจากงบประมาณรายจ่ายประจำ ปีงบประมาณ พ.ศ.2554 งบเงินอุดหนุน เงินอุดหนุนเฉพาะกิจของเทศบาลตำบลโพนสวรรค์ ด้วยวิธีพิเศษ เมื่อปีงบประมาณ พ.ศ.2554 จำนวน 5 โครงการ โดยมุ่งหมายมิให้มีการ- แข่งขันราคาอย่างเป็นธรรม เอื้ออำนวยแก่ ผู้เสนอราคาบางรายให้เป็นผู้มีสิทธิทำสัญญา"
              updateDate="03/08/2564"
              blackNumber="5590260873 26-1-313 /2561"
              redNumber="2-359-61 656-1-50 /2563"
              meetingDate="01/10/2563"
              meetingResult="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat sapiente, fuga assumenda error iste, necessitatibus dignissimos hic ratione quia voluptate nulla nam velit animi quo magnam natus! Tenetur, hic pariatur?"
              enforceResult="สำหรับการกระทำของ หจก.วิบูลย์ภัณฑ์ก่อสร้าง, หจก.ยงยุทธกาฬสินธุ์ และ หจก.กาฬสินธุ์ก่อสร้าง มีเหตุอันควรเชื่อได้ว่ามีการ สมยอมกันในการเข้าเสนอ ราคากับเทศบาลเมือง กาฬสินธุ์ ทำให้ทางราชการ เสียประโยชน์ จึงมีเหตุที่จะ พิจารณาลงโทษ หจก. ทั้งสามเสมือนเป็นผู้ทิ้งงาน ตามระเบียบกระทรวง มหาดไทยว่าด้วยการพัสดุ ของหน่วยการบริหารราชการ ส่วนท้องถิ่น พ.ศ. 2535 ข้อ 138 ซึ่งแก้ไขเพิ่มเติม โดยระเบียบกระทรวง มหาดไทยว่าด้วยการพัสดุ ของหน่วยการบริหารราชการ ส่วนท้องถิ่น (ฉบับที่ 2) พ.ศ. 2539 ให้แจ้งประสาน งานไปยังปลัดกระทรวง มหาดไทย ต่อไป"
              note="การชี้มูลความผิดทางอาญาของคณะกรรมการ ป.ป.ช. ยังไม่ถือเป็นที่สุดผู้ถูกกล่าวหายังเป็นผู้บริสุทธิ์จนกว่าจะมีคำพิพากษาของศาลอันถึงที่สุด"
            />
            <InfoLawsuitCard.Sec
              description="300 ประกอบ 240 / พ.ร.บ. หลักทรัพย์ฯ (แก้ไขโดย พ.ร.บ. หลักทรัพย์ ฉบับที่ 5)"
              updateDate="03/08/2564"
              enforceDate="29/05/2566"
              cause="ในวันที่ 2 สิงหาคม 2562 บริษัท พีพี ไพร์ม จำกัด (มหาชน) (?PPPM?) ได้เปิดเผยสารสนเทศผ่านระบบข้อมูลของตลาดหลักทรัพย์แห่งประเทศไทยว่า PPPM จะไม่ผิดนัดชำระหนี้หุ้นกู้ลำดับที่ 2 จำนวน 319.50 ล้านบาท ซึ่งครบกำหนดไถ่ถอนวันที่ 2 สิงหาคม 2562 และบริษัทจะชำระทั้งเงินต้นและดอกเบี้ยภายในวันที่ 7 สิงหาคม 2562 ทั้งที่ ในช่วงเวลานั้น PPPM มิได้มีสภาพคล่องเพียงพอที่จะนำมาชำระหนี้หุ้นกู้ได้ตามที่เปิดเผยสารสนเทศ ซึ่งข้อความที่ PPPM เผยแพร่ดังกล่าวอาจทำให้ประชาชนและผู้ลงทุนเข้าใจผิดในสาระสำคัญเกี่ยวกับข้อมูลของ PPPM ที่น่าจะทำให้มีผลกระทบต่อราคาหรือต่อการตัดสินใจลงทุนใน PPPM โดยในขณะเกิดเหตุ พลเอกเชาวฤทธิ์ ประภาจิตร์ นายประวีณ ดีขจรเดช นางสาวภัทชรดา จุฑาประทีป และนางกนกวัลย์ วรรณบุตร ซึ่งเป็นบุคคลที่รับผิดชอบในการดำเนินงานของ PPPM ทราบข้อเท็จจริงว่า PPPM มิได้มีสภาพคล่องเพียงพอในการชำระหนี้หุ้นกู้ดังกล่าว รวมทั้งมีส่วนร่วมในการดำเนินการอันนำไปสู่การเปิดเผยสารสนเทศของ PPPM"
              actionType="การดำเนินการทางแพ่ง"
              actionDetail="29/05/2566 ตกลงยินยอมปฏิบัติตามมาตรการลงโทษทางแพ่งตามที่คณะกรรมการพิจารณามาตรการลงโทษทางแพ่งกำหนด ดังนี้- ชำระค่าปรับทางแพ่ง 1,000,000.00 บาท- ห้ามเป็นกรรมการหรือผู้บริหารของบริษัทที่ออกหลักทรัพย์ ตั้งแต่วันที่ 29/05/2566 ถึงวันที่ 28/01/2568- ห้ามเป็นกรรมการหรือผู้บริหารของบริษัทหลักทรัพย์ ตั้งแต่วันที่ 29/05/2566 ถึงวันที่ 28/01/2568- ชดใช้ค่าใช้จ่ายของสำนักงานในการตรวจสอบ 30,662.00 บาท"
            />
            <InfoLawsuitCard.Supreme
              description="ความผิดตามพระราชบัญญัติประกอบรัฐธรรมนูญว่าด้วยการป้องกันและปราบปรามทุจริตปี พ.ศ.2542 มาตรา 4 และมาตรา 80(1)"
              updateDate="03/08/2564"
              blackNumber="อม. 1/2545"
              redNumber="อม. 1/2546"
              judgement="มีความผิด"
            />
          </div>
        </section>
      </InfoDesktopAligner>
    </main>
  );
}
