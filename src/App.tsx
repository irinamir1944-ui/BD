import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientFX } from "./components/shared/AmbientFX";
import { ScreenShell } from "./components/shared/ScreenShell";
import { SystemTransition } from "./components/shared/SystemTransition";
import { SystemIntro } from "./components/SystemIntro/SystemIntro";
import { Identification } from "./components/Identification/Identification";
import { ElementChoice } from "./components/ElementChoice/ElementChoice";
import { FactsArchive } from "./components/FactsArchive/FactsArchive";
import { AchievementArchive } from "./components/AchievementArchive/AchievementArchive";
import { MemoryArchive } from "./components/MemoryArchive/MemoryArchive";
import { SignalIntercept } from "./components/SignalIntercept/SignalIntercept";
import { PersonalMessages } from "./components/PersonalMessages/PersonalMessages";
import { DestinationSearch } from "./components/DestinationSearch/DestinationSearch";
import { TravelDream } from "./components/TravelDream/TravelDream";
import { WaterTransition } from "./components/WaterTransition/WaterTransition";
import { GiftReveal } from "./components/GiftReveal/GiftReveal";
import { Certificate } from "./components/Certificate/Certificate";
import { FinalMessage } from "./components/FinalMessage/FinalMessage";
import "./styles/globals.css";
import "./styles/animations.css";

const SCREENS = [
  "intro",
  "identification",
  "element",
  "facts",
  "achievements",
  "memory",
  "signal",
  "messages",
  "destination",
  "dream",
  "water",
  "reveal",
  "certificate",
  "final",
] as const;

type Screen = (typeof SCREENS)[number];

const TOTAL_STEPS = 9;
const STEP_MAP: Record<Screen, number> = {
  intro: 1,
  identification: 2,
  element: 3,
  facts: 4,
  achievements: 5,
  memory: 6,
  signal: 7,
  messages: 8,
  destination: 9,
  dream: 9,
  water: 9,
  reveal: 9,
  certificate: 9,
  final: 9,
};

function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimer = useRef<number | null>(null);
  const screen: Screen = SCREENS[screenIndex];

  const jump = (target: number) => {
    if (transitioning) return;
    setTransitioning(true);
    transitionTimer.current = window.setTimeout(() => {
      setScreenIndex(target);
      transitionTimer.current = window.setTimeout(() => setTransitioning(false), 260);
    }, 220);
  };

  const goTo = (s: Screen) => jump(SCREENS.indexOf(s));
  const next = () => jump(Math.min(screenIndex + 1, SCREENS.length - 1));

  useEffect(() => {
    return () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    };
  }, []);

  const showProgress = screen !== "water" && screen !== "final";

  return (
    <>
      <AmbientFX />
      <SystemTransition active={transitioning} />
      <AnimatePresence mode="wait">
        <ScreenShell
          key={screen}
          step={showProgress ? STEP_MAP[screen] : undefined}
          totalSteps={showProgress ? TOTAL_STEPS : undefined}
        >
          {screen === "intro" && <SystemIntro onNext={next} />}
          {screen === "identification" && <Identification onNext={next} />}
          {screen === "element" && <ElementChoice onNext={next} />}
          {screen === "facts" && <FactsArchive onNext={next} />}
          {screen === "achievements" && <AchievementArchive onNext={next} />}
          {screen === "memory" && <MemoryArchive onNext={next} />}
          {screen === "signal" && <SignalIntercept onNext={next} />}
          {screen === "messages" && <PersonalMessages onNext={next} />}
          {screen === "destination" && <DestinationSearch onNext={next} />}
          {screen === "dream" && <TravelDream onNext={next} />}
          {screen === "water" && <WaterTransition onDone={() => goTo("reveal")} />}
          {screen === "reveal" && <GiftReveal onNext={next} />}
          {screen === "certificate" && <Certificate onNext={next} />}
          {screen === "final" && <FinalMessage />}
        </ScreenShell>
      </AnimatePresence>
    </>
  );
}

export default App;
