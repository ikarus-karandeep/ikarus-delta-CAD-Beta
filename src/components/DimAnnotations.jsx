export function DimH({ x1, x2, y, label }) {
  const mx = (x1 + x2) / 2
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#F26419" strokeWidth="0.9" />
      <line x1={x1} y1={y - 6} x2={x1} y2={y + 6} stroke="#F26419" strokeWidth="1.3" />
      <line x1={x2} y1={y - 6} x2={x2} y2={y + 6} stroke="#F26419" strokeWidth="1.3" />
      <rect x={mx - 32} y={y - 19} width={64} height={14} fill="white" rx="2" />
      <text x={mx} y={y - 7} fill="#F26419" fontSize="10" fontFamily="'Segoe UI',sans-serif"
        fontWeight="700" textAnchor="middle">{label}</text>
    </g>
  )
}

export function DimV({ y1, y2, x, label }) {
  const my = (y1 + y2) / 2
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke="#F26419" strokeWidth="0.9" />
      <line x1={x - 6} y1={y1} x2={x + 6} y2={y1} stroke="#F26419" strokeWidth="1.3" />
      <line x1={x - 6} y1={y2} x2={x + 6} y2={y2} stroke="#F26419" strokeWidth="1.3" />
      <rect x={x + 5} y={my - 7} width={60} height={14} fill="white" rx="2" />
      <text x={x + 7} y={my + 4} fill="#F26419" fontSize="10" fontFamily="'Segoe UI',sans-serif"
        fontWeight="700">{label}</text>
    </g>
  )
}
