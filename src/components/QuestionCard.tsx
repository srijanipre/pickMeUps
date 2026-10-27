import { useId, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { siteConfig, type Question } from '../config/site'
import './QuestionCard.css'

interface Props {
  question: Question
  status: 'idle' | 'submitting' | 'incorrect' | 'error'
  errorMessage?: string
  /** Increments on each wrong answer so the shake animation re-triggers. */
  shakeKey: number
  onSubmit: (answer: string) => void
}

export function QuestionCard({ question, status, errorMessage, shakeKey, onSubmit }: Props) {
  const [answer, setAnswer] = useState('')
  const inputId = useId()
  const feedbackId = useId()
  const reduceMotion = useReducedMotion()
  const submitting = status === 'submitting'
  const showWrong = status === 'incorrect'
  const showError = status === 'error'

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    if (!answer.trim()) {
      ;(e.currentTarget as HTMLFormElement).querySelector('input')?.focus()
      return
    }
    onSubmit(answer)
  }

  return (
    <section className="question" aria-labelledby={`${inputId}-label`}>
      <div className="question__feedback" role="status" aria-live="polite" id={feedbackId}>
        {showWrong && (
          <motion.p
            key="wrong"
            className="question__wrong"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {siteConfig.wrongAnswerText}
          </motion.p>
        )}
        {showError && (
          <motion.p
            key="error"
            className="question__wrong"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage ?? 'Something went wrong. Please try again.'}
          </motion.p>
        )}
      </div>

      <motion.form
        key={shakeKey}
        className="question__card"
        onSubmit={handleSubmit}
        noValidate
        initial={false}
        animate={shakeKey > 0 && !reduceMotion ? { x: [0, -9, 8, -6, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.42, ease: 'easeInOut' }}
      >
        <label id={`${inputId}-label`} htmlFor={inputId} className="question__prompt">
          {question.prompt}
        </label>
        <input
          id={inputId}
          className="question__input"
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={siteConfig.inputPlaceholder}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="go"
          aria-describedby={feedbackId}
          aria-invalid={showWrong || undefined}
          disabled={submitting}
          required
        />
        <motion.button
          type="submit"
          className="question__submit"
          disabled={submitting}
          aria-busy={submitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          {submitting ? (
            <>
              <span className="question__spinner" aria-hidden="true" />
              Checking…
            </>
          ) : (
            <>
              {siteConfig.submitLabel}
              <span className="question__arrow" aria-hidden="true">
                →
              </span>
            </>
          )}
        </motion.button>
      </motion.form>
    </section>
  )
}
