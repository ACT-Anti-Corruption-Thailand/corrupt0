import SearchBackButton from "@/components/SearchBackButton";
import { SearchMain } from "@/components/Search/SearchMain";

export default function Search() {
  return (
    <main className="bg-gray-5 text-black min-h-screen px-10 py-15">
      <SearchBackButton />
      <div className="flex flex-col gap-10 mx-auto max-w-[810px]">
        <span className="block text-center text-black b6">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th-TH")}
        </span>
        <SearchMain />
      </div>
    </main>
  );
}
