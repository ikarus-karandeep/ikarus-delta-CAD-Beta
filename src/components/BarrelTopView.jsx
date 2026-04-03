import { S } from '../constants.jsx'
import { DimH, DimV } from './DimAnnotations'

export default function BarrelTopView({ dims }) {
  const rx = (dims.length / 2) * S
  const ry = (dims.width / 2) * S
  const tw = dims.wall * S

  return (
    <g>
      {/* Centre lines */}
      <line x1={-rx - 55} y1={0} x2={rx + 55} y2={0} stroke="#F26419" strokeWidth="0.5" strokeDasharray="5,6" opacity="0.4" />
      <line x1={0} y1={-ry - 55} x2={0} y2={ry + 70} stroke="#F26419" strokeWidth="0.5" strokeDasharray="5,6" opacity="0.4" />
      {/* Outer wall */}
      <ellipse cx={0} cy={0} rx={rx} ry={ry} stroke="#1A1F2E" strokeWidth="2.5" fill="rgba(242,100,25,0.04)" />
      {/* Inner wall */}
      <ellipse cx={0} cy={0} rx={rx - tw} ry={ry - tw} stroke="#1A1F2E" strokeWidth="1" fill="rgba(255,255,255,0.75)" strokeDasharray="5,3" />
      {/* Stave lines */}
      {[-3, -2, -1, 0, 1, 2, 3].map(i => {
        const x = i * (rx / 3.8)
        const yOff = ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2))
        return <line key={i} x1={x} y1={-yOff} x2={x} y2={yOff} stroke="#1A1F2E" strokeWidth="0.65" strokeDasharray="4,3" opacity="0.4" />
      })}
      {/* Dimensions */}
      <DimH x1={-rx} x2={rx} y={-ry - 40} label={`${dims.length} cm`} />
      <DimV y1={-ry} y2={ry} x={rx + 38} label={`${dims.width} cm`} />
    </g>
  )
}
