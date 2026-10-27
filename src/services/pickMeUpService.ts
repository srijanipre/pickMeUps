import { questions, siteConfig } from '../config/site'
import { isAcceptedAnswer } from './validateAnswer'

export interface SubmitRequest {
  questionId: string
  answer: string
}

export type SubmitResult =
  | { status: 'correct'; code: string }
  | { status: 'incorrect' }
  | { status: 'error'; message: string }

export interface PickMeUpService {
  submitAnswer(request: SubmitRequest): Promise<SubmitResult>
}

/** Demo flow: validates in the browser and returns the demo code. Never ships a real PIN. */
export const demoService: PickMeUpService = {
  async submitAnswer({ questionId, answer }) {
    await new Promise((r) => setTimeout(r, 450))
    const question = questions.find((q) => q.id === questionId)
    if (!question) return { status: 'error', message: 'Unknown question.' }
    return isAcceptedAnswer(answer, question.acceptedAnswers)
      ? { status: 'correct', code: siteConfig.demoCode }
      : { status: 'incorrect' }
  },
}

/**
 * Production flow: the server validates the answer and only then returns the
 * mailbox PIN. See server/index.mjs for the reference implementation.
 */
export function createApiService(baseUrl: string): PickMeUpService {
  const endpoint = `${baseUrl.replace(/\/$/, '')}/api/pick-me-ups/submit`
  return {
    async submitAnswer(request) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        })
        if (!res.ok) return { status: 'error', message: 'Something went wrong. Please try again.' }
        const data = (await res.json()) as { correct: boolean; code?: string }
        if (data.correct && data.code) return { status: 'correct', code: data.code }
        return { status: 'incorrect' }
      } catch {
        return { status: 'error', message: 'Could not reach the server. Check your connection and try again.' }
      }
    },
  }
}

const apiBase = import.meta.env.VITE_API_BASE_URL as string | undefined
export const pickMeUpService: PickMeUpService = apiBase ? createApiService(apiBase) : demoService
