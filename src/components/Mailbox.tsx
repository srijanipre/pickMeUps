import './Mailbox.css'

interface Props {
  open?: boolean
  className?: string
}

/** Flat two-tone mailbox in a 3/4 view. `open` drops the front door down to show the empty inside. */
export function Mailbox({ open = false, className = '' }: Props) {
  return (
    <svg
      className={`mailbox ${className}`}
      viewBox={open ? '-20 0 160 150' : '0 0 150 150'}
      aria-hidden="true"
      focusable="false"
    >
      {/* post: front + shaded side */}
      <path d="M72 104l6-2v30l-6 2z" fill="var(--navy-deep)" />
      <rect x="60" y="104" width="12" height="30" fill="var(--blue)" />
      {/* body side and rounded roof, extruded back to the right */}
      <path
        d="M60 112L120 90V54A20 20 0 0 0 93.1 35.2L33.1 57.2 40 76z"
        fill="var(--blue-light)"
      />
      {/* flag pole + flag on the side */}
      <rect x="92" y="22" width="6" height="58" rx="3" fill="var(--blue)" />
      <path d="M98 20h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H98z" fill="var(--blue)" />
      {open ? (
        <>
          {/* dark opening */}
          <path d="M20 112V76a20 20 0 0 1 40 0v36z" fill="var(--navy-deep)" />
          {/* door dropped forward on its bottom hinge: edge, then face */}
          <path d="M20 116H60L26 128.5A22 9 -20 0 1 -14 128.5Z" fill="var(--navy-deep)" />
          <path d="M20 112H60L26 124.5A22 9 -20 0 1 -14 124.5Z" fill="var(--blue)" />
        </>
      ) : (
        <>
          {/* closed front door + latch tab on top */}
          <path d="M20 112V76a20 20 0 0 1 40 0v36z" fill="var(--blue)" />
          <path d="M35 58v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6z" fill="var(--blue)" />
        </>
      )}
    </svg>
  )
}
