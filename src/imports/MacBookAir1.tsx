import svgPaths from "./svg-5qr6y18hqk";
import clsx from "clsx";
import imgLuxuryCar from "figma:asset/004828c83645d790d50bcdaba3753610b0e1f7e5.png";
import imgMashynBazar from "figma:asset/58ef5ee199d9ca1c60c8ac56288fb7dd033bd242.png";
import imgFrame7 from "figma:asset/b528f95013ebf6fb89190cc56de3eb716c15009b.png";
import imgBmwM5Competition from "figma:asset/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={additionalClassNames}>
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return <Wrapper5 additionalClassNames={clsx("basis-0 bg-neutral-50 grow min-h-px min-w-px relative rounded-[8px] shrink-0", additionalClassNames)}>{children}</Wrapper5>;
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return <Wrapper5 additionalClassNames={clsx("bg-neutral-50 relative rounded-[8px] shrink-0 w-full", additionalClassNames)}>{children}</Wrapper5>;
}

function Input4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start p-[12px] relative w-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper4>
      <div className="content-stretch flex flex-col gap-[21px] items-start p-[24px] relative w-full">{children}</div>
    </Wrapper4>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper4 additionalClassNames="self-stretch">
      <div className="content-stretch flex flex-col gap-[21px] items-start p-[24px] relative size-full">{children}</div>
    </Wrapper4>
  );
}

function Svg13({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">{children}</g>
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">{children}</g>
      </svg>
    </div>
  );
}
type ItemText1Props = {
  text: string;
};

function ItemText1({ text }: ItemText1Props) {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Margin />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-500 text-nowrap">
        <p className="leading-[26px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type LinkTextProps = {
  text: string;
};

function LinkText({ text }: LinkTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-neutral-500 text-nowrap">
        <p className="leading-[26px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[12px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-[4px]">
      <div className="bg-[rgba(20,20,20,0.5)] rounded-[9999px] shrink-0 size-[4px]" data-name="Overlay" />
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[16px] text-nowrap tracking-[-0.4px]">
        <p className="leading-[24px] whitespace-pre">{text}</p>
      </div>
      <div className="bg-[rgba(230,230,230,0.6)] h-px shrink-0 w-full" data-name="Horizontal Divider" />
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <Wrapper5 additionalClassNames={clsx("basis-0 bg-neutral-50 grow min-h-px min-w-px opacity-0 relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="size-full" />
    </Wrapper5>
  );
}

function Svg12() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.pdab9800} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Svg11() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p3713e00} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p12751280} id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}
type ItemTextProps = {
  text: string;
};

function ItemText({ text }: ItemTextProps) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="bg-[#141414] shrink-0 size-[4px]" data-name="Background" />
      <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-neutral-500">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type BorderTextProps = {
  text: string;
};

function BorderText({ text }: BorderTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[5px] relative self-stretch shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-neutral-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p3f0cc030} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start relative shrink-0", additionalClassNames)}>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[16px] text-nowrap tracking-[0.4px]">
        <p className="leading-[24px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}

function LogoSvg() {
  return (
    <div className="h-[40px] relative shrink-0 w-[96.073px]" data-name="logo.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 40">
        <g clipPath="url(#clip0_1_138)" id="logo.svg">
          <path d={svgPaths.p1c32aa00} fill="var(--fill-0, #56A873)" id="Vector" />
          <path d={svgPaths.p3cb77080} fill="var(--fill-0, #C53631)" id="Vector_2" />
          <path d={svgPaths.pbb92680} fill="var(--fill-0, #1A1819)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_1_138">
            <rect fill="white" height="40" width="96.0731" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative shrink-0 w-[96.06px]" data-name="logo.svg fill">
      <LogoSvg />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0" data-name="List">
      <Text text="Каталог" />
      <Text text="Услуги" additionalClassNames="pl-[4px] pr-0 py-0" />
      <Text text="Контакты" additionalClassNames="pl-[4px] pr-0 py-0" />
    </div>
  );
}

