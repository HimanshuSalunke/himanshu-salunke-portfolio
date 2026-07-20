import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  Check,
  Copy,
  Eraser,
  ExternalLink,
  Loader2,
  MessageCircle,
  Minus,
  Send,
  Square,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import {
  STARTER_CHIPS,
  QUICK_ACTIONS,
  OFFLINE_FAQ,
  clearPersistedThread,
  extractPortfolioLinks,
  getFollowUpChips,
  loadPersistedThread,
  pageContextHint,
  savePersistedThread,
  trackNeuraEvent,
} from '../../../lib/neura/agentUx.ts'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  feedback?: 'up' | 'down'
}

type Pose = 'idle' | 'wave-right' | 'wave-both' | 'bounce' | 'point-down' | 'celebrate'

type ArmAngles = {
  leftUpper: number
  leftFore: number
  rightUpper: number
  rightFore: number
}

type BodyPose = ArmAngles & {
  leftLeg: number
  rightLeg: number
  headTilt: number
  antennaTilt: number
}

const STORAGE_KEY = 'neura-welcomed-v4'

const DEFAULT_POSE: BodyPose = {
  leftUpper: 28,
  leftFore: -18,
  rightUpper: -28,
  rightFore: 18,
  leftLeg: 0,
  rightLeg: 0,
  headTilt: 0,
  antennaTilt: 0,
}

/** Reveal text word-by-word for the closed FAB teaser only. */
async function revealTextWordByWord(
  fullText: string,
  onUpdate: (partial: string) => void,
  reducedMotion: boolean,
): Promise<void> {
  if (reducedMotion || !fullText) {
    onUpdate(fullText)
    return
  }

  const parts = fullText.split(/(\s+)/)
  let built = ''

  for (const part of parts) {
    built += part
    onUpdate(built)
    if (part.trim().length > 0) {
      const pause = Math.min(38 + part.length * 14, 110)
      await new Promise((resolve) => window.setTimeout(resolve, pause))
    }
  }
}

/** Prompt only - never shown in chat. Reply must come from the AI API. */
const AI_GREETING_PROMPT =
  "Greet me as Neura, Himanshu Salunke's portfolio agent. Use 2 short professional sentences. Invite me to ask about his experience, skills, projects, or how to get in touch."

type HistoryItem = { role: 'user' | 'assistant'; content: string }

async function streamNeuraApi(
  message: string,
  history: HistoryItem[],
  onChunk: (fullText: string) => void,
  signal?: AbortSignal,
  pagePath = '/',
  pageHint = '',
): Promise<string> {
  const response = await fetch('/api/neura/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    signal,
    body: JSON.stringify({
      message,
      history,
      stream: true,
      pagePath,
      pageHint,
    }),
  })

  if (!response.ok) {
    let errorMessage = 'Neura could not answer right now.'
    try {
      const errorData = (await response.json()) as { error?: string }
      if (errorData.error) errorMessage = errorData.error
    } catch {
      // keep default
    }
    throw new Error(errorMessage)
  }

  const contentType = response.headers.get('content-type') || ''
  let fullReply = ''

  if (contentType.includes('text/event-stream') && response.body) {
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const parts = buffer.split('\n')
      buffer = parts.pop() || ''

      for (const rawLine of parts) {
        const line = rawLine.trim()
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (!payload || payload === '[DONE]') continue

        let streamEvent: { content?: string; error?: string }
        try {
          streamEvent = JSON.parse(payload) as { content?: string; error?: string }
        } catch {
          continue
        }

        if (streamEvent.error) throw new Error(streamEvent.error)
        if (streamEvent.content) {
          fullReply += streamEvent.content
          onChunk(fullReply)
        }
      }
    }
  } else {
    const data = (await response.json()) as { reply?: string; error?: string }
    if (!data.reply) {
      throw new Error(data.error || 'Neura could not answer right now.')
    }
    fullReply = data.reply
    onChunk(fullReply)
  }

  const trimmed = fullReply.trim()
  if (!trimmed) {
    throw new Error('Neura returned an empty answer.')
  }
  onChunk(trimmed)
  return trimmed
}


