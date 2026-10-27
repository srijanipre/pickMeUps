import './Shapes.css'

/** Soft white blob that sits behind the hero on the lavender homepage background. */
export function HeroBlob() {
  return (
    <svg className="shape shape--hero" viewBox="0 0 390 420" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="var(--lavender)"
        d="M0 0h390v340c-20-18-32-50-24-92 6-34 24-50 24-82V96c-40-44-100-10-158-30C168 44 110 66 62 92 30 110 22 158 0 196z"
      />
    </svg>
  )
}

/** Lavender shape along the bottom of the homepage. */
export function HomeBottomShape() {
  return (
    <svg className="shape shape--bottom" viewBox="0 0 390 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="var(--lavender)"
        d="M0 0c40 34 86 48 150 32 50-12 92-30 150-14 42 12 70 12 90 2v100H0z"
      />
    </svg>
  )
}

/** Lavender rolling hills used under the success content. */
export function SuccessWave() {
  return (
    <svg className="shape shape--wave" viewBox="0 0 390 170" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="var(--lavender)"
        d="M0 36c38-18 72-38 118-30 44 8 60 56 108 72 44 15 80 2 112 20 24 14 40 44 52 52v20H0z"
      />
    </svg>
  )
}
