(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AITutorAssistant)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$speech$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Speech$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/speech.js [app-client] (ecmascript) <export default as Speech>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/languages.js [app-client] (ecmascript) <export default as Languages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$more$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleMore$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/message-circle-more.js [app-client] (ecmascript) <export default as MessageCircleMore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCirclePlus$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/message-circle-plus.js [app-client] (ecmascript) <export default as MessageCirclePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/message-square-text.js [app-client] (ecmascript) <export default as MessageSquareText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleQuestionMark$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as CircleQuestionMark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleOff$3e$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/node_modules/lucide-react/dist/esm/icons/message-circle-off.js [app-client] (ecmascript) <export default as MessageCircleOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LearnQuest/frontend/src/components/ui/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const STORAGE_KEY = "learnquest.aiTutor.conversations.v1";
const ACTIVE_KEY = "learnquest.aiTutor.activeId.v1";
const DEFAULT_PRESETS = [
    {
        id: "concept-help",
        label: "Explain a concept",
        prompt: "Explain like I'm 12: ",
        icon: "concept"
    },
    {
        id: "targeted-practice",
        label: "Targeted practice",
        prompt: "Give me 5 practice questions on: ",
        icon: "practice"
    },
    {
        id: "motivation",
        label: "Motivation boost",
        prompt: "I need motivation about studying: ",
        icon: "coach"
    },
    {
        id: "exam-crisis",
        label: "Emergency study help",
        prompt: "I have a test soon. Help me quickly with: ",
        icon: "emergency"
    }
];
const LANG_OPTIONS = [
    {
        value: "en",
        label: "English"
    },
    {
        value: "hi",
        label: "हिन्दी"
    },
    {
        value: "bn",
        label: "বাংলা"
    },
    {
        value: "te",
        label: "తెలుగు"
    },
    {
        value: "ta",
        label: "தமிழ்"
    },
    {
        value: "mr",
        label: "मराठी"
    },
    {
        value: "kn",
        label: "ಕನ್ನಡ"
    },
    {
        value: "pa",
        label: "ਪੰਜਾਬੀ"
    },
    {
        value: "gu",
        label: "ગુજરાતી"
    },
    {
        value: "ur",
        label: "اردو"
    }
];
function generateId(prefix = "msg") {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function now() {
    return Date.now();
}
function safeLocalStorageGet(key, fallback) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch  {
        return fallback;
    }
}
function safeLocalStorageSet(key, value) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch  {
    // ignore
    }
}
function speak(text, lang) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    // Attempt to pick a matching voice
    const voices = synth.getVoices();
    const match = voices.find((v)=>v.lang?.toLowerCase().startsWith(lang.toLowerCase()));
    if (match) utter.voice = match;
    synth.speak(utter);
}
function stopSpeaking() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const synth = window.speechSynthesis;
    if (synth && synth.speaking) synth.cancel();
}
// Very lightweight mock "AI" to simulate helpful responses and adaptive questioning without calling APIs.
function mockTutorResponse(input, context) {
    const weak = context.progress?.weakAreas ?? [];
    const level = context.progress?.level ?? "beginner";
    const lower = input.toLowerCase();
    let base = "";
    if (lower.includes("motivation") || lower.includes("motivate")) {
        base = "You've got this! Let's set a tiny goal for the next 10 minutes. Pick one small topic and I'll guide you. Small steps build big progress.";
    } else if (lower.includes("test") || lower.includes("exam") || lower.includes("emergency")) {
        base = "Okay, rapid support mode. We'll prioritize high-yield points and a quick check of your understanding. Tell me the exact topic and the test date.";
    } else if (lower.includes("practice")) {
        base = "Here's a short, focused practice set. Try each question out loud first. I’ll adapt difficulty based on your answers.";
    } else if (weak.some((w)=>lower.includes(w.toLowerCase()))) {
        base = "I see this is one of your growth areas. Let's break it down with a simple example and then build up gradually.";
    } else {
        base = "Great question. I’ll explain clearly with a real-world example, then we’ll try a quick check to confirm your understanding.";
    }
    const followUps = [
        "Can you explain this concept back to me in your own words?",
        "Would you like 3 practice questions on this?",
        `Should we review a weak area next${weak.length ? ` (e.g., ${weak[0]})` : ""}?`
    ];
    if (level !== "advanced") {
        followUps.push("Want a simpler analogy?");
    } else {
        followUps.push("Want a deeper, exam-style explanation?");
    }
    return {
        text: base,
        followUps
    };
}
function AITutorAssistant({ className, studentName = "Student", initialLanguage = "en", progress, presetTopics = DEFAULT_PRESETS, onSendMessage, onNewConversation, ttsEnabledByDefault = true }) {
    _s();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AITutorAssistant.useState": ()=>safeLocalStorageGet(STORAGE_KEY, [])
    }["AITutorAssistant.useState"]);
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AITutorAssistant.useState": ()=>safeLocalStorageGet(ACTIVE_KEY, null)
    }["AITutorAssistant.useState"]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLanguage);
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ttsEnabled, setTtsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(ttsEnabledByDefault);
    const [typing, setTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [pendingQueue, setPendingQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeConversation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AITutorAssistant.useMemo[activeConversation]": ()=>{
            const found = conversations.find({
                "AITutorAssistant.useMemo[activeConversation].found": (c)=>c.id === activeId
            }["AITutorAssistant.useMemo[activeConversation].found"]);
            return found ?? null;
        }
    }["AITutorAssistant.useMemo[activeConversation]"], [
        conversations,
        activeId
    ]);
    const messages = activeConversation?.messages ?? [];
    // Persistence
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            safeLocalStorageSet(STORAGE_KEY, conversations);
        }
    }["AITutorAssistant.useEffect"], [
        conversations
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            safeLocalStorageSet(ACTIVE_KEY, activeId);
        }
    }["AITutorAssistant.useEffect"], [
        activeId
    ]);
    // Online/offline detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            const handleOnline = {
                "AITutorAssistant.useEffect.handleOnline": ()=>{
                    setOnline(true);
                    if (pendingQueue.length) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Reconnected. Syncing messages...");
                        // Simulate syncing by appending a system note
                        const syncNote = {
                            id: generateId("sys"),
                            role: "system",
                            content: `Synced ${pendingQueue.length} message(s)`,
                            timestamp: now(),
                            language
                        };
                        if (activeConversation) {
                            setConversations({
                                "AITutorAssistant.useEffect.handleOnline": (prev)=>prev.map({
                                        "AITutorAssistant.useEffect.handleOnline": (c)=>c.id === activeConversation.id ? {
                                                ...c,
                                                messages: [
                                                    ...c.messages,
                                                    syncNote
                                                ],
                                                lastUpdated: now()
                                            } : c
                                    }["AITutorAssistant.useEffect.handleOnline"])
                            }["AITutorAssistant.useEffect.handleOnline"]);
                        }
                        setPendingQueue([]);
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Back online");
                    }
                }
            }["AITutorAssistant.useEffect.handleOnline"];
            const handleOffline = {
                "AITutorAssistant.useEffect.handleOffline": ()=>{
                    setOnline(false);
                    __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].message("Offline mode", {
                        description: "You can continue. Messages will sync when reconnected."
                    });
                }
            }["AITutorAssistant.useEffect.handleOffline"];
            setOnline(navigator.onLine);
            window.addEventListener("online", handleOnline);
            window.addEventListener("offline", handleOffline);
            return ({
                "AITutorAssistant.useEffect": ()=>{
                    window.removeEventListener("online", handleOnline);
                    window.removeEventListener("offline", handleOffline);
                }
            })["AITutorAssistant.useEffect"];
        }
    }["AITutorAssistant.useEffect"], [
        pendingQueue.length,
        activeConversation,
        language
    ]);
    // Init speech recognition
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SR) return;
            const recognizer = new SR();
            recognizer.lang = language;
            recognizer.continuous = false;
            recognizer.interimResults = true;
            recognizer.onresult = ({
                "AITutorAssistant.useEffect": (event)=>{
                    let interim = "";
                    let final = "";
                    for(let i = event.resultIndex; i < event.results.length; i++){
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            final += transcript;
                        } else {
                            interim += transcript;
                        }
                    }
                    // Append to existing input for continuous dictation
                    setInput({
                        "AITutorAssistant.useEffect": (prev)=>(prev + " " + final + interim).trim()
                    }["AITutorAssistant.useEffect"]);
                }
            })["AITutorAssistant.useEffect"];
            recognizer.onerror = ({
                "AITutorAssistant.useEffect": ()=>{
                    setListening(false);
                    __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Voice input error");
                }
            })["AITutorAssistant.useEffect"];
            recognizer.onend = ({
                "AITutorAssistant.useEffect": ()=>{
                    setListening(false);
                }
            })["AITutorAssistant.useEffect"];
            recognitionRef.current = recognizer;
        }
    }["AITutorAssistant.useEffect"], [
        language
    ]);
    // Auto-scroll to bottom on new messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            const el = scrollRef.current;
            if (!el) return;
            el.scrollTop = el.scrollHeight;
        }
    }["AITutorAssistant.useEffect"], [
        messages.length,
        typing
    ]);
    // Speak assistant messages when TTS enabled
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            if (!ttsEnabled) {
                stopSpeaking();
                return;
            }
            if (!messages.length) return;
            const last = messages[messages.length - 1];
            if (last.role === "assistant") {
                speak(last.content, last.language || language);
            }
        }
    }["AITutorAssistant.useEffect"], [
        messages,
        ttsEnabled,
        language
    ]);
    const startNewConversation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AITutorAssistant.useCallback[startNewConversation]": (lang)=>{
            const conv = {
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
                        language: lang
                    }
                ]
            };
            setConversations({
                "AITutorAssistant.useCallback[startNewConversation]": (prev)=>[
                        conv,
                        ...prev
                    ]
            }["AITutorAssistant.useCallback[startNewConversation]"]);
            setActiveId(conv.id);
            onNewConversation?.(conv);
        }
    }["AITutorAssistant.useCallback[startNewConversation]"], [
        onNewConversation,
        studentName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AITutorAssistant.useEffect": ()=>{
            if (!conversations.length) {
                startNewConversation(language);
            } else if (!activeId) {
                setActiveId(conversations[0].id);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AITutorAssistant.useEffect"], []);
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AITutorAssistant.useCallback[handleSend]": async (text)=>{
            const content = (text ?? input).trim();
            if (!content) return;
            let convId = activeConversation?.id ?? conversations[0]?.id;
            if (!convId) {
                // Start a new conversation and get its ID
                const newConv = {
                    id: generateId("conv"),
                    title: `Session with ${studentName}`,
                    lastUpdated: now(),
                    language,
                    messages: []
                };
                setConversations({
                    "AITutorAssistant.useCallback[handleSend]": (prev)=>[
                            newConv,
                            ...prev
                        ]
                }["AITutorAssistant.useCallback[handleSend]"]);
                setActiveId(newConv.id);
                convId = newConv.id;
            }
            const userMsg = {
                id: generateId("msg"),
                role: "user",
                content,
                timestamp: now(),
                language
            };
            // Add the user message immediately
            setConversations({
                "AITutorAssistant.useCallback[handleSend]": (prev)=>prev.map({
                        "AITutorAssistant.useCallback[handleSend]": (c)=>c.id === convId ? {
                                ...c,
                                messages: [
                                    ...c.messages,
                                    userMsg
                                ],
                                lastUpdated: now()
                            } : c
                    }["AITutorAssistant.useCallback[handleSend]"])
            }["AITutorAssistant.useCallback[handleSend]"]);
            onSendMessage?.(userMsg, conversations.find({
                "AITutorAssistant.useCallback[handleSend]": (c)=>c.id === convId
            }["AITutorAssistant.useCallback[handleSend]"]) ?? activeConversation);
            setInput("");
            setTyping(true);
            // ...rest of code...
            const proceed = {
                "AITutorAssistant.useCallback[handleSend].proceed": ()=>{
                    const result = mockTutorResponse(content, {
                        progress,
                        language
                    });
                    const assistantMsg = {
                        id: generateId("msg"),
                        role: "assistant",
                        content: `${result.text}\n\n• ${result.followUps.join("\n• ")}`,
                        timestamp: now(),
                        language
                    };
                    setConversations({
                        "AITutorAssistant.useCallback[handleSend].proceed": (prev)=>prev.map({
                                "AITutorAssistant.useCallback[handleSend].proceed": (c)=>c.id === convId ? {
                                        ...c,
                                        messages: [
                                            ...c.messages,
                                            assistantMsg
                                        ],
                                        lastUpdated: now()
                                    } : c
                            }["AITutorAssistant.useCallback[handleSend].proceed"])
                    }["AITutorAssistant.useCallback[handleSend].proceed"]);
                    setTyping(false);
                }
            }["AITutorAssistant.useCallback[handleSend].proceed"];
            if (!online) {
                // Cache locally and queue for sync
                setPendingQueue({
                    "AITutorAssistant.useCallback[handleSend]": (q)=>[
                            ...q,
                            userMsg
                        ]
                }["AITutorAssistant.useCallback[handleSend]"]);
                const offlineNote = {
                    id: generateId("sys"),
                    role: "system",
                    content: "Saved offline. I’ll respond when reconnected.",
                    timestamp: now(),
                    language
                };
                setConversations({
                    "AITutorAssistant.useCallback[handleSend]": (prev)=>prev.map({
                            "AITutorAssistant.useCallback[handleSend]": (c)=>c.id === convId ? {
                                    ...c,
                                    messages: [
                                        ...c.messages,
                                        offlineNote
                                    ],
                                    lastUpdated: now()
                                } : c
                        }["AITutorAssistant.useCallback[handleSend]"])
                }["AITutorAssistant.useCallback[handleSend]"]);
                setTyping(false);
                return;
            }
            // Simulate network/AI latency
            setTimeout(proceed, 650);
        }
    }["AITutorAssistant.useCallback[handleSend]"], [
        activeConversation,
        conversations,
        input,
        language,
        onSendMessage,
        online,
        progress,
        startNewConversation
    ]);
    const handlePreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AITutorAssistant.useCallback[handlePreset]": (preset)=>{
            setInput(preset.prompt);
            __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].message("Preset loaded", {
                description: preset.label
            });
        }
    }["AITutorAssistant.useCallback[handlePreset]"], []);
    const handleVoiceToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AITutorAssistant.useCallback[handleVoiceToggle]": ()=>{
            if (!recognitionRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Voice input not supported on this device");
                return;
            }
            if (listening) {
                recognitionRef.current.stop();
                setListening(false);
            } else {
                try {
                    recognitionRef.current.lang = language;
                    recognitionRef.current.start();
                    setListening(true);
                } catch  {
                    setListening(false);
                    __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Unable to start voice input");
                }
            }
        }
    }["AITutorAssistant.useCallback[handleVoiceToggle]"], [
        language,
        listening
    ]);
    const quickSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AITutorAssistant.useMemo[quickSuggestions]": ()=>{
            const items = [];
            if (progress?.weakAreas?.length) {
                items.push({
                    label: "Review weak area",
                    text: `Help me with ${progress.weakAreas[0]}`
                });
            }
            if (progress?.recentScores) {
                const lowest = Object.entries(progress.recentScores).sort({
                    "AITutorAssistant.useMemo[quickSuggestions]": (a, b)=>a[1] - b[1]
                }["AITutorAssistant.useMemo[quickSuggestions]"])[0];
                if (lowest) {
                    items.push({
                        label: "Practice low score",
                        text: `Give me practice for ${lowest[0]}`
                    });
                }
            }
            items.push({
                label: "Explain simply",
                text: "Explain this simply with an example"
            }, {
                label: "Give 3 questions",
                text: "Give me 3 practice questions"
            });
            return items.slice(0, 4);
        }
    }["AITutorAssistant.useMemo[quickSuggestions]"], [
        progress
    ]);
    const LanguageIcon = __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"];
    const EmergencyIcon = __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleOff$3e$__["MessageCircleOff"];
    const CoachIcon = __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$more$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleMore$3e$__["MessageCircleMore"];
    const PracticeIcon = __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"];
    const ConceptIcon = __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleQuestionMark$3e$__["CircleQuestionMark"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full bg-card border-border", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-10 rounded-full bg-accent flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                            className: "size-5 text-foreground",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 518,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-base sm:text-lg truncate",
                                                children: "AI Tutor Assistant"
                                            }, void 0, false, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 522,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                className: "text-xs sm:text-sm",
                                                children: [
                                                    "Personalized help for ",
                                                    studentName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 525,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 521,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full px-2 py-1 text-xs", online ? "bg-accent text-foreground border-transparent" : "bg-muted text-muted-foreground"),
                                        "aria-live": "polite",
                                        children: online ? "Online" : "Offline"
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "tts",
                                                className: "text-xs text-muted-foreground",
                                                children: "Read aloud"
                                            }, void 0, false, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                id: "tts",
                                                checked: ttsEnabled,
                                                onCheckedChange: (v)=>setTtsEnabled(v),
                                                "aria-label": "Toggle text-to-speech"
                                            }, void 0, false, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 546,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 542,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: language,
                                        onValueChange: (v)=>{
                                            setLanguage(v);
                                            __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].message("Language switched", {
                                                description: LANG_OPTIONS.find((x)=>x.value === v)?.label
                                            });
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "w-[120px] h-9 bg-secondary border-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageIcon, {
                                                        className: "mr-2 size-4",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Language"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 561,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-popover",
                                                children: LANG_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: opt.value,
                                                        children: opt.label
                                                    }, opt.value, false, {
                                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 565,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 554,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 516,
                        columnNumber: 9
                    }, this),
                    !online && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground bg-muted/60 rounded-md px-3 py-2",
                        children: "You’re offline. Messages will be saved and synced automatically when you reconnect."
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 577,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 515,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: presetTopics?.map((p)=>{
                            const IconComp = p.icon === "emergency" ? EmergencyIcon : p.icon === "coach" ? CoachIcon : p.icon === "practice" ? PracticeIcon : ConceptIcon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                className: "h-8 rounded-full bg-secondary text-foreground hover:bg-accent",
                                onClick: ()=>handlePreset(p),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComp, {
                                        className: "size-4 mr-2",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 601,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: p.label
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 602,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 595,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                        className: "bg-border"
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 608,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative rounded-xl bg-secondary p-2",
                        role: "region",
                        "aria-label": "Chat conversation",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                            className: "h-[360px] sm:h-[420px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollRef,
                                className: "px-1 py-2 space-y-3 min-w-0",
                                children: [
                                    messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatBubble, {
                                            role: m.role,
                                            content: m.content,
                                            timestamp: m.timestamp
                                        }, m.id, false, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 618,
                                            columnNumber: 17
                                        }, this)),
                                    typing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingIndicator, {}, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 620,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 616,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 615,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this),
                    quickSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: quickSuggestions.map((q, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-8 rounded-full bg-accent hover:bg-accent/80 text-foreground",
                                onClick: ()=>handleSend(q.text),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                        className: "size-4 mr-2",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 635,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: q.label
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 636,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${q.label}-${idx}`, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 628,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 626,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 583,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-2 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    placeholder: "Type your question... or use the mic",
                                    className: "bg-card border-input focus-visible:ring-ring min-h-[56px] resize-none",
                                    rows: 3,
                                    onKeyDown: (e)=>{
                                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    },
                                    "aria-label": "Message input"
                                }, void 0, false, {
                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                    lineNumber: 646,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    type: "button",
                                                                    variant: listening ? "default" : "secondary",
                                                                    onClick: handleVoiceToggle,
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-9 rounded-full", listening ? "bg-primary text-primary-foreground" : "bg-secondary"),
                                                                    "aria-pressed": listening,
                                                                    "aria-label": listening ? "Stop voice input" : "Start voice input",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$speech$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Speech$3e$__["Speech"], {
                                                                            className: "size-4 mr-2",
                                                                            "aria-hidden": "true"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                            lineNumber: 676,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        listening ? "Listening..." : "Voice"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                    lineNumber: 665,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: "Speak your question"
                                                            }, void 0, false, {
                                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    type: "button",
                                                                    variant: ttsEnabled ? "default" : "secondary",
                                                                    onClick: ()=>setTtsEnabled((v)=>!v),
                                                                    className: "h-9 rounded-full",
                                                                    "aria-pressed": ttsEnabled,
                                                                    "aria-label": "Toggle read aloud",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                            className: "size-4 mr-2",
                                                                            "aria-hidden": "true"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                            lineNumber: 693,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ttsEnabled ? "Read aloud: On" : "Read aloud: Off"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                    lineNumber: 685,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: "Toggle text-to-speech for tutor replies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                lineNumber: 662,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 661,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "button",
                                                    variant: "ghost",
                                                    className: "h-9 rounded-full",
                                                    onClick: ()=>startNewConversation(language),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCirclePlus$3e$__["MessageCirclePlus"], {
                                                            className: "size-4 mr-2",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 19
                                                        }, this),
                                                        "New"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "button",
                                                    onClick: ()=>handleSend(),
                                                    className: "h-9 rounded-full",
                                                    disabled: !input.trim(),
                                                    children: "Send"
                                                }, void 0, false, {
                                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 702,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                    lineNumber: 660,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 645,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 644,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConversationTray, {
                        conversations: conversations,
                        activeId: activeId,
                        onSelect: (id)=>setActiveId(id),
                        onRename: (id, title)=>setConversations((prev)=>prev.map((c)=>c.id === id ? {
                                        ...c,
                                        title,
                                        lastUpdated: now()
                                    } : c)),
                        onDelete: (id)=>{
                            setConversations((prev)=>prev.filter((c)=>c.id !== id));
                            if (activeId === id) {
                                const next = conversations.find((c)=>c.id !== id);
                                setActiveId(next?.id ?? null);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 643,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 514,
        columnNumber: 5
    }, this);
}
_s(AITutorAssistant, "mbOUPU0FgmrVEXeCKxUOLSrNr0s=");
_c = AITutorAssistant;
function ChatBubble({ role, content, timestamp }) {
    const isUser = role === "user";
    const bubbleClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm break-words", isUser ? "bg-secondary text-foreground" : role === "system" ? "bg-muted text-muted-foreground" : "bg-card text-foreground");
    const rowClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex", isUser ? "justify-end" : "justify-start");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: rowClasses,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: bubbleClasses,
                    role: "article",
                    "aria-live": "polite",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm leading-relaxed whitespace-pre-line",
                        children: content
                    }, void 0, false, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 767,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                    lineNumber: 766,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] text-muted-foreground pl-2",
                    children: new Date(timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }, void 0, false, {
                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                    lineNumber: 769,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
            lineNumber: 765,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 764,
        columnNumber: 5
    }, this);
}
_c1 = ChatBubble;
function TypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-start",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-card text-foreground rounded-2xl px-4 py-3 shadow-sm inline-flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Tutor is typing"
                }, void 0, false, {
                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                    lineNumber: 781,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {}, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 783,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {
                            delay: "150ms"
                        }, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 784,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {
                            delay: "300ms"
                        }, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 785,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                    lineNumber: 782,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
            lineNumber: 780,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 779,
        columnNumber: 5
    }, this);
}
_c2 = TypingIndicator;
function Dot({ delay = "0ms" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-block size-2 rounded-full bg-muted-foreground/60 animate-bounce",
        style: {
            animationDelay: delay
        },
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 794,
        columnNumber: 5
    }, this);
}
_c3 = Dot;
function ConversationTray({ conversations, activeId, onSelect, onRename, onDelete }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                            className: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 819,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-muted-foreground",
                            children: "Conversation history"
                        }, void 0, false, {
                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                            lineNumber: 820,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                    lineNumber: 818,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 817,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto py-1",
                children: conversations.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelect(c.id),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group shrink-0 text-left rounded-lg border px-3 py-2 bg-card transition", "hover:bg-accent hover:border-transparent", c.id === activeId ? "border-primary bg-accent" : "border-input"),
                        "aria-current": c.id === activeId ? "true" : "false",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium truncate max-w-[180px]",
                                children: c.title
                            }, void 0, false, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 835,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground",
                                children: new Date(c.lastUpdated).toLocaleDateString([], {
                                    month: "short",
                                    day: "numeric"
                                })
                            }, void 0, false, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 836,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineAction, {
                                        label: "Rename",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            const next = prompt("Rename conversation", c.title);
                                            if (next && next.trim()) onRename(c.id, next.trim());
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                            className: "size-3.5",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 848,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineAction, {
                                        label: "Delete",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            if (confirm("Delete this conversation?")) onDelete(c.id);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircleOff$3e$__["MessageCircleOff"], {
                                            className: "size-3.5",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                            lineNumber: 857,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                        lineNumber: 850,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                                lineNumber: 839,
                                columnNumber: 13
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                        lineNumber: 825,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 823,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 816,
        columnNumber: 5
    }, this);
}
_c4 = ConversationTray;
function InlineAction({ label, onClick, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: "text-xs px-2 py-1 rounded-full bg-secondary hover:bg-accent inline-flex items-center gap-1",
        "aria-label": label,
        title: label,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LearnQuest$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
                lineNumber: 885,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/LearnQuest/frontend/src/components/AITutorAssistant.tsx",
        lineNumber: 877,
        columnNumber: 5
    }, this);
}
_c5 = InlineAction;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "AITutorAssistant");
__turbopack_context__.k.register(_c1, "ChatBubble");
__turbopack_context__.k.register(_c2, "TypingIndicator");
__turbopack_context__.k.register(_c3, "Dot");
__turbopack_context__.k.register(_c4, "ConversationTray");
__turbopack_context__.k.register(_c5, "InlineAction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=LearnQuest_frontend_src_components_AITutorAssistant_tsx_1fd2e623._.js.map