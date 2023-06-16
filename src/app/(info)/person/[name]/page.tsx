export async function generateStaticParams() {
  return [{ name: "_test" }];
}

export default function Person() {
  return (
    <main>
      <section className="flex flex-col gap-5 bg-white text-black text-center">
        <span className="b6">
          อัปเดตข้อมูลเมื่อวันที่ {new Date().toLocaleDateString("th")}
        </span>
        <span className="h2">สุชาติ ภิญโญ</span>
        <div>LOL</div>
      </section>
    </main>
  );
}
