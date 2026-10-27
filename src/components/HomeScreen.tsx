import { motion } from 'motion/react'
import { siteConfig, type Question } from '../config/site'
import { ArchedTitle } from './ArchedTitle'
import { Mailbox } from './Mailbox'
import { HeroBlob, HomeBottomShape } from './Shapes'
import { QuestionCard } from './QuestionCard'
import { HowItWorks } from './HowItWorks'
import './HomeScreen.css'

interface Props {
  question: Question
  status: 'idle' | 'submitting' | 'incorrect' | 'error'
  errorMessage?: string
  shakeKey: number
  onSubmit: (answer: string) => void
}

export function HomeScreen(props: Props) {
  return (
    <div className="home">
      <section className="home__hero">
        <HeroBlob />
        <motion.div
          className="home__hero-inner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <ArchedTitle line1={siteConfig.brandTitle} />
          <motion.div
            className="home__mailbox"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Mailbox />
          </motion.div>
          <p className="home__intro">{siteConfig.intro}</p>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <QuestionCard {...props} />
      </motion.div>

      <HowItWorks />

      <div className="home__bottom">
        <HomeBottomShape />
      </div>
    </div>
  )
}
