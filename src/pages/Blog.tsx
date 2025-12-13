import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    { id: 1, title: "Как купить авто в ОАЭ: пошагово", date: "12 дек 2025" },
    { id: 2, title: "Растаможка: что важно знать", date: "5 дек 2025" },
    { id: 3, title: "Логистика из Дубая: сроки и цены", date: "28 ноя 2025" },
    { id: 4, title: "Выбор спорткара: советы", date: "15 ноя 2025" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] pt-[40px] md:pt-[60px] flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[12px]">
        <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Новости и статьи</span>
        <h1 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-tight">Блог</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-[16px] border border-[#e6e6e6] overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] w-full bg-neutral-100" />
            <div className="p-[20px] flex flex-col gap-[12px] flex-1">
              <span className="text-neutral-400 text-[13px]">{post.date}</span>
              <h3 className="text-[#141414] text-[18px] font-semibold tracking-tight">{post.title}</h3>
              <div className="mt-auto flex justify-between items-center">
                <a href="#" className="text-[14px] text-red-600 hover:text-red-700 font-medium">Читать</a>
                <span className="inline-flex w-[36px] h-[36px] items-center justify-center rounded-full bg-[#141414] text-white">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