function Svg() {
  return (
    <Svg13>
      <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Поиск</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]" style={{ "--stroke-0": "rgba(20, 20, 20, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="SVG:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative size-full">
        <Svg1 />
      </div>
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[15px] py-[11px] relative rounded-[8px] shrink-0" data-name="Button menu">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">RU</p>
      </div>
      <SvgMargin />
    </div>
  );
}

function Svg2() {
  return (
    <Svg13>
      <path d={svgPaths.p270c3400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p90de340} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6 11.3333H10" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p38e3c580} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Link() {
  return (
    <div className="bg-[#141414] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[14px] py-[10px] relative rounded-[8px] shrink-0" data-name="Link">
      <Svg2 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">В каталог</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Container />
      <ButtonMenu />
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 max-w-[1400px] px-[20px] py-[14px] top-0 w-[1280px]" data-name="Container">
      <LogoSvgFill />
      <List />
      <Frame1 />
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[20px] py-[18px] relative rounded-[8px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap tracking-[0.35px]">
        <p className="leading-[20px] whitespace-pre">Смотреть все предложения</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[20px] py-[18px] relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.35px]">
        <p className="leading-[20px] whitespace-pre">Связаться с нами</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Container">
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bottom-[100px] content-stretch flex flex-col gap-[30px] items-start left-[100px] max-w-[896px] right-[284px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[72px] min-w-full not-italic relative shrink-0 text-[72px] text-white tracking-[-1.8px] w-[min-content]">
        <p className="mb-0">Найдите свой</p>
        <p className="mb-0">идеальный</p>
        <p>автомобиль.</p>
      </div>
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[28px] min-w-full not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.7)] w-[min-content]">
        <p className="mb-0">{`Широкий выбор новых и подержанных автомобилей `}</p>
        <p>премиум-класса с гарантией качества</p>
      </div>
      <Container2 />
    </div>
  );
}

function LuxuryCar() {
  return (
    <div className="absolute h-[800px] left-0 overflow-clip top-0 w-[1280px]" data-name="Luxury Car">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-2.91%] max-w-none top-0 w-[105.82%]" src={imgLuxuryCar} />
      </div>
      <Container3 />
    </div>
  );
}

function Svg3() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.pd45be00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p37bcea00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Background() {
  return (
    <div className="bg-red-600 content-stretch flex gap-[6px] items-center px-[12px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Svg3 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.3px]">
        <p className="leading-[16px] whitespace-pre">YouTube</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#141414] text-[32px] tracking-[-0.9px] w-full">
        <p className="leading-[40px]">Свежие обзоры и тест‑драйвы на нашем Youtube-канале.</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[20px] text-[rgba(20,20,20,0.8)] tracking-[-0.45px] w-full">
        <p className="leading-[28px]">Подписывайтесь, чтобы видеть премьеры первыми. Обзоры наших автомобилей, тест‑драйвы и премьеры из ОАЭ.</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0">
      <Background />
      <Frame2 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="SVG">
          <path d={svgPaths.p2500400} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="4" />
          <path d="M20 30L30 24L20 18V30Z" id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function OverlayShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center overflow-clip relative rounded-[9999px] shadow-[0px_0px_0px_1px_rgba(255,255,255,0.5)] shrink-0 size-[96px]" data-name="Overlay+Shadow+OverlayBlur">
      <Svg4 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-gradient-to-r from-[rgba(244,63,94,0.1)] relative rounded-[20px] shrink-0 to-[rgba(245,158,11,0.1)] via-50% via-[rgba(244,63,94,0.1)] w-full">
      <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[40px] items-center p-[50px] relative w-full">
          <Frame3 />
          <OverlayShadowOverlayBlur />
        </div>
      </div>
    </div>
  );
}

