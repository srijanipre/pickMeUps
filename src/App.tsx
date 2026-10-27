import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeScreen } from './components/HomeScreen'
import { SuccessScreen } from './components/SuccessScreen'
import { pickRandom, questions, siteConfig } from './config/site'
import { pickMeUpService } from './services/pickMeUpService'

type Status = 'idle' | 'submitting' | 'incorrect' | 'error'

export default function App() {
  const [question] = useState(() => pickRandom(questions))
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [shakeKey, setShakeKey] = useState(0)
  const [result, setResult] = useState<{ code: string; reminder: string } | null>(null)
  const reduceMotion = useReducedMotion()
  const inFlight = useRef(false)

  const handleSubmit = useCallback(
    async (answer: string) => {
      if (inFlight.current) return
      inFlight.current = true
      setStatus('submitting')
      setErrorMessage(undefined)
      try {
        const res = await pickMeUpService.submitAnswer({ questionId: question.id, answer })
        if (res.status === 'correct') {
          setResult({ code: res.code, reminder: pickRandom(siteConfig.reminders) })
          setStatus('idle')
        } else if (res.status === 'incorrect') {
          setStatus('incorrect')
          setShakeKey((k) => k + 1)
        } else {
          setStatus('error')
          setErrorMessage(res.message)
        }
      } finally {
        inFlight.current = false
      }
    },
    [question.id],
  )

  useEffect(() => {
    if (!result) return
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    document.title = 'Your Pick Me Up is ready!'
  }, [result, reduceMotion])

  return (
    <div className="shell">
      <Header />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          {result ? (
            <motion.div
              key="success"
              style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessScreen code={result.code} reminder={result.reminder} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <HomeScreen
                question={question}
                status={status}
                errorMessage={errorMessage}
                shakeKey={shakeKey}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
