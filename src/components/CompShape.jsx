export default function CompShape({ type, style, w = 44, h = 40, id, allComps = [] }) {
  const ora = "#F26419"
  const wood = "rgba(180,130,70,0.22)"
  const glass = "rgba(135,206,250,0.25)"

  const renderSlatRow = (rx, ry, rw, rh, selfX, selfY) => {
    const slatWidth = 6
    const gap = 3
    const step = slatWidth + gap
    const count = Math.max(1, Math.floor((rw - 4) / step))
    const startX = rx + (rw - (count * step - gap)) / 2
    const physicalItems = ['heater']

    return (
      <g>
        <rect x={rx} y={ry} width={rw} height={rh} rx="2" stroke="#6B5B45" strokeWidth="2" fill={wood} />
        {Array.from({ length: count }).map((_, i) => {
          const dx = startX + i * step + slatWidth/2
          const slatX = selfX + dx
          const slatY = selfY + ry + rh/2
          const halfSlatW = slatWidth / 2
          const halfSlatH = rh / 2

          const isColliding = allComps.some(other => {
            if (other.id === id || !physicalItems.includes(other.type)) return false
            const margin = 2
            const ow = (other.w || 44) / 2
            const oh = (other.h || 40) / 2
            const overX = Math.abs(slatX - other.x) < (halfSlatW + ow) + margin
            const overY = Math.abs(slatY - other.y) < (halfSlatH + oh) + margin
            return overX && overY
          })

          if (isColliding) return null
          return <rect key={i} x={dx - halfSlatW} y={ry + 4} width={slatWidth} height={rh - 8} rx="1" fill="#6B5B45" opacity="0.35" />
        })}
      </g>
    )
  }

  const self = allComps.find(c => c.id === id) || { x: 0, y: 0 }

  switch (type) {
    case 'heater':
      return (
        <g>
          <rect x={-w/2} y={-h/2} width={w} height={h} rx="4" stroke={ora} strokeWidth="2.5" fill="rgba(242,100,25,0.12)" />
          {[-8, -4, 0, 4, 8].map(dy => (
            <line key={dy} x1={-w/2+6} y1={dy} x2={w/2-6} y2={dy} stroke={ora} strokeWidth="1" strokeDasharray="1,1.5" />
          ))}
          <circle cx={w/2-10} cy={-h/2+10} r={4} stroke={ora} strokeWidth="1.2" fill="none" />
          <text x={0} y={h/2+12} fill={ora} fontSize="8" textAnchor="middle" fontFamily="'Segoe UI',sans-serif" fontWeight="900">HEATER</text>
        </g>
      )
    case 'bench':
      if (style === 'No Bench') return null

      if (style === 'L-Shape') {
        const sw = Math.min(w, h) * 0.8
        return (
          <g>
            {renderSlatRow(-w/2, -h/2, w, h, self.x, self.y)}
            {renderSlatRow(-w/2, h/2, sw, w*0.6, self.x, self.y)}
          </g>
        )
      }
      if (style === 'U-Shape') {
        const sw = Math.min(w, h) * 0.8
        return (
          <g>
            {renderSlatRow(-w/2, -h/2, w, h, self.x, self.y)}
            {renderSlatRow(-w/2, h/2, sw, w*0.5, self.x, self.y)}
            {renderSlatRow(w/2 - sw, h/2, sw, w*0.5, self.x, self.y)}
          </g>
        )
      }
      if (style === 'Double Row') {
        return (
          <g>
            {renderSlatRow(-w/2, -h/2, w, h*0.45, self.x, self.y)}
            {renderSlatRow(-w/2, h/2 - h*0.45, w, h*0.45, self.x, self.y)}
          </g>
        )
      }

      // Default: Single Row
      return renderSlatRow(-w/2, -h/2, w, h, self.x, self.y)

    case 'door':
      const leafW = w * 0.95
      return (
        <g>
          <rect x={-w/2} y={-leafW + 4} width={5} height={leafW} rx="1" fill={ora} opacity="0.8" />
          <rect x={-w/2} y={-4} width={w} height={8} fill={ora} opacity="0.12" />
          <rect x={-w/2} y={-4} width={w} height={8} stroke={ora} strokeWidth="1.5" fill="none" />
          <path d={`M ${-w/2+5} ${-leafW+4} A ${leafW} ${leafW} 0 0 1 ${w/2} 4`}
            stroke={ora} strokeWidth="1.2" fill="none" strokeDasharray="4,2" />
          <text x={0} y={18} fill={ora} fontSize="8" fontFamily="'Segoe UI',sans-serif" textAnchor="middle" fontWeight="900" opacity="0.8">DOOR</text>
        </g>
      )
    case 'window':
      const isFrosted = style === 'Frosted'
      return (
        <g>
          <rect x={-w/2} y={-h/2} width={w} height={h} rx="1" stroke="#1A1F2E" strokeWidth="2" fill={isFrosted ? "rgba(135,206,250,0.6)" : glass} />
          {style === 'Divided Grid' && (
            <>
              <line x1={0} y1={-h/2} x2={0} y2={h/2} stroke="#1A1F2E" strokeWidth="1" />
              <line x1={-w/2} y1={0} x2={w/2} y2={0} stroke="#1A1F2E" strokeWidth="1" />
            </>
          )}
          {style === 'Horizontal Slats' && (
            <>
              {[-h/4, 0, h/4].map(dy => (
                <line key={dy} x1={-w/2} y1={dy} x2={w/2} y2={dy} stroke="#1A1F2E" strokeWidth="0.8" opacity="0.6" />
              ))}
            </>
          )}
          {(!style || style === 'Clear Pane') && (
            <>
              <line x1={0} y1={-h/2} x2={0} y2={h/2} stroke="#1A1F2E" strokeWidth="1" />
              <line x1={-w/2} y1={0} x2={w/2} y2={0} stroke="#1A1F2E" strokeWidth="0.8" />
            </>
          )}
        </g>
      )
    case 'vent':
      return (
        <g>
          <circle cx={0} cy={0} r={w/2} stroke="#1A1F2E" strokeWidth="2" fill="rgba(135,200,220,0.18)" />
          <line x1={-w/2} y1={0} x2={w/2} y2={0} stroke="#1A1F2E" strokeWidth="1.2" />
          <line x1={0} y1={-w/2} x2={0} y2={w/2} stroke="#1A1F2E" strokeWidth="1.2" />
        </g>
      )
    case 'light':
      return (
        <g>
          <circle cx={0} cy={0} r={12} stroke="#F5C542" strokeWidth="2" fill="rgba(245,197,66,0.16)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <line key={a} x1={0} y1={0} x2={18} y2={0} transform={`rotate(${a})`} stroke="#F5C542" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <circle cx={0} cy={0} r={5} fill="#F5C542" />
        </g>
      )
    default:
      return <circle r={10} fill="#ccc" />
  }
}
