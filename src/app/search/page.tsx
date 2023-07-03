import SearchBackButton from "@/components/SearchBackButton";
import Image from "next/image";

interface SearchRadioProps {
  value: string;
  checked?: boolean;
}

function SearchRadio({ value, checked }: SearchRadioProps) {
  return (
    <label>
      <input
        className="peer hidden"
        type="radio"
        name="search-type"
        value={value}
        defaultChecked={checked}
      />
      <span className="b5 rounded-full text-gray-5 bg-gray-2 py-5 px-15 inline-block peer-checked:bg-black peer-checked:text-white leading-1 cursor-pointer">
        {value}
      </span>
    </label>
  );
}

export default function Search() {
  return (
    <main className="bg-white text-black min-h-screen px-10 py-15 flex flex-col gap-10">
      <SearchBackButton />
      <span className="block text-center text-gray-4 b6">
        อัปเดตข้อมูลเมื่อวันที่ 00/00/2566
      </span>
      <div className="rounded-full border bg-white py-4 px-15 flex gap-5 items-center mx-15">
        <input
          className="text-black b2 border-0 bg-transparent placeholder:text-gray-4 flex-1 outline-none"
          type="search"
          placeholder="ค้นหา..."
        />
        <Image
          className="w-auto h-20"
          src="/icons/search-k.svg"
          width={20}
          height={20}
          alt=""
        />
      </div>
      <div className="flex gap-5 justify-center">
        <SearchRadio value="ทั้งหมด" checked />
        <SearchRadio value="บุคคล" />
        <SearchRadio value="พรรค" />
        <SearchRadio value="นิติบุคคล" />
      </div>

      <section className="shadow-search">
        <h2 className="py-5 px-10 bg-black-20 border-b border-b-gray-4 b5 text-gray-6">
          3 อันดับ บุคคลที่มีทรัพย์สินมากที่สุด
        </h2>
        <ul className="px-10 pt-5 bg-gray-1">
          {Array(3).fill(
            <li className="flex gap-5 py-5 border-b border-b-gray-2 last:border-b-0">
              <Image
                className="w-auto h-20 border rounded-full border-black"
                src="/placeholders/politician.png"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex-1">
                <span className="b3 leading-1 block">สุชาติ ภิญโญ</span>
                <span className="b5 leading-1 text-gray-6 block">
                  สมาชิกสภาผู้แทนราษฎร
                </span>
              </div>
              <div className="text-right">
                <span className="b3 leading-1 block">4,765</span>
                <span className="b5 leading-1 block">ล้านบาท</span>
              </div>
            </li>
          )}
        </ul>
      </section>

      <section className="shadow-search">
        <h2 className="py-5 px-10 bg-black-20 border-b border-b-gray-4 b5 text-gray-6">
          3 อันดับ พรรคที่ได้รับเงินบริจาคมากที่สุด
        </h2>
        <ul className="px-10 pt-5 bg-gray-1">
          {Array(3).fill(
            <li className="flex gap-5 py-5 border-b border-b-gray-2 last:border-b-0">
              <Image
                className="w-auto h-20 border rounded-full border-black"
                src="/placeholders/party.png"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex-1 b3 leading-1">พลังประชารัฐ</div>
              <div className="text-right">
                <span className="b3 leading-1 block">14,565</span>
                <span className="b5 leading-1 block">ล้านบาท</span>
              </div>
            </li>
          )}
        </ul>
      </section>

      <section className="shadow-search">
        <h2 className="py-5 px-10 bg-black-20 border-b border-b-gray-4 b5 text-gray-6">
          3 อันดับ นิติบุคคลที่บริจาคเงินให้พรรคการเมืองมากที่สุด
        </h2>
        <ul className="px-10 pt-5 bg-gray-1">
          {Array(3).fill(
            <li className="flex gap-5 py-5 border-b border-b-gray-2 last:border-b-0">
              <Image
                className="w-auto h-20 border rounded-full border-black"
                src="/placeholders/business.png"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex-1 b3 leading-1">บริษัท ทีเอ พีเอ็น เปเปอร์ จำกัด</div>
              <div className="text-right">
                <span className="b3 leading-1 block">76</span>
                <span className="b5 leading-1 block">ล้านบาท</span>
              </div>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
