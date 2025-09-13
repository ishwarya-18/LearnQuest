"use client";

import * as React from "react";
import AuthenticationFlow from "@/components/AuthenticationFlow";
import TeacherDashboard from "@/components/TeacherDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import LearningModules from "@/components/LearningModules";
import AITutorAssistant from "@/components/AITutorAssistant";
import SettingsAndSupport from "@/components/SettingsAndSupport";

type Role = "student" | "teacher" | "admin";
type AuthUser = {
  name: string;
  grade?: string;
  language: string;
  avatarUrl?: string;
};

type NavKey =
  | "student:modules"
  | "student:tutor"
  | "student:settings"
  | "teacher:dashboard"
  | "teacher:settings"
  | "admin:dashboard"
  | "admin:settings";

export default function Page() {
  const [role, setRole] = React.useState<Role | null>(null);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [nav, setNav] = React.useState<NavKey | null>(null);

  function handleAuthComplete(payload: {
    role: Role;
    authMode: "login" | "signup";
    method: "phone" | "email";
    user: AuthUser;
    contact: { phone?: string; email?: string };
  }) {
    setRole(payload.role);
    setUser(payload.user);
    if (payload.role === "student") setNav("student:modules");
    if (payload.role === "teacher") setNav("teacher:dashboard");
    if (payload.role === "admin") setNav("admin:dashboard");
  }

  function resetSession() {
    setRole(null);
    setUser(null);
    setNav(null);
  }

  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b border-border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <span className="text-sm font-bold">LQ</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-5">LearnQuest</p>
              <p className="truncate text-xs text-muted-foreground leading-4">
                Gamified learning for rural education
              </p>
            </div>
          </div>

          {role && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                <span className="font-medium capitalize">{role}</span>
                {user?.name ? <span className="text-muted-foreground">• {user.name}</span> : null}
              </span>
              <button
                type="button"
                onClick={resetSession}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent"
                aria-label="Sign out"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Role-aware app navigation */}
        {role && nav && (
          <nav className="border-t border-border">
            <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
              {role === "student" && (
                <>
                  <NavButton
                    active={nav === "student:modules"}
                    onClick={() => setNav("student:modules")}
                    label="Missions"
                  />
                  <NavButton
                    active={nav === "student:tutor"}
                    onClick={() => setNav("student:tutor")}
                    label="AI Tutor"
                  />
                  <NavButton
                    active={nav === "student:settings"}
                    onClick={() => setNav("student:settings")}
                    label="Settings"
                  />
                </>
              )}
              {role === "teacher" && (
                <>
                  <NavButton
                    active={nav === "teacher:dashboard"}
                    onClick={() => setNav("teacher:dashboard")}
                    label="Dashboard"
                  />
                  <NavButton
                    active={nav === "teacher:settings"}
                    onClick={() => setNav("teacher:settings")}
                    label="Settings"
                  />
                </>
              )}
              {role === "admin" && (
                <>
                  <NavButton
                    active={nav === "admin:dashboard"}
                    onClick={() => setNav("admin:dashboard")}
                    label="Dashboard"
                  />
                  <NavButton
                    active={nav === "admin:settings"}
                    onClick={() => setNav("admin:settings")}
                    label="Settings"
                  />
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {!role || !nav ? (
          <div className="grid gap-6 md:grid-cols-5">
            <div className="order-2 md:order-1 md:col-span-3">
              <AuthenticationFlow
                className="w-full"
                defaultMode="signup"
                onComplete={handleAuthComplete}
              />
            </div>
            <aside className="order-1 md:order-2 md:col-span-2">
              <HeroPanel />
            </aside>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Student app views */}
            {role === "student" && user && (
              <>
                {nav === "student:modules" && (
                  <LearningModules
                    className="w-full"
                    initialLanguage={(user.language as any) || "en"}
                  />
                )}
                {nav === "student:tutor" && (
                  <AITutorAssistant
                    className="w-full"
                    studentName={user.name}
                    initialLanguage={user.language || "en"}
                    progress={{ level: "beginner", weakAreas: ["fractions"] }}
                  />
                )}
                {nav === "student:settings" && (
                  <SettingsAndSupport
                    className="w-full"
                    defaultLanguage={(user.language as any) || "en"}
                    initialSync={{ offlineMode: true, autoSyncOnWifi: true, dataSaver: true }}
                    initialAccessibility={{ reduceMotion: true, captions: true }}
                    onLanguageChange={() => {}}
                  />
                )}
              </>
            )}

            {/* Teacher app views */}
            {role === "teacher" && (
              <>
                {nav === "teacher:dashboard" && <TeacherDashboard className="w-full" />}
                {nav === "teacher:settings" && (
                  <SettingsAndSupport
                    className="w-full"
                    defaultLanguage={(user?.language as any) || "en"}
                    initialNotifications={{ weeklyDigest: true, reminders: true }}
                  />
                )}
              </>
            )}

            {/* Admin app views */}
            {role === "admin" && (
              <>
                {nav === "admin:dashboard" && <AdminDashboard className="w-full" />}
                {nav === "admin:settings" && (
                  <SettingsAndSupport
                    className="w-full"
                    defaultLanguage={(user?.language as any) || "en"}
                    initialPrivacy={{ analyticsSharing: false }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LearnQuest. Empowering rural learners.
          </p>
          {!role && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Accessible • Offline-first • Multilingual</span>
            </div>
          )}
        </div>
      </footer>
    </main>
  );
}

function NavButton({
  active,
  onClick,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1.5 text-sm font-medium",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-foreground hover:bg-accent",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

function HeroPanel() {
  return (
    <section className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-3">
        <h1 className="text-xl font-bold">Welcome to LearnQuest</h1>
        <p className="text-sm text-muted-foreground">
          A lightweight, gamified platform designed for low-cost Android devices. Choose your role to begin.
        </p>
      </div>
      <ul className="space-y-3 text-sm">
        <li className="rounded-xl border border-border bg-secondary p-3">
          <p className="font-medium">Students</p>
          <p className="text-muted-foreground">
            Learn with quests, earn badges, and track your progress. Works offline with sync.
          </p>
        </li>
        <li className="rounded-xl border border-border bg-secondary p-3">
          <p className="font-medium">Teachers</p>
          <p className="text-muted-foreground">
            Manage classes, assignments, and analytics with simple, reliable tools.
          </p>
        </li>
        <li className="rounded-xl border border-border bg-secondary p-3">
          <p className="font-medium">Admins</p>
          <p className="text-muted-foreground">
            Oversee users, content approvals, and system health from one place.
          </p>
        </li>
      </ul>
      <div className="mt-4 rounded-xl border border-dashed border-border p-3">
        <p className="text-xs text-muted-foreground">
          Tip: Enable Data Saver and Offline mode for best experience on slow networks.
        </p>
      </div>
    </section>
  );
}