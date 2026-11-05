import questionData from '../../shared/questions.json'

/** Everything staff may want to tweak lives here (and in shared/questions.json). */

export interface Question {
  id: string
  type: 'multiple-choice' | 'true-false'
  prompt: string
  /** Multiple-choice only; shuffled on each visit. True/false questions always show True, False. */
  choices?: string[]
  /** The correct choice, spelled exactly as it appears in `choices` (or "True" / "False"). */
  answer: string
}

export const questions = questionData.questions as Question[]

export const siteConfig = {
  logoLetter: 'G',
  brandTitle: 'Pick Me Ups!',
  intro: 'Answer a quick question about the Counseling Center to get a keepsake!',
  wrongAnswerText: 'Wrong Answer! Try Again',
  submitLabel: 'Submit',

  success: {
    titleLine1: 'Your Pick Me Up',
    titleLine2: 'is ready!',
    instruction: 'Enter this code at the mailbox to unlock the box!',
    afterCode: "Please close the latch after you've received it!",
    reminderLabel: 'A little reminder..',
  },

  /** One is chosen at random each time the success screen is shown. */
  reminders: [
    'You are doing better than you think.',
    'Be gentle with yourself today.',
    'Small steps still move you forward.',
    'You are allowed to rest.',
  ],

  howItWorks: {
    heading: 'How it works',
    steps: ['Scan the code', 'Answer a question', 'Unlock the mailbox', 'Take a keepsake'],
  },

  footer: {
    linkText: 'Click here to find out about more resources from the Counseling Center!',
    /** Replace with the Counseling Center resources page. */
    linkHref: '#',
    credits: 'Credits to XYZ',
  },

  /** Code shown in the demo flow only. Production fetches the real PIN from the API. */
  demoCode: '676767',
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** The options to display for a question, in display order. */
export function choicesFor(question: Question): string[] {
  return question.type === 'true-false' ? ['True', 'False'] : shuffle(question.choices ?? [])
}
