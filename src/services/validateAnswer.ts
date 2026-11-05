/** Shared normalisation + matching used by the demo flow (and mirrored in server/index.mjs). */
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isCorrectAnswer(answer: string, correct: string): boolean {
  const normalized = normalizeAnswer(answer)
  return normalized.length > 0 && normalized === normalizeAnswer(correct)
}
