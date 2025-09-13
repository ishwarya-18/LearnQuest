"use client";

import * as React from "react";
import {
  Languages,
  UserRoundCog,
  Accessibility as AccessibilityIcon,
  Speech,
  CircleQuestionMark,
  LaptopMinimal,
  Monitor,
  Settings2,
  MessageCircleQuestionMark,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type LanguageCode =
  | "en"
  | "hi"
  | "bn"
  | "te"
  | "mr"
  | "ta"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as";

type NotificationPrefs = {
  email: boolean;
  sms: boolean;
  push: boolean;
  weeklyDigest: boolean;
  reminders: boolean;
};

type AccessibilityPrefs = {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  captions: boolean;
  screenReaderHints: boolean;
};

type SyncPrefs = {
  offlineMode: boolean;
  autoSyncOnWifi: boolean;
  dataSaver: boolean;
};

type PrivacyPrefs = {
  profileVisibility: "everyone" | "classmates" | "only-me";
  analyticsSharing: boolean;
  contentFiltering: boolean;
};

type SettingsAndSupportProps = {
  className?: string;
  style?: React.CSSProperties;
  defaultLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  onProfileSave?: (data: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  }) => void;
  onPasswordChange?: (data: { current: string; next: string }) => void;
  onContactSubmit?: (data: {
    category: "technical" | "billing" | "feedback" | "other";
    message: string;
  }) => void;
  initialNotifications?: Partial<NotificationPrefs>;
  initialAccessibility?: Partial<AccessibilityPrefs>;
  initialSync?: Partial<SyncPrefs>;
  initialPrivacy?: Partial<PrivacyPrefs>;
};

const languageOptions: Array<{ code: LanguageCode; label: string; native: string }> = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
];

const faqItems = [
  {
    q: "How do I use LearnQuest without internet?",
    a: "Enable Offline Mode in Preferences. Lessons and quizzes you open will be stored on your device and sync automatically when Wi‑Fi is available.",
    tags: ["offline", "sync", "rural"],
  },
  {
    q: "Why are videos not playing on my device?",
    a: "Check Device Compatibility in Troubleshooting. Try lowering video quality in Preferences > Accessibility (Reduce Motion). If issues persist, contact Support.",
    tags: ["video", "device", "compatibility"],
  },
  {
    q: "How can I change my language?",
    a: "Go to Preferences and select your preferred language. The interface updates immediately.",
    tags: ["language", "ui"],
  },
  {
    q: "How do I reset my password?",
    a: "Under Profile > Security, enter your current password and set a new one that meets strength requirements.",
    tags: ["password", "security"],
  },
  {
    q: "I have slow connectivity in my village. What can I do?",
    a: "Turn on Data Saver and Auto Sync on Wi‑Fi only. Use text mode lessons and download content when you have connectivity.",
    tags: ["rural", "connectivity", "slow"],
  },
];

