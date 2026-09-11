export interface Memory {
  id: string;
  title: string;
  caption: string;
  image: string;
}

// Замени image на свои реальные фото (см. /public/assets/images/).
// title и caption можно менять свободно.
export const memories: Memory[] = [
  {
    id: "001",
    title: "FILE_001",
    caption: "Когда мы только познакомились и впервые увидели твою улыбку",
    image: "/assets/images/memory-first-meeting.jpg",
  },
  {
    id: "002",
    title: "FILE_002",
    caption: "У тебя самые яркие идеи, которые ты с лёгкостью реализуешь",
    image: "/assets/images/memory-pink-disco.jpg",
  },
  {
    id: "003",
    title: "FILE_003",
    caption: "С тобой связаны самые лучшие воспоминания Томска и не только",
    image: "/assets/images/memory-friends-lights.jpg",
  },
  {
    id: "004",
    title: "FILE_004",
    caption: "",
    image: "/assets/images/memory-courtroom.jpg",
  },
];

export interface AnomalyImage {
  id: string;
  label: string;
  caption: string;
  source: string;
  image: string;
}

// Абсурдные "сбойные" изображения (Шрек и т.д.)
export const anomalies: AnomalyImage[] = [
  {
    id: "a04",
    label: "АРХИВНЫЙ МАТЕРИАЛ №04",
    caption:
      "Исследование показало повышенную готовность к курортному отдыху.",
    source: "Источник: сомнительный.",
    image: "/assets/images/shrek-surf.jpg",
  },
  {
    id: "a07",
    label: "АРХИВНЫЙ МАТЕРИАЛ №07",
    caption: "Зафиксировано состояние полного курортного благополучия.",
    source: "Источник: неизвестен.",
    image: "/assets/images/shrek-yacht.jpg",
  },
  {
    id: "a08",
    label: "АРХИВНЫЙ МАТЕРИАЛ №08",
    caption: "Система просит сохранить это в тайне.",
    source: "Источник: она сама.",
    image: "/assets/images/shrek-water.jpg",
  },
];

export interface DreamFrame {
  id: string;
  tag: string;
  image: string;
  data?: { label: string; value: string }[];
  note?: string;
}

// Кадры сюрреалистического travel dream (экран 16)
export const dreamFrames: DreamFrame[] = [
  {
    id: "d1",
    tag: "SEARCH RESULT",
    image: "/assets/images/pink-tropical.jpg",
    data: [
      { label: "temperature", value: "pleasant" },
      { label: "ocean", value: "detected" },
      { label: "palm trees", value: "excessive" },
    ],
  },
  {
    id: "d2",
    tag: "ARCHIVED DESTINATION",
    image: "/assets/images/grapefruit-sunset.jpg",
    data: [{ label: "probability of vacation", value: "87%" }],
    note: "Но что-то не сходится.",
  },
  {
    id: "d3",
    tag: "UNKNOWN LOCATION",
    image: "/assets/images/disco-ocean.jpg",
  },
  {
    id: "d4",
    tag: "VISUAL MEMORY",
    image: "/assets/images/retro-dolphin.jpg",
  },
  {
    id: "d5",
    tag: "POSSIBLE FUTURE",
    image: "/assets/images/surreal-wave.jpg",
  },
  {
    id: "d6",
    tag: "SIGNAL FOUND",
    image: "/assets/images/archive-cover.svg",
  },
];
