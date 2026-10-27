import { useId } from 'react'
import './ArchedTitle.css'

interface Props {
  line1: string
  line2?: string
  /** Rendered heading level for screen readers. */
  as?: 'h1' | 'h2'
}

/** Curved serif heading with decorative "spark" lines, recreating the Figma wordmark. */
export function ArchedTitle({ line1, line2, as: Tag = 'h1' }: Props) {
  const id = useId()
  const pathId = `arc-${id}`
  const filterId = `shadow-${id}`
  const height = line2 ? 138 : 104
  const size = line1.length > 12 ? 33 : 38
  const sparkX = line2 ? [46, 314] : [54, 306]
  const sparkY = line2 ? 88 : 80

  return (
    <Tag className="arched">
      <span className="sr-only">
        {line1} {line2}
      </span>
      <svg
        className="arched__svg"
        viewBox={`0 0 360 ${height}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <path id={pathId} d="M 46 96 Q 180 -22 314 96" fill="none" />
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.45" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`} className="arched__text">
          <text fontSize={size} letterSpacing="0.5">
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              {line1}
            </textPath>
          </text>
          {line2 && (
            <text x="180" y="124" fontSize="36" textAnchor="middle" letterSpacing="0.5">
              {line2}
            </text>
          )}
        </g>
        <Burst x={sparkX[0]} y={sparkY} angles={[100, 138, 176]} />
        <Burst x={sparkX[1]} y={sparkY} angles={[80, 42, 4]} />
      </svg>
    </Tag>
  )
}

/** "Ta-da" burst: short rays fanning out from a point, angles in degrees (0 = right). */
function Burst({ x, y, angles }: { x: number; y: number; angles: number[] }) {
  return (
    <g className="arched__spark" transform={`translate(${x} ${y})`}>
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180
        const cos = Math.cos(rad)
        const sin = Math.sin(rad)
        return <line key={a} x1={cos * 12} y1={sin * 12} x2={cos * 30} y2={sin * 30} />
      })}
    </g>
  )
}
