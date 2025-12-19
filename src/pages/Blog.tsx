import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    { id: 1, title: "Как купить авто в ОАЭ: пошагово", date: "12 дек 2025" },
    { id: 2, title: "Растаможка: что важно знать", date: "5 дек 2025" },
    { id: 3, title: "Логистика из Дубая: сроки и цены", date: "28 ноя 2025" },
    { id: 4, title: "Выбор спорткара: советы", date: "15 ноя 2025" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-10 pt-10 md:pt-16 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-widest text-muted-foreground text-xs font-semibold">Новости и статьи</span>
        <h1 className="text-3xl md:text-4xl font-medium text-foreground leading-tight">Блог</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] w-full bg-secondary" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <span className="text-muted-foreground text-xs font-medium">{post.date}</span>
              <h3 className="text-foreground text-lg font-semibold tracking-tight leading-snug">{post.title}</h3>
              <div className="mt-auto flex justify-between items-center">
                <a href="#" className="text-sm text-destructive hover:text-destructive/80 font-medium transition-colors">Читать</a>
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