function MashynBazar() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="Mashyn Bazar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMashynBazar} />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#141414] text-[24px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Mashyn Bazar</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[14px] text-neutral-500">
        <p className="leading-[normal] text-nowrap whitespace-pre">Подписчики: 81.9K • Просмотры: 1.6M+</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0">
      <MashynBazar />
      <Container4 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame9 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.4)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Подписаться</p>
      </div>
      <Svg5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1200px]">
      <Frame5 />
      <Link3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[200px] relative rounded-[14px] shrink-0 w-[370px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[14px]">
        <div className="absolute bg-[#cecece] inset-0 rounded-[14px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[14px]">
          <img alt="" className="absolute h-[318%] left-[-69.25%] max-w-none top-[-109%] w-[238.49%]" src={imgFrame7} />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#141414] text-[16px] w-full">
        <p className="leading-[normal]">Дешевые GR SPORT LAND CRUISER 300 VXR обзор и цена</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-neutral-500 w-full">
        <p className="leading-[normal]">Mashyn Bazar • 1.6M+ просмотров</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex flex-col gap-[14px] items-start p-[14px] relative rounded-[20px] shrink-0">
      <Frame7 />
      <Container5 />
    </div>
  );
}

function Svg6() {
  return (
    <Wrapper>
      <path d={svgPaths.p1ed6cb00} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M15.8333 10H4.16668" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center p-[11px] right-[20px] rounded-[9999px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Svg6 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      {[...Array(4).keys()].map((_, i) => (
        <Frame8 key={i} />
      ))}
      <Button />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame6 />
      <Frame33 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[40px] top-[980px] w-[1200px]">
      <Frame4 />
      <Frame10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[14px] text-neutral-500">
        <p className="leading-[normal] text-nowrap whitespace-pre">Каталог</p>
      </div>
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center relative shrink-0 text-[#141414] text-[32px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Каталог автомобилей</p>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <Svg13>
      <path d="M14 2.66667H9.33333" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6.66667 2.66667H2" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 8H8" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 8H2" id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 13.3333H10.6667" id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M8 13.3333H2" id="Vector_6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M9.33333 1.33333V4" id="Vector_7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 6.66667V9.33333" id="Vector_8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M10.6667 12V14.6667" id="Vector_9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.4)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg7 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Фильтры</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[14px] relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.4)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Сначала новые</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Найдено 12</p>
      </div>
      <Link4 />
      <Link5 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Container6 />
      <Frame11 />
    </div>
  );
}

function BmwM5Competition() {
  return (
    <div className="aspect-[398/298.5] relative shrink-0 w-full" data-name="BMW M5 Competition">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-6.29%] max-w-none top-0 w-[112.57%]" src={imgBmwM5Competition} />
      </div>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-full items-start px-[13px] py-[5px] relative shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[#c52020] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c52020] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Горячее</p>
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-full items-start px-[13px] py-[5px] relative shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(20,20,20,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Новый</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_8px] h-[26px] items-start relative shrink-0 w-full" data-name="Container">
      <OverlayBorder />
      <OverlayBorder1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_8px] items-start relative shrink-0 w-full" data-name="Container">
      <BorderText text="2024" />
      <BorderText text="Бензин" />
      <BorderText text="Автомат" />
    </div>
  );
}

function Svg8() {
  return (
    <Svg13>
      <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1a6e4100} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg8 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-neutral-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Мощность</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container9 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] w-full">
        <p className="leading-[20px]">625 л.с.</p>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <Svg13>
      <path d="M6.66667 1.33333H9.33333" id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M8 9.33333L10 7.33333" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1a6375c0} id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg9 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-neutral-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">Разгон 0-100</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container11 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] w-full">
        <p className="leading-[20px]">3.3 сек</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container12 />
    </div>
  );
}

function Svg10() {
  return (
    <Svg13>
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
          <p className="leading-[20px] whitespace-pre">Подробнее</p>
        </div>
        <Svg10 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between px-0 py-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[18px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">$138,889</p>
      </div>
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[14px] relative w-full">
          <Container7 />
          <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[18px] tracking-[-0.45px] w-full">
            <p className="leading-[28px]">BMW M5 Competition</p>
          </div>
          <Container8 />
          <Container13 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 354 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="354" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <HorizontalBorder />
        </div>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="basis-0 bg-neutral-50 grow min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Link">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <BmwM5Competition />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      {[...Array(3).keys()].map((_, i) => (
        <Link6 key={i} />
      ))}
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      {[...Array(2).keys()].map((_, i) => (
        <Frame13 key={i} />
      ))}
    </div>
  );
}

function Svg14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame9 />
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.4)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Смотреть все автомобили</p>
      </div>
      <Svg14 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] h-[1266px] items-center left-[40px] top-[1889px] w-[1200px]">
      <Frame12 />
      <Frame14 />
      <Link7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-center leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center relative shrink-0 text-[#141414] text-[32px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Услуги</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[16px] text-neutral-500">
        <p className="leading-[normal] text-nowrap whitespace-pre">Полный комплекс услуг для автовладельцев</p>
      </div>
    </div>
  );
}

