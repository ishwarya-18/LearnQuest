"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import {
  Speech,
  MessageSquare,
  Brain,
  Languages,
  GraduationCap,
  MessageCircleMore,
  MessageCirclePlus,
  MessageSquareText,
  CircleQuestionMark,
  MessageCircleOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type MessageRole = "assistant" | "user" | "system"
type Message = {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  language: string
  meta?: {
    tts?: boolean
    topic?: string
  }
}

type ProgressData = {
  weakAreas?: string[]
  strengths?: string[]
  recentScores?: Record<string, number>
  level?: "beginner" | "intermediate" | "advanced"
}

type Conversation = {
  id: string
  title: string
  lastUpdated: number
  language: string
  messages: Message[]
}

export type AITutorAssistantProps = {
  className?: string
  studentName?: string
  locale?: string
  initialLanguage?: string
  progress?: ProgressData
  presetTopics?: { id: string; label: string; prompt: string; icon?: "coach" | "emergency" | "practice" | "concept" }[]
  onSendMessage?: (message: Message, conversation: Conversation) => void
  onNewConversation?: (conversation: Conversation) => void
  ttsEnabledByDefault?: boolean
}

const STORAGE_KEY = "learnquest.aiTutor.conversations.v1"
const ACTIVE_KEY = "learnquest.aiTutor.activeId.v1"

const DEFAULT_PRESETS: AITutorAssistantProps["presetTopics"] = [
  { id: "concept-help", label: "Explain a concept", prompt: "Explain like I'm 12: ", icon: "concept" },
  { id: "targeted-practice", label: "Targeted practice", prompt: "Give me 5 practice questions on: ", icon: "practice" },
  { id: "motivation", label: "Motivation boost", prompt: "I need motivation about studying: ", icon: "coach" },
  { id: "exam-crisis", label: "Emergency study help", prompt: "I have a test soon. Help me quickly with: ", icon: "emergency" },
]

const LANG_OPTIONS = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "bn", label: "বাংলা" },
  { value: "te", label: "తెలుగు" },
  { value: "ta", label: "தமிழ்" },
  { value: "mr", label: "मराठी" },
  { value: "kn", label: "ಕನ್ನಡ" },
  { value: "pa", label: "ਪੰਜਾਬੀ" },
  { value: "gu", label: "ગુજરાતી" },
  { value: "ur", label: "اردو" },
]

