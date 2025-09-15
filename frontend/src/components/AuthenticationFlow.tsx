"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  UserRoundPlus,
  LogIn,
  CircleUserRound,
  IdCard,
  KeyRound,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type Role = "student" | "teacher" | "admin"
type AuthMode = "login" | "signup"
type Method = "phone" | "email"

interface AuthenticationFlowProps {
  className?: string
  initialRole?: Role
  defaultMode?: AuthMode
  onComplete?: (payload: {
    role: Role
    authMode: AuthMode
    method: Method
    user: {
      name: string
      grade?: string
      language: string
      avatarUrl?: string
    }
    contact: { phone?: string; email?: string }
  }) => void
}

const avatarOptions: { id: string; url: string; alt: string }[] = [
  {
    id: "av1",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    alt: "Smiling student",
  },
  {
    id: "av2",
    url: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    alt: "Boy with backpack",
  },
  {
    id: "av3",
    url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop",
    alt: "Smiling teacher",
  },
  {
    id: "av4",
    url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop",
    alt: "Happy learner",
  },
  {
    id: "av5",
    url: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=300&auto=format&fit=crop",
    alt: "Man in blue jacket",
  },
  {
    id: "av6",
    url: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=300&auto=format&fit=crop",
    alt: "Young adult portrait",
  },
]

const grades = [
  { value: "grade-1", label: "Class 1" },
  { value: "grade-2", label: "Class 2" },
  { value: "grade-3", label: "Class 3" },
  { value: "grade-4", label: "Class 4" },
  { value: "grade-5", label: "Class 5" },
  { value: "grade-6", label: "Class 6" },
  { value: "grade-7", label: "Class 7" },
  { value: "grade-8", label: "Class 8" },
  { value: "grade-9", label: "Class 9" },
  { value: "grade-10", label: "Class 10" },
  { value: "grade-11", label: "Class 11" },
  { value: "grade-12", label: "Class 12" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "mr", label: "मराठी (Marathi)" },
]

type Step = "role" | "auth" | "verify" | "profile"

