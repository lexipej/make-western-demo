import { useState, useEffect, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import CowboyVsRobotWordmark from "@/imports/CowboyVsRobotWordmark/index";

import img0 from "@/imports/image.png";
import img1 from "@/imports/image-1.png";
import img2 from "@/imports/image-2.png";
import img3 from "@/imports/image-3.png";
import img4 from "@/imports/image-4.png";
import img5 from "@/imports/image-5.png";
import img6 from "@/imports/image-6.png";
import img7 from "@/imports/image-7.png";
import img8 from "@/imports/image-8.png";

import bgSaloon from "@/imports/bg-saloon.png.png";
import bgDuelStreet from "@/imports/bg-duel-street.png.png";
import bgSunsetEnding from "@/imports/bg-sunset-ending.png.png";

// ─── Asset registry ───────────────────────────────────────────────────────────
const SPRITES: Record<string, string> = {
  "image.png": img0,
  "image-1.png": img1,
  "image-2.png": img2,
  "image-3.png": img3,
  "image-4.png": img4,
  "image-5.png": img5,
  "image-6.png": img6,
  "image-7.png": img7,
  "image-8.png": img8,
  "cowboy-neutral.png": img0,
  "cowboy-angry.png": img1,
  "cowboy-happy.png": img2,
  "robot-neutral.png": img3,
  "bartender-neutral.png": img4,
  "robot-tense.png": img5,
  "robot-happy.png": img6,
  "bartender-worried.png": img7,
  "bartender-relieved.png": img8,
};

const BACKGROUNDS: Record<string, string> = {
  "bg-saloon.png": bgSaloon,
  "bg-duel-street.png": bgDuelStreet,
  "bg-sunset-ending.png": bgSunsetEnding,
};

const getBg = (key: string): string => BACKGROUNDS[key] ?? bgSaloon;

type Beat = {
  id: string;
  type: "dialogue" | "choice" | "result";
  background: string;
  left: string;
  center: string;
  right: string;
  speaker: string;
  line: string;
  next: string;
  choices: string;
  end: boolean;
};

const STORY: Beat[] = [
  { id: "s1_01", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Cowboy", line: "A hush falls, steel heart.", next: "s1_02", choices: "", end: false },
  { id: "s1_02", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Robot", line: "Ambient noise is 73 decibels.", next: "s1_03", choices: "", end: false },
  { id: "s1_03", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Bartender", line: "The hush is my broom, partner.", next: "s1_04", choices: "", end: false },
  { id: "s1_04", type: "dialogue", background: "bg-saloon.png", left: "cowboy-angry.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Cowboy", line: "This tin pilgrim insulted my hat.", next: "s1_05", choices: "", end: false },
  { id: "s1_05", type: "dialogue", background: "bg-saloon.png", left: "cowboy-angry.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Robot", line: "I called it inefficient shade.", next: "s1_06", choices: "", end: false },
  { id: "s1_06", type: "dialogue", background: "bg-saloon.png", left: "cowboy-angry.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Bartender", line: "It shades your bill. Pay first.", next: "s1_07", choices: "", end: false },
  { id: "s1_07", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-worried.png", right: "robot-neutral.png", speaker: "Cowboy", line: "Honor rides before coin.", next: "s1_08", choices: "", end: false },
  { id: "s1_08", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-worried.png", right: "robot-neutral.png", speaker: "Robot", line: "Coin has superior traction.", next: "s1_09", choices: "", end: false },
  { id: "s1_09", type: "dialogue", background: "bg-saloon.png", left: "cowboy-angry.png", center: "bartender-worried.png", right: "robot-tense.png", speaker: "Bartender", line: "Both of you are tracking mud.", next: "s1_10", choices: "", end: false },
  { id: "s1_10", type: "dialogue", background: "bg-saloon.png", left: "cowboy-angry.png", center: "bartender-worried.png", right: "robot-tense.png", speaker: "Cowboy", line: "Then destiny shall sweep it clean.", next: "s1_11", choices: "", end: false },
  { id: "s1_11", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-worried.png", right: "robot-happy.png", speaker: "Robot", line: "I can sweep. I have a mode.", next: "s1_12", choices: "", end: false },
  { id: "s1_12", type: "dialogue", background: "bg-saloon.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Bartender", line: "Outside. Less glass to replace.", next: "s2_01", choices: "", end: false },
  { id: "s2_01", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Cowboy", line: "Behold, the street awaits thunder.", next: "s2_02", choices: "", end: false },
  { id: "s2_02", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Robot", line: "Weather report: clear skies.", next: "s2_03", choices: "", end: false },
  { id: "s2_03", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-neutral.png", center: "bartender-neutral.png", right: "robot-neutral.png", speaker: "Bartender", line: "Stand by the trough, not my door.", next: "s2_04", choices: "", end: false },
  { id: "s2_04", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-angry.png", center: "bartender-worried.png", right: "robot-neutral.png", speaker: "Cowboy", line: "He calculates, yet lacks courage.", next: "s2_05", choices: "", end: false },
  { id: "s2_05", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-angry.png", center: "bartender-worried.png", right: "robot-happy.png", speaker: "Robot", line: "I have courage version 2.1 beta.", next: "s2_06", choices: "", end: false },
  { id: "s2_06", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-neutral.png", center: "bartender-worried.png", right: "robot-happy.png", speaker: "Bartender", line: "Beta courage still owes rent.", next: "s2_07", choices: "", end: false },
  { id: "s2_07", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-angry.png", center: "bartender-worried.png", right: "robot-tense.png", speaker: "Cowboy", line: "Then draw, chrome coyote.", next: "s2_08", choices: "", end: false },
  { id: "s2_08", type: "dialogue", background: "bg-duel-street.png", left: "cowboy-angry.png", center: "bartender-neutral.png", right: "robot-tense.png", speaker: "Bartender", line: "I call the duel. Player decides.", next: "s2_choice", choices: "", end: false },
  { id: "s2_choice", type: "choice", background: "bg-duel-street.png", left: "cowboy-angry.png", center: "bartender-neutral.png", right: "robot-tense.png", speaker: "Bartender", line: "Choose the ending before sunset.", next: "", choices: "Cowboy wins->s3_cowboy_01|Robot wins->s3_robot_01|Nobody wins->s3_nobody_01", end: false },
  { id: "s3_cowboy_01", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-happy.png", center: "bartender-relieved.png", right: "robot-tense.png", speaker: "Cowboy", line: "My legend has found its sunrise.", next: "s3_cowboy_02", choices: "", end: false },
  { id: "s3_cowboy_02", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-happy.png", center: "bartender-relieved.png", right: "robot-tense.png", speaker: "Robot", line: "I file a poetic grievance.", next: "s3_cowboy_03", choices: "", end: false },
  { id: "s3_cowboy_03", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-happy.png", center: "bartender-relieved.png", right: "robot-neutral.png", speaker: "Bartender", line: "Fine. Legend buys root beer.", next: "s3_result", choices: "", end: false },
  { id: "s3_robot_01", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-angry.png", center: "bartender-relieved.png", right: "robot-happy.png", speaker: "Robot", line: "Victory confirmed. Yeehaw active.", next: "s3_robot_02", choices: "", end: false },
  { id: "s3_robot_02", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-neutral.png", center: "bartender-relieved.png", right: "robot-happy.png", speaker: "Cowboy", line: "My pride staggers, but poses.", next: "s3_robot_03", choices: "", end: false },
  { id: "s3_robot_03", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-neutral.png", center: "bartender-relieved.png", right: "robot-happy.png", speaker: "Bartender", line: "Robot wins. Cowboy mops porch.", next: "s3_result", choices: "", end: false },
  { id: "s3_nobody_01", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-angry.png", center: "bartender-relieved.png", right: "robot-tense.png", speaker: "Bartender", line: "I hid both draw buttons in the till.", next: "s3_nobody_02", choices: "", end: false },
  { id: "s3_nobody_02", type: "dialogue", background: "bg-sunset-ending.png", left: "cowboy-neutral.png", center: "bartender-relieved.png", right: "robot-happy.png", speaker: "Robot", line: "Nobody wins. Damage is zero.", next: "s3_result", choices: "", end: false },
  { id: "s3_result", type: "result", background: "bg-sunset-ending.png", left: "cowboy-neutral.png", center: "bartender-relieved.png", right: "robot-happy.png", speaker: "Narrator", line: "The saloon survives another evening.", next: "", choices: "", end: true },
];

const BEAT_MAP = Object.fromEntries(STORY.map((b) => [b.id, b]));

function parseChoices(raw: string): { label: string; target: string }[] {
  if (!raw) return [];
  return raw.split("|").map((c) => {
    const [label, target] = c.split("->");
    return { label: label.trim(), target: target.trim() };
  });
}

const SPEAKER_COLORS: Record<string, string> = {
  Cowboy: "#d4944a",
  Robot: "#4ac8d4",
  Bartender: "#c47a8a",
  Narrator: "#b8a88a",
};

function speakerColor(name: string) {
  return SPEAKER_COLORS[name] ?? "#e0d0b8";
}

function Sprite({ src, side }: { src: string; side: "left" | "center" | "right" }) {
  const resolved = SPRITES[src];
  if (!resolved) {
    return (
      <div className="absolute bottom-[22%] flex items-end justify-center" style={{ left: side === "left" ? "2%" : side === "right" ? "auto" : "50%", right: side === "right" ? "2%" : "auto", transform: side === "center" ? "translateX(-50%)" : undefined, width: "22%", height: "70%" }}>
        <div className="w-full h-full border-2 border-dashed border-white/30 rounded flex items-center justify-center text-white/40 text-xs text-center p-2" style={{ fontFamily: "Cinzel, serif" }}>[{src}]</div>
      </div>
    );
  }
  const posStyle: React.CSSProperties = side === "left" ? { left: "1%", bottom: "22%" } : side === "right" ? { right: "1%", bottom: "22%" } : { left: "50%", transform: "translateX(-50%)", bottom: "22%" };
  return (
    <div className="absolute flex items-end" style={{ ...posStyle, width: "22%", height: "74%" }}>
      <ImageWithFallback src={resolved} alt={src} className="w-full h-full object-contain object-bottom drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

function useTypingText(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  const finish = useCallback(() => { setDisplayed(text); setDone(true); }, [text]);
  return { displayed, done, finish };
}

function endingTitle(prevId: string) {
  if (prevId.includes("cowboy")) return "THE COWBOY WINS";
  if (prevId.includes("robot")) return "THE ROBOT WINS";
  if (prevId.includes("nobody")) return "NOBODY WINS";
  return "THE END";
}

export default function App() {
  const [screen, setScreen] = useState<"start" | "game">("start");
  const [beatId, setBeatId] = useState("s1_01");
  const [branch, setBranch] = useState("");
  const [prevBg, setPrevBg] = useState("");
  const [fadeBg, setFadeBg] = useState(false);

  const beat = BEAT_MAP[beatId] ?? STORY[0];
  const { displayed, done, finish } = useTypingText(beat.line);
  const choices = parseChoices(beat.choices);

  useEffect(() => {
    if (prevBg && prevBg !== beat.background) {
      setFadeBg(true);
      const t = setTimeout(() => setFadeBg(false), 400);
      return () => clearTimeout(t);
    }
    setPrevBg(beat.background);
  }, [beat.background]);

  function advance() {
    if (!done) { finish(); return; }
    if (beat.type === "dialogue" && beat.next) setBeatId(beat.next);
  }

  function choose(target: string) {
    setBranch(target);
    setBeatId(target);
  }

  const bgUrl = getBg(beat.background);

  return (
    <div className="size-full flex items-center justify-center bg-[#0a0604]" style={{ fontFamily: "Crimson Text, Georgia, serif" }}>
      <div className="relative overflow-hidden select-none" style={{ aspectRatio: "16/9", width: "min(100vw, 177.78vh)", height: "min(56.25vw, 100vh)" }}>

        {screen === "start" && (
          <>
            <style>{`
              .wordmark-wrap [data-name="wordmark-lockup"] > p:first-child { font-family: 'Besley', serif !important; font-weight: 900 !important; font-size: clamp(2.5rem, 8.5vw, 10rem) !important; margin-bottom: -0.08em !important; }
              .wordmark-wrap [data-name="vs-container"] p { font-family: 'Geist', sans-serif !important; font-weight: 300 !important; font-size: clamp(1.2rem, 2.8vw, 2.75rem) !important; }
              .wordmark-wrap [data-name="wordmark-lockup"] > p:last-child { font-family: 'Geist Mono', monospace !important; font-weight: 700 !important; font-size: clamp(2rem, 7.5vw, 8.75rem) !important; }
            `}</style>
            <div className="absolute inset-0" style={{ backgroundImage: `url(${bgDuelStreet})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 100%)" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3%]">
              <div className="wordmark-wrap w-full flex items-center justify-center"><CowboyVsRobotWordmark /></div>
              <div className="w-[28%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(220,175,70,0.7), transparent)" }} />
              <button onClick={() => setScreen("game")} style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(0.7rem, 1.6vw, 1.3rem)", fontWeight: 700, letterSpacing: "0.35em", color: "#f0e0b0", textTransform: "uppercase", background: "linear-gradient(180deg, rgba(100,60,15,0.85) 0%, rgba(55,28,5,0.95) 100%)", border: "1px solid rgba(210,160,55,0.55)", borderRadius: "2px", padding: "clamp(6px,1.2vh,14px) clamp(20px,4vw,56px)", transition: "all 0.18s ease", cursor: "pointer" }}>Begin</button>
              <p style={{ fontFamily: "Crimson Text, Georgia, serif", fontStyle: "italic", fontSize: "clamp(0.5rem, 1vw, 0.8rem)", color: "rgba(220,195,150,0.55)", letterSpacing: "0.08em", marginTop: "0.5%" }}>A tale of iron, gears, and questionable hats.</p>
            </div>
          </>
        )}

        {screen === "game" && <>
          <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center", opacity: fadeBg ? 0 : 1 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
          <div className="absolute bottom-[22%] left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(180,130,60,0.15), transparent)" }} />
          {beat.left && <Sprite src={beat.left} side="left" />}
          {beat.center && <Sprite src={beat.center} side="center" />}
          {beat.right && <Sprite src={beat.right} side="right" />}
          {beat.type === "result" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="mb-3 tracking-[0.25em] text-center px-8" style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#e8c87a", textShadow: "0 0 40px rgba(232,200,122,0.6), 0 2px 8px rgba(0,0,0,0.9)", letterSpacing: "0.3em" }}>{endingTitle(branch)}</div>
              <div className="w-24 h-px mx-auto mb-4" style={{ background: "linear-gradient(90deg, transparent, #e8c87a, transparent)" }} />
            </div>
          )}
          <div className="absolute left-0 right-0 bottom-0 px-[3%] pb-[2%]" style={{ height: "22%" }}>
            {beat.type === "choice" && done && (
              <div className="absolute left-0 right-0 bottom-[100%] mb-2 flex items-end justify-center gap-[1.5%] px-[5%] pb-[1%]">
                {choices.map(({ label, target }) => (
                  <button key={target} onClick={() => choose(target)} className="relative flex-1 py-[1.2%] px-[2%] text-center cursor-pointer group" style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(0.6rem, 1.4vw, 1.05rem)", fontWeight: 600, letterSpacing: "0.05em", color: "#f0e0b0", background: "linear-gradient(180deg, rgba(90,50,15,0.92) 0%, rgba(50,25,8,0.97) 100%)", border: "1px solid rgba(210,160,60,0.5)", borderRadius: "2px", textShadow: "0 1px 4px rgba(0,0,0,0.8)", transition: "all 0.15s ease", minHeight: "clamp(28px, 5vh, 48px)" }}>
                    <span className="block relative z-10">{label}</span>
                    <span className="absolute left-[6%] top-1/2 -translate-y-1/2 opacity-50" style={{ fontSize: "0.6em", color: "#e8c060" }}>✦</span>
                    <span className="absolute right-[6%] top-1/2 -translate-y-1/2 opacity-50" style={{ fontSize: "0.6em", color: "#e8c060" }}>✦</span>
                  </button>
                ))}
              </div>
            )}
            {beat.speaker && (
              <div className="absolute bottom-full left-[3%] mb-[-1px] px-4 py-[0.4%]" style={{ background: "linear-gradient(180deg, rgba(20,12,4,0.97) 0%, rgba(14,8,2,0.99) 100%)", border: "1px solid rgba(180,130,50,0.35)", borderBottom: "none", borderRadius: "4px 4px 0 0", minWidth: "clamp(70px, 10%, 150px)" }}>
                <span style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(0.6rem, 1.2vw, 0.95rem)", fontWeight: 700, letterSpacing: "0.12em", color: speakerColor(beat.speaker), textShadow: `0 0 12px ${speakerColor(beat.speaker)}80` }}>{beat.speaker}</span>
              </div>
            )}
            <div className="relative h-full rounded-sm overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(12,7,3,0.88) 0%, rgba(8,4,1,0.95) 100%)", border: "1px solid rgba(180,130,50,0.35)", boxShadow: "0 -4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,160,60,0.1)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,150,50,0.6) 20%, rgba(220,170,70,0.8) 50%, rgba(200,150,50,0.6) 80%, transparent 100%)" }} />
              <div className="absolute inset-0 flex items-center px-[3%] pr-[10%]" style={{ paddingTop: "1%", paddingBottom: "1%" }} onClick={beat.type === "dialogue" ? advance : undefined}>
                <p style={{ fontSize: "clamp(0.65rem, 1.55vw, 1.25rem)", lineHeight: 1.55, color: "#f0e4cc", textShadow: "0 1px 3px rgba(0,0,0,0.8)", cursor: beat.type === "dialogue" ? "pointer" : "default", fontStyle: beat.speaker === "Narrator" ? "italic" : "normal" }}>
                  {displayed}
                  {!done && <span style={{ display: "inline-block", width: "0.5em", height: "0.9em", background: "#e8c87a", marginLeft: "2px", verticalAlign: "middle", animation: "blink 0.7s step-end infinite" }} />}
                </p>
              </div>
              {beat.type === "dialogue" && done && beat.next && (
                <button onClick={advance} className="absolute bottom-[10%] right-[2.5%] flex items-center gap-1 cursor-pointer" style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(0.45rem, 0.9vw, 0.72rem)", fontWeight: 600, letterSpacing: "0.15em", color: "#e8c060", textShadow: "0 0 8px rgba(232,192,96,0.5)", background: "none", border: "none", padding: "0", textTransform: "uppercase" }}>
                  Next <span style={{ display: "inline-block", animation: "nudge 0.9s ease-in-out infinite alternate" }}>▶</span>
                </button>
              )}
              {beat.type === "result" && beat.end && (
                <button onClick={() => { setBeatId("s1_01"); setBranch(""); setScreen("start"); }} className="absolute bottom-[10%] right-[2.5%] cursor-pointer" style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(0.45rem, 0.9vw, 0.72rem)", fontWeight: 600, letterSpacing: "0.15em", color: "#a89060", background: "none", border: "none", padding: "0", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>Play Again</button>
              )}
            </div>
          </div>
        </>}

      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } @keyframes nudge { 0% { transform: translateX(0); } 100% { transform: translateX(3px); } }`}</style>
    </div>
  );
}