function generateId(prefix = "msg") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`
}

function now() {
  return Date.now()
}

function safeLocalStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function safeLocalStorageSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function speak(text: string, lang: string) {
  if (typeof window === "undefined") return
  const synth = window.speechSynthesis
  if (!synth) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  // Attempt to pick a matching voice
  const voices = synth.getVoices()
  const match = voices.find((v) => v.lang?.toLowerCase().startsWith(lang.toLowerCase()))
  if (match) utter.voice = match
  synth.speak(utter)
}

function stopSpeaking() {
  if (typeof window === "undefined") return
  const synth = window.speechSynthesis
  if (synth && synth.speaking) synth.cancel()
}

// Very lightweight mock "AI" to simulate helpful responses and adaptive questioning without calling APIs.
function mockTutorResponse(input: string, context: { progress?: ProgressData; language: string }): { text: string; followUps: string[] } {
  const weak = context.progress?.weakAreas ?? []
  const level = context.progress?.level ?? "beginner"
  const lower = input.toLowerCase()
  let base = ""

  if (lower.includes("motivation") || lower.includes("motivate")) {
    base =
      "You've got this! Let's set a tiny goal for the next 10 minutes. Pick one small topic and I'll guide you. Small steps build big progress."
  } else if (lower.includes("test") || lower.includes("exam") || lower.includes("emergency")) {
    base =
      "Okay, rapid support mode. We'll prioritize high-yield points and a quick check of your understanding. Tell me the exact topic and the test date."
  } else if (lower.includes("practice")) {
    base =
      "Here's a short, focused practice set. Try each question out loud first. I’ll adapt difficulty based on your answers."
  } else if (weak.some((w) => lower.includes(w.toLowerCase()))) {
    base =
      "I see this is one of your growth areas. Let's break it down with a simple example and then build up gradually."
  } else {
    base =
      "Great question. I’ll explain clearly with a real-world example, then we’ll try a quick check to confirm your understanding."
  }

  const followUps = [
    "Can you explain this concept back to me in your own words?",
    "Would you like 3 practice questions on this?",
    `Should we review a weak area next${weak.length ? ` (e.g., ${weak[0]})` : ""}?`,
  ]

  if (level !== "advanced") {
    followUps.push("Want a simpler analogy?")
  } else {
    followUps.push("Want a deeper, exam-style explanation?")
  }

  return { text: base, followUps }
}

export default function AITutorAssistant({
  className,
  studentName = "Student",
  initialLanguage = "en",
  progress,
  presetTopics = DEFAULT_PRESETS,
  onSendMessage,
  onNewConversation,
  ttsEnabledByDefault = true,
}: AITutorAssistantProps) {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    safeLocalStorageGet<Conversation[]>(STORAGE_KEY, [])
  )
  const [activeId, setActiveId] = useState<string | null>(() =>
    safeLocalStorageGet<string | null>(ACTIVE_KEY, null)
  )
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState(initialLanguage)
  const [listening, setListening] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(ttsEnabledByDefault)
  const [typing, setTyping] = useState(false)
  const [online, setOnline] = useState<boolean>(true)
  const [pendingQueue, setPendingQueue] = useState<Message[]>([])

  const recognitionRef = useRef<any | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const activeConversation = useMemo<Conversation | null>(() => {
    const found = conversations.find((c) => c.id === activeId)
    return found ?? null
  }, [conversations, activeId])

  const messages = activeConversation?.messages ?? []

  // Persistence
  useEffect(() => {
    safeLocalStorageSet(STORAGE_KEY, conversations)
  }, [conversations])

  useEffect(() => {
    safeLocalStorageSet(ACTIVE_KEY, activeId)
  }, [activeId])

  // Online/offline detection
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleOnline = () => {
      setOnline(true)
      if (pendingQueue.length) {
        toast.success("Reconnected. Syncing messages...")
        // Simulate syncing by appending a system note
        const syncNote: Message = {
          id: generateId("sys"),
          role: "system",
          content: `Synced ${pendingQueue.length} message(s)`,
          timestamp: now(),
          language,
        }
        if (activeConversation) {
          setConversations((prev) =>
            prev.map((c) =>
              c.id === activeConversation.id
                ? { ...c, messages: [...c.messages, syncNote], lastUpdated: now() }
                : c
            )
          )
        }
        setPendingQueue([])
      } else {
        toast.success("Back online")
      }
    }
    const handleOffline = () => {
      setOnline(false)
      toast.message("Offline mode", {
        description: "You can continue. Messages will sync when reconnected.",
      })
    }
    setOnline(navigator.onLine)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [pendingQueue.length, activeConversation, language])

  // Init speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return
    const recognizer = new SR()
    recognizer.lang = language
    recognizer.continuous = false
    recognizer.interimResults = true

    recognizer.onresult = (event: any) => {
      let transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript.trim())
    }
    recognizer.onerror = () => {
      setListening(false)
      toast.error("Voice input error")
    }
    recognizer.onend = () => {
      setListening(false)
    }
    recognitionRef.current = recognizer
  }, [language])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages.length, typing])

  // Speak assistant messages when TTS enabled
  useEffect(() => {
    if (!ttsEnabled) {
      stopSpeaking()
      return
    }
    if (!messages.length) return
    const last = messages[messages.length - 1]
    if (last.role === "assistant") {
      speak(last.content, last.language || language)
    }
  }, [messages, ttsEnabled, language])

  const startNewConversation = useCallback(
    (lang: string) => {
      const conv: Conversation = {
        id: generateId("conv"),
        title: `Session with ${studentName}`,
        lastUpdated: now(),
        language: lang,
        messages: [
          {
            id: generateId("msg"),
            role: "assistant",
            content: `Hi ${studentName}! I’m your AI Tutor. How can I help you today? You can type or use the mic button.`,
            timestamp: now(),
            language: lang,
          },
        ],
      }
      setConversations((prev) => [conv, ...prev])
      setActiveId(conv.id)
      onNewConversation?.(conv)
    },
    [onNewConversation, studentName]
  )

  useEffect(() => {
    if (!conversations.length) {
      startNewConversation(language)
    } else if (!activeId) {
      setActiveId(conversations[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSend = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim()
      if (!content) return
      if (!activeConversation) {
        startNewConversation(language)
      }
      const convId = activeConversation?.id ?? conversations[0]?.id
      if (!convId) return

      const userMsg: Message = {
        id: generateId("msg"),
        role: "user",
        content,
        timestamp: now(),
        language,
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId ? { ...c, messages: [...c.messages, userMsg], lastUpdated: now() } : c
        )
      )
      onSendMessage?.(userMsg, (conversations.find((c) => c.id === convId) as Conversation) ?? activeConversation!)

      setInput("")
      setTyping(true)

      const proceed = () => {
        const result = mockTutorResponse(content, { progress, language })
        const assistantMsg: Message = {
          id: generateId("msg"),
          role: "assistant",
          content: `${result.text}\n\n• ${result.followUps.join("\n• ")}`,
          timestamp: now(),
          language,
        }
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? { ...c, messages: [...c.messages, assistantMsg], lastUpdated: now() }
              : c
          )
        )
        setTyping(false)
      }

      if (!online) {
        // Cache locally and queue for sync
        setPendingQueue((q) => [...q, userMsg])
        const offlineNote: Message = {
          id: generateId("sys"),
          role: "system",
          content: "Saved offline. I’ll respond when reconnected.",
          timestamp: now(),
          language,
        }
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId ? { ...c, messages: [...c.messages, offlineNote], lastUpdated: now() } : c
          )
        )
        setTyping(false)
        return
      }

      // Simulate network/AI latency
      setTimeout(proceed, 650)
    },
    [activeConversation, conversations, input, language, onSendMessage, online, progress, startNewConversation]
  )

  const handlePreset = useCallback(
    (preset: NonNullable<AITutorAssistantProps["presetTopics"]>[number]) => {
      setInput(preset.prompt)
      toast.message("Preset loaded", { description: preset.label })
    },
    []
  )

  const handleVoiceToggle = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error("Voice input not supported on this device")
      return
    }
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      try {
        recognitionRef.current.lang = language
        recognitionRef.current.start()
        setListening(true)
      } catch {
        setListening(false)
        toast.error("Unable to start voice input")
      }
    }
  }, [language, listening])

  const quickSuggestions = useMemo(() => {
    const items: { label: string; text: string }[] = []
    if (progress?.weakAreas?.length) {
      items.push({
        label: "Review weak area",
        text: `Help me with ${progress.weakAreas[0]}`,
      })
    }
    if (progress?.recentScores) {
      const lowest = Object.entries(progress.recentScores).sort((a, b) => a[1] - b[1])[0]
      if (lowest) {
        items.push({
          label: "Practice low score",
          text: `Give me practice for ${lowest[0]}`,
        })
      }
    }
    items.push(
      { label: "Explain simply", text: "Explain this simply with an example" },
      { label: "Give 3 questions", text: "Give me 3 practice questions" }
    )
    return items.slice(0, 4)
  }, [progress])

  const LanguageIcon = Languages
  const EmergencyIcon = MessageCircleOff
  const CoachIcon = MessageCircleMore
  const PracticeIcon = MessageSquareText
  const ConceptIcon = CircleQuestionMark

  return (
    <Card className={cn("w-full bg-card border-border", className)}>
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-full bg-accent flex items-center justify-center">
              <GraduationCap className="size-5 text-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-lg truncate">
                AI Tutor Assistant
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Personalized help for {studentName}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full px-2 py-1 text-xs",
                online ? "bg-accent text-foreground border-transparent" : "bg-muted text-muted-foreground"
              )}
              aria-live="polite"
            >
              {online ? "Online" : "Offline"}
            </Badge>

            <div className="hidden sm:flex items-center gap-2">
              <Label htmlFor="tts" className="text-xs text-muted-foreground">
                Read aloud
              </Label>
              <Switch
                id="tts"
                checked={ttsEnabled}
                onCheckedChange={(v) => setTtsEnabled(v)}
                aria-label="Toggle text-to-speech"
              />
            </div>

            <Select
              value={language}
              onValueChange={(v) => {
                setLanguage(v)
                toast.message("Language switched", { description: LANG_OPTIONS.find((x) => x.value === v)?.label })
              }}
            >
              <SelectTrigger className="w-[120px] h-9 bg-secondary border-input">
                <LanguageIcon className="mr-2 size-4" aria-hidden="true" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {LANG_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!online && (
          <div className="text-xs text-muted-foreground bg-muted/60 rounded-md px-3 py-2">
            You’re offline. Messages will be saved and synced automatically when you reconnect.
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {presetTopics?.map((p) => {
            const IconComp =
              p.icon === "emergency"
                ? EmergencyIcon
                : p.icon === "coach"
                ? CoachIcon
                : p.icon === "practice"
                ? PracticeIcon
                : ConceptIcon
            return (
              <Button
                key={p.id}
                variant="secondary"
                className="h-8 rounded-full bg-secondary text-foreground hover:bg-accent"
                onClick={() => handlePreset(p)}
              >
                <IconComp className="size-4 mr-2" aria-hidden="true" />
                <span className="text-xs">{p.label}</span>
              </Button>
            )
          })}
        </div>

        <Separator className="bg-border" />

        <div
          className="relative rounded-xl bg-secondary p-2"
          role="region"
          aria-label="Chat conversation"
        >
          <ScrollArea className="h-[360px] sm:h-[420px]">
            <div ref={scrollRef} className="px-1 py-2 space-y-3 min-w-0">
              {messages.map((m) => (
                <ChatBubble key={m.id} role={m.role} content={m.content} timestamp={m.timestamp} />
              ))}
              {typing && <TypingIndicator />}
            </div>
          </ScrollArea>
        </div>

        {quickSuggestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {quickSuggestions.map((q, idx) => (
              <Button
                key={`${q.label}-${idx}`}
                variant="ghost"
                size="sm"
                className="h-8 rounded-full bg-accent hover:bg-accent/80 text-foreground"
                onClick={() => handleSend(q.text)}
              >
                <Brain className="size-4 mr-2" aria-hidden="true" />
                <span className="text-xs">{q.label}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-end gap-2 w-full">
          <div className="flex-1 min-w-0">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question... or use the mic"
              className="bg-card border-input focus-visible:ring-ring min-h-[56px] resize-none"
              rows={3}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault()
                  handleSend()
                }
              }}
              aria-label="Message input"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={listening ? "default" : "secondary"}
                        onClick={handleVoiceToggle}
                        className={cn(
                          "h-9 rounded-full",
                          listening ? "bg-primary text-primary-foreground" : "bg-secondary"
                        )}
                        aria-pressed={listening}
                        aria-label={listening ? "Stop voice input" : "Start voice input"}
                      >
                        <Speech className="size-4 mr-2" aria-hidden="true" />
                        {listening ? "Listening..." : "Voice"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Speak your question</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={ttsEnabled ? "default" : "secondary"}
                        onClick={() => setTtsEnabled((v) => !v)}
                        className="h-9 rounded-full"
                        aria-pressed={ttsEnabled}
                        aria-label="Toggle read aloud"
                      >
                        <MessageSquare className="size-4 mr-2" aria-hidden="true" />
                        {ttsEnabled ? "Read aloud: On" : "Read aloud: Off"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle text-to-speech for tutor replies</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 rounded-full"
                  onClick={() => startNewConversation(language)}
                >
                  <MessageCirclePlus className="size-4 mr-2" aria-hidden="true" />
                  New
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSend()}
                  className="h-9 rounded-full"
                  disabled={!input.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ConversationTray
          conversations={conversations}
          activeId={activeId}
          onSelect={(id) => setActiveId(id)}
          onRename={(id, title) =>
            setConversations((prev) =>
              prev.map((c) => (c.id === id ? { ...c, title, lastUpdated: now() } : c))
            )
          }
          onDelete={(id) => {
            setConversations((prev) => prev.filter((c) => c.id !== id))
            if (activeId === id) {
              const next = conversations.find((c) => c.id !== id)
              setActiveId(next?.id ?? null)
            }
          }}
        />
      </CardFooter>
    </Card>
  )
}

function ChatBubble({
  role,
  content,
  timestamp,
}: {
  role: MessageRole
  content: string
  timestamp: number
}) {
  const isUser = role === "user"
  const bubbleClasses = cn(
    "max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm break-words",
    isUser ? "bg-primary text-primary-foreground" : role === "system" ? "bg-muted text-muted-foreground" : "bg-card text-foreground"
  )
  const rowClasses = cn("w-full flex", isUser ? "justify-end" : "justify-start")

  return (
    <div className={rowClasses}>
      <div className="flex flex-col gap-1">
        <div className={bubbleClasses} role="article" aria-live="polite">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        <span className="text-[11px] text-muted-foreground pl-2">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="w-full flex justify-start">
      <div className="bg-card text-foreground rounded-2xl px-4 py-3 shadow-sm inline-flex items-center gap-2">
        <span className="sr-only">Tutor is typing</span>
        <div className="flex items-center gap-1">
          <Dot />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </div>
      </div>
    </div>
  )
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block size-2 rounded-full bg-muted-foreground/60 animate-bounce"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    />
  )
}

function ConversationTray({
  conversations,
  activeId,
  onSelect,
  onRename,
  onDelete,
}: {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onRename: (id: string, title: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Brain className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">Conversation history</span>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto py-1">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "group shrink-0 text-left rounded-lg border px-3 py-2 bg-card transition",
              "hover:bg-accent hover:border-transparent",
              c.id === activeId ? "border-primary bg-accent" : "border-input"
            )}
            aria-current={c.id === activeId ? "true" : "false"}
          >
            <div className="text-sm font-medium truncate max-w-[180px]">{c.title}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(c.lastUpdated).toLocaleDateString([], { month: "short", day: "numeric" })}
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
              <InlineAction
                label="Rename"
                onClick={(e) => {
                  e.stopPropagation()
                  const next = prompt("Rename conversation", c.title)
                  if (next && next.trim()) onRename(c.id, next.trim())
                }}
              >
                <MessageSquare className="size-3.5" aria-hidden="true" />
              </InlineAction>
              <InlineAction
                label="Delete"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm("Delete this conversation?")) onDelete(c.id)
                }}
              >
                <MessageCircleOff className="size-3.5" aria-hidden="true" />
              </InlineAction>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function InlineAction({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-accent inline-flex items-center gap-1"
      aria-label={label}
      title={label}
    >
      {children}
      <span>{label}</span>
    </button>
  )
}