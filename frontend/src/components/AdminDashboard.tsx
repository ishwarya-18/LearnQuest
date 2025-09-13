"use client";

import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  UserRoundCog,
  GraduationCap,
  School,
  MonitorCheck,
  MonitorCog,
  Workflow,
  SquareActivity,
  Terminal,
  ChartSpline,
  UserCog,
  Logs,
  University,
  Cog,
  PanelsLeftBottom,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

type AdminDashboardProps = {
  className?: string;
};

type Role = "student" | "teacher" | "admin";
type UserStatus = "active" | "pending" | "suspended";

type UserRow = {
  id: string;
  name: string;
  role: Role;
  school: string;
  status: UserStatus;
  lastActive: string;
};

type ContentItem = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  school: string;
  version: number;
  status: "pending" | "approved" | "changes_requested";
  submittedAt: string;
};

function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "neutral",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  delta?: { value: string; direction: "up" | "down" | "flat" };
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const toneClasses =
    tone === "success"
      ? "bg-success-soft text-success"
      : tone === "warning"
      ? "bg-amber-100 text-amber-800"
      : tone === "danger"
      ? "bg-destructive/10 text-destructive"
      : "bg-muted text-foreground/80";
  return (
    <Card className="bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs", toneClasses)}>
          <Icon className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
          Status
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && (
          <p className="text-xs text-muted-foreground">
            {delta.direction === "up" ? "▲" : delta.direction === "down" ? "▼" : "■"} {delta.value} vs last period
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function HealthPill({
  label,
  state,
}: {
  label: string;
  state: "ok" | "degraded" | "down";
}) {
  const map = {
    ok: { bg: "bg-success-soft", dot: "bg-success", text: "text-success" },
    degraded: { bg: "bg-amber-100", dot: "bg-amber-500", text: "text-amber-800" },
    down: { bg: "bg-destructive/10", dot: "bg-destructive", text: "text-destructive" },
  } as const;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm",
        map[state].bg,
        map[state].text
      )}
      role="status"
      aria-label={`${label} ${state}`}
    >
      <span className={cn("h-2 w-2 rounded-full", map[state].dot)} />
      <span className="min-w-0">{label}</span>
    </div>
  );
}

const initialUsers: UserRow[] = [
  { id: "u-001", name: "Aisha Khan", role: "teacher", school: "Green Valley High", status: "active", lastActive: "2h ago" },
  { id: "u-002", name: "Ravi Patel", role: "student", school: "Sunrise Primary", status: "active", lastActive: "5m ago" },
  { id: "u-003", name: "Grace Liu", role: "admin", school: "District HQ", status: "active", lastActive: "1d ago" },
  { id: "u-004", name: "Samuel Okoro", role: "teacher", school: "Riverbank Secondary", status: "pending", lastActive: "—" },
  { id: "u-005", name: "Fatima Noor", role: "student", school: "Sunrise Primary", status: "suspended", lastActive: "3d ago" },
];

const approvalQueue: ContentItem[] = [
  { id: "c-101", title: "Intro to Fractions", subject: "Mathematics", teacher: "Aisha Khan", school: "Green Valley High", version: 3, status: "pending", submittedAt: "2025-09-10" },
  { id: "c-102", title: "Solar System Basics", subject: "Science", teacher: "Ravi Patel", school: "Sunrise Primary", version: 1, status: "pending", submittedAt: "2025-09-09" },
  { id: "c-103", title: "Local History: Trade Routes", subject: "Social Studies", teacher: "Samuel Okoro", school: "Riverbank Secondary", version: 2, status: "changes_requested", submittedAt: "2025-09-11" },
];

