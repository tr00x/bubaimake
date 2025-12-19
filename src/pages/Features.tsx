import FeaturesSection from "../components/FeaturesSection";

export default function FeaturesPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-10 pt-10 md:pt-16">
      <div className="flex flex-col gap-3 mb-5">
        <span className="uppercase tracking-widest text-muted-foreground text-xs font-semibold">Почему мы</span>
        <h1 className="text-3xl md:text-4xl font-medium text-foreground leading-tight">О компании</h1>
      </div>
      <FeaturesSection />
    </section>
  );
}