export default function AuthenticationFlow({
  className,
  initialRole = "student",
  defaultMode = "signup",
  onComplete,
}: AuthenticationFlowProps) {
  const [step, setStep] = React.useState<Step>("role")
  const [role, setRole] = React.useState<Role>(initialRole)
  const [authMode, setAuthMode] = React.useState<AuthMode>(defaultMode)
  const [method, setMethod] = React.useState<Method>("phone")

  // Contact info
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  // OTP
  const [otp, setOtp] = React.useState("")
  const [otpSent, setOtpSent] = React.useState(false)

  // Profile
  const [name, setName] = React.useState("")
  const [grade, setGrade] = React.useState<string | undefined>(undefined)
  const [language, setLanguage] = React.useState<string | undefined>(undefined)
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined)

  // UI states
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Reset downstream state when mode/method changes
    setError(null)
  }, [authMode, method])

  function validateContact(): boolean {
   if (method === "phone") {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.length !== 10) {
    setError("Please enter a valid 10-digit phone number.")
    return false
  }
  return true
} else {
      const isValid = /^\S+@\S+\.\S+$/.test(email)
      if (!isValid) {
        setError("Please enter a valid email address.")
        return false
      }
      if (authMode === "login" && password.length < 6) {
        setError("Password should be at least 6 characters.")
        return false
      }
      if (authMode === "signup" && password && password.length < 6) {
        setError("If you set a password, use at least 6 characters.")
        return false
      }
      return true
    }
  }

  function nextFromRole() {
    setStep("auth")
  }

  async function handleSendCode() {
    setError(null)
    if (!validateContact()) {
      toast.error("Fix the highlighted fields")
      return
    }
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
      setStep("verify")
      toast.success("OTP sent to your phone")
    }, 900)
  }

  async function handleVerify() {
    setError(null)
    if (method === "phone") {
      if (otp.replace(/\D/g, "").length !== 6) {
        setError("Enter the 6-digit code.")
        return
      }
    } else {
      if (authMode === "login") {
        // Email + password
        if (!validateContact()) return
      } else {
        // Email signup uses verification optional in this simplified flow
        if (!validateContact()) return
      }
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (authMode === "login") {
        // Login complete: skip profile if we pretend profile exists
        toast.success("Welcome back!")
        onComplete?.({
          role,
          authMode,
          method,
          user: {
            name: "Learner",
            language: language || "en",
            grade,
            avatarUrl: avatar,
          },
          contact: { phone, email },
        })
      } else {
        // Proceed to profile setup for signup
        setStep("profile")
        toast.success("Account created. Set up your profile.")
      }
    }, 900)
  }

  function handleEmailLogin() {
    setError(null)
    if (!validateContact()) {
      toast.error("Fix the highlighted fields")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Logged in successfully")
      onComplete?.({
        role,
        authMode: "login",
        method: "email",
        user: { name: "Learner", language: "en", grade, avatarUrl: avatar },
        contact: { email },
      })
    }, 900)
  }

  async function handleProfileComplete() {
    setError(null)
    if (!name.trim()) {
      setError("Please enter your full name.")
      return
    }
    if (role === "student" && !grade) {
      setError("Please select your class.")
      return
    }
    if (!language) {
      setError("Please choose your preferred language.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Profile saved")
      onComplete?.({
        role,
        authMode,
        method,
        user: {
          name: name.trim(),
          grade,
          language,
          avatarUrl: avatar,
        },
        contact: { phone, email },
      })
    }, 900)
  }

  function resetToStart() {
    setStep("role")
    setAuthMode(defaultMode)
    setMethod("phone")
    setPhone("")
    setEmail("")
    setPassword("")
    setOtp("")
    setOtpSent(false)
    setName("")
    setGrade(undefined)
    setLanguage(undefined)
    setAvatar(undefined)
    setError(null)
  }

  return (
    <section
      className={cn(
        "w-full max-w-full",
        "bg-card text-foreground rounded-2xl border border-border",
        "shadow-sm",
        "p-4 sm:p-6 md:p-8",
        className
      )}
      aria-label="Authentication flow"
    >
      <header className="mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
            {authMode === "signup" ? (
              <UserRoundPlus className="h-6 w-6" aria-hidden="true" />
            ) : (
              <LogIn className="h-6 w-6" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold truncate">
              {authMode === "signup" ? "Create your account" : "Welcome back"}
            </h3>
            <p className="text-sm text-muted-foreground">
              LearnQuest • Simple, secure sign in for rural education
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6">
        {/* Mode Switch */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">I want to</Label>
          <div className="inline-flex w-full overflow-hidden rounded-xl border border-border bg-secondary p-1">
            <button
              type="button"
              aria-pressed={authMode === "signup"}
              onClick={() => setAuthMode("signup")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition",
                authMode === "signup"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Create account
            </button>
            <button
              type="button"
              aria-pressed={authMode === "login"}
              onClick={() => setAuthMode("login")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition",
                authMode === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Step indicators */}
        <nav
          className="flex items-center gap-2"
          aria-label="Progress"
        >
          {["role", "auth", authMode === "login" ? "verify" : "verify", "profile"].map(
            (s, idx) => {
              const isActive =
                step === (s as Step) ||
                (step === "verify" && s === "auth" && method === "email" && authMode === "login")
              const isDone =
                ["auth", "verify", "profile"].indexOf(step) >= 0 &&
                ["role", "auth"].includes(s)
              const label =
                s === "role"
                  ? "Role"
                  : s === "auth"
                  ? "Contact"
                  : s === "verify"
                  ? method === "phone"
                    ? "OTP"
                    : "Password"
                  : "Profile"
              return (
                <div
                  key={s}
                  className={cn(
                    "flex items-center gap-2",
                    idx > 0 && "min-w-0"
                  )}
                >
                  {idx > 0 && (
                    <div className="h-[2px] w-4 sm:w-6 bg-border" aria-hidden="true" />
                  )}
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
                      isActive
                        ? "bg-accent border-border"
                        : isDone
                        ? "bg-secondary border-border"
                        : "bg-card border-border"
                    )}
                  >
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                </div>
              )
            }
          )}
        </nav>

        {/* Steps */}
        {step === "role" && (
          <div
            className="grid gap-4 animate-in fade-in-50"
            role="group"
            aria-labelledby="role-label"
          >
            <Label id="role-label" className="text-base font-semibold">
              Choose your role
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <RoleCard
                icon={<CircleUserRound className="h-7 w-7" aria-hidden="true" />}
                title="Student"
                description="Learn with quests and earn rewards"
                active={role === "student"}
                onClick={() => setRole("student")}
                ariaLabel="Select Student role"
              />
              <RoleCard
                icon={<IdCard className="h-7 w-7" aria-hidden="true" />}
                title="Teacher"
                description="Manage classes and track progress"
                active={role === "teacher"}
                onClick={() => setRole("teacher")}
                ariaLabel="Select Teacher role"
              />
              <RoleCard
                icon={<User className="h-7 w-7" aria-hidden="true" />}
                title="Admin"
                description="Oversee content and users"
                active={role === "admin"}
                onClick={() => setRole("admin")}
                ariaLabel="Select Admin role"
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-sm text-muted-foreground">
                You can change role later if needed.
              </p>
              <Button
                onClick={nextFromRole}
                className="min-w-[120px]"
                aria-label="Continue to contact step"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === "auth" && (
          <div className="grid gap-5 animate-in fade-in-50">
            <div className="grid gap-2">
              <Label className="text-base font-semibold">
                Choose sign {authMode === "signup" ? "up" : "in"} method
              </Label>
              <Tabs
                defaultValue={method}
                value={method}
                onValueChange={(v) => setMethod(v as Method)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary p-1">
                  <TabsTrigger
                    value="phone"
                    className="rounded-lg text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
                  >
                    Phone
                  </TabsTrigger>
                  <TabsTrigger
                    value="email"
                    className="rounded-lg text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
                  >
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="phone" className="mt-4">
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Enter 10-digit phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 text-base"
                        aria-invalid={!!error && method === "phone"}
                      />
                    </div>
                    <Button
                      className="h-12 text-base"
                      onClick={handleSendCode}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      We’ll send a 6-digit code via SMS for quick access.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="mt-4">
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-base"
                        aria-invalid={!!error && method === "email"}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">
                        {authMode === "login" ? "Password" : "Set a password (optional)"}
                      </Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                        <Input
                          id="password"
                          type="password"
                          autoComplete={authMode === "login" ? "current-password" : "new-password"}
                          placeholder={authMode === "login" ? "Enter your password" : "Create a password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 text-base pl-11"
                        />
                      </div>
                    </div>
                    {authMode === "login" ? (
                      <Button
                        className="h-12 text-base"
                        onClick={handleEmailLogin}
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign in with Email"}
                      </Button>
                    ) : (
                      <Button
                        className="h-12 text-base"
                        onClick={() => {
                          // For email signup, proceed to profile directly
                          if (!validateContact()) {
                            toast.error("Fix the highlighted fields")
                            return
                          }
                          setStep("profile")
                          toast.success("Account created. Set up your profile.")
                        }}
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Continue"}
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Your information is secure and will never be shared.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {!!error && (
              <div
                className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                onClick={resetToStart}
              >
                Change role
              </button>
              {method === "phone" && otpSent && (
                <Button
                  variant="secondary"
                  onClick={() => setStep("verify")}
                  className="h-10"
                >
                  Enter OTP
                </Button>
              )}
            </div>
          </div>
        )}

        {step === "verify" && (
          <div className="grid gap-5 animate-in fade-in-50">
            {method === "phone" ? (
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="otp">Enter 6-digit OTP</Label>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="h-12 text-center tracking-[0.3em] text-lg font-medium"
                    aria-invalid={!!error}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                    onClick={handleSendCode}
                    disabled={loading}
                  >
                    Resend code
                  </button>
                  <Button
                    className="h-12 text-base min-w-[120px]"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </Button>
                </div>
                {!!error && (
                  <div
                    className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-3">
                <p className="text-sm text-muted-foreground">
                  Enter your email and password to continue.
                </p>
                <div className="grid gap-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input
                    id="email2"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password2">Password</Label>
                  <Input
                    id="password2"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    className="h-12 text-base min-w-[120px]"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
                {!!error && (
                  <div
                    className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === "profile" && (
          <div className="grid gap-6 animate-in fade-in-50">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Profile details
              </Label>
              <p className="text-sm text-muted-foreground">
                Help us personalize your experience.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full name</Label>
               <Input
  id="fullname"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => {
    // Allow only letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  }}
  className="h-12 text-base"
/>
              </div>

              {role === "student" && (
                <div className="grid gap-2">
                  <Label>Class / Grade</Label>
                  <Select
                    value={grade}
                    onValueChange={(v) => setGrade(v)}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades
  .filter((g) => {
    const num = parseInt(g.value.replace("grade-", ""));
    return num >= 6 && num <= 12;
  })
  .map((g) => (
    <SelectItem key={g.value} value={g.value}>
      {g.label}
    </SelectItem>
))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid gap-2">
                <Label>Preferred language</Label>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v)}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Choose a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Choose an avatar</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 p-1 overflow-visible">
  {avatarOptions.map((a) => {
    const active = avatar === a.url
    return (
      <button
        key={a.id}
        type="button"
        onClick={() => setAvatar(a.url)}
        aria-pressed={active}
        aria-label={`Select avatar: ${a.alt}`}
        className={cn(
          "relative aspect-square min-h-[56px] overflow-hidden rounded-xl border transition",
          active
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-foreground/40"
        )}
      >
        <img
          src={a.url}
          alt={a.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {active && (
          <div className="absolute inset-0 ring-inset ring-2 ring-primary/30 pointer-events-none" />
        )}
      </button>
    )
  })}
</div>
                <p className="text-xs text-muted-foreground">
                  Avatars add fun to learning. You can change this anytime.
                </p>
              </div>
            </div>

            {!!error && (
              <div
                className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                onClick={() => setStep("auth")}
              >
                Back
              </button>
              <Button
                className="h-12 text-base min-w-[140px]"
                onClick={handleProfileComplete}
                disabled={loading}
              >
                {loading ? "Saving..." : "Finish"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function RoleCard({
  icon,
  title,
  description,
  active,
  onClick,
  ariaLabel,
}: {
  icon: React.ReactNode
  title: string
  description: string
  active?: boolean
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || title}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-3 sm:p-4 transition",
        "text-left bg-card",
        active
          ? "border-primary shadow-sm"
          : "border-border hover:border-foreground/40"
      )}
    >
      <div
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          active ? "bg-accent text-foreground" : "bg-secondary text-foreground"
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-semibold break-words">{title}</div>
        <div className="text-sm text-muted-foreground break-words">
          {description}
        </div>
      </div>
    </button>
  )
}