function Svg15() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p382997c0} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2ad65a80} id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M7.5 14.1667H12.5" id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3849af00} id="Vector_4" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg15 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Продажа автомобилей</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="mb-0">Новые и авто с пробегом,</p>
        <p>прозрачные условия</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Широкий выбор" />
      <ItemText text="Проверенная история" />
      <ItemText text="Оформление документов" />
    </div>
  );
}

function Frame18() {
  return (
    <Wrapper1>
      <Frame19 />
      <Frame17 />
    </Wrapper1>
  );
}

function Svg16() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg16 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border1 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Подбор автомобилей</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="leading-[20px]">Находим нужную комплектацию и состояние под бюджет</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Аналитика рынка" />
      <ItemText text="Проверка техсостояния" />
      <ItemText text="Переговоры и сделка" />
    </div>
  );
}

function Frame36() {
  return (
    <Wrapper1>
      <Frame34 />
      <Frame35 />
    </Wrapper1>
  );
}

function Svg17() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p20f4ecf0} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1077a480} id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M6.25 3.55833L13.75 7.85" id="Vector_4" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg17 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border2 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Подбор автозапчастей</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="leading-[20px]">Оригинал и качественные аналоги с доставкой</p>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="VIN‑подбор" />
      <ItemText text="Гарантия" />
      <ItemText text="Быстрая поставка" />
    </div>
  );
}

function Frame20() {
  return (
    <Wrapper1>
      <Frame37 />
      <Frame38 />
    </Wrapper1>
  );
}

function Svg18() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p39961300} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M2.5 5H17.5" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2f53ac80} id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border3() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg18 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border3 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Подбор автоаксессуаров</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="leading-[20px]">Полезные аксессуары, стайлинг и комфорт</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Топ‑бренды" />
      <ItemText text="Инсталляция" />
      <ItemText text="Гарантийная поддержка" />
    </div>
  );
}

function Frame21() {
  return (
    <Wrapper2>
      <Frame39 />
      <Frame40 />
    </Wrapper2>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame18 />
      <Frame36 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Svg19() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border4() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg19 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border4 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Ремонт автомобилей</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="mb-0">Диагностика, механика,</p>
        <p>электрика, кузовные работы</p>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Оригинальные материалы" />
      <ItemText text="Сроки под контроль" />
      <ItemText text="Гарантия работ" />
    </div>
  );
}

function Frame44() {
  return (
    <Wrapper1>
      <Frame42 />
      <Frame43 />
    </Wrapper1>
  );
}

function Svg20() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p24941500} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border5() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg20 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border5 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Тюнинг автомобилей</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="mb-0">Технический и внешний тюнинг</p>
        <p>под задачи</p>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Stage‑апгрейды" />
      <ItemText text="Аэро и интерьер" />
      <ItemText text="Сертифицированные мастера" />
    </div>
  );
}

function Frame47() {
  return (
    <Wrapper1>
      <Frame45 />
      <Frame46 />
    </Wrapper1>
  );
}

function Border6() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg11 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border6 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="leading-[28px]">Постановка на учет в ОАЭ и аннулирование</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="mb-0">Полное сопровождение</p>
        <p>регистрации и снятия с учета</p>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Документы" />
      <ItemText text="Сроки" />
      <ItemText text="Официальные процедуры" />
    </div>
  );
}

function Frame50() {
  return (
    <Wrapper1>
      <Frame48 />
      <Frame49 />
    </Wrapper1>
  );
}

function Border7() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg12 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border7 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[28px] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="mb-0">Транспортировка из ОАЭ</p>
        <p>по миру</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="leading-[20px]">Авиа/морская/авто‑логистика в любую страну</p>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Страхование груза" />
      <ItemText text="Отслеживание" />
      <ItemText text="Пакет документов" />
    </div>
  );
}

