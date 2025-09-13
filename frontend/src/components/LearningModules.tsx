"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BookOpenCheck, GraduationCap, MonitorPlay, PackageOpen, SquareArrowDownRight, Captions, Clapperboard, Library } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type LanguageCode = "en" | "hi" | "es";

type ChapterContent = {
  id: string;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  thumbUnsplash: string; // Unsplash image URL
  quiz: {
    questions: Array<{
      id: string;
      difficulty: "easy" | "medium" | "hard";
      prompt: Record<LanguageCode, string>;
      options: Array<{ id: string; label: Record<LanguageCode, string> }>;
      correctOptionId: string;
      explainer: Record<LanguageCode, string>;
    }>;
    passThreshold: number; // 0-100
  };
  reward: {
    title: Record<LanguageCode, string>;
    description: Record<LanguageCode, string>;
  };
};

type Module = {
  id: string;
  title: Record<LanguageCode, string>;
  chapters: ChapterContent[];
};

export interface LearningModulesProps {
  className?: string;
  modules?: Module[];
  initialLanguage?: LanguageCode;
  onProgressChange?: (progressPercent: number) => void;
}

type ChapterState = {
  unlocked: boolean;
  completed: boolean;
  scorePercent: number;
};

type AnswerMap = Record<string, string | undefined>;

