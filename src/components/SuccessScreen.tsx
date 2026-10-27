import { motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '../config/site'
import { ArchedTitle } from './ArchedTitle'
import { Mailbox } from './Mailbox'
import { SuccessWave } from './Shapes'
import './SuccessScreen.css'

interface Props {
  code: string
  reminder: string
}

export function SuccessScreen({ code, reminder }: Props) {
  const reduceMotion = useReducedMotion()
  const { titleLine1, titleLine2, instruction, afterCode, reminderLabel } = siteConfig.success
  const digits = code.split('')

  return (
    <div className="success">
      <motion.section
        className="success__hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ArchedTitle line1={titleLine1} line2={titleLine2} />
        <motion.div
          className="success__mailbox"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
        >
          <Mailbox open />
        </motion.div>
        <p className="success__instruction">{instruction}</p>
      </motion.section>

      <section className="success__code-section" aria-labelledby="code-label">
        <h2 id="code-label" className="sr-only">
          Your mailbox code
        </h2>
        <motion.div
          className="success__code"
          role="status"
          aria-live="polite"
          aria-label={`Mailbox code ${digits.join(' ')}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.45, ease: 'easeOut' }}
        >
          <Spark side="left" />
          <span className="success__digits" aria-hidden="true">
            {digits.map((d, i) => (
              <motion.span
                key={i}
                className="success__digit"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
              >
                {d}
              </motion.span>
            ))}
          </span>
          <Spark side="right" />
        </motion.div>
        <p className="success__after">{afterCode}</p>
      </section>

      <motion.section
        className="reminder"
        aria-label="A little reminder"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55, ease: 'easeOut' }}
      >
        <Heart />
        <div className="reminder__text">
          <p className="reminder__label">{reminderLabel}</p>
          <p className="reminder__message">{reminder}</p>
        </div>
      </motion.section>

      <div className="success__wave">
        <SuccessWave />
      </div>
    </div>
  )
}

function Spark({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      className={`success__spark success__spark--${side}`}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <g stroke="var(--pink-soft)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M4 10l30 10M4 20h30M4 30l30-10" />
      </g>
    </svg>
  )
}

function Heart() {
  return (
    <svg className="reminder__heart" viewBox="0 0 64 60" aria-hidden="true">
      <path
        d="M32 56S4 38 4 19C4 10 11 4 19 4c6 0 10 3 13 8 3-5 7-8 13-8 8 0 15 6 15 15 0 19-28 37-28 37z"
        fill="var(--lavender)"
        stroke="var(--blue)"
        strokeWidth="1.5"
      />
    </svg>
  )
}
