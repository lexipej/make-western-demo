function VsContainer() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-12px] py-[8px] relative shrink-0" data-name="vs-container">
      <p className="[word-break:break-word] font-['Geist:Light',sans-serif] font-light leading-none opacity-70 relative shrink-0 text-[44px] text-center text-white whitespace-nowrap">vs</p>
    </div>
  );
}

function WordmarkLockup() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="wordmark-lockup">
      <p className="[word-break:break-word] font-['Besley:Black',sans-serif] font-black leading-none mb-[-12px] relative shrink-0 text-[160px] text-center text-white uppercase whitespace-nowrap">COWBOY</p>
      <VsContainer />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-none relative shrink-0 text-[140px] text-center text-white uppercase whitespace-nowrap">ROBOT</p>
    </div>
  );
}

function FooterDecoration() {
  return <div className="h-[64px] relative shrink-0 w-[40px]" data-name="footer-decoration" />;
}

export default function CowboyVsRobotWordmark() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full" data-name="cowboy-vs-robot-wordmark">
      <WordmarkLockup />
      <FooterDecoration />
    </div>
  );
}