export default function SettingsAndSupport({
  className,
  style,
  defaultLanguage = "en",
  onLanguageChange,
  onProfileSave,
  onPasswordChange,
  onContactSubmit,
  initialNotifications,
  initialAccessibility,
  initialSync,
  initialPrivacy,
}: SettingsAndSupportProps) {
  const [language, setLanguage] = React.useState<LanguageCode>(defaultLanguage);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
  );
  const [avatarObjectUrl, setAvatarObjectUrl] = React.useState<string | null>(null);

  const [notif, setNotif] = React.useState<NotificationPrefs>({
    email: !!initialNotifications?.email,
    sms: !!initialNotifications?.sms,
    push: initialNotifications?.push ?? true,
    weeklyDigest: initialNotifications?.weeklyDigest ?? true,
    reminders: initialNotifications?.reminders ?? true,
  });

  const [a11y, setA11y] = React.useState<AccessibilityPrefs>({
    highContrast: !!initialAccessibility?.highContrast,
    largeText: !!initialAccessibility?.largeText,
    reduceMotion: !!initialAccessibility?.reduceMotion,
    captions: initialAccessibility?.captions ?? true,
    screenReaderHints: initialAccessibility?.screenReaderHints ?? true,
  });

  const [sync, setSync] = React.useState<SyncPrefs>({
    offlineMode: initialSync?.offlineMode ?? true,
    autoSyncOnWifi: initialSync?.autoSyncOnWifi ?? true,
    dataSaver: initialSync?.dataSaver ?? true,
  });

  const [privacy, setPrivacy] = React.useState<PrivacyPrefs>({
    profileVisibility: initialPrivacy?.profileVisibility ?? "classmates",
    analyticsSharing: initialPrivacy?.analyticsSharing ?? false,
    contentFiltering: initialPrivacy?.contentFiltering ?? true,
  });

  const [faqQuery, setFaqQuery] = React.useState<string>("");
  const [contactCategory, setContactCategory] = React.useState<"technical" | "billing" | "feedback" | "other" | undefined>();
  const [contactMessage, setContactMessage] = React.useState<string>("");

  const filteredFaqs = React.useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return faqItems;
    return faqItems.filter(
      (f) =>
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [faqQuery]);

  React.useEffect(() => {
    // Apply visual preferences that impact the component (e.g., large text)
    // Parent layouts should use tokens; here we only adjust a class.
    document.documentElement.style.setProperty(
      "--motion-safe",
      a11y.reduceMotion ? "no-preference" : "reduce"
    );
    // Cleanup avatar object URL on unmount
    return () => {
      if (avatarObjectUrl) {
        URL.revokeObjectURL(avatarObjectUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a11y.reduceMotion]);

  function handleLanguageChange(next: LanguageCode) {
    setLanguage(next);
    toast.success("Language updated", { description: "Your interface has been updated." });
    onLanguageChange?.(next);
  }

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const objUrl = URL.createObjectURL(file);
    if (avatarObjectUrl) URL.revokeObjectURL(avatarObjectUrl);
    setAvatarObjectUrl(objUrl);
    setAvatarUrl(objUrl);
  }

  function handleProfileSave() {
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    onProfileSave?.({ name: name.trim(), email: email.trim(), phone: phone.trim(), avatarUrl });
    toast.success("Profile updated", { description: "Your profile changes have been saved." });
  }

  function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const current = (form.elements.namedItem("currentPassword") as HTMLInputElement)?.value;
    const next = (form.elements.namedItem("newPassword") as HTMLInputElement)?.value;
    const confirm = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;

    if (!current || !next) {
      toast.error("Please complete all password fields.");
      return;
    }
    if (next.length < 8) {
      toast.error("Password too short", { description: "Use at least 8 characters." });
      return;
    }
    if (next !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    onPasswordChange?.({ current, next });
    toast.success("Password changed", { description: "Use your new password next time you sign in." });
    form.reset();
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactCategory || !contactMessage.trim()) {
      toast.error("Please select a category and enter your message.");
      return;
    }
    onContactSubmit?.({ category: contactCategory, message: contactMessage.trim() });
    toast.success("Message sent", { description: "Our team will get back to you shortly." });
    setContactCategory(undefined);
    setContactMessage("");
  }

  const labelMuted = "text-sm text-muted-foreground";
  const sectionTitle = "text-base sm:text-lg font-semibold";

  return (
    <section
      className={cn(
        "w-full max-w-full bg-card rounded-2xl border border-border p-4 sm:p-6 md:p-8 shadow-sm",
        className
      )}
      style={style}
      aria-label="Settings and Support"
    >
      <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <Settings2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Settings & Support</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your preferences, accessibility, privacy, and get help quickly.
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="profile" className="min-w-fit">
              <UserRoundCog className="mr-2 h-4 w-4" aria-hidden="true" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="min-w-fit">
              <Languages className="mr-2 h-4 w-4" aria-hidden="true" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications" className="min-w-fit">
              <Speech className="mr-2 h-4 w-4" aria-hidden="true" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="min-w-fit">
              <CircleQuestionMark className="mr-2 h-4 w-4" aria-hidden="true" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="min-w-fit">
              <AccessibilityIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="support" className="min-w-fit">
              <MessageCircleQuestionMark className="mr-2 h-4 w-4" aria-hidden="true" />
              Support
            </TabsTrigger>
            <TabsTrigger value="account" className="min-w-fit">
              <Monitor className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className={sectionTitle}>Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-xl">
                    <AvatarImage
                      src={avatarUrl}
                      alt={name ? `${name}'s avatar` : "User avatar"}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-xl">U</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className={labelMuted}>Avatar</p>
                    <div className="flex items-center gap-3 mt-2">
                      <label htmlFor="avatar-upload">
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarUpload}
                        />
                        <Button variant="secondary" size="sm" asChild={false} onClick={() => {
                          const el = document.getElementById("avatar-upload") as HTMLInputElement | null;
                          el?.click();
                        }}>
                          Change
                        </Button>
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAvatarUrl(undefined);
                          if (avatarObjectUrl) {
                            URL.revokeObjectURL(avatarObjectUrl);
                            setAvatarObjectUrl(null);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleProfileSave}>Save changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className={sectionTitle}>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" name="currentPassword" type="password" className="bg-background" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" name="newPassword" type="password" className="bg-background" />
                    <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" className="bg-background" />
                  </div>
                  <div className="sm:col-span-3 flex justify-end pt-2">
                    <Button type="submit">Update password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>Language & Region</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={language}
                    onValueChange={(v) => handleLanguageChange(v as LanguageCode)}
                  >
                    <SelectTrigger id="language" className="bg-background">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((opt) => (
                        <SelectItem key={opt.code} value={opt.code}>
                          {opt.label} — {opt.native}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Interface updates immediately after selection.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content-language">Content language preference</Label>
                  <Select
                    onValueChange={(v) => {
                      toast.message("Content language set", { description: v.toUpperCase() });
                    }}
                  >
                    <SelectTrigger id="content-language" className="bg-background">
                      <SelectValue placeholder="Follow interface" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((opt) => (
                        <SelectItem key={opt.code} value={opt.code}>
                          {opt.label} — {opt.native}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>Data & Sync</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <SettingRow
                  label="Offline mode"
                  description="Use LearnQuest without internet. Content is cached and syncs when online."
                  checked={sync.offlineMode}
                  onCheckedChange={(val) => setSync((s) => ({ ...s, offlineMode: val }))}
                />
                <SettingRow
                  label="Auto sync on Wi‑Fi"
                  description="Sync downloads and progress automatically on Wi‑Fi."
                  checked={sync.autoSyncOnWifi}
                  onCheckedChange={(val) => setSync((s) => ({ ...s, autoSyncOnWifi: val }))}
                />
                <SettingRow
                  label="Data saver"
                  description="Lower data usage by reducing media quality and prefetching."
                  checked={sync.dataSaver}
                  onCheckedChange={(val) => setSync((s) => ({ ...s, dataSaver: val }))}
                />
                <div className="flex justify-end pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => toast.success("Sync settings saved")}
                  >
                    Save sync settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className={sectionTitle}>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <SettingRow
                label="Email updates"
                description="Announcements, class updates, and progress reports."
                checked={notif.email}
                onCheckedChange={(val) => setNotif((n) => ({ ...n, email: val }))}
              />
              <SettingRow
                label="SMS alerts"
                description="Receive important alerts via text message."
                checked={notif.sms}
                onCheckedChange={(val) => setNotif((n) => ({ ...n, sms: val }))}
              />
              <SettingRow
                label="Push notifications"
                description="Real-time updates on assignments and achievements."
                checked={notif.push}
                onCheckedChange={(val) => setNotif((n) => ({ ...n, push: val }))}
              />
              <Separator />
              <SettingRow
                label="Weekly digest"
                description="Summary of your learning progress every week."
                checked={notif.weeklyDigest}
                onCheckedChange={(val) => setNotif((n) => ({ ...n, weeklyDigest: val }))}
              />
              <SettingRow
                label="Reminders"
                description="Reminders for due tasks and upcoming classes."
                checked={notif.reminders}
                onCheckedChange={(val) => setNotif((n) => ({ ...n, reminders: val }))}
              />
              <div className="flex justify-end pt-2">
                <Button onClick={() => toast.success("Notification preferences saved")}>
                  Save preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className={sectionTitle}>Privacy Controls</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="visibility">Profile visibility</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(v) =>
                    setPrivacy((p) => ({ ...p, profileVisibility: v as PrivacyPrefs["profileVisibility"] }))
                  }
                >
                  <SelectTrigger id="visibility" className="bg-background">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="classmates">Classmates</SelectItem>
                    <SelectItem value="only-me">Only me</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Control who can see your profile and achievements.
                </p>
              </div>
              <SettingRow
                label="Share anonymized analytics"
                description="Help us improve by sharing usage metrics without personal data."
                checked={privacy.analyticsSharing}
                onCheckedChange={(val) => setPrivacy((p) => ({ ...p, analyticsSharing: val }))}
              />
              <SettingRow
                label="Content filtering"
                description="Hide sensitive or distracting content where possible."
                checked={privacy.contentFiltering}
                onCheckedChange={(val) => setPrivacy((p) => ({ ...p, contentFiltering: val }))}
              />
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  onClick={() => toast.success("Privacy settings saved")}
                >
                  Save privacy settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className={sectionTitle}>Accessibility Options</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <SettingRow
                label="High contrast"
                description="Improve readability with higher contrast colors."
                checked={a11y.highContrast}
                onCheckedChange={(val) => setA11y((s) => ({ ...s, highContrast: val }))}
              />
              <SettingRow
                label="Large text"
                description="Increase text size for better legibility."
                checked={a11y.largeText}
                onCheckedChange={(val) => setA11y((s) => ({ ...s, largeText: val }))}
              />
              <SettingRow
                label="Reduce motion"
                description="Minimize animations and transitions."
                checked={a11y.reduceMotion}
                onCheckedChange={(val) => setA11y((s) => ({ ...s, reduceMotion: val }))}
              />
              <SettingRow
                label="Captions"
                description="Show captions for audio/video where available."
                checked={a11y.captions}
                onCheckedChange={(val) => setA11y((s) => ({ ...s, captions: val }))}
              />
              <SettingRow
                label="Screen reader hints"
                description="Provide additional descriptions for assistive tech."
                checked={a11y.screenReaderHints}
                onCheckedChange={(val) => setA11y((s) => ({ ...s, screenReaderHints: val }))}
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success("Accessibility preferences saved")}
                >
                  Save accessibility
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>Find Answers</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="faq-search" className="sr-only">Search help</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="faq-search"
                      placeholder="Search FAQs (e.g., offline, password, video)"
                      value={faqQuery}
                      onChange={(e) => setFaqQuery(e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const first = filteredFaqs[0];
                        if (first) {
                          toast.message("Top result", { description: first.q });
                        } else {
                          toast.message("No results", { description: "Try a different keyword." });
                        }
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((item, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed">{item.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>AI Chat Support</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <p className="text-sm text-muted-foreground">
                  Ask a quick question. Our assistant will guide you to the right resource.
                </p>
                <div className="grid gap-2">
                  <Label htmlFor="chat-question" className="sr-only">Your question</Label>
                  <Textarea
                    id="chat-question"
                    placeholder="Type your question here..."
                    className="bg-background min-h-24"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        toast.info("Sending to AI assistant…");
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => toast.info("Sending to AI assistant…")}
                  >
                    Ask
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={contactCategory}
                      onValueChange={(v) => setContactCategory(v as typeof contactCategory)}
                    >
                      <SelectTrigger id="category" className="bg-background">
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your issue or question"
                      className="bg-background min-h-28"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Send message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={sectionTitle}>Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LaptopMinimal className="h-4 w-4" aria-hidden="true" />
                    <h4 className="font-medium">Rural Connectivity Tips</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Enable Offline Mode and Data Saver in Preferences.</li>
                    <li>Download lessons when connected to Wi‑Fi (school or community center).</li>
                    <li>Prefer text-based lessons; reduce motion and media quality.</li>
                    <li>Sync progress during low-traffic hours (early morning/late night).</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="h-4 w-4" aria-hidden="true" />
                    <h4 className="font-medium">Device Compatibility</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Update your device OS and browser to the latest version available.</li>
                    <li>Enable storage permissions to allow content downloads.</li>
                    <li>If videos stutter, lower quality or use captions-only mode.</li>
                    <li>Clear app cache if UI feels slow; restart the app.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className={sectionTitle}>Account Management</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-sm text-muted-foreground">
                Manage your account and export or delete your data.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => toast.message("Export requested", { description: "We’ll email your data export." })}
                >
                  Export my data
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    toast.info("Sign out", { description: "You have been signed out on this device." })
                  }
                >
                  Sign out
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    toast("Confirm deletion", {
                      description: "Please contact support to permanently delete your account.",
                    })
                  }
                >
                  Delete account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function SettingRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-secondary/40">
      <div className="min-w-0">
        <p className="text-sm font-medium leading-6">{label}</p>
        {description ? (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        ) : null}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
    </div>
  );
}