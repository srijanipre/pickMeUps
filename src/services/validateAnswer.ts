/** Shared normalisation + matching used by the demo flow (and mirrored in server/index.mjs). */
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isAcceptedAnswer(answer: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(answer)
  if (!normalized) return false
  return accepted.some((phrase) => {
    const p = normalizeAnswer(phrase)
    return p.length > 0 && normalized.includes(p)
  })
}