function computeBodyPose(pose: Pose, isSpeaking: boolean, t: number): BodyPose {
  // Talk rhythm - confident beats, not frantic
  const beat = Math.sin(t * 3.8)
  const beat2 = Math.sin(t * 3.8 + Math.PI * 0.55)
  const slow = Math.sin(t * 1.9)
  const snap = Math.sin(t * 6.2) * 0.35
  const mix = (Math.sin(t * 1.5) + 1) / 2

  let arms: ArmAngles
  let leftLeg = 0
  let rightLeg = 0
  let headTilt = 0
  let antennaTilt = slow * 5

  switch (pose) {
    case 'wave-right':
      // Cool one-hand "sup" wave - left chill, right flicks
      arms = {
        leftUpper: 36 + slow * 2,
        leftFore: -24,
        rightUpper: -86 + beat * 9 + snap * 4,
        rightFore: 32 + beat * 14 + snap * 6,
      }
      headTilt = 6 + beat * 2
      break
    case 'wave-both':
      // Presenting the portfolio - open hands, chest height, confident
      arms = {
        leftUpper: -62 + beat * 11,
        leftFore: 6 + beat * 13,
        rightUpper: 62 + beat2 * 11,
        rightFore: -6 + beat2 * 13,
      }
      headTilt = 5 + slow * 2
      antennaTilt = beat * 6
      break
    case 'bounce':
      // Introduction spin - arms open, light bob synced to the turn
      {
        const spinBob = Math.sin(t * 5.2)
        arms = {
          leftUpper: -56 + spinBob * 5,
          leftFore: 10 + spinBob * 4,
          rightUpper: 56 + spinBob * 5,
          rightFore: -10 + spinBob * 4,
        }
        leftLeg = spinBob * 5
        rightLeg = -spinBob * 5
        headTilt = spinBob * 3
        antennaTilt = spinBob * 8
      }
      break
    case 'point-down':
      // Slick point - left on hip, right guides downward
      arms = {
        leftUpper: 44 + slow * 2,
        leftFore: -30,
        rightUpper: 52 + beat * 4,
        rightFore: -8 + beat * 6,
      }
      headTilt = 7 + slow * 1.5
      break
    case 'celebrate':
      arms = {
        leftUpper: -78 + beat * 8,
        leftFore: 16 + beat * 10,
        rightUpper: 78 + beat2 * 8,
        rightFore: -16 + beat2 * 10,
      }
      headTilt = 5 + beat * 2
      leftLeg = Math.sin(t * 4.5) * 4
      rightLeg = Math.sin(t * 4.5 + Math.PI) * 4
      break
    default:
      if (isSpeaking) {
        // Swag talk - alternate explain gesture between hands
        const rightExplain = {
          leftUpper: 38 + slow * 2,
          leftFore: -26,
          rightUpper: -50 + beat * 10,
          rightFore: 2 + beat * 15,
        }
        const leftExplain = {
          leftUpper: 14 + beat2 * 10,
          leftFore: 4 + beat2 * 14,
          rightUpper: -34 + slow * 2,
          rightFore: 20,
        }
        arms = {
          leftUpper: rightExplain.leftUpper * (1 - mix) + leftExplain.leftUpper * mix,
          leftFore: rightExplain.leftFore * (1 - mix) + leftExplain.leftFore * mix,
          rightUpper: rightExplain.rightUpper * (1 - mix) + leftExplain.rightUpper * mix,
          rightFore: rightExplain.rightFore * (1 - mix) + leftExplain.rightFore * mix,
        }
        headTilt = 5 + beat * 2.5
      } else {
        arms = {
          leftUpper: 30 + slow * 4,
          leftFore: -18 + slow * 3,
          rightUpper: -28 + slow * 4,
          rightFore: 16 - slow * 3,
        }
        headTilt = slow * 2
      }
  }

  return {
    ...arms,
    leftLeg,
    rightLeg,
    headTilt,
    antennaTilt,
  }
}

function lerpPose(current: BodyPose, target: BodyPose, amount: number): BodyPose {
  return {
    leftUpper: current.leftUpper + (target.leftUpper - current.leftUpper) * amount,
    leftFore: current.leftFore + (target.leftFore - current.leftFore) * amount,
    rightUpper: current.rightUpper + (target.rightUpper - current.rightUpper) * amount,
    rightFore: current.rightFore + (target.rightFore - current.rightFore) * amount,
    leftLeg: current.leftLeg + (target.leftLeg - current.leftLeg) * amount,
    rightLeg: current.rightLeg + (target.rightLeg - current.rightLeg) * amount,
    headTilt: current.headTilt + (target.headTilt - current.headTilt) * amount,
    antennaTilt: current.antennaTilt + (target.antennaTilt - current.antennaTilt) * amount,
  }
}

function useSyncedBodyPose(
  pose: Pose,
  isSpeaking: boolean,
  prefersReducedMotion: boolean | null,
  /** When false (chat closed), stop the rAF loop to free the main thread. */
  enabled: boolean,
): BodyPose {
  const [body, setBody] = useState<BodyPose>(DEFAULT_POSE)
  const bodyRef = useRef<BodyPose>(DEFAULT_POSE)

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      bodyRef.current = DEFAULT_POSE
      setBody(DEFAULT_POSE)
      return
    }

    const start = performance.now()
    let frame = 0

    const loop = (now: number) => {
      const t = (now - start) / 1000
      const target = computeBodyPose(pose, isSpeaking, t)
      bodyRef.current = lerpPose(bodyRef.current, target, isSpeaking ? 0.2 : 0.14)
      setBody(bodyRef.current)
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [pose, isSpeaking, prefersReducedMotion, enabled])

  return body
}

interface NeuraFigureProps {
  body: BodyPose
  blink: boolean
  mouthOpen: boolean
  isSpeaking: boolean
}