export default function AdminDashboard({ className }: AdminDashboardProps) {
  // Users state
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [schoolFilter, setSchoolFilter] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const allSchools = useMemo(() => {
    const s = Array.from(new Set(users.map((u) => u.school)));
    return ["District HQ", ...s.filter((x) => x !== "District HQ")];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
      const matchesSchool = schoolFilter === "all" ? true : u.school === schoolFilter;
      const matchesQuery =
        query.trim().length === 0
          ? true
          : `${u.name} ${u.school} ${u.role} ${u.status}`.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesSchool && matchesQuery;
    });
  }, [users, roleFilter, schoolFilter, query]);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(new Set(filteredUsers.map((u) => u.id)));
    } else {
      setSelectedUserIds(new Set());
    }
  };
  const toggleOne = (id: string, checked: boolean) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  // Content state
  const [queue, setQueue] = useState<ContentItem[]>(approvalQueue);
  const [versionDialogItem, setVersionDialogItem] = useState<ContentItem | null>(null);

  // System config
  const [maintenance, setMaintenance] = useState(false);
  const [offlineSync, setOfflineSync] = useState(true);
  const [retention, setRetention] = useState<"30" | "90" | "180" | "365">("180");

  const selectedCount = selectedUserIds.size;

  const assignRoleBulk = (role: Role) => {
    if (!selectedCount) {
      toast.message("No users selected", { description: "Select one or more users to assign a role." });
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (selectedUserIds.has(u.id) ? { ...u, role } : u))
    );
    toast.success(`Assigned role "${role}" to ${selectedCount} user${selectedCount > 1 ? "s" : ""}.`);
    setSelectedUserIds(new Set());
  };

  const bulkDeactivate = () => {
    if (!selectedCount) {
      toast.message("No users selected", { description: "Select one or more users to deactivate." });
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (selectedUserIds.has(u.id) ? { ...u, status: "suspended" } as UserRow : u))
    );
    toast.success(`Deactivated ${selectedCount} user${selectedCount > 1 ? "s" : ""}.`);
    setSelectedUserIds(new Set());
  };

  const bulkResetPassword = () => {
    if (!selectedCount) {
      toast.message("No users selected", { description: "Select users to send reset links." });
      return;
    }
    toast.success(`Password reset links sent to ${selectedCount} user${selectedCount > 1 ? "s" : ""}.`);
    setSelectedUserIds(new Set());
  };

  const approveContent = (id: string) => {
    setQueue((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
    toast.success("Content approved");
  };
  const requestChanges = (id: string) => {
    setQueue((prev) => prev.map((c) => (c.id === id ? { ...c, status: "changes_requested" } : c)));
    toast.message("Requested changes", { description: "The teacher will be notified." });
  };

  const exportData = (kind: "users" | "content" | "analytics", period: string) => {
    toast.info("Export started", {
      description: `Preparing ${kind} data for ${period}. You'll receive a download shortly.`,
    });
  };

  return (
    <section className={cn("w-full max-w-full", className)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            Admin Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            System-wide oversight and management for LearnQuest.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-card"
            onClick={() => exportData("analytics", "last-30-days")}
            aria-label="Export analytics"
          >
            <Terminal className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary text-primary-foreground hover:opacity-90">
            <Cog className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="overview" className="min-w-[120px]">
            <PanelsLeftBottom className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="min-w-[120px]">
            <UserRoundCog className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="min-w-[120px]">
            <Workflow className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="reports" className="min-w-[120px]">
            <ChartSpline className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="system" className="min-w-[120px]">
            <MonitorCog className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard
              icon={MonitorCheck}
              label="Uptime (30d)"
              value="99.97%"
              delta={{ value: "+0.02%", direction: "up" }}
              tone="success"
            />
            <MetricCard
              icon={SquareActivity}
              label="Active Users"
              value="12,430"
              delta={{ value: "+4.6%", direction: "up" }}
              tone="neutral"
            />
            <MetricCard
              icon={ChartSpline}
              label="Avg. Session (min)"
              value="18.2"
              delta={{ value: "-1.1%", direction: "down" }}
              tone="warning"
            />
            <MetricCard
              icon={Terminal}
              label="API P95 Latency"
              value="412ms"
              delta={{ value: "-7.8%", direction: "up" }}
              tone="success"
            />
          </div>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Platform Health</CardTitle>
              <CardDescription>Subsystem status and performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <HealthPill label="Auth" state="ok" />
                  <HealthPill label="DB" state="ok" />
                  <HealthPill label="Storage" state="degraded" />
                  <HealthPill label="Realtime" state="ok" />
                  <HealthPill label="CDN" state="ok" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Resource Utilization</Label>
                  <div className="rounded-lg border border-border p-3">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>CPU</span>
                      <span>62%</span>
                    </div>
                    <Progress id="capacity" value={62} aria-label="CPU utilization" />
                    <div className="mt-3 mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Memory</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} aria-label="Memory utilization" />
                  </div>
                </div>
              </div>
              <div className="space-y-3 min-w-0">
                <Label>User Engagement</Label>
                <div className="rounded-lg border border-border p-3">
                  <div className="mb-3 text-sm text-muted-foreground">
                    Past 7 days completion distribution
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[48, 52, 60, 44, 70, 66, 58].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className="w-full max-w-[20px] rounded-md bg-accent"
                          style={{ height: `${Math.max(8, h / 1.2)}px` }}
                          aria-label={`Day ${i + 1} completion`}
                        />
                        <span className="text-[10px] text-muted-foreground">D{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Content Approval SLA</span>
                    <span>92% under 48h</span>
                  </div>
                  <Progress value={92} aria-label="SLA compliance" />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Recent Audit Logs</Label>
                <div className="rounded-lg border border-border divide-y">
                  {[
                    { id: "l1", text: "Approved content c-101 by Aisha Khan", icon: Logs },
                    { id: "l2", text: "Assigned role admin to u-003", icon: UserCog },
                    { id: "l3", text: "Exported usage report (30d)", icon: Terminal },
                  ].map((log) => (
                    <div key={log.id} className="flex items-center gap-3 p-3">
                      <log.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm break-words">{log.text}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-card">
                  <Logs className="mr-2 h-4 w-4" />
                  View full audit trail
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="mt-6 space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <University className="h-4 w-4" />
                User Management
              </CardTitle>
              <CardDescription>Bulk operations, role assignment, and filters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="user-search" className="sr-only">Search users</Label>
                  <Input
                    id="user-search"
                    placeholder="Search by name, school, role, or status"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-card"
                  />
                </div>
                <div className="grid grid-cols-2 sm:flex gap-3">
                  <div className="min-w-[180px]">
                    <Label className="mb-1 block text-xs text-muted-foreground">Role</Label>
                    <Select onValueChange={(v) => setRoleFilter(v as Role | "all")} defaultValue="all">
                      <SelectTrigger className="bg-card">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="min-w-[200px]">
                    <Label className="mb-1 block text-xs text-muted-foreground">School</Label>
                    <Select onValueChange={(v) => setSchoolFilter(v as string | "all")} defaultValue="all">
                      <SelectTrigger className="bg-card">
                        <SelectValue placeholder="Filter by school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {allSchools.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-card">
                        <UserCog className="mr-2 h-4 w-4" />
                        Bulk actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>{selectedCount} selected</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => assignRoleBulk("student")}>
                        Assign role: Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => assignRoleBulk("teacher")}>
                        Assign role: Teacher
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => assignRoleBulk("admin")}>
                        Assign role: Admin
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={bulkDeactivate}>Deactivate</DropdownMenuItem>
                      <DropdownMenuItem onClick={bulkResetPassword}>Reset password</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    onClick={() => exportData("users", "current-filters")}
                    className="bg-primary text-primary-foreground hover:opacity-90"
                  >
                    <Terminal className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-10">
                        <Checkbox
                          aria-label="Select all"
                          checked={
                            filteredUsers.length > 0 &&
                            selectedCount === filteredUsers.length
                          }
                          onCheckedChange={(c) => toggleAll(Boolean(c))}
                        />
                      </TableHead>
                      <TableHead className="min-w-0">Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last active</TableHead>
                      <TableHead className="w-[1%]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.id} className="hover:bg-muted/40">
                        <TableCell>
                          <Checkbox
                            aria-label={`Select ${u.name}`}
                            checked={selectedUserIds.has(u.id)}
                            onCheckedChange={(c) => toggleOne(u.id, Boolean(c))}
                          />
                        </TableCell>
                        <TableCell className="min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-8 w-8 shrink-0 rounded-full bg-accent flex items-center justify-center">
                              {u.role === "student" ? (
                                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                              ) : u.role === "teacher" ? (
                                <School className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <UserRoundCog className="h-4 w-4" aria-hidden="true" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-medium">{u.name}</div>
                              <div className="text-xs text-muted-foreground break-words">{u.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{u.role}</TableCell>
                        <TableCell className="min-w-0">
                          <span className="truncate block">{u.school}</span>
                        </TableCell>
                        <TableCell>
                          {u.status === "active" && <Badge className="bg-success-soft text-success">Active</Badge>}
                          {u.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                          {u.status === "suspended" && (
                            <Badge className="bg-destructive/10 text-destructive">Suspended</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.lastActive}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" aria-label={`Manage ${u.name}`}>
                                <PanelsLeftBottom className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => assignRoleBulk("student")}>
                                Set role: Student
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => assignRoleBulk("teacher")}>
                                Set role: Teacher
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => assignRoleBulk("admin")}>
                                Set role: Admin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast.message("Password reset sent")}>
                                Send reset link
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setUsers((prev) =>
                                    prev.map((x) => (x.id === u.id ? { ...x, status: "suspended" } : x))
                                  );
                                  toast.success(`Deactivated ${u.name}`);
                                }}
                              >
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                          No users match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="mt-6 space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Workflow className="h-4 w-4" />
                Content Approval
              </CardTitle>
              <CardDescription>Review, approve, and track versions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[1%]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queue.map((c) => (
                      <TableRow key={c.id} className="hover:bg-muted/40">
                        <TableCell className="min-w-0">
                          <div className="min-w-0">
                            <div className="truncate font-medium">{c.title}</div>
                            <div className="text-xs text-muted-foreground break-words">{c.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{c.subject}</TableCell>
                        <TableCell>{c.teacher}</TableCell>
                        <TableCell>{c.school}</TableCell>
                        <TableCell>v{c.version}</TableCell>
                        <TableCell>
                          {c.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                          {c.status === "approved" && (
                            <Badge className="bg-success-soft text-success">Approved</Badge>
                          )}
                          {c.status === "changes_requested" && (
                            <Badge className="bg-amber-100 text-amber-800">Changes requested</Badge>
                          )}
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-card">
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Review “{c.title}”</DialogTitle>
                                <DialogDescription>
                                  Submitted {c.submittedAt} • {c.subject} • v{c.version}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 text-sm">
                                <div className="rounded-lg border border-border p-3">
                                  <p className="font-medium mb-1">Quality checklist</p>
                                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Curriculum-aligned objectives</li>
                                    <li>Language clarity and inclusivity</li>
                                    <li>Offline-friendly assets</li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-border p-3">
                                  <p className="font-medium mb-1">Version notes</p>
                                  <p className="text-muted-foreground">
                                    Improved examples and added practice questions. Optimized images for low bandwidth.
                                  </p>
                                </div>
                              </div>
                              <DialogFooter className="gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => requestChanges(c.id)}
                                  className="bg-card"
                                >
                                  Request changes
                                </Button>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => approveContent(c.id)}
                                    className="bg-primary text-primary-foreground hover:opacity-90"
                                  >
                                    Approve
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setVersionDialogItem(c)}
                            aria-label={`View versions for ${c.title}`}
                          >
                            Versions
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {queue.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                          No content items in the queue.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={!!versionDialogItem} onOpenChange={(o) => !o && setVersionDialogItem(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Version history</DialogTitle>
                <DialogDescription>
                  {versionDialogItem?.title} • {versionDialogItem?.subject}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {[...(Array(versionDialogItem?.version ?? 1).keys())]
                  .map((i) => (versionDialogItem?.version ?? 1) - i)
                  .map((v) => (
                    <div key={v} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Version v{v}</span>
                        {v === versionDialogItem?.version ? (
                          <Badge variant="secondary">Current</Badge>
                        ) : (
                          <Badge>Past</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Change log for v{v}: Minor revisions and corrections.
                      </p>
                    </div>
                  ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-card">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="mt-6 space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <ChartSpline className="h-4 w-4" />
                Reporting & Analytics
              </CardTitle>
              <CardDescription>Generate insights and export data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Report type</Label>
                  <Select defaultValue="usage">
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usage">Usage statistics</SelectItem>
                      <SelectItem value="outcomes">Educational outcomes</SelectItem>
                      <SelectItem value="impact">Impact assessment</SelectItem>
                      <SelectItem value="compliance">Compliance report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Timeframe</Label>
                  <Select defaultValue="30d">
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="ytd">Year to date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Format</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Choose format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="bg-card"
                  onClick={() => exportData("analytics", "last-30-days")}
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:opacity-90"
                  onClick={() => toast.success("Report generated")}
                >
                  Generate report
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-base">Engagement trend</CardTitle>
                    <CardDescription>Weekly active learners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2 h-32">
                      {[12, 14, 16, 18, 17, 19, 22, 21, 24, 26, 25, 28].map((v, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-md bg-accent transition-transform hover:scale-[1.02]"
                          style={{ height: `${v * 3}px` }}
                          aria-label={`Week ${i + 1} value ${v}k`}
                          title={`Week ${i + 1}: ${v}k`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-base">Outcome summary</CardTitle>
                    <CardDescription>Assessment pass rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Math</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} aria-label="Math pass rate" />
                      <div className="flex items-center justify-between text-sm">
                        <span>Science</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} aria-label="Science pass rate" />
                      <div className="flex items-center justify-between text-sm">
                        <span>Language</span>
                        <span>74%</span>
                      </div>
                      <Progress value={74} aria-label="Language pass rate" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="mt-6 space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <MonitorCog className="h-4 w-4" />
                System Configuration & Health
              </CardTitle>
              <CardDescription>Operational controls and monitoring</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance mode</p>
                      <p className="text-sm text-muted-foreground">Temporarily disable new sessions</p>
                    </div>
                    <Switch checked={maintenance} onCheckedChange={setMaintenance} aria-label="Toggle maintenance mode" />
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Offline sync</p>
                      <p className="text-sm text-muted-foreground">Background refresh on mobile</p>
                    </div>
                    <Switch checked={offlineSync} onCheckedChange={setOfflineSync} aria-label="Toggle offline sync" />
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <Label className="mb-1 block text-xs text-muted-foreground">Data retention</Label>
                  <Select value={retention} onValueChange={(v) => setRetention(v as typeof retention)}>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Choose retention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">365 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Applies to logs and transient analytics. Current: {retention} days.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="font-medium mb-2">Scalability</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-muted-foreground">Queue depth</p>
                      <p className="text-lg font-semibold">134</p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-muted-foreground">Workers online</p>
                      <p className="text-lg font-semibold">24</p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-muted-foreground">Job latency</p>
                      <p className="text-lg font-semibold">1.8s</p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-muted-foreground">Error rate</p>
                      <p className="text-lg font-semibold">0.3%</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="font-medium mb-2">Compliance</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">FERPA</Badge>
                    <Badge variant="secondary">COPPA</Badge>
                    <Badge className="bg-success-soft text-success">GDPR</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="bg-card"
                      onClick={() => exportData("analytics", "compliance")}
                    >
                      <Terminal className="mr-2 h-4 w-4" />
                      Export compliance report
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="font-medium mb-2">Recent system activity</p>
                  <div className="divide-y">
                    {[
                      "Maintenance window scheduled for 22:00 UTC",
                      "New school onboarded: Hillcrest Elementary",
                      "Policy update: Retention extended to 180 days",
                    ].map((t, i) => (
                      <div key={i} className="flex items-start gap-3 py-3">
                        <SquareActivity className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm break-words">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="font-medium mb-2">Support tools</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="bg-card" onClick={() => toast.message("Impersonation started")}>
                      <UserRoundCog className="mr-2 h-4 w-4" />
                      Impersonate user
                    </Button>
                    <Button variant="outline" className="bg-card" onClick={() => toast.message("Cache cleared")}>
                      <MonitorCheck className="mr-2 h-4 w-4" />
                      Clear cache
                    </Button>
                    <Button variant="outline" className="bg-card" onClick={() => toast.message("Diagnostics sent")}>
                      <Terminal className="mr-2 h-4 w-4" />
                      Send diagnostics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}