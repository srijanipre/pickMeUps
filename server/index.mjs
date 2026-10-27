/**
 * Reference production API for Pick Me Ups.
 *
 * - Validates the answer server-side (same rules as the browser demo).
 * - Only returns the mailbox PIN after a correct answer.
 * - The PIN is never in the frontend bundle. Staff update it via the
 *   MAILBOX_PIN environment variable or the server/pin.txt file (re-read on
 *   every request, so no restart is needed after editing the file).
 *
 * Run:  MAILBOX_PIN=123456 node server/index.mjs   (default port 8787)
 */
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT ?? 8787)
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*'
const PIN_FILE = join(here, 'pin.txt')

const { questions } = JSON.parse(readFileSync(join(here, '..', 'shared', 'questions.json'), 'utf8'))

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isAccepted(answer, accepted) {
  const n = normalize(answer)
  if (!n) return false
  return accepted.some((p) => {
    const np = normalize(p)
    return np.length > 0 && n.includes(np)
  })
}

function readPin() {
  if (process.env.MAILBOX_PIN) return process.env.MAILBOX_PIN.trim()
  if (existsSync(PIN_FILE)) return readFileSync(PIN_FILE, 'utf8').trim()
  throw new Error('No PIN configured. Set MAILBOX_PIN or create server/pin.txt')
}

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(body))
}

createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {})
  if (req.method !== 'POST' || req.url !== '/api/pick-me-ups/submit') {
    return send(res, 404, { error: 'Not found' })
  }

  let raw = ''
  req.on('data', (chunk) => {
    raw += chunk
    if (raw.length > 4096) req.destroy()
  })
  req.on('end', () => {
    try {
      const { questionId, answer } = JSON.parse(raw || '{}')
      const question = questions.find((q) => q.id === questionId)
      if (!question) return send(res, 400, { error: 'Unknown question' })
      if (!isAccepted(answer, question.acceptedAnswers)) return send(res, 200, { correct: false })
      return send(res, 200, { correct: true, code: readPin() })
    } catch (err) {
      console.error(err)
      return send(res, 500, { error: 'Server error' })
    }
  })
}).listen(PORT, () => {
  console.log(`Pick Me Ups API listening on http://localhost:${PORT}`)
})
