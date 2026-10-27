import { motion } from 'motion/react'
import { siteConfig } from '../config/site'
import './HowItWorks.css'

const icons = [ScanIcon, ChatIcon, LockedChatIcon, GiftIcon]

export function HowItWorks() {
  const { heading, steps } = siteConfig.howItWorks
  return (
    <motion.section
      className="how"
      aria-labelledby="how-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 id="how-heading" className="how__heading">
        {heading}
      </h2>
      <ol className="how__steps">
        {steps.map((label, i) => {
          const Icon = icons[i % icons.length]
          return (
            <li key={label} className="how__step">
              <Icon />
              <span className="sr-only">{label}</span>
              {i < steps.length - 1 && <Arrow />}
            </li>
          )
        })}
      </ol>
    </motion.section>
  )
}

function Arrow() {
  return (
    <svg className="how__arrow" viewBox="0 0 32 16" aria-hidden="true">
      <path d="M2 8h26M21 2l7 6-7 6" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ScanIcon() {
  return (
    <svg className="how__icon" viewBox="0 0 40 40" aria-hidden="true">
      <g fill="none" stroke="var(--blue-light)" strokeWidth="3" strokeLinecap="round">
        <path d="M4 12V7a3 3 0 0 1 3-3h5M28 4h5a3 3 0 0 1 3 3v5M36 28v5a3 3 0 0 1-3 3h-5M12 36H7a3 3 0 0 1-3-3v-5" />
      </g>
      <g stroke="var(--blue)" strokeWidth="4" strokeLinecap="round">
        <path d="M13 16v8M20 12v16M27 16v8" />
      </g>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="how__icon" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 34V13a9 9 0 0 1 9-9h8a9 9 0 0 1 9 9v6a9 9 0 0 1-9 9h-9z" fill="var(--blue-light)" />
      <circle cx="31" cy="9" r="6" fill="var(--blue)" />
    </svg>
  )
}

function LockedChatIcon() {
  return (
    <svg className="how__icon" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M4 6h30a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H15l-8 6v-6H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="var(--blue-light)" />
      <g fill="var(--blue)">
        <circle cx="11" cy="16" r="2.4" />
        <circle cx="19" cy="16" r="2.4" />
        <circle cx="27" cy="16" r="2.4" />
      </g>
      <rect x="24" y="26" width="15" height="12" rx="2.5" fill="var(--blue)" />
      <path d="M27.5 26v-3a4 4 0 0 1 8 0v3" fill="none" stroke="var(--blue)" strokeWidth="2.6" />
      <circle cx="31.5" cy="32" r="1.8" fill="var(--blue-light)" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg className="how__icon" viewBox="0 0 40 40" aria-hidden="true">
      <rect x="6" y="16" width="28" height="20" rx="3" fill="var(--blue-light)" />
      <rect x="4" y="11" width="32" height="8" rx="2" fill="var(--blue-light)" />
      <g fill="none" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M20 11v25M4 19h32M20 11c-4-1-9-3-8-6s6-1 8 6c2-7 7-9 8-6s-4 5-8 6z" />
      </g>
    </svg>
  )
}
