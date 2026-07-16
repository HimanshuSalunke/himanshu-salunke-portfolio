import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  buildLiveKnowledge,
  buildNeuraSystemPrompt,
} from '../../../src/lib/neura/buildLiveKnowledge.js'

export const config = {
  supportsResponseStreaming: true,
}

const REQUESTY_URL = 'https://router.requesty.ai/v1/chat/completions'
const DEFAULT_MODEL = process.env.REQUESTY_MODEL || 'openai/gpt-4.1-nano'
const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY = 8

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

function normalizeHistory(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return []

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== 'object') return false
      const role = (item as ChatMessage).role
      const content = (item as ChatMessage).content
      return (
        (role === 'user' || role === 'assistant') &&
        typeof content === 'string' &&
        content.trim().length > 0
      )
    })
    .slice(-MAX_HISTORY)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
}

function writeSse(res: VercelResponse, payload: Record<string, unknown> | string) {
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload)
  res.write(`data: ${data}\n\n`)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.REQUESTY_API_KEY
  if (!apiKey) {
    console.error('Neura chat: REQUESTY_API_KEY is not configured')
    return res.status(500).json({ error: 'Neura AI is not configured yet.' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const history = normalizeHistory(body.history)
    const wantStream = body.stream !== false

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message is too long. Keep it under ${MAX_MESSAGE_LENGTH} characters.`,
      })
    }

    const knowledge = buildLiveKnowledge(process.cwd())
    const messages: ChatMessage[] = [
      { role: 'system', content: buildNeuraSystemPrompt(knowledge) },
      ...history,
      { role: 'user', content: message },
    ]

    const response = await fetch(REQUESTY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VITE_SITE_URL || 'https://himanshu-salunke.vercel.app',
        'X-Title': 'Neura Portfolio Assistant',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 0.35,
        max_tokens: 400,
        stream: wantStream,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Requesty error:', response.status, errorText)
      return res.status(502).json({ error: 'Neura could not reach the AI service right now.' })
    }

    if (!wantStream) {
      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>
      }
      const reply = data.choices?.[0]?.message?.content?.trim()
      if (!reply) {
        return res.status(502).json({ error: 'Neura returned an empty answer.' })
      }
      return res.status(200).json({
        reply,
        model: DEFAULT_MODEL,
      })
    }

    if (!response.body) {
      return res.status(502).json({ error: 'Neura returned an empty stream.' })
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.status(200)

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let fullReply = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (!payload || payload === '[DONE]') continue

        try {
          const chunk = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string } }>
          }
          const content = chunk.choices?.[0]?.delta?.content
          if (content) {
            fullReply += content
            writeSse(res, { content })
          }
        } catch {
          // ignore malformed upstream chunks
        }
      }
    }

    if (!fullReply.trim()) {
      writeSse(res, { error: 'Neura returned an empty answer.' })
    } else {
      writeSse(res, { done: true, model: DEFAULT_MODEL })
    }
    writeSse(res, '[DONE]')
    return res.end()
  } catch (error) {
    console.error('Neura chat API error:', error)
    if (!res.headersSent) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unexpected Neura error',
      })
    }
    writeSse(res, {
      error: error instanceof Error ? error.message : 'Unexpected Neura error',
    })
    return res.end()
  }
}
