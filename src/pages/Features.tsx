import FeaturesSection from "../components/FeaturesSection";

export default function FeaturesPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] pt-[40px] md:pt-[60px]">
      <div className="flex flex-col gap-[12px] mb-[20px]">
        <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Почему мы</span>
        <h1 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-tight">О компании</h1>
      </div>
      <FeaturesSection />
    </section>
  );
}
