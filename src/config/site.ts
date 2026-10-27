import questionData from '../../shared/questions.json'

/** Everything staff may want to tweak lives here (and in shared/questions.json). */

export interface Question {
  id: string
  prompt: string
  /** Case-insensitive; an answer counts if it contains any of these phrases. */
  acceptedAnswers: string[]
}

export const questions: Question[] = questionData.questions

export const siteConfig = {
  logoLetter: 'G',
  brandTitle: 'Pick Me Ups!',
  intro: 'Answer a quick question about the Counseling Center to get a keepsake!',
  wrongAnswerText: 'Wrong Answer! Try Again',
  inputPlaceholder: 'Enter your answer here',
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
