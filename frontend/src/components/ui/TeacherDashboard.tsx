"use client";

import * as React from "react";
import {
  GraduationCap,
  ChartBar,
  ChartSpline,
  Workflow,
  SquareDashedKanban,
  ChartNoAxesGantt,
  BookAlert,
  MonitorCheck,
  PanelsLeftBottom,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Student = {
  id: string;
  name: string;
  progress: number; // 0-100
  attendanceRate: number; // 0-100
  lastActiveDays: number;
  risk: "low" | "medium" | "high";
  language: string;
  points: number; // for leaderboard
};

type TeacherDashboardProps = {
  className?: string;
  style?: React.CSSProperties;
  classLabel?: string;
  languages?: string[];
  students?: Student[];
};

const defaultStudents: Student[] = [
  {
    id: "st_001",
    name: "Asha Devi",
    progress: 76,
    attendanceRate: 92,
    lastActiveDays: 1,
    risk: "low",
    language: "hi",
    points: 1280,
  },
  {
    id: "st_002",
    name: "Ravi Kumar",
    progress: 54,
    attendanceRate: 68,
    lastActiveDays: 6,
    risk: "medium",
    language: "en",
    points: 960,
  },
  {
    id: "st_003",
    name: "Meera N",
    progress: 88,
    attendanceRate: 98,
    lastActiveDays: 0,
    risk: "low",
    language: "ta",
    points: 1520,
  },
  {
    id: "st_004",
    name: "Sanjay Patel",
    progress: 39,
    attendanceRate: 57,
    lastActiveDays: 10,
    risk: "high",
    language: "gu",
    points: 740,
  },
  {
    id: "st_005",
    name: "Pooja Sharma",
    progress: 63,
    attendanceRate: 85,
    lastActiveDays: 2,
    risk: "low",
    language: "hi",
    points: 1100,
  },
];

const defaultLanguages = ["en", "hi", "ta", "te", "bn", "mr", "gu"];

export default function TeacherDashboard({
  className,
  style,
  classLabel = "Class 8A - Maths",
  languages = defaultLanguages,
  students: providedStudents,
}: TeacherDashboardProps) {
  const [langFilter, setLangFilter] = React.useState<string | undefined>(undefined);
  const [search, setSearch] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [lessonDialogOpen, setLessonDialogOpen] = React.useState(false);
  const [quizDialogOpen, setQuizDialogOpen] = React.useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);

  const students = React.useMemo<Student[]>(
    () => (providedStudents && providedStudents.length ? providedStudents : defaultStudents),
    [providedStudents]
  );

  const filtered = React.useMemo(() => {
    return students.filter((s) => {
      const matchesLang = langFilter ? s.language === langFilter : true;
      const matchesSearch = search
        ? s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesLang && matchesSearch;
    });
  }, [students, langFilter, search]);

  const attendanceToday = React.useMemo(() => {
    // Mock: present if lastActiveDays <= 1 and attendanceRate > 60
    const present = students.filter((s) => s.lastActiveDays <= 1 && s.attendanceRate > 60).length;
    return {
      present,
      total: students.length,
      rate: Math.round((present / Math.max(students.length, 1)) * 100),
    };
  }, [students]);

  const avgProgress = React.useMemo(
    () => Math.round(students.reduce((sum, s) => sum + s.progress, 0) / Math.max(students.length, 1)),
    [students]
  );

  const riskBreakdown = React.useMemo(() => {
    const high = students.filter((s) => s.risk === "high");
    const medium = students.filter((s) => s.risk === "medium");
    const low = students.filter((s) => s.risk === "low");
    return { high, medium, low };
  }, [students]);

  const leaderboard = React.useMemo(
    () => [...students].sort((a, b) => b.points - a.points).slice(0, 5),
    [students]
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllVisible() {
    setSelectedIds(new Set(filtered.map((s) => s.id)));
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function bulkMessage() {
    if (selectedIds.size === 0) {
      toast.message("No students selected", { description: "Select one or more students to send a message." });
      return;
    }
    toast.success("Message sent", { description: `Sent to ${selectedIds.size} selected student(s).` });
  }

  function exportCSV() {
    const rows = [
      ["ID", "Name", "Progress", "Attendance", "Last Active (days)", "Risk", "Language", "Points"],
      ...filtered.map((s) => [
        s.id,
        s.name,
        `${s.progress}`,
        `${s.attendanceRate}`,
        `${s.lastActiveDays}`,
        s.risk,
        s.language,
        `${s.points}`,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "learnquest_class_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Export started", { description: "Your progress report CSV is downloading." });
  }

  function riskColor(risk: Student["risk"]) {
    if (risk === "high") return "bg-destructive/10 text-destructive";
    if (risk === "medium") return "bg-amber-100 text-amber-900";
    return "bg-success-soft text-success";
  }

  return (
    <section
      className={cn(
        "w-full max-w-full bg-background text-foreground",
        "rounded-none",
        className
      )}
      style={style}
      aria-label="Teacher dashboard"
    >
      <div className="w-full max-w-full space-y-4">
        <HeaderBar
          classLabel={classLabel}
          attendanceRate={attendanceToday.rate}
          avgProgress={avgProgress}
          riskHigh={riskBreakdown.high.length}
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview" className="data-[state=active]:bg-card">
              <PanelsLeftBottom className="size-4 mr-2" aria-hidden />
              Overview
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-card">
              <MonitorCheck className="size-4 mr-2" aria-hidden />
              Management
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-card">
              <SquareDashedKanban className="size-4 mr-2" aria-hidden />
              Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-card">
              <ChartBar className="size-4 mr-2" aria-hidden />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="communications" className="data-[state=active]:bg-card">
              <Workflow className="size-4 mr-2" aria-hidden />
              Comms
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-card">
              <ChartNoAxesGantt className="size-4 mr-2" aria-hidden />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Average Progress</CardTitle>
                  <CardDescription className="text-muted-foreground">Across all students</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{avgProgress}%</div>
                    <ChartMini values={[30, 45, 55, 50, 60, 70, 76]} color="var(--chart-3)" />
                  </div>
                  <Progress value={avgProgress} className="mt-3" aria-label="Average progress bar" />
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Attendance Today</CardTitle>
                  <CardDescription className="text-muted-foreground">{attendanceToday.present}/{attendanceToday.total} present</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{attendanceToday.rate}%</div>
                    <ChartMini values={[70, 72, 68, 80, 84, 86, attendanceToday.rate]} color="var(--chart-2)" />
                  </div>
                  <Progress value={attendanceToday.rate} className="mt-3" aria-label="Attendance bar" />
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Dropout Risk</CardTitle>
                  <CardDescription className="text-muted-foreground">AI alerts</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("rounded-full px-2.5 py-1 text-xs", riskColor("high"))}>
                      High: {riskBreakdown.high.length}
                    </Badge>
                    <Badge className={cn("rounded-full px-2.5 py-1 text-xs", riskColor("medium"))}>
                      Medium: {riskBreakdown.medium.length}
                    </Badge>
                    <Badge className={cn("rounded-full px-2.5 py-1 text-xs", riskColor("low"))}>
                      Low: {riskBreakdown.low.length}
                    </Badge>
                  </div>
                  <Separator />
                  <ul className="space-y-2">
                    {riskBreakdown.high.slice(0, 2).map((s) => (
                      <li key={s.id} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{s.name}</p>
                          <p className="text-xs text-muted-foreground">Low activity • {s.attendanceRate}% attendance</p>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            toast.warning("High risk insight", {
                              description: `Recommend parent call for ${s.name}. Offer catch-up quiz and short video lesson.`,
                            })
                          }
                        >
                          <BookAlert className="size-4 mr-2" aria-hidden />
                          Insights
                        </Button>
                      </li>
                    ))}
                    {riskBreakdown.high.length === 0 && (
                      <li className="text-sm text-muted-foreground">No high-risk students detected.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Student Progress & Attendance</CardTitle>
                <CardDescription>Track individual progress, manage attendance, and perform bulk actions.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                  <div className="flex flex-1 items-center gap-2 min-w-0">
                    <div className="w-full max-w-xs">
                      <Label htmlFor="student-search" className="sr-only">Search students</Label>
                      <Input
                        id="student-search"
                        placeholder="Search by name or ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <Select onValueChange={(v) => setLangFilter(v)} value={langFilter}>
                      <SelectTrigger className="w-[160px] bg-background">
                        <SelectValue placeholder="All languages" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((code) => (
                          <SelectItem key={code} value={code}>
                            {code.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary">Bulk actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={selectAllVisible}>Select all visible</DropdownMenuItem>
                        <DropdownMenuItem onClick={clearSelection}>Clear selection</DropdownMenuItem>
                        <DropdownMenuItem onClick={bulkMessage}>Message selected</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.info("Assign practice set", { description: "Assigned to selected students." })}
                        >
                          Assign practice set
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={exportCSV} variant="default">
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border border-border overflow-hidden">
                  <div className="grid grid-cols-12 bg-secondary px-3 py-2 text-sm font-medium">
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                      <div className="w-6 flex justify-center">
                        <Checkbox
                          aria-label="Select all"
                          checked={selectedIds.size > 0 && selectedIds.size === filtered.length}
                          onCheckedChange={(v) => (v ? selectAllVisible() : clearSelection())}
                        />
                      </div>
                      <span className="truncate">Student</span>
                    </div>
                    <div className="col-span-3 sm:col-span-3">Progress</div>
                    <div className="col-span-2 sm:col-span-2">Attendance</div>
                    <div className="col-span-2 sm:col-span-2">Risk</div>
                    <div className="hidden sm:block sm:col-span-1 text-right pr-2">More</div>
                  </div>

                  <ul className="divide-y divide-border">
                    {filtered.map((s) => (
                      <li key={s.id} className="grid grid-cols-12 items-center gap-2 px-3 py-3">
                        <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0">
                          <div className="w-6 flex justify-center">
                            <Checkbox
                              aria-label={`Select ${s.name}`}
                              checked={selectedIds.has(s.id)}
                              onCheckedChange={() => toggleSelect(s.id)}
                            />
                          </div>
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-accent text-foreground">
                              {initials(s.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{s.name}</p>
                            <p className="text-xs text-muted-foreground break-words">ID: {s.id}</p>
                          </div>
                        </div>

                        <div className="col-span-3 sm:col-span-3">
                          <div className="flex items-center gap-2">
                            <Progress value={s.progress} className="flex-1" aria-label={`${s.name} progress`} />
                            <span className="text-sm font-medium w-10 text-right">{s.progress}%</span>
                          </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                          <span className="text-sm">{s.attendanceRate}%</span>
                          <p className="text-xs text-muted-foreground">Last active: {s.lastActiveDays}d</p>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                          <Badge className={cn("rounded-full px-2.5 py-1 text-xs", riskColor(s.risk))}>
                            {capitalize(s.risk)}
                          </Badge>
                        </div>

                        <div className="hidden sm:flex sm:col-span-1 justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="More actions">
                                <PanelsLeftBottom className="size-4" aria-hidden />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.message("Attendance updated", { description: `Marked present for ${s.name}.` })
                                }
                              >
                                Mark present today
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.info("Assigned remedial lesson", {
                                    description: `Short video + 5-question quiz assigned to ${s.name}.`,
                                  })
                                }
                              >
                                Assign remedial lesson
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.warning("Notify parent", { description: `Parent notified for ${s.name}.` })
                                }
                              >
                                Notify parent
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </li>
                    ))}
                    {filtered.length === 0 && (
                      <li className="px-3 py-6 text-sm text-muted-foreground">No students found.</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Class Leaderboard</CardTitle>
                  <CardDescription>Top performers based on points</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {leaderboard.map((s, idx) => (
                      <li key={s.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-secondary text-foreground grid place-items-center text-xs font-semibold">
                            {idx + 1}
                          </div>
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-accent text-foreground">{initials(s.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{s.name}</p>
                            <p className="text-xs text-muted-foreground">Lang: {s.language.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{s.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Snapshot</CardTitle>
                  <CardDescription>Recent quiz and assignment performance</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <StatTile
                      icon={<GraduationCap className="size-4" aria-hidden />}
                      label="Avg Quiz Score"
                      value="72%"
                      trend={[50, 55, 60, 68, 70, 72]}
                      color="var(--chart-4)"
                    />
                    <StatTile
                      icon={<ChartSpline className="size-4" aria-hidden />}
                      label="Assignments On-Time"
                      value="81%"
                      trend={[70, 75, 73, 76, 78, 81]}
                      color="var(--chart-2)"
                    />
                    <StatTile
                      icon={<MonitorCheck className="size-4" aria-hidden />}
                      label="Practice Completion"
                      value="64%"
                      trend={[40, 48, 55, 58, 61, 64]}
                      color="var(--chart-5)"
                    />
                    <StatTile
                      icon={<BookAlert className="size-4" aria-hidden />}
                      label="Flagged Submissions"
                      value="3"
                      trend={[5, 4, 3, 3, 2, 3]}
                      color="var(--chart-1)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Attendance Management</CardTitle>
                <CardDescription>Quickly mark attendance and view status.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 pb-3">
                  <Button
                    variant="secondary"
                    onClick={() => toast.success("Marked all present")}
                  >
                    Mark all present
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toast.message("Attendance cleared", { description: "You can now mark individually." })}
                  >
                    Clear today
                  </Button>
                </div>
                <div className="rounded-md border border-border overflow-hidden">
                  <div className="grid grid-cols-12 bg-secondary px-3 py-2 text-sm font-medium">
                    <div className="col-span-6 sm:col-span-6">Student</div>
                    <div className="col-span-3 sm:col-span-3">Status</div>
                    <div className="col-span-3 sm:col-span-3">Action</div>
                  </div>
                  <ul className="divide-y divide-border">
                    {students.map((s) => {
                      const present = s.lastActiveDays <= 1 && s.attendanceRate > 60;
                      return (
                        <li key={s.id} className="grid grid-cols-12 items-center gap-2 px-3 py-3">
                          <div className="col-span-6 sm:col-span-6 min-w-0">
                            <p className="text-sm font-medium truncate">{s.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {s.id}</p>
                          </div>
                          <div className="col-span-3 sm:col-span-3">
                            <Badge className={cn("rounded-full px-2.5 py-1 text-xs", present ? "bg-success-soft text-success" : "bg-destructive/10 text-destructive")}>
                              {present ? "Present" : "Absent"}
                            </Badge>
                          </div>
                          <div className="col-span-3 sm:col-span-3">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => toast.success("Attendance updated", { description: `Toggled ${s.name}.` })}
                            >
                              Toggle
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Dropout Risk Alerts</CardTitle>
                <CardDescription>Review high-risk students and take action.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {riskBreakdown.high.length === 0 && (
                  <p className="text-sm text-muted-foreground">No high-risk alerts at this time.</p>
                )}
                {riskBreakdown.high.map((s) => (
                  <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border p-3">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Signals: low attendance, {s.lastActiveDays} days inactive, progress {s.progress}%
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.warning("Parent call recommended", { description: `Call scheduled for ${s.name}.` })}
                      >
                        Schedule parent call
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => toast.info("Support plan assigned", { description: `Assigned catch-up plan to ${s.name}.` })}
                      >
                        Assign support plan
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Content Management</CardTitle>
                <CardDescription>Upload lessons, create quizzes, and story-based tasks with multi-language support.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Upload lesson</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Upload lesson</DialogTitle>
                        <DialogDescription>Provide a title, attach file, and select language(s).</DialogDescription>
                      </DialogHeader>
                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setLessonDialogOpen(false);
                          toast.success("Lesson uploaded", { description: "Lesson submitted for approval." });
                        }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="lesson-title">Title</Label>
                          <Input id="lesson-title" placeholder="e.g., Fractions Basics" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lesson-file">File</Label>
                          <Input id="lesson-file" type="file" />
                        </div>
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Choose language" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="secondary" onClick={() => setLessonDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Submit for approval</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Create quiz</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>New quiz</DialogTitle>
                        <DialogDescription>Build a quick assessment for your class.</DialogDescription>
                      </DialogHeader>
                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setQuizDialogOpen(false);
                          toast.success("Quiz created", { description: "Quiz sent for approval workflow." });
                        }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="quiz-title">Title</Label>
                          <Input id="quiz-title" placeholder="e.g., Fractions Checkpoint" />
                        </div>
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Choose language" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quiz-desc">Instructions</Label>
                          <Textarea id="quiz-desc" placeholder="Add short instructions..." />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="secondary" onClick={() => setQuizDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Create</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <SquareDashedKanban className="size-4 mr-2" aria-hidden />
                      Create story-based task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Story-based task</DialogTitle>
                      <DialogDescription>Design a narrative task to reinforce concepts.</DialogDescription>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setTaskDialogOpen(false);
                        toast.success("Task created", { description: "Task submitted for approval." });
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="task-title">Title</Label>
                          <Input id="task-title" placeholder="e.g., Journey through Fractions" />
                        </div>
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Choose language" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-prompt">Story prompt</Label>
                        <Textarea id="task-prompt" placeholder="Write the story context and objectives..." rows={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-criteria">Evaluation criteria</Label>
                        <Input id="task-criteria" placeholder="e.g., creativity, accuracy, completeness" />
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setTaskDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Create task</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Card className="bg-secondary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Approval Workflow</CardTitle>
                    <CardDescription>Track items pending approval.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">Fractions Basics (Lesson)</p>
                          <p className="text-xs text-muted-foreground">Language: EN • Submitted 2h ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-100 text-amber-900 rounded-full px-2.5 py-1 text-xs">Pending</Badge>
                          <Button size="sm" variant="ghost" onClick={() => toast.info("Approval nudged")}>Nudge</Button>
                        </div>
                      </li>
                      <li className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">Fractions Checkpoint (Quiz)</p>
                          <p className="text-xs text-muted-foreground">Language: HI • Submitted yesterday</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-success-soft text-success rounded-full px-2.5 py-1 text-xs">Approved</Badge>
                          <Button size="sm" variant="secondary" onClick={() => toast.success("Published", { description: "Quiz published to class." })}>Publish</Button>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Performance Analytics</CardTitle>
                <CardDescription>View trends and deep-dive into class performance.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <AnalyticsPanel
                    title="Weekly Progress Trend"
                    subtitle="Avg completion per week"
                    color="var(--chart-3)"
                    values={[40, 45, 50, 58, 62, 68, 72]}
                  />
                  <AnalyticsPanel
                    title="Attendance Trend"
                    subtitle="Daily presence"
                    color="var(--chart-2)"
                    values={[80, 76, 84, 82, 86, 88, 90]}
                  />
                  <AnalyticsPanel
                    title="Quiz Performance"
                    subtitle="Average score"
                    color="var(--chart-4)"
                    values={[60, 62, 64, 66, 70, 72, 74]}
                  />
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold text-base">Result Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Identify concepts where students struggle the most.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { label: "Fractions", score: 64 },
                      { label: "Decimals", score: 72 },
                      { label: "Ratios", score: 58 },
                      { label: "Algebra Basics", score: 70 },
                      { label: "Geometry", score: 61 },
                      { label: "Measurement", score: 77 },
                    ].map((i) => (
                      <div key={i.label} className="flex items-center gap-3">
                        <div className="min-w-[110px] text-sm">{i.label}</div>
                        <Progress value={i.score} className="flex-1" aria-label={`${i.label} average`} />
                        <div className="w-10 text-right text-sm font-medium">{i.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Student Engagement</CardTitle>
                <CardDescription>Post announcements and send reminders.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="announcement">Announcement</Label>
                  <Textarea id="announcement" placeholder="Share an update with your class..." rows={3} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => toast.success("Announcement posted", { description: "Your class has been notified." })}
                  >
                    Post to class
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toast.message("Reminder scheduled", { description: "A reminder will be sent tomorrow at 9am." })}
                  >
                    Schedule reminder
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Parent Updates</CardTitle>
                <CardDescription>Send progress updates to parents/guardians.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All students</SelectItem>
                      <SelectItem value="low-progress">Low progress (&lt; 50%)</SelectItem>
                      <SelectItem value="high-risk">High risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((code) => (
                        <SelectItem key={code} value={code}>
                          {code.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-message">Message</Label>
                  <Textarea id="parent-message" placeholder="Write a concise update..." rows={4} />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="include-report" />
                  <Label htmlFor="include-report">Include latest progress report</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => toast.success("Update sent", { description: "Parents have been notified." })}>
                    Send update
                  </Button>
                  <Button variant="secondary" onClick={() => toast.info("Draft saved")}>Save draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Export & Reports</CardTitle>
                <CardDescription>Download class performance and attendance data.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <ReportTile
                    title="Progress report"
                    description="Per-student progress and trends"
                    onExport={exportCSV}
                  />
                  <ReportTile
                    title="Attendance log"
                    description="Daily attendance records"
                    onExport={() => toast.success("Attendance export", { description: "CSV will download shortly." })}
                  />
                  <ReportTile
                    title="Assessment results"
                    description="Quiz and assignment scores"
                    onExport={() => toast.success("Results export", { description: "CSV will download shortly." })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || "").concat(parts[1]?.[0] || "").toUpperCase();
}

function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

function HeaderBar({
  classLabel,
  attendanceRate,
  avgProgress,
  riskHigh,
}: {
  classLabel: string;
  attendanceRate: number;
  avgProgress: number;
  riskHigh: number;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-full rounded-xl bg-card border border-border px-4 py-4",
        "flex flex-col gap-4"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{classLabel}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage classroom, monitor progress, and streamline communication.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            <MonitorCheck className="size-4 mr-1.5" aria-hidden />
            Attendance {attendanceRate}%
          </Badge>
          <Badge className="rounded-full px-3 py-1 bg-success-soft text-success">
            <ChartBar className="size-4 mr-1.5" aria-hidden />
            Avg Progress {avgProgress}%
          </Badge>
          <Badge className={cn("rounded-full px-3 py-1", riskHigh > 0 ? "bg-destructive/10 text-destructive" : "bg-secondary")}>
            <BookAlert className="size-4 mr-1.5" aria-hidden />
            {riskHigh} High-risk
          </Badge>
        </div>
      </div>
    </div>
  );
}

function ChartMini({
  values,
  color = "var(--chart-3)",
}: {
  values: number[];
  color?: string;
}) {
  // Simple normalized sparkline
  const width = 100;
  const height = 40;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const norm = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * width;
    const y = height - ((v - min) / Math.max(max - min, 1)) * height;
    return `${x},${y}`;
  });
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
      aria-hidden
      role="img"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={norm.join(" ")}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatTile({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: number[];
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border p-3 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {icon}
          {label}
        </div>
        <div className="text-base font-semibold">{value}</div>
      </div>
      <div className="mt-2">
        <ChartMini values={trend} color={color} />
      </div>
    </div>
  );
}

function AnalyticsPanel({
  title,
  subtitle,
  values,
  color,
}: {
  title: string;
  subtitle: string;
  values: number[];
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-base">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ChartSpline className="size-5 text-foreground/70" aria-hidden />
      </div>
      <div className="mt-3">
        <ChartMini values={values} color={color} />
      </div>
    </div>
  );
}

function ReportTile({
  title,
  description,
  onExport,
}: {
  title: string;
  description: string;
  onExport: () => void;
}) {
  return (
    <div className="rounded-lg border border-border p-4 bg-background flex flex-col justify-between">
      <div>
        <h4 className="font-semibold text-base">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-3">
        <Button onClick={onExport}>
          <ChartNoAxesGantt className="size-4 mr-2" aria-hidden />
          Export CSV
        </Button>
      </div>
    </div>
  );
}