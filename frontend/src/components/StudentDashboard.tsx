"use client";

import * as React from "react";
import { toast } from "sonner";
import { LayoutDashboard } from "lucide-react";
// filepath: c:\Users\ishwa\Desktop\Learnquest\LearnQuest-1\frontend\src\components\StudentDashboard.tsx
import {
  BookOpenCheck,
  ChartSpline,
  Gauge,
  GraduationCap,
  Crown,
  MonitorPlay,
  CircleDashed,
  ChartBar,
  Grid3x3,
  BookUser,
  SquareMenu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Badge = {
  id: string;
  name: string;
  description?: string;
  tone?: "success" | "info" | "warning" | "brand";
};

type Lesson = {
  id: string;
  title: string;
  subject?: string;
  progress: number; // 0-100
};

type Mission = {
  id: string;
  name: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  progress: number; // 0-100
};

type Challenge = {
  id: string;
  type: "daily" | "weekly";
  title: string;
  progress: number; // 0-100
  completed?: boolean;
};

export interface StudentDashboardProps {
  className?: string;
  style?: React.CSSProperties;
  studentName?: string;
  level?: number;
  xp?: number;
  nextLevelXp?: number;
  leaderboard?: {
    rank: number;
    classRank?: number;
    schoolRank?: number;
    points?: number;
  };
  badges?: Badge[];
  lessons?: Lesson[];
  missions?: Mission[];
  challenges?: Challenge[];
  offline?: {
    isSynced: boolean;
    lastSync?: string;
    downloadedCount?: number;
  };
  onOpenLesson?: (lessonId: string) => void;
  onOpenMission?: (missionId: string) => void;
  onNavigate?: (route: "ai-tutor" | "progress" | "settings") => void;
  onSync?: () => Promise<void> | void;
}

function getBadgeToneClasses(tone: Badge["tone"] | undefined) {
  switch (tone) {
    case "success":
      return "bg-[var(--color-success-soft)] text-[var(--color-success)]";
    case "warning":
      return "bg-[var(--color-badge-new-bg)] text-[var(--color-badge-new-text)]";
    case "brand":
      return "bg-[var(--color-brand-soft)] text-[var(--color-brand)]";
    case "info":
    default:
      return "bg-accent text-accent-foreground";
  }
}

function initialsFrom(text: string) {
  const parts = text.split(" ").filter(Boolean);
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join("") || "U";
}

const FallbackData: Required<
  Pick<
    StudentDashboardProps,
    | "studentName"
    | "level"
    | "xp"
    | "nextLevelXp"
    | "leaderboard"
    | "badges"
    | "lessons"
    | "missions"
    | "challenges"
    | "offline"
  >
> = {
  studentName: "Explorer",
  level: 5,
  xp: 320,
  nextLevelXp: 500,
  leaderboard: { rank: 12, classRank: 2, schoolRank: 24, points: 1840 },
  badges: [
    { id: "b1", name: "Quick Learner", description: "Completed 3 lessons", tone: "success" },
    { id: "b2", name: "Streak x7", description: "7-day streak", tone: "brand" },
    { id: "b3", name: "Team Helper", description: "Helped a friend", tone: "info" },
    { id: "b4", name: "Math Ace", description: "Mastered Fractions", tone: "warning" },
  ],
  lessons: [
    { id: "l1", title: "Fractions and Decimals", subject: "Math", progress: 60 },
    { id: "l2", title: "Reading: Folk Tales", subject: "English", progress: 35 },
  ],
  missions: [
    { id: "m1", name: "The River Riddle", difficulty: "Medium", progress: 40 },
    { id: "m2", name: "Solar Quest", difficulty: "Easy", progress: 10 },
  ],
  challenges: [
    { id: "c1", type: "daily", title: "Answer 5 practice questions", progress: 80 },
    { id: "c2", type: "weekly", title: "Finish 3 lessons", progress: 33 },
  ],
  offline: { isSynced: true, lastSync: "2h ago", downloadedCount: 6 },
};

export default function StudentDashboard(props: StudentDashboardProps) {
  const {
    className,
    style,
    studentName = FallbackData.studentName,
    level = FallbackData.level,
    xp = FallbackData.xp,
    nextLevelXp = FallbackData.nextLevelXp,
    leaderboard = FallbackData.leaderboard,
    badges = FallbackData.badges,
    lessons = FallbackData.lessons,
    missions = FallbackData.missions,
    challenges = FallbackData.challenges,
    offline = FallbackData.offline,
    onOpenLesson,
    onOpenMission,
    onNavigate,
    onSync,
  } = props;

  const xpPct = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  const [syncLoading, setSyncLoading] = React.useState(false);

  async function handleSync() {
    try {
      setSyncLoading(true);
      if (onSync) {
        await onSync();
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      toast.success("Synced successfully", {
        description: "Your progress is up to date.",
      });
    } catch {
      toast.error("Sync failed", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSyncLoading(false);
    }
  }

  return (
    <section
      className={cn(
        "w-full max-w-full bg-background",
        "text-foreground",
        className
      )}
      style={style}
      aria-label="Student learning dashboard"
    >
      <div className="flex w-full flex-col gap-4">
        {/* Greeting + Quick Nav + Offline Status */}
        <Card className="bg-card">
          <CardHeader className="gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-xl sm:text-2xl">
                Welcome back, {studentName}
              </CardTitle>
              <CardDescription className="mt-1">
                Your learning journey continues. Keep up the great work!
              </CardDescription>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                    "bg-secondary text-sm text-secondary-foreground"
                  )}
                  aria-live="polite"
                >
                  <CircleDashed className={cn(
                    "h-4 w-4",
                    offline.isSynced ? "text-[var(--color-success)]" : "text-muted-foreground"
                  )} aria-hidden="true" />
                  <span className="sr-only">Sync status:</span>
                  <span className="min-w-0 truncate">
                    {offline.isSynced ? "Synced" : "Offline - changes pending"}
                    {offline.lastSync ? ` • ${offline.lastSync}` : ""}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSync}
                  disabled={syncLoading}
                  aria-label="Sync now"
                >
                  {syncLoading ? (
                    <span className="flex items-center gap-2">
                      <CircleDashed className="h-4 w-4 animate-spin" />
                      Syncing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Sync
                    </span>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate?.("ai-tutor")}
                  aria-label="Open AI Tutor"
                >
                  <BookUser className="mr-2 h-4 w-4" />
                  AI Tutor
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate?.("progress")}
                  aria-label="View detailed progress"
                >
                  <ChartSpline className="mr-2 h-4 w-4" />
                  Progress
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate?.("settings")}
                  aria-label="Open settings"
                >
                  <SquareMenu className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Level + XP */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="col-span-1 rounded-xl bg-secondary p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">Level</p>
                  </div>
                  <UIBadge variant="secondary" className="rounded-full">
                    L{level}
                  </UIBadge>
                </div>
                <p className="mt-2 text-2xl font-semibold">Explorer</p>
                <p className="text-sm text-muted-foreground">Reach L{level + 1} at {nextLevelXp} XP</p>
              </div>
              <div className="col-span-1 sm:col-span-2 rounded-xl bg-card p-4 ring-1 ring-border">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ChartBar className="h-5 w-5" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">XP Progress</p>
                  </div>
                  <p className="text-sm font-medium">
                    {xp} / {nextLevelXp} XP
                  </p>
                </div>
                <div className="mt-2">
                  <Progress value={xpPct} aria-label="XP progress" />
                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {xpPct}% to next level
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missions / Lessons */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              <MonitorPlay className="h-5 w-5" aria-hidden="true" />
              Your Adventures
            </CardTitle>
            <CardDescription>
              Continue your missions and lessons. Small steps lead to big wins.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="missions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="missions" aria-label="Missions">
                  Missions
                </TabsTrigger>
                <TabsTrigger value="lessons" aria-label="Lessons">
                  Lessons
                </TabsTrigger>
              </TabsList>
              <TabsContent value="missions" className="mt-4">
                <div className="flex flex-col gap-3">
                  {missions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No missions yet.</p>
                  ) : (
                    missions.map((m) => {
                      const pct = Math.min(100, Math.max(0, m.progress));
                      return (
                        <div
                          key={m.id}
                          className={cn(
                            "flex items-center gap-4 rounded-xl p-4",
                            "bg-secondary"
                          )}
                        >
                          <div className="hidden sm:block">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-card font-medium">
                                {initialsFrom(m.name)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-medium">{m.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Difficulty: {m.difficulty ?? "Unknown"}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {pct}%
                              </span>
                            </div>
                            <div className="mt-2">
                              <Progress value={pct} aria-label={`${m.name} progress`} />
                            </div>
                          </div>
                          <div className="flex shrink-0">
                            <Button
                              size="sm"
                              onClick={() => onOpenMission?.(m.id)}
                              aria-label={`Open mission ${m.name}`}
                            >
                              <MonitorPlay className="mr-2 h-4 w-4" />
                              Play
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
              <TabsContent value="lessons" className="mt-4">
                <div className="flex flex-col gap-3">
                  {lessons.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No lessons yet.</p>
                  ) : (
                    lessons.map((l) => {
                      const pct = Math.min(100, Math.max(0, l.progress));
                      return (
                        <div
                          key={l.id}
                          className={cn(
                            "flex items-center gap-4 rounded-xl p-4",
                            "bg-secondary"
                          )}
                        >
                          <div className="hidden sm:block">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-card font-medium">
                                {initialsFrom(l.subject || l.title)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-medium">{l.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {l.subject ?? "Lesson"}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">{pct}%</span>
                            </div>
                            <div className="mt-2">
                              <Progress value={pct} aria-label={`${l.title} progress`} />
                            </div>
                          </div>
                          <div className="flex shrink-0">
                            <Button
                              size="sm"
                              onClick={() => onOpenLesson?.(l.id)}
                              aria-label={`Open lesson ${l.title}`}
                            >
                              <BookOpenCheck className="mr-2 h-4 w-4" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Achievements + Badges + Leaderboard + Downloads */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Achievements / Challenges */}
          <Card className="md:col-span-2 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartSpline className="h-5 w-5" aria-hidden="true" />
                Challenges
              </CardTitle>
              <CardDescription>Daily and weekly goals to boost your XP.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {challenges.map((c) => {
                const pct = Math.min(100, Math.max(0, c.progress));
                const isDone = pct >= 100 || c.completed;
                return (
                  <div
                    key={c.id}
                    className={cn(
                      "rounded-xl p-4 ring-1 ring-border",
                      isDone ? "bg-[var(--color-success-soft)]" : "bg-secondary"
                    )}
                    role="group"
                    aria-label={`${c.type} challenge: ${c.title}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <UIBadge
                            variant="secondary"
                            className={cn(
                              "rounded-full text-[0.7rem]",
                              c.type === "daily" ? "bg-brand/10" : "bg-accent"
                            )}
                          >
                            {c.type === "daily" ? "Daily" : "Weekly"}
                          </UIBadge>
                          <p className="truncate font-medium">{c.title}</p>
                        </div>
                        <div className="mt-2">
                          <Progress
                            value={pct}
                            aria-label={`${c.title} progress`}
                          />
                          <div className="mt-1 text-xs text-muted-foreground">
                            {pct}% complete
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0">
                        <Button
                          size="sm"
                          variant={isDone ? "default" : "outline"}
                          disabled={isDone}
                          onClick={() =>
                            toast.message(isDone ? "Challenge completed!" : "Keep going!", {
                              description: isDone
                                ? "XP added to your account."
                                : "Finish tasks to claim rewards.",
                            })
                          }
                          aria-label={isDone ? "Challenge completed" : "View challenge"}
                        >
                          {isDone ? "Completed" : "View"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="md:col-span-1 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" aria-hidden="true" />
                Leaderboard
              </CardTitle>
              <CardDescription>See your standing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-secondary p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                  <UIBadge variant="secondary" className="rounded-full">
                    #{leaderboard.rank}
                  </UIBadge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-card p-3 ring-1 ring-border">
                    <p className="text-xs text-muted-foreground">Class</p>
                    <p className="text-lg font-semibold">#{leaderboard.classRank ?? "-"}</p>
                  </div>
                  <div className="rounded-lg bg-card p-3 ring-1 ring-border">
                    <p className="text-xs text-muted-foreground">School</p>
                    <p className="text-lg font-semibold">#{leaderboard.schoolRank ?? "-"}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Points: <span className="font-medium text-foreground">{leaderboard.points ?? 0}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Badges</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast.message("Badges", { description: "More badges coming soon." })
                    }
                    aria-label="View all badges"
                  >
                    View all
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {badges.slice(0, 8).map((b) => (
                    <div
                      key={b.id}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg p-2 text-center",
                        "ring-1 ring-border",
                        getBadgeToneClasses(b.tone)
                      )}
                      title={b.description}
                    >
                      <span className="line-clamp-2 text-xs font-medium leading-tight">
                        {b.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Downloads / Availability */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5" aria-hidden="true" />
              Downloads & Availability
            </CardTitle>
            <CardDescription>
              Access your content even without internet.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Downloaded items</p>
              <p className="mt-1 text-2xl font-semibold">{offline.downloadedCount ?? 0}</p>
              <p className="text-xs text-muted-foreground">Lessons and missions available offline</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Storage status</p>
              <p className="mt-1 text-2xl font-semibold">OK</p>
              <p className="text-xs text-muted-foreground">Sufficient space for new content</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Tips</p>
              <p className="mt-1 text-sm">
                Download lessons when connected. Keep syncing to save progress.
              </p>
              <div className="mt-2">
                <Button size="sm" variant="outline" onClick={handleSync}>
                  <Gauge className="mr-2 h-4 w-4" />
                  Sync now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation Footer */}
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-secondary p-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <LayoutIcon />
            <div>
              <p className="font-medium">Keep the streak alive</p>
              <p className="text-sm text-muted-foreground">
                Learn a little every day. Your future self will thank you.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onNavigate?.("ai-tutor")} aria-label="Start with AI Tutor">
              <BookUser className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("progress")} aria-label="Open progress">
              <ChartSpline className="mr-2 h-4 w-4" />
              View Progress
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Decorative minimal icon cluster using only allowed icons.
 * Provides subtle visual flair without extra deps.
 */
function LayoutIcon() {
  return (
    <div
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-card ring-1 ring-border"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-xl" />
      <div className="relative flex items-center justify-center">
        <LayoutDashboard className="h-4 w-4 opacity-70" />
      </div>
    </div>
  );
}