const DEFAULT_MODULES: Module[] = [
  {
    id: "module-1",
    title: {
      en: "Journey into Fractions",
      hi: "भिन्नों की यात्रा",
      es: "Viaje a las Fracciones",
    },
    chapters: [
      {
        id: "ch-1",
        title: {
          en: "Mission 1: Sharing Slices",
          hi: "मिशन 1: टुकड़ों को बाँटना",
          es: "Misión 1: Compartiendo porciones",
        },
        description: {
          en: "Learn how to split a whole into equal parts using everyday stories.",
          hi: "रोज़मर्रा की कहानियों से पूरे को बराबर भागों में बाँटना सीखें।",
          es: "Aprende a dividir un entero en partes iguales con historias cotidianas.",
        },
        thumbUnsplash:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        quiz: {
          passThreshold: 70,
          questions: [
            {
              id: "q1",
              difficulty: "easy",
              prompt: {
                en: "You cut a roti into 4 equal parts and eat 1. What fraction did you eat?",
                hi: "आपने रोटी को 4 बराबर भागों में काटा और 1 खाया। आपने कितनी भिन्न खाई?",
                es: "Cortas una tortilla en 4 partes iguales y comes 1. ¿Qué fracción comiste?",
              },
              options: [
                {
                  id: "a",
                  label: { en: "1/4", hi: "1/4", es: "1/4" },
                },
                {
                  id: "b",
                  label: { en: "1/3", hi: "1/3", es: "1/3" },
                },
                {
                  id: "c",
                  label: { en: "1/2", hi: "1/2", es: "1/2" },
                },
              ],
              correctOptionId: "a",
              explainer: {
                en: "1 out of 4 equal parts is 1/4.",
                hi: "4 बराबर भागों में से 1 भाग 1/4 होता है।",
                es: "1 de 4 partes iguales es 1/4.",
              },
            },
            {
              id: "q2",
              difficulty: "medium",
              prompt: {
                en: "Which picture shows halves?",
                hi: "कौन सी तस्वीर आधे दिखाती है?",
                es: "¿Qué imagen muestra mitades?",
              },
              options: [
                { id: "a", label: { en: "A circle split into 2 equal parts", hi: "2 बराबर भागों में बँटा गोला", es: "Un círculo dividido en 2 partes iguales" } },
                { id: "b", label: { en: "A circle split into 3 equal parts", hi: "3 बराबर भागों में बँटा गोला", es: "Un círculo dividido en 3 partes iguales" } },
                { id: "c", label: { en: "A whole circle", hi: "पूरा गोला", es: "Un círculo entero" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "Halves are 2 equal parts.",
                hi: "आधा मतलब 2 बराबर भाग।",
                es: "Mitades son 2 partes iguales.",
              },
            },
            {
              id: "q3",
              difficulty: "hard",
              prompt: {
                en: "Select the fraction equivalent to 2/4.",
                hi: "2/4 के समतुल्य भिन्न चुनें।",
                es: "Selecciona la fracción equivalente a 2/4.",
              },
              options: [
                { id: "a", label: { en: "1/2", hi: "1/2", es: "1/2" } },
                { id: "b", label: { en: "1/4", hi: "1/4", es: "1/4" } },
                { id: "c", label: { en: "3/4", hi: "3/4", es: "3/4" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "2/4 simplifies to 1/2 by dividing numerator and denominator by 2.",
                hi: "अंश और हर को 2 से भाग देकर 2/4 = 1/2।",
                es: "2/4 se simplifica a 1/2 dividiendo numerador y denominador por 2.",
              },
            },
          ],
        },
        reward: {
          title: {
            en: "Slice Scout",
            hi: "स्लाइस स्काउट",
            es: "Explorador de Porciones",
          },
          description: {
            en: "Awarded for mastering basic fractions.",
            hi: "आधारभूत भिन्नों में महारत के लिए।",
            es: "Otorgado por dominar fracciones básicas.",
          },
        },
      },
      {
        id: "ch-2",
        title: {
          en: "Mission 2: Fair Sharing",
          hi: "मिशन 2: समान बाँट",
          es: "Misión 2: Reparto justo",
        },
        description: {
          en: "Compare fractions to decide fair shares among friends.",
          hi: "मित्रों के बीच बराबर बाँट तय करने हेतु भिन्नों की तुलना करें।",
          es: "Compara fracciones para decidir repartos justos entre amigos.",
        },
        thumbUnsplash:
          "https://images.unsplash.com/photo-1517676109075-9ca8c2fc3a5e?q=80&w=1200&auto=format&fit=crop",
        quiz: {
          passThreshold: 70,
          questions: [
            {
              id: "q1",
              difficulty: "easy",
              prompt: {
                en: "Which is larger: 3/4 or 2/4?",
                hi: "कौन बड़ा है: 3/4 या 2/4?",
                es: "¿Cuál es mayor: 3/4 o 2/4?",
              },
              options: [
                { id: "a", label: { en: "3/4", hi: "3/4", es: "3/4" } },
                { id: "b", label: { en: "2/4", hi: "2/4", es: "2/4" } },
                { id: "c", label: { en: "Equal", hi: "समान", es: "Igual" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "With same denominator, the bigger numerator is larger.",
                hi: "हर समान होने पर बड़ा अंश बड़ी भिन्न।",
                es: "Con el mismo denominador, el numerador mayor es más grande.",
              },
            },
            {
              id: "q2",
              difficulty: "medium",
              prompt: {
                en: "Which is closer to 1: 5/6 or 3/4?",
                hi: "1 के अधिक निकट कौन है: 5/6 या 3/4?",
                es: "¿Cuál está más cerca de 1: 5/6 o 3/4?",
              },
              options: [
                { id: "a", label: { en: "5/6", hi: "5/6", es: "5/6" } },
                { id: "b", label: { en: "3/4", hi: "3/4", es: "3/4" } },
                { id: "c", label: { en: "Both equal", hi: "दोनों समान", es: "Ambos iguales" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "5/6 is 1/6 away from 1; 3/4 is 1/4 away.",
                hi: "5/6, 1 से 1/6 दूर; 3/4, 1 से 1/4 दूर।",
                es: "5/6 está a 1/6 de 1; 3/4 está a 1/4.",
              },
            },
          ],
        },
        reward: {
          title: {
            en: "Fair Share Hero",
            hi: "फेयर शेयर हीरो",
            es: "Héroe del Reparto Justo",
          },
          description: {
            en: "For comparing and ordering fractions.",
            hi: "भिन्नों की तुलना और क्रम के लिए।",
            es: "Por comparar y ordenar fracciones.",
          },
        },
      },
      {
        id: "ch-3",
        title: {
          en: "Mission 3: Mix and Match",
          hi: "मिशन 3: मिश्रित भिन्न",
          es: "Misión 3: Mezcla y Combina",
        },
        description: {
          en: "Understand mixed numbers and improper fractions.",
          hi: "मिश्रित और अशुद्ध भिन्नों को समझें।",
          es: "Comprende números mixtos y fracciones impropias.",
        },
        thumbUnsplash:
          "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=1200&auto=format&fit=crop",
        quiz: {
          passThreshold: 70,
          questions: [
            {
              id: "q1",
              difficulty: "medium",
              prompt: {
                en: "Which is the mixed form of 7/4?",
                hi: "7/4 का मिश्रित रूप क्या है?",
                es: "¿Cuál es la forma mixta de 7/4?",
              },
              options: [
                { id: "a", label: { en: "1 3/4", hi: "1 3/4", es: "1 3/4" } },
                { id: "b", label: { en: "2 1/4", hi: "2 1/4", es: "2 1/4" } },
                { id: "c", label: { en: "1 1/3", hi: "1 1/3", es: "1 1/3" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "7/4 = 1 whole and 3/4.",
                hi: "7/4 = 1 पूरा और 3/4।",
                es: "7/4 = 1 entero y 3/4.",
              },
            },
            {
              id: "q2",
              difficulty: "hard",
              prompt: {
                en: "Convert 2 2/3 to an improper fraction.",
                hi: "2 2/3 को अशुद्ध भिन्न में बदलें।",
                es: "Convierte 2 2/3 a fracción impropia.",
              },
              options: [
                { id: "a", label: { en: "8/3", hi: "8/3", es: "8/3" } },
                { id: "b", label: { en: "7/3", hi: "7/3", es: "7/3" } },
                { id: "c", label: { en: "5/3", hi: "5/3", es: "5/3" } },
              ],
              correctOptionId: "a",
              explainer: {
                en: "2×3 + 2 = 8; denominator 3 stays: 8/3.",
                hi: "2×3 + 2 = 8; हर 3 रहता है: 8/3।",
                es: "2×3 + 2 = 8; el denominador 3 se mantiene: 8/3.",
              },
            },
          ],
        },
        reward: {
          title: {
            en: "Master Mixer",
            hi: "मास्टर मिक्सर",
            es: "Maestro de Mezclas",
          },
          description: {
            en: "For mastering mixed numbers.",
            hi: "मिश्रित संख्याओं में महारत के लिए।",
            es: "Por dominar números mixtos.",
          },
        },
      },
    ],
  },
];

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function computeModuleProgress(states: ChapterState[]): number {
  if (!states.length) return 0;
  const per = states.reduce((acc, s) => acc + (s.completed ? 100 : s.scorePercent), 0) / states.length;
  return clamp(Math.round(per));
}

function t<T extends Record<LanguageCode, string>>(m: T, lang: LanguageCode): string {
  return m[lang];
}

export default function LearningModules({
  className,
  modules = DEFAULT_MODULES,
  initialLanguage = "en",
  onProgressChange,
}: LearningModulesProps) {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const activeModule = modules[activeModuleIdx];
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [chapterStates, setChapterStates] = useState<ChapterState[]>(
    () =>
      activeModule.chapters.map((_, i) => ({
        unlocked: i === 0,
        completed: false,
        scorePercent: 0,
      })) as ChapterState[]
  );
  const [dataSaver, setDataSaver] = useState<boolean>(true);
  const [offlineReady, setOfflineReady] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState<"learn" | "quiz" | "rewards">("learn");
  const [adaptiveLevel, setAdaptiveLevel] = useState<"easy" | "medium" | "hard">("easy");

  const activeChapter = activeModule.chapters[activeChapterIdx];
  const activeQuiz = activeChapter.quiz;

  const filteredQuestions = useMemo(() => {
    // Basic adaptive filtering: prioritize current level, ensure at least 2 questions.
    const byLevel = activeQuiz.questions.filter((q) => q.difficulty === adaptiveLevel);
    const fallback = activeQuiz.questions.slice(0, 2);
    const merged = byLevel.length >= 2 ? byLevel : Array.from(new Set([...byLevel, ...fallback]));
    return merged.slice(0, 3);
  }, [activeQuiz.questions, adaptiveLevel]);

  const progressPercent = useMemo(() => computeModuleProgress(chapterStates), [chapterStates]);

  useEffect(() => {
    onProgressChange?.(progressPercent);
  }, [progressPercent, onProgressChange]);

  // Load persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const key = `lq:${activeModule.id}:state`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          chapterStates: ChapterState[];
          language?: LanguageCode;
          offlineReady?: boolean;
        };
        setChapterStates(parsed.chapterStates ?? chapterStates);
        if (parsed.language) setLanguage(parsed.language);
        setOfflineReady(Boolean(parsed.offlineReady));
      }
    } catch {
      // no-op
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModule.id]);

  // Persist state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `lq:${activeModule.id}:state`;
    const payload = JSON.stringify({ chapterStates, language, offlineReady });
    try {
      localStorage.setItem(key, payload);
    } catch {
      // storage might be unavailable
    }
  }, [activeModule.id, chapterStates, language, offlineReady]);

  // Reset when chapter changes
  useEffect(() => {
    setAnswers({});
    setCurrentTab("learn");
  }, [activeChapterIdx]);

  // Auto move to next on completion
  useEffect(() => {
    if (chapterStates[activeChapterIdx]?.completed) {
      const isLast = activeChapterIdx === activeModule.chapters.length - 1;
      if (!isLast) {
        const timer = setTimeout(() => {
          setActiveChapterIdx((i) => i + 1);
          setCurrentTab("learn");
        }, 900);
        return () => clearTimeout(timer);
      }
    }
    return;
  }, [chapterStates, activeChapterIdx, activeModule.chapters.length]);

  function handleAnswer(qId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [qId]: optionId }));
  }

  function evaluateQuiz() {
    const total = filteredQuestions.length;
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (answers[q.id] === q.correctOptionId) correct += 1;
    });
    const percent = Math.round((correct / total) * 100);

    // Adaptive difficulty update
    let nextLevel: "easy" | "medium" | "hard" = adaptiveLevel;
    if (percent >= 90) nextLevel = "hard";
    else if (percent >= 70) nextLevel = "medium";
    else nextLevel = "easy";
    setAdaptiveLevel(nextLevel);

    // Update chapter state
    const pass = percent >= activeQuiz.passThreshold;
    setChapterStates((prev) => {
      const next = prev.map((s) => ({ ...s }));
      const s = next[activeChapterIdx];
      s.scorePercent = percent;
      if (pass) {
        s.completed = true;
        // Unlock next chapter
        if (activeChapterIdx + 1 < next.length) {
          next[activeChapterIdx + 1].unlocked = true;
        }
      }
      return next;
    });

    return { percent, pass };
  }

  async function onSubmitQuiz() {
    setIsSubmitting(true);
    try {
      // Simulate evaluation and minimal latency for UX
      const { percent, pass } = evaluateQuiz();
      if (pass) {
        toast.success(
          t(
            {
              en: `Great! You passed with ${percent}%. Advancing to the next mission...`,
              hi: `शानदार! आपने ${percent}% के साथ पास किया। अगला मिशन शुरू...`,
              es: `¡Genial! Aprobaste con ${percent}%. Avanzando a la siguiente misión...`,
            },
            language
          )
        );
        setCurrentTab("rewards");
      } else {
        toast.message(
          t(
            {
              en: `Score: ${percent}%. Keep trying! We've adjusted difficulty to help.`,
              hi: `स्कोर: ${percent}%। प्रयास जारी रखें! हमने कठिनाई समायोजित की है।`,
              es: `Puntaje: ${percent}%. ¡Sigue intentando! Ajustamos la dificultad para ayudarte.`,
            },
            language
          )
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function onRestartChapter() {
    setAnswers({});
    setChapterStates((prev) => {
      const next = prev.map((s) => ({ ...s }));
      next[activeChapterIdx].completed = false;
      next[activeChapterIdx].scorePercent = 0;
      return next;
    });
    setCurrentTab("learn");
    toast.message(
      t(
        {
          en: "Chapter reset. Try again!",
          hi: "अध्याय रीसेट। फिर से प्रयास करें!",
          es: "Capítulo reiniciado. ¡Intenta de nuevo!",
        },
        language
      )
    );
  }

  function onDownloadOffline() {
    // Simulate offline content caching success
    setOfflineReady(true);
    toast.success(
      t(
        {
          en: "Content saved for offline access.",
          hi: "सामग्री ऑफ़लाइन पहुँच के लिए सहेजी गई।",
          es: "Contenido guardado para acceso sin conexión.",
        },
        language
      )
    );
  }

  function onSwitchModule(idx: number) {
    setActiveModuleIdx(idx);
    setActiveChapterIdx(0);
    setAnswers({});
    setCurrentTab("learn");
    setAdaptiveLevel("easy");
    // Init state for new module
    setChapterStates(
      modules[idx].chapters.map((_, i) => ({
        unlocked: i === 0,
        completed: false,
        scorePercent: 0,
      }))
    );
  }

  return (
    <section
      className={cn(
        "w-full max-w-full bg-card text-foreground rounded-[var(--radius)] border border-[--border] shadow-sm",
        "p-4 sm:p-6",
        className
      )}
      aria-label="Learning modules"
    >
      {/* Header: Module title and progress */}
      <div className="w-full max-w-full flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Library className="size-5 text-foreground/90" aria-hidden />
            <h3 className="text-lg sm:text-xl font-semibold truncate min-w-0">
              {t(activeModule.title, language)}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Captions className="size-4 text-muted-foreground" aria-hidden />
              <Select value={language} onValueChange={(v: LanguageCode) => setLanguage(v)}>
                <SelectTrigger className="w-[120px] bg-secondary">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Switch
                id="data-saver"
                checked={dataSaver}
                onCheckedChange={setDataSaver}
                aria-label="Data saver mode"
              />
              <label htmlFor="data-saver" className="text-xs text-muted-foreground select-none">
                {t(
                  { en: "Data saver", hi: "डेटा सेवर", es: "Ahorro de datos" },
                  language
                )}
              </label>
            </div>

            <Button
              variant={offlineReady ? "secondary" : "default"}
              className={cn(
                "gap-2",
                offlineReady ? "bg-accent hover:bg-accent/80 text-foreground" : "bg-primary text-primary-foreground"
              )}
              onClick={onDownloadOffline}
            >
              <PackageOpen className="size-4" />
              <span className="text-sm">
                {offlineReady
                  ? t({ en: "Offline ready", hi: "ऑफ़लाइन तैयार", es: "Listo sin conexión" }, language)
                  : t({ en: "Save offline", hi: "ऑफ़लाइन सहेजें", es: "Guardar sin conexión" }, language)}
              </span>
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress value={progressPercent} className="h-2" aria-label="Module progress" />
          <span className="text-xs tabular-nums text-muted-foreground">{progressPercent}%</span>
        </div>
      </div>

      {/* Module switcher (if multiple modules provided) */}
      {modules.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {modules.map((m, i) => {
            const isActive = i === activeModuleIdx;
            return (
              <Button
                key={m.id}
                size="sm"
                variant={isActive ? "default" : "secondary"}
                onClick={() => onSwitchModule(i)}
                className={cn("rounded-full", isActive ? "bg-primary text-primary-foreground" : "bg-secondary")}
                aria-pressed={isActive}
              >
                <BookOpenCheck className="size-3.5 mr-2" />
                <span className="truncate max-w-[14ch]">{t(m.title, language)}</span>
              </Button>
            );
          })}
        </div>
      )}

      {/* Chapters navigator */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Clapperboard className="size-4 text-muted-foreground" aria-hidden />
          <span className="text-sm font-medium">{t({ en: "Missions", hi: "मिशन", es: "Misiones" }, language)}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto py-1 -mx-1 px-1">
          {activeModule.chapters.map((ch, i) => {
            const state = chapterStates[i];
            const isActive = i === activeChapterIdx;
            const status: "locked" | "in-progress" | "completed" = state.completed
              ? "completed"
              : state.unlocked
              ? "in-progress"
              : "locked";
            return (
              <button
                key={ch.id}
                onClick={() => state.unlocked && setActiveChapterIdx(i)}
                disabled={!state.unlocked}
                className={cn(
                  "group min-w-[220px] sm:min-w-[260px] w-auto text-left p-3 rounded-[calc(var(--radius)-6px)] border",
                  "bg-secondary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isActive && "bg-accent"
                )}
                aria-current={isActive}
                aria-disabled={!state.unlocked}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-2.5 rounded-full",
                      status === "completed" ? "bg-[--color-success]" : status === "in-progress" ? "bg-chart-3" : "bg-muted-foreground/40"
                    )}
                    aria-hidden
                  />
                  <p className="text-sm font-medium truncate min-w-0">{t(ch.title, language)}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t(ch.description, language)}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {status === "completed"
                      ? t({ en: "Completed", hi: "पूर्ण", es: "Completado" }, language)
                      : status === "in-progress"
                      ? t({ en: "In progress", hi: "प्रगति पर", es: "En progreso" }, language)
                      : t({ en: "Locked", hi: "लॉक", es: "Bloqueado" }, language)}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{chapterStates[i].scorePercent}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content + Quiz + Rewards */}
      <div className="mt-5">
        <Tabs
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v as typeof currentTab)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full bg-secondary">
            <TabsTrigger value="learn" className="data-[state=active]:bg-card">
              <MonitorPlay className="size-4 mr-2" />
              {t({ en: "Learn", hi: "सीखें", es: "Aprender" }, language)}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-card">
              <BookOpenCheck className="size-4 mr-2" />
              {t({ en: "Quiz", hi: "क्विज़", es: "Cuestionario" }, language)}
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-card">
              <GraduationCap className="size-4 mr-2" />
              {t({ en: "Rewards", hi: "पुरस्कार", es: "Recompensas" }, language)}
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn" className="mt-4">
            <Card className="bg-card border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">{t(activeChapter.title, language)}</CardTitle>
                <CardDescription className="text-sm">{t(activeChapter.description, language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative overflow-hidden rounded-[calc(var(--radius)-6px)] border bg-secondary">
                  <img
                    src={activeChapter.thumbUnsplash + (dataSaver ? "&dpr=1&w=800" : "&dpr=2&w=1600")}
                    alt=""
                    className="w-full h-44 sm:h-56 object-cover max-w-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 text-white px-2 py-1 text-xs">
                      <MonitorPlay className="size-3.5" />
                      {t({ en: "Story mode", hi: "कहानी मोड", es: "Modo historia" }, language)}
                    </span>
                    {dataSaver && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 text-white px-2 py-1 text-xs">
                        {t({ en: "Low data", hi: "कम डेटा", es: "Bajo datos" }, language)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    <SquareArrowDownRight className="size-3 mr-1.5" />
                    {t({ en: "Progressive steps", hi: "क्रमिक कदम", es: "Pasos progresivos" }, language)}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    <BookOpenCheck className="size-3 mr-1.5" />
                    {t({ en: "Practice inside", hi: "अंदर अभ्यास", es: "Práctica incluida" }, language)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    {t(
                      {
                        en: "Read the story above. When ready, switch to Quiz to test your understanding. Your difficulty adapts as you learn.",
                        hi: "ऊपर कहानी पढ़ें। तैयार होने पर क्विज़ में जाएँ और समझ की जाँच करें। सीखते समय कठिनाई अनुकूलित होती है।",
                        es: "Lee la historia de arriba. Cuando estés listo, cambia a Cuestionario para probar tu comprensión. La dificultad se adapta mientras aprendes.",
                      },
                      language
                    )}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {t({ en: "Current difficulty:", hi: "वर्तमान कठिनाई:", es: "Dificultad actual:" }, language)}
                    </span>
                    <Badge className="rounded-full">
                      {adaptiveLevel === "easy"
                        ? t({ en: "Easy", hi: "आसान", es: "Fácil" }, language)
                        : adaptiveLevel === "medium"
                        ? t({ en: "Medium", hi: "मध्यम", es: "Media" }, language)
                        : t({ en: "Hard", hi: "कठिन", es: "Difícil" }, language)}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setCurrentTab("quiz")} className="gap-2">
                    <BookOpenCheck className="size-4" />
                    {t({ en: "Start Quiz", hi: "क्विज़ शुरू करें", es: "Iniciar cuestionario" }, language)}
                  </Button>
                  <Button variant="secondary" onClick={onRestartChapter}>
                    {t({ en: "Restart chapter", hi: "अध्याय पुनः प्रारंभ", es: "Reiniciar capítulo" }, language)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="mt-4">
            <Card className="bg-card border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">
                  {t({ en: "Chapter Quiz", hi: "अध्याय क्विज़", es: "Cuestionario del capítulo" }, language)}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t(
                    {
                      en: "Answer the questions below. Passing unlocks the next mission.",
                      hi: "नीचे दिए प्रश्नों का उत्तर दें। पास होने पर अगला मिशन अनलॉक होगा।",
                      es: "Responde las preguntas abajo. Al aprobar, desbloqueas la siguiente misión.",
                    },
                    language
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {filteredQuestions.map((q, idx) => {
                    const selected = answers[q.id];
                    const isCorrect = selected && selected === q.correctOptionId;
                    const isAnswered = Boolean(selected);
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          "p-3 rounded-[calc(var(--radius)-8px)] border bg-secondary",
                          isAnswered && (isCorrect ? "ring-1 ring-[--color-success]" : "ring-1 ring-destructive/70")
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="rounded-full shrink-0">
                            {idx + 1}
                          </Badge>
                          <div className="min-w-0 w-full">
                            <p className="text-sm font-medium break-words">
                              {t(q.prompt, language)}
                            </p>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {q.options.map((opt) => {
                                const active = selected === opt.id;
                                const correct = q.correctOptionId === opt.id && isAnswered;
                                return (
                                  <button
                                    key={opt.id}
                                    onClick={() => handleAnswer(q.id, opt.id)}
                                    className={cn(
                                      "text-left text-sm p-2 rounded-md border transition-colors",
                                      "bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
                                      active && "bg-accent",
                                      correct && "border-[--color-success]"
                                    )}
                                    aria-pressed={active}
                                  >
                                    <span className="truncate block">{t(opt.label, language)}</span>
                                  </button>
                                );
                              })}
                            </div>
                            {isAnswered && (
                              <p
                                className={cn(
                                  "mt-2 text-xs",
                                  isCorrect ? "text-[--color-success]" : "text-destructive"
                                )}
                              >
                                {isCorrect
                                  ? t(
                                      { en: "Correct!", hi: "सही!", es: "¡Correcto!" },
                                      language
                                    )
                                  : t(
                                      { en: "Not quite. Tip:", hi: "ठीक नहीं। संकेत:", es: "No exactamente. Pista:" },
                                      language
                                    )}{" "}
                                {t(q.explainer, language)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {t({ en: "Auto-advance on pass", hi: "पास होने पर स्वतः आगे", es: "Avance automático al aprobar" }, language)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setCurrentTab("learn")}>
                      {t({ en: "Back to Learn", hi: "सीखने पर वापस", es: "Volver a Aprender" }, language)}
                    </Button>
                    <Button onClick={onSubmitQuiz} disabled={isSubmitting} className="gap-2">
                      <BookOpenCheck className="size-4" />
                      {isSubmitting
                        ? t({ en: "Checking...", hi: "जाँच हो रही...", es: "Comprobando..." }, language)
                        : t({ en: "Submit", hi: "सबमिट", es: "Enviar" }, language)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="mt-4">
            <Card className="bg-card border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">
                  {t({ en: "Completion Rewards", hi: "पूर्णता पुरस्कार", es: "Recompensas de finalización" }, language)}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t(
                    {
                      en: "Earn badges as you progress. Passing this mission unlocks the next adventure.",
                      hi: "जैसे-जैसे आगे बढ़ें, बैज कमाएँ। यह मिशन पास करने पर अगला एडवेंचर अनलॉक होगा।",
                      es: "Gana insignias a medida que avanzas. Al aprobar esta misión, se desbloquea la siguiente aventura.",
                    },
                    language
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn("size-12 rounded-full flex items-center justify-center",
                    chapterStates[activeChapterIdx]?.completed ? "bg-[--color-success-soft]" : "bg-secondary"
                  )}>
                    <GraduationCap className={cn("size-6",
                      chapterStates[activeChapterIdx]?.completed ? "text-[--color-success]" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{t(activeChapter.reward.title, language)}</p>
                    <p className="text-xs text-muted-foreground truncate">{t(activeChapter.reward.description, language)}</p>
                    <div className="mt-1">
                      <Badge className="rounded-full" variant="secondary">
                        {chapterStates[activeChapterIdx]?.completed
                          ? t({ en: "Unlocked", hi: "अनलॉक", es: "Desbloqueado" }, language)
                          : t({ en: "Locked", hi: "लॉक", es: "Bloqueado" }, language)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {t({ en: "Next mission", hi: "अगला मिशन", es: "Siguiente misión" }, language)}
                    </span>
                    <SquareArrowDownRight className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      disabled={!chapterStates[activeChapterIdx]?.completed}
                      onClick={() => {
                        const nextIdx = activeChapterIdx + 1;
                        if (nextIdx < activeModule.chapters.length) {
                          setActiveChapterIdx(nextIdx);
                          setCurrentTab("learn");
                        }
                      }}
                    >
                      {t({ en: "Continue", hi: "जारी रखें", es: "Continuar" }, language)}
                    </Button>
                    <Button variant="secondary" onClick={() => setCurrentTab("quiz")}>
                      {t({ en: "Retake Quiz", hi: "क्विज़ दोहराएँ", es: "Repetir cuestionario" }, language)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}