function Frame53() {
  return (
    <Wrapper2>
      <Frame51 />
      <Frame52 />
    </Wrapper2>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame44 />
      <Frame47 />
      <Frame50 />
      <Frame53 />
    </div>
  );
}

function Svg21() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d="M2.5 18.3333H17.5" id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M5 15V9.16667" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M8.33333 15V9.16667" id="Vector_3" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M11.6667 15V9.16667" id="Vector_4" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M15 15V9.16667" id="Vector_5" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2524ba40} id="Vector_6" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border8() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg21 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Border8 />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[28px] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] tracking-[-0.5px] w-[min-content]">
        <p className="mb-0">Прием контейнеров,</p>
        <p>таможня и перенаправление в СНГ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-neutral-500 w-[min-content]">
        <p className="mb-0">Встречаем груз, проводим</p>
        <p className="mb-0">таможенную очистку, доставляем</p>
        <p>в страны СНГ</p>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <ItemText text="Порты ОАЭ" />
      <ItemText text="Таможенное сопровождение" />
      <ItemText text="Логистика до двери" />
    </div>
  );
}

function Frame57() {
  return (
    <Wrapper1>
      <Frame55 />
      <Frame56 />
    </Wrapper1>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame57 />
      {[...Array(2).keys()].map((_, i) => (
        <Helper additionalClassNames="self-stretch" />
      ))}
      <Helper additionalClassNames="h-[305px]" />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame41 />
      <Frame54 />
      <Frame22 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-[40px] top-[3335px] w-[1200px]">
      <Container16 />
      <Frame58 />
    </div>
  );
}

function Svg22() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.pfa37fa0} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border9() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg22 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] h-full items-center p-[24px] relative rounded-[14px] shrink-0 w-[282px]">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Border9 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] text-center w-[min-content]">
        <p className="leading-[normal]">Сопровождение 24/7</p>
      </div>
      <div className="bg-[#e6e6e6] h-px shrink-0 w-[40px]" data-name="Horizontal Divider" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-center text-neutral-500 w-[min-content]">
        <p className="leading-[normal]">Личный менеджер на каждом этапе</p>
      </div>
    </div>
  );
}

function Border10() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg11 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] h-full items-center p-[24px] relative rounded-[14px] shrink-0 w-[282px]">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Border10 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] text-center w-[min-content]">
        <p className="leading-[normal]">Документы и таможня</p>
      </div>
      <div className="bg-[#e6e6e6] h-px shrink-0 w-[40px]" data-name="Horizontal Divider" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[normal] min-w-full not-italic relative shrink-0 text-[16px] text-center text-neutral-500 w-[min-content]">
        <p className="mb-0">Оформление, учет в ОАЭ,</p>
        <p>очистка</p>
      </div>
    </div>
  );
}

function Svg23() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 5V10L13.3333 11.6667" id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border11() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg23 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] h-full items-center p-[24px] relative rounded-[14px] shrink-0 w-[282px]">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Border11 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] text-center w-[min-content]">
        <p className="leading-[normal]">Сроки под контроль</p>
      </div>
      <div className="bg-[#e6e6e6] h-px shrink-0 w-[40px]" data-name="Horizontal Divider" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-center text-neutral-500 w-[min-content]">
        <p className="leading-[normal]">Четкие SLA и план работ</p>
      </div>
    </div>
  );
}

function Border12() {
  return (
    <div className="bg-neutral-100 content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg12 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] h-full items-center p-[24px] relative rounded-[14px] shrink-0 w-[282px]">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Border12 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#141414] text-[20px] text-center w-[min-content]">
        <p className="leading-[normal]">Логистика по миру</p>
      </div>
      <div className="bg-[#e6e6e6] h-px shrink-0 w-[40px]" data-name="Horizontal Divider" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-center text-neutral-500 w-[min-content]">
        <p className="leading-[normal]">Авиа/морская/авто доставка</p>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame59 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame24 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame25 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame26 />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-[40px] top-[4648px] w-[1200px]">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[32px] text-center w-full">
        <p className="leading-[normal]">Услуги</p>
      </div>
      <Frame60 />
    </div>
  );
}