const NeuraFigure: React.FC<NeuraFigureProps> = ({
  body,
  blink,
  mouthOpen,
  isSpeaking,
}) => {
  const pose = body

  return (
    <svg
      viewBox="-55 -50 310 320"
      overflow="visible"
      className="relative w-full overflow-visible drop-shadow-[0_10px_28px_rgba(147,51,234,0.4)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="neura-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="55%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="neura-face" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="248" rx="54" ry="9" fill="#9333ea" opacity="0.22" />

      <g transform={`translate(83 216) rotate(${pose.leftLeg})`}>
        <rect x="-13" y="-20" width="26" height="32" rx="13" fill="url(#neura-body)" />
        <ellipse cx="0" cy="16" rx="16" ry="8" fill="url(#neura-face)" />
      </g>
      <g transform={`translate(117 216) rotate(${pose.rightLeg})`}>
        <rect x="-13" y="-20" width="26" height="32" rx="13" fill="url(#neura-body)" />
        <ellipse cx="0" cy="16" rx="16" ry="8" fill="url(#neura-face)" />
      </g>

      <rect x="54" y="124" width="92" height="82" rx="36" fill="url(#neura-body)" />
      <rect x="72" y="144" width="56" height="42" rx="16" fill="#0f172a" opacity="0.32" />
      <circle cx="80" cy="165" r="5" fill="#22d3ee" opacity="0.85" />
      <circle cx="100" cy="165" r="5" fill="#22d3ee" opacity="0.85" />
      <circle cx="120" cy="165" r="5" fill="#22d3ee" opacity="0.85" />

      <g transform={`translate(100 88) rotate(${pose.headTilt})`}>
        <circle cx="0" cy="0" r="56" fill="url(#neura-face)" />
        <circle cx="0" cy="6" r="46" fill="#7c3aed" opacity="0.2" />

        <g transform={`rotate(${pose.antennaTilt})`}>
          <rect x="-3" y="-66" width="6" height="24" rx="3" fill="#ddd6fe" />
          <circle cx="0" cy="-70" r="10" fill="#22d3ee" />
        </g>

        <ellipse cx="-24" cy="-4" rx="17" ry={blink ? 2 : 19} fill="white" />
        <ellipse cx="24" cy="-4" rx="17" ry={blink ? 2 : 19} fill="white" />
        {!blink && (
          <>
            <circle cx="-20" cy="-2" r="8" fill="#0f172a" />
            <circle cx="20" cy="-2" r="8" fill="#0f172a" />
            <circle cx="-17" cy="-7" r="3" fill="white" />
            <circle cx="23" cy="-7" r="3" fill="white" />
          </>
        )}

        {mouthOpen && isSpeaking ? (
          <ellipse cx="0" cy="24" rx="16" ry="12" fill="#1e1b4b" />
        ) : isSpeaking ? (
          <ellipse cx="0" cy="24" rx="14" ry="5" fill="#1e1b4b" />
        ) : (
          <path
            d="M -16 20 Q 0 30 16 20"
            stroke="#1e1b4b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        )}

        <circle cx="-40" cy="10" r="9" fill="#f472b6" opacity="0.38" />
        <circle cx="40" cy="10" r="9" fill="#f472b6" opacity="0.38" />
      </g>
    </svg>
  )
}

const NeuraDisplay: React.FC<NeuraFigureProps> = (props) => (
  <div className="relative aspect-[200/260] w-full">
    <NeuraFigure {...props} />
  </div>
)

/** Mini Neura for the closed chatbot launcher - full body, arms/legs visible */
const FAB_TEASER = "Neura Agent - ask about Himanshu's experience, skills, or projects."
const FAB_SEEN_KEY = 'neura-fab-seen-v2'
const MAX_CHAT_LENGTH = 500

type BubbleVariant = 'default' | 'warning' | 'live' | 'user'

interface NeuraMessageBubbleProps {
  children: React.ReactNode
  variant?: BubbleVariant
  tail?: 'left' | 'right' | 'none'
  sender?: string
  className?: string
  /** Render assistant replies as Markdown lists/headings */
  markdown?: boolean
}

const neuraMarkdownOptions = {
  forceBlock: true,
  overrides: {
    h1: {
      component: 'h3',
      props: { className: 'mb-1.5 mt-2 text-sm font-semibold first:mt-0' },
    },
    h2: {
      component: 'h3',
      props: { className: 'mb-1.5 mt-2 text-sm font-semibold first:mt-0' },
    },
    h3: {
      props: { className: 'mb-1.5 mt-2 text-sm font-semibold first:mt-0' },
    },
    h4: {
      props: { className: 'mb-1 mt-2 text-sm font-semibold first:mt-0' },
    },
    p: {
      props: { className: 'mb-2 last:mb-0' },
    },
    ul: {
      props: { className: 'mb-2 list-disc space-y-1 pl-4 last:mb-0' },
    },
    ol: {
      props: { className: 'mb-2 list-decimal space-y-1 pl-4 last:mb-0' },
    },
    li: {
      props: { className: 'leading-snug' },
    },
    strong: {
      props: { className: 'font-semibold' },
    },
    a: {
      props: {
        className: 'font-medium underline underline-offset-2 break-all',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
    code: {
      props: {
        className:
          'rounded bg-black/5 px-1 py-0.5 font-mono text-[0.75em] dark:bg-white/10',
      },
    },
  },
} as const

const bubbleStyles: Record<BubbleVariant, string> = {
  default:
    'border-purple-400/60 bg-white text-neutral-950 shadow-lg shadow-purple-950/15 dark:border-purple-400/45 dark:bg-[#1c0f33] dark:text-neutral-50 dark:shadow-black/50',
  warning:
    'border-amber-500/60 bg-amber-50 text-amber-950 shadow-lg shadow-amber-950/10 dark:border-amber-400/45 dark:bg-[#3a2410] dark:text-amber-50 dark:shadow-black/50',
  live:
    'border-cyan-500/60 bg-cyan-50 text-neutral-950 shadow-lg shadow-cyan-950/10 dark:border-cyan-400/40 dark:bg-[#0c2a33] dark:text-cyan-50 dark:shadow-black/50',
  user:
    'border-blue-400/60 bg-blue-50 text-neutral-950 shadow-lg shadow-blue-950/10 dark:border-blue-400/40 dark:bg-[#122038] dark:text-blue-50 dark:shadow-black/50',
}

const NeuraMessageBubble: React.FC<NeuraMessageBubbleProps> = ({
  children,
  variant = 'default',
  tail = 'left',
  sender,
  className = '',
  markdown = false,
}) => {
  const tailClass =
    tail === 'right'
      ? 'rounded-br-sm sm:rounded-br-md'
      : tail === 'left'
        ? 'rounded-bl-sm sm:rounded-bl-md'
        : 'rounded-2xl'

  const body =
    markdown && typeof children === 'string' ? (
      <Markdown options={neuraMarkdownOptions}>{children}</Markdown>
    ) : (
      children
    )

  return (
    <div
      className={`relative isolate max-w-full rounded-2xl border px-3 py-2.5 text-[0.8125rem] leading-relaxed sm:px-3.5 sm:py-2.5 sm:text-sm ${bubbleStyles[variant]} ${tailClass} ${className}`}
    >
      {sender && (
        <p
          className={`mb-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
            variant === 'user'
              ? 'text-blue-700 dark:text-blue-200'
              : 'text-purple-700 dark:text-purple-200'
          }`}
        >
          {sender}
        </p>
      )}
      <div className="relative z-[1] break-words text-inherit [overflow-wrap:anywhere] [&_*]:text-inherit">
        {body}
      </div>
      {tail !== 'none' && (
        <span
          className={`absolute -bottom-1.5 h-2.5 w-2.5 rotate-45 border-b border-r ${
            variant === 'default'
              ? 'border-purple-400/60 bg-white dark:border-purple-400/45 dark:bg-[#1c0f33]'
              : variant === 'user'
                ? 'border-blue-400/60 bg-blue-50 dark:border-blue-400/40 dark:bg-[#122038]'
                : variant === 'live'
                  ? 'border-cyan-500/60 bg-cyan-50 dark:border-cyan-400/40 dark:bg-[#0c2a33]'
                  : 'border-amber-500/60 bg-amber-50 dark:border-amber-400/45 dark:bg-[#3a2410]'
          } ${tail === 'right' ? 'right-5' : 'left-5'}`}
          aria-hidden
        />
      )}
    </div>
  )
}


const NeuraFabPreview: React.FC<{ body: BodyPose; blink: boolean }> = ({ body, blink }) => (
  <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
    <div className="w-[148px] origin-bottom translate-y-[2%] scale-[0.82] sm:w-[178px] sm:scale-[0.9] md:w-[188px] md:scale-[0.94]">
      <NeuraFigure body={body} blink={blink} mouthOpen={false} isSpeaking={false} />
    </div>
  </div>
)

export const CartoonLivingEntity: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()
  const [pose, setPose] = useState<Pose>('idle')
  const [blink, setBlink] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(() => !!localStorage.getItem(STORAGE_KEY))
  const [showFabTeaser, setShowFabTeaser] = useState(() => !localStorage.getItem(FAB_SEEN_KEY))
  const [fabTeaserText, setFabTeaserText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadPersistedThread())
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [chatError, setChatError] = useState('')
  const [copyFlash, setCopyFlash] = useState('')
  const welcomeInFlightRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const idleIntroStartedRef = useRef(false)
  const clearSessionOnExitRef = useRef(false)
  const chatRequestAbortRef = useRef<AbortController | null>(null)
  const askInFlightRef = useRef(false)
  const persistReadyRef = useRef(false)

  const body = useSyncedBodyPose(pose, false, prefersReducedMotion, isOpen)
  const pageHint = useMemo(() => pageContextHint(location.pathname), [location.pathname])

  const lastUserText = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'user') return messages[i].text
    }
    return ''
  }, [messages])

  const lastAssistant = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'assistant' && messages[i].text.trim()) return messages[i]
    }
    return null
  }, [messages])

  const followUps = useMemo(() => {
    if (!lastAssistant || isThinking) return []
    return getFollowUpChips(lastUserText, lastAssistant.text)
  }, [lastAssistant, lastUserText, isThinking])

  const linkCards = useMemo(() => {
    if (!lastAssistant || isThinking) return []
    return extractPortfolioLinks(lastAssistant.text)
  }, [lastAssistant, isThinking])

  useEffect(() => {
    persistReadyRef.current = true
  }, [])

  useEffect(() => {
    if (!persistReadyRef.current) return
    savePersistedThread(messages)
  }, [messages])

  const beginChatRequest = useCallback(() => {
    chatRequestAbortRef.current?.abort()
    const controller = new AbortController()
    chatRequestAbortRef.current = controller
    return controller
  }, [])

  const stopGeneration = useCallback(() => {
    chatRequestAbortRef.current?.abort()
    chatRequestAbortRef.current = null
    askInFlightRef.current = false
    setIsThinking(false)
    welcomeInFlightRef.current = false
    trackNeuraEvent('neura_stop_generation')
  }, [])

  const playWelcome = useCallback(async () => {
    if (welcomeInFlightRef.current || isThinking) return
    // Do not wipe a restored thread with a fresh greeting.
    if (messages.some((m) => m.text.trim().length > 0)) {
      localStorage.setItem(STORAGE_KEY, '1')
      setHasWelcomed(true)
      return
    }

    welcomeInFlightRef.current = true
    setChatError('')
    idleIntroStartedRef.current = true
    setIsThinking(true)
    setPose('wave-both')

    const assistantId = `welcome-${Date.now()}`
    const controller = beginChatRequest()
    const timeoutId = window.setTimeout(() => controller.abort(), 45000)

    try {
      let assistantStarted = false

      await streamNeuraApi(
        AI_GREETING_PROMPT,
        [],
        (partial) => {
          if (controller.signal.aborted) return
          setIsThinking(false)
          if (!assistantStarted) {
            assistantStarted = true
            setMessages([{ id: assistantId, role: 'assistant', text: partial }])
            return
          }
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantId ? { ...msg, text: partial } : msg)),
          )
        },
        controller.signal,
        location.pathname,
        pageHint,
      )

      if (!controller.signal.aborted) {
        setIsThinking(false)
        setPose('idle')
      }
    } catch {
      if (!controller.signal.aborted) {
        setIsThinking(false)
        setMessages((prev) => prev.filter((msg) => msg.text.trim().length > 0))
        setChatError(OFFLINE_FAQ)
      }
    } finally {
      window.clearTimeout(timeoutId)
      if (chatRequestAbortRef.current === controller) {
        chatRequestAbortRef.current = null
      }
      localStorage.setItem(STORAGE_KEY, '1')
      setHasWelcomed(true)
      setPose('idle')
      welcomeInFlightRef.current = false
    }
  }, [isThinking, beginChatRequest, messages, location.pathname, pageHint])

  const tryAutoWelcome = useCallback(() => {
    if (welcomeInFlightRef.current || !isOpen) return
    if (messages.some((m) => m.text.trim().length > 0)) {
      localStorage.setItem(STORAGE_KEY, '1')
      setHasWelcomed(true)
      return
    }
    if (localStorage.getItem(STORAGE_KEY)) return
    playWelcome()
  }, [playWelcome, isOpen, messages])

  const openChat = useCallback(() => {
    clearSessionOnExitRef.current = false
    setShowFabTeaser(false)
    setIsOpen(true)
    if (!localStorage.getItem(FAB_SEEN_KEY)) {
      localStorage.setItem(FAB_SEEN_KEY, '1')
    }
    trackNeuraEvent('neura_open', { path: location.pathname })
  }, [location.pathname])

  const minimizeChat = useCallback(() => {
    if (!isOpen) return
    clearSessionOnExitRef.current = false
    setIsOpen(false)
  }, [isOpen])

  /** Close hides the panel but keeps the conversation for this visit. */
  const closeChat = useCallback(() => {
    if (!isOpen) return
    clearSessionOnExitRef.current = false
    chatRequestAbortRef.current?.abort()
    chatRequestAbortRef.current = null
    setIsThinking(false)
    welcomeInFlightRef.current = false
    setIsOpen(false)
  }, [isOpen])

  const clearChat = useCallback(() => {
    chatRequestAbortRef.current?.abort()
    chatRequestAbortRef.current = null
    askInFlightRef.current = false
    setIsThinking(false)
    welcomeInFlightRef.current = false
    idleIntroStartedRef.current = false
    setMessages([])
    setInput('')
    setChatError('')
    clearPersistedThread()
    trackNeuraEvent('neura_clear_chat')
  }, [])

  const handlePanelExitComplete = useCallback(() => {
    if (!clearSessionOnExitRef.current) return
    clearSessionOnExitRef.current = false
    setMessages([])
    setInput('')
    setChatError('')
    idleIntroStartedRef.current = false
  }, [])

  const toggleChat = useCallback(() => {
    if (isOpen) minimizeChat()
    else openChat()
  }, [isOpen, openChat, minimizeChat])

  const askNeura = useCallback(
    async (rawText: string) => {
      const text = rawText.trim().slice(0, MAX_CHAT_LENGTH)
      // Ref blocks double-clicks before React re-renders isThinking.
      if (!text || askInFlightRef.current || isThinking) return

      askInFlightRef.current = true
      setChatError('')
      setInput('')
      setIsThinking(true)
      trackNeuraEvent('neura_ask', { path: location.pathname, preview: text.slice(0, 80) })

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text,
      }

      const historyPayload: HistoryItem[] = messages
        .filter(
          (msg) =>
            (msg.role === 'user' || msg.role === 'assistant') &&
            msg.text.trim().length > 0,
        )
        .slice(-6)
        .map((msg) => ({ role: msg.role, content: msg.text.trim() }))

      const assistantId = `assistant-${Date.now()}`
      setMessages((prev) => [...prev, userMessage])

      const controller = beginChatRequest()
      const timeoutId = window.setTimeout(() => controller.abort(), 35000)

      try {
        let assistantStarted = false

        await streamNeuraApi(
          text,
          historyPayload,
          (partial) => {
            if (controller.signal.aborted) return
            setIsThinking(false)
            if (!assistantStarted) {
              assistantStarted = true
              setMessages((prev) => [
                ...prev,
                { id: assistantId, role: 'assistant', text: partial },
              ])
              return
            }
            setMessages((prev) =>
              prev.map((msg) => (msg.id === assistantId ? { ...msg, text: partial } : msg)),
            )
          },
          controller.signal,
          location.pathname,
          pageHint,
        )

        if (!controller.signal.aborted) setIsThinking(false)
      } catch (error) {
        if (controller.signal.aborted) {
          setIsThinking(false)
          return
        }
        const fallback =
          error instanceof Error
            ? error.name === 'AbortError'
              ? 'That took too long. Please try again.'
              : error.message
            : 'Something went wrong. Please try again in a moment.'
        setChatError(`${fallback}\n\n${OFFLINE_FAQ}`)
        setMessages((prev) => {
          const withoutEmpty = prev.filter(
            (msg) => msg.id !== assistantId || msg.text.trim().length > 0,
          )
          return withoutEmpty
        })
        setIsThinking(false)
        trackNeuraEvent('neura_error', { message: fallback.slice(0, 120) })
      } finally {
        askInFlightRef.current = false
        window.clearTimeout(timeoutId)
        if (chatRequestAbortRef.current === controller) {
          chatRequestAbortRef.current = null
        }
      }
    },
    [isThinking, messages, beginChatRequest, location.pathname, pageHint],
  )

  const sendMessage = useCallback(
    async (event?: React.FormEvent) => {
      event?.preventDefault()
      await askNeura(input)
    },
    [askNeura, input],
  )

  const handleQuickAction = useCallback(
    async (action: (typeof QUICK_ACTIONS)[number]) => {
      if (action.copyText) {
        try {
          await navigator.clipboard.writeText(action.copyText)
          setCopyFlash(action.id)
          window.setTimeout(() => setCopyFlash(''), 1600)
          trackNeuraEvent('neura_copy', { id: action.id })
        } catch {
          setChatError(`Could not copy. Value: ${action.copyText}`)
        }
        return
      }
      if (action.href) {
        trackNeuraEvent('neura_action_link', { id: action.id, href: action.href })
        window.open(action.href, action.href.endsWith('.pdf') ? '_blank' : '_self')
        return
      }
      if (action.prompt) await askNeura(action.prompt)
    },
    [askNeura],
  )

  const setFeedback = useCallback((messageId: string, value: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, feedback: value } : m)),
    )
    trackNeuraEvent('neura_feedback', { messageId, value })
  }, [])

  useEffect(() => {
    if (!isOpen || hasWelcomed) return
    const timer = window.setTimeout(() => tryAutoWelcome(), 400)
    return () => window.clearTimeout(timer)
  }, [isOpen, hasWelcomed, tryAutoWelcome])

  useEffect(() => {
    if (!isOpen || !hasWelcomed) return
    if (welcomeInFlightRef.current || idleIntroStartedRef.current) return

    // Returning visitors with an existing thread should not re-fetch a greeting.
    if (messages.length > 0) {
      idleIntroStartedRef.current = true
      return
    }

    idleIntroStartedRef.current = true
    const messageId = `idle-intro-${Date.now()}`
    let cancelled = false
    let assistantStarted = false
    const controller = beginChatRequest()
    const timeoutId = window.setTimeout(() => controller.abort(), 45000)

    setIsThinking(true)

    ;(async () => {
      try {
        await streamNeuraApi(
          AI_GREETING_PROMPT,
          [],
          (partial) => {
            if (cancelled || controller.signal.aborted) return
            setIsThinking(false)
            if (!assistantStarted) {
              assistantStarted = true
              setMessages([{ id: messageId, role: 'assistant', text: partial }])
              return
            }
            setMessages((prev) =>
              prev.map((msg) => (msg.id === messageId ? { ...msg, text: partial } : msg)),
            )
          },
          controller.signal,
          location.pathname,
          pageHint,
        )
        if (!cancelled && !controller.signal.aborted) setIsThinking(false)
      } catch {
        if (!cancelled && !controller.signal.aborted) {
          setIsThinking(false)
          setMessages((prev) => prev.filter((msg) => msg.id !== messageId || msg.text.trim()))
          setChatError(OFFLINE_FAQ)
        }
      } finally {
        window.clearTimeout(timeoutId)
        if (chatRequestAbortRef.current === controller) {
          chatRequestAbortRef.current = null
        }
      }
    })()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      controller.abort()
      if (chatRequestAbortRef.current === controller) {
        chatRequestAbortRef.current = null
      }
      // Allow a remount (e.g. React Strict Mode) to retry if no tokens arrived yet.
      if (!assistantStarted) {
        idleIntroStartedRef.current = false
        setIsThinking(false)
      }
    }
    // messages.length is read once on open intentionally. Including it in deps
    // re-runs/aborts the stream and leaves the Thinking state stuck.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hasWelcomed, beginChatRequest, location.pathname, pageHint])

  useEffect(() => {
    if (isOpen || !showFabTeaser) return

    let cancelled = false
    setFabTeaserText('')

    const start = window.setTimeout(() => {
      void revealTextWordByWord(
        FAB_TEASER,
        (partial) => {
          if (!cancelled) setFabTeaserText(partial)
        },
        !!prefersReducedMotion,
      )
    }, prefersReducedMotion ? 0 : 700)

    return () => {
      cancelled = true
      window.clearTimeout(start)
    }
  }, [isOpen, showFabTeaser, prefersReducedMotion])

  useEffect(() => {
    // Blink only while chat is open - closed FAB stays static for main-thread savings.
    if (!isOpen || prefersReducedMotion) {
      setBlink(false)
      return
    }

    const blinkLoop = window.setInterval(() => {
      setBlink(true)
      window.setTimeout(() => setBlink(false), 130)
    }, 2800)

    return () => window.clearInterval(blinkLoop)
  }, [isOpen, prefersReducedMotion])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [messages, isThinking, isOpen, prefersReducedMotion])

  useEffect(() => {
    if (!isOpen || isThinking) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180)
    return () => window.clearTimeout(timer)
  }, [isOpen, isThinking])

  const bodyMotion =
    pose === 'bounce' || pose === 'celebrate'
      ? { y: [0, -8, -4, -9, 0] }
      : { y: [0, -5, -2, -6, 0], rotate: [0, 0.8, -0.8, 0] }

  return (
    <div
      className="pointer-events-none fixed z-[60] flex flex-col items-end gap-2 sm:gap-3"
      style={{
        bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <AnimatePresence mode="wait" onExitComplete={handlePanelExitComplete}>
        {isOpen ? (
          <motion.div
            key="neura-chat-panel"
            role="dialog"
            aria-label="Neura agent"
            aria-modal="false"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: prefersReducedMotion ? 0.14 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex max-h-[min(calc(100dvh-5.5rem),40rem)] w-[min(calc(100vw-1.25rem),24.5rem)] flex-col overflow-hidden rounded-2xl border border-purple-500/30 bg-white/55 shadow-2xl shadow-purple-500/20 backdrop-blur-md dark:border-purple-500/40 dark:bg-[#0a0018]/70 sm:w-[min(calc(100vw-2rem),26.5rem)]"
          >
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-2 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/15 via-blue-500/10 to-cyan-500/10 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3 dark:border-purple-500/30">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>
                <div className="min-w-0">
                  <div className="flex min-w-0 items-baseline gap-1.5">
                    <span className="truncate text-sm font-semibold text-purple-900 dark:text-purple-50">
                      Neura
                    </span>
                    <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-wide text-purple-700/85 dark:text-purple-200/85">
                      Agent
                    </span>
                  </div>
                  <p className="truncate text-[0.65rem] text-purple-700/75 dark:text-purple-300/75">
                    Built by Himanshu
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={clearChat}
                  className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-purple-700 transition-colors hover:bg-purple-500/10 dark:text-purple-100 dark:hover:bg-purple-500/20 sm:h-9 sm:w-9"
                  aria-label="Clear Neura chat"
                  title="Clear chat"
                >
                  <Eraser className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={minimizeChat}
                  className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-purple-700 transition-colors hover:bg-purple-500/10 dark:text-purple-100 dark:hover:bg-purple-500/20 sm:h-9 sm:w-9"
                  aria-label="Minimize Neura chat"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-purple-700 transition-colors hover:bg-purple-500/10 dark:text-purple-100 dark:hover:bg-purple-500/20 sm:h-9 sm:w-9"
                  aria-label="Close Neura chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[19rem] flex-1 sm:min-h-[22.5rem]">
              {/* Neura stays visible as a soft watermark behind chat - not removed */}
              <div
                className="pointer-events-none absolute inset-0 flex items-end justify-center pb-0 pt-10 opacity-[0.4]"
                aria-hidden
              >
                <div className="relative mx-auto w-[clamp(9.5rem,48vw,14.5rem)] translate-y-[8%] overflow-visible">
                  <motion.div
                    className="overflow-visible"
                    animate={prefersReducedMotion ? undefined : bodyMotion}
                    transition={{
                      duration: pose === 'bounce' || pose === 'celebrate' ? 0.75 : 4,
                      repeat: pose === 'bounce' ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/25 to-cyan-400/15 blur-xl sm:-inset-4" />
                    <NeuraDisplay body={body} blink={blink} mouthOpen={false} isSpeaking={false} />
                  </motion.div>
                </div>
              </div>

              <div className="absolute inset-0 z-10 flex flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-2 pt-2.5 sm:px-4 sm:pt-3">
                  <div className="flex flex-col items-stretch justify-start gap-2.5 sm:gap-3">
                    {messages
                      .filter((msg) => msg.role === 'user' || msg.text.trim().length > 0)
                      .map((msg) => (
                      <div
                        key={msg.id}
                        className={
                          msg.role === 'user'
                            ? 'flex w-full justify-end'
                            : 'flex w-full flex-col items-start gap-1.5'
                        }
                      >
                        <NeuraMessageBubble
                          variant={msg.role === 'user' ? 'user' : 'default'}
                          tail={msg.role === 'user' ? 'right' : 'left'}
                          sender={msg.role === 'user' ? 'You' : 'Neura'}
                          markdown={msg.role === 'assistant'}
                          className="w-fit max-w-[92%] sm:max-w-[95%]"
                        >
                          {msg.text}
                        </NeuraMessageBubble>
                        {msg.role === 'assistant' &&
                          lastAssistant?.id === msg.id &&
                          !isThinking && (
                            <div className="flex flex-wrap items-center gap-1 pl-1">
                              <button
                                type="button"
                                onClick={() => setFeedback(msg.id, 'up')}
                                className={`inline-flex h-7 w-7 touch-manipulation items-center justify-center rounded-full border transition ${
                                  msg.feedback === 'up'
                                    ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                    : 'border-purple-400/25 text-purple-700 hover:bg-purple-500/10 dark:text-purple-200'
                                }`}
                                aria-label="Helpful answer"
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setFeedback(msg.id, 'down')}
                                className={`inline-flex h-7 w-7 touch-manipulation items-center justify-center rounded-full border transition ${
                                  msg.feedback === 'down'
                                    ? 'border-rose-400/50 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                                    : 'border-purple-400/25 text-purple-700 hover:bg-purple-500/10 dark:text-purple-200'
                                }`}
                                aria-label="Unhelpful answer"
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                      </div>
                    ))}
                    {isThinking && (
                      <div className="flex w-full justify-start">
                        <NeuraMessageBubble
                          variant="live"
                          sender="Neura"
                          className="w-fit max-w-[92%] sm:max-w-[95%]"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                            Thinking…
                          </span>
                        </NeuraMessageBubble>
                      </div>
                    )}
                    {chatError && (
                      <div className="flex w-full justify-start">
                        <NeuraMessageBubble
                          variant="warning"
                          sender="Neura"
                          tail="none"
                          markdown
                          className="w-fit max-w-full"
                        >
                          {chatError}
                        </NeuraMessageBubble>
                      </div>
                    )}

                    {!isThinking && linkCards.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-0.5">
                        {linkCards.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.href.endsWith('.pdf') ? '_blank' : undefined}
                            rel={link.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                            className="inline-flex max-w-full items-center gap-1 rounded-full border border-purple-400/30 bg-white/80 px-2.5 py-1 text-[0.7rem] font-medium text-purple-900 shadow-sm dark:border-purple-400/25 dark:bg-[#16082a] dark:text-purple-100"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                            <span className="truncate capitalize">{link.label}</span>
                          </a>
                        ))}
                      </div>
                    )}

                    {!isThinking && messages.length === 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {STARTER_CHIPS.map((chip) => (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => void askNeura(chip.prompt)}
                            className="rounded-full border border-purple-400/30 bg-white/80 px-2.5 py-1 text-[0.7rem] font-medium text-purple-900 transition hover:bg-purple-500/10 dark:border-purple-400/25 dark:bg-[#16082a] dark:text-purple-100 dark:hover:bg-purple-500/20"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {!isThinking && lastAssistant && followUps.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {followUps.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => void askNeura(chip)}
                            className="rounded-full border border-cyan-400/30 bg-cyan-50/80 px-2.5 py-1 text-[0.7rem] font-medium text-cyan-950 transition hover:bg-cyan-500/15 dark:border-cyan-400/25 dark:bg-cyan-950/50 dark:text-cyan-50"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 shrink-0 border-t border-purple-500/15 bg-white/70 px-3 pb-3 pt-2 backdrop-blur-md dark:border-purple-500/25 dark:bg-[#0a0018]/75 sm:px-4 sm:pb-4 sm:pt-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => void handleQuickAction(action)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-purple-400/30 bg-white/85 px-2.5 py-1 text-[0.68rem] font-semibold text-purple-900 dark:border-purple-400/25 dark:bg-[#16082a] dark:text-purple-100"
                  >
                    {action.copyText ? (
                      copyFlash === action.id ? (
                        <Check className="h-3 w-3" aria-hidden />
                      ) : (
                        <Copy className="h-3 w-3" aria-hidden />
                      )
                    ) : null}
                    {action.label}
                  </button>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex items-center gap-1.5 sm:gap-2">
                <label htmlFor="neura-chat-input" className="sr-only">
                  Ask Neura about the portfolio
                </label>
                <input
                  ref={inputRef}
                  id="neura-chat-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, MAX_CHAT_LENGTH))}
                  disabled={isThinking}
                  maxLength={MAX_CHAT_LENGTH}
                  placeholder="Ask about skills, projects, work…"
                  className="min-w-0 flex-1 rounded-full border border-purple-400/40 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-purple-400/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 disabled:opacity-60 dark:border-purple-400/30 dark:bg-[#120024]/90 dark:text-purple-50 dark:placeholder:text-purple-300/50 dark:focus:border-purple-400 dark:focus:ring-purple-400/20"
                  autoComplete="off"
                />
                {isThinking ? (
                  <button
                    type="button"
                    onClick={stopGeneration}
                    className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/15 text-rose-700 shadow-sm dark:text-rose-200"
                    aria-label="Stop Neura response"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white shadow-md shadow-purple-500/25 transition enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
                    aria-label="Send message to Neura"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="neura-fab-stack"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2 sm:gap-3"
          >
            {showFabTeaser && fabTeaserText && (
              <button
                type="button"
                onClick={openChat}
                className="pointer-events-auto w-[min(calc(100vw-1.5rem),17.5rem)] text-left sm:w-[min(calc(100vw-2rem),18.5rem)]"
                aria-label="Open Neura agent"
              >
                <NeuraMessageBubble tail="right" className="shadow-md shadow-purple-500/15">
                  {fabTeaserText}
                </NeuraMessageBubble>
              </button>
            )}

            <button
              type="button"
              onClick={toggleChat}
              className="pointer-events-auto group relative h-[5.25rem] w-[5.25rem] touch-manipulation overflow-visible rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#030014] sm:h-[6.5rem] sm:w-[6.5rem] md:h-[7rem] md:w-[7rem]"
              aria-label={messages.length > 0 ? 'Restore Neura chat' : 'Open Neura agent'}
            >
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-blue-500/25 via-purple-500/30 to-cyan-400/25 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-transform group-hover:scale-[1.03] dark:border-purple-400/45 dark:from-blue-500/30 dark:via-purple-500/35 dark:to-cyan-400/30" />
              <NeuraFabPreview body={body} blink={blink} />
              {showFabTeaser && (
                <span className="absolute -right-0.5 -top-0.5 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#0a0018]">
                  <span className="sr-only">New message</span>
                </span>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/35 bg-white/98 text-purple-700 shadow-md dark:border-purple-400/45 dark:bg-[#0a0a18]/98 dark:text-purple-100 sm:h-8 sm:w-8">
                <MessageCircle className="h-4 w-4" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