function Svg24() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.p1a7ce800} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border13() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg24 />
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin />
      <LinkText text="Tel +971 4 331 8397" />
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin />
      <LinkText text="Mob +971 54 405 0707" />
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin />
      <LinkText text="Mob +971 54 405 0303" />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="List">
      <Item />
      <ItemText1 text="Fax +971 4 331 8397" />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Text1 text="Телефоны" />
      <List1 />
    </div>
  );
}

function Frame61() {
  return (
    <Wrapper3 additionalClassNames="h-[224px]">
      <div className="content-stretch flex gap-[21px] items-start p-[24px] relative size-full">
        <Border13 />
        <Frame28 />
      </div>
    </Wrapper3>
  );
}

function Svg25() {
  return (
    <Wrapper additionalClassNames="shrink-0">
      <path d={svgPaths.pd919a80} id="Vector" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p189c1170} id="Vector_2" stroke="var(--stroke-0, #141414)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Border14() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg25 />
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin />
      <LinkText text="info@mashynbazar.com" />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="List">
      <Item3 />
      <ItemText1 text="mashynbazar@gmail.com" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Text1 text="Email" />
      <List2 />
    </div>
  );
}

function Frame63() {
  return (
    <Wrapper3>
      <div className="content-stretch flex gap-[21px] items-start p-[24px] relative w-full">
        <Border14 />
        <Frame62 />
      </div>
    </Wrapper3>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame61 />
      <Frame63 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-[440px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[20px] w-full">
        <p className="leading-[normal]">Наши контакты</p>
      </div>
      <Frame29 />
    </div>
  );
}

function Svg26() {
  return (
    <Svg13>
      <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Input() {
  return (
    <Input4>
      <Svg26 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Your name</p>
      </div>
    </Input4>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-nowrap">
        <p className="leading-[14px] whitespace-pre">Ваше имя</p>
      </div>
      <Input />
    </div>
  );
}

function Svg27() {
  return (
    <Svg13>
      <path d={svgPaths.p2a44c680} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Input1() {
  return (
    <Input4>
      <Svg27 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">+971 54 405 0707</p>
      </div>
    </Input4>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-nowrap">
        <p className="leading-[14px] whitespace-pre">Телефон</p>
      </div>
      <Input1 />
    </div>
  );
}

function Svg28() {
  return (
    <Svg13>
      <path d={svgPaths.p17070980} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p120c8200} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Input2() {
  return (
    <Input4>
      <Svg28 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
        <p className="leading-[normal] whitespace-pre">info@mashynbazar.com</p>
      </div>
    </Input4>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-nowrap">
        <p className="leading-[14px] whitespace-pre">Email</p>
      </div>
      <Input2 />
    </div>
  );
}

function Svg29() {
  return (
    <Svg13>
      <path d={svgPaths.p1bb15080} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Svg13>
  );
}

function Input3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start p-[12px] relative size-full">
          <Svg29 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap">
            <p className="leading-[normal] whitespace-pre">Your question...</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[83px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-nowrap">
        <p className="leading-[14px] whitespace-pre">Сообщение</p>
      </div>
      <Input3 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p3f0cc030} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg30() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame67 />
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-[#141414] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
            <p className="leading-[normal] whitespace-pre">Отправить</p>
          </div>
          <Svg30 />
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <Wrapper3>
      <div className="content-stretch flex flex-col gap-[14px] items-start p-[24px] relative w-full">
        <Frame64 />
        <Frame65 />
        <Frame66 />
        <Frame31 />
        <Link8 />
      </div>
    </Wrapper3>
  );
}

function Frame69() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[25px] grow items-start min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[20px] w-full">
        <p className="leading-[normal]">Напишите нам</p>
      </div>
      <Frame68 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start left-[40px] top-[5098px] w-[1200px]">
      <Frame30 />
      <Frame69 />
    </div>
  );
}

export default function MacBookAir() {
  return (
    <div className="bg-white relative size-full" data-name="MacBook Air - 1">
      <Container1 />
      <LuxuryCar />
      <Frame16 />
      <Frame15 />
      <Frame23 />
      <Frame27 />
      <Frame32 />
    </div>
  );
}