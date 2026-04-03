// ── 3D Preview (barrel) ──────────────────────────────────────────
function Barrel3DView({ dims }) {
  const bL = Math.min(dims.length * S * 0.62, 190)
  const eR = Math.min((dims.width / 2) * S * 0.52, 75)
  const dX = bL * 0.82
  const dY = eR * 0.38
  const hoopXs = [-bL * 0.38, -bL * 0.1, bL * 0.18, bL * 0.46]

  return (
    <g>
      <defs>
        <radialGradient id="b3d-top" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#D4A870"/>
          <stop offset="55%" stopColor="#A8784A"/>
          <stop offset="100%" stopColor="#6B4A28"/>
        </radialGradient>
        <radialGradient id="b3d-side" cx="30%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#B8885A"/>
          <stop offset="100%" stopColor="#5A3A18"/>
        </radialGradient>
        <radialGradient id="b3d-end" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#C4996B"/>
          <stop offset="100%" stopColor="#7A5530"/>
        </radialGradient>
        <linearGradient id="b3d-hoop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#999"/>
          <stop offset="50%" stopColor="#555"/>
          <stop offset="100%" stopColor="#2A2A2A"/>
        </linearGradient>
        <radialGradient id="b3d-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.45)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="b3d-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,160,50,0.3)"/>
          <stop offset="100%" stopColor="rgba(255,80,0,0)"/>
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={dX * 0.1} cy={eR + 16} rx={bL * 0.55 + dX * 0.3} ry={16} fill="url(#b3d-shadow)" opacity="0.5"/>

      {/* Barrel top surface (perspective quad) */}
      <path d={"M " + (-bL/2) + " " + (-eR) + " Q 0 " + (-eR * 1.08) + " " + (bL/2) + " " + (-eR) + " L " + (bL/2 + dX * 0.5) + " " + (-eR - dY) + " Q " + (dX * 0.1) + " " + (-eR * 1.12 - dY) + " " + (-bL/2 + dX * 0.3) + " " + (-eR - dY * 0.6) + " Z"}
        fill="url(#b3d-top)" stroke="#3A2010" strokeWidth="1.5"/>

      {/* Barrel body (front visible half) */}
      <ellipse cx={0} cy={0} rx={bL / 2} ry={eR} fill="url(#b3d-side)" stroke="#3A2010" strokeWidth="2.2"/>

      {/* Wood stave grain lines */}
      {[-8,-6,-4,-2,0,2,4,6,8].map(i => {
        const x = i * (bL / 18)
        const yOff = eR * Math.sqrt(Math.max(0, 1 - (x / (bL/2)) ** 2))
        return <line key={i} x1={x} y1={-yOff * 0.94} x2={x} y2={yOff * 0.94}
          stroke="rgba(0,0,0,0.2)" strokeWidth="1.1"/>
      })}

      {/* Barrel body highlight sheen */}
      <ellipse cx={-bL * 0.18} cy={-eR * 0.28} rx={bL * 0.22} ry={eR * 0.22}
        fill="rgba(255,255,255,0.13)"/>

      {/* Metal hoops */}
      {hoopXs.map((hx, i) => {
        const yOff = eR * Math.sqrt(Math.max(0, 1 - (hx / (bL/2)) ** 2)) * 0.97
        return <ellipse key={i} cx={hx} cy={0} rx={6} ry={yOff}
          fill="none" stroke="url(#b3d-hoop)" strokeWidth="5.5" opacity="0.9"/>
      })}

      {/* Front end face */}
      <ellipse cx={-bL/2} cy={0} rx={11} ry={eR * 0.94}
        fill="url(#b3d-end)" stroke="#3A2010" strokeWidth="1.5"/>
      {/* End face radial lines */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const rad = a * Math.PI / 180
        return <line key={a} x1={-bL/2} y1={0}
          x2={-bL/2 + 10 * Math.cos(rad) * 0.3}
          y2={eR * 0.88 * Math.sin(rad)}
          stroke="rgba(0,0,0,0.12)" strokeWidth="0.7"/>
      })}

      {/* Door end (right) */}
      <ellipse cx={bL/2} cy={0} rx={9} ry={eR * 0.88}
        fill="#1E0E04" stroke="#0A0400" strokeWidth="1.5"/>
      {/* Door warm glow */}
      <ellipse cx={bL/2} cy={eR * 0.05} rx={6} ry={eR * 0.65}
        fill="url(#b3d-glow)" opacity="0.75"/>
      {/* Door handle */}
      <circle cx={bL/2} cy={0} r={3.5} fill="#A0A0A0" stroke="#606060" strokeWidth="1"/>

      {/* Steps */}
      <rect x={bL/2 + 7} y={eR * 0.35} width={24} height={eR * 0.65}
        rx={2} fill="#C0B0A0" stroke="#807060" strokeWidth="1"/>
      <rect x={bL/2 + 31} y={eR * 0.55} width={22} height={eR * 0.45}
        rx={2} fill="#B0A090" stroke="#807060" strokeWidth="1"/>
      <line x1={bL/2 + 7} y1={eR * 0.35} x2={bL/2 + 53} y2={eR * 0.35}
        stroke="#807060" strokeWidth="1.2"/>

      {/* Label */}
      <text x={0} y={-eR - 32} fill="#F26419" fontSize="13"
        fontFamily="'Segoe UI',sans-serif" fontWeight="700" textAnchor="middle">
        3D Preview — Barrel Sauna
      </text>

      {/* Material legend */}
      <g transform={"translate(" + (-bL/2 - 10) + "," + (-eR - 22) + ")"}>
        <rect x={0} y={0} width={9} height={9} fill="#A8784A" rx={1}/>
        <text x={13} y={8} fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Spruce wood</text>
        <rect x={0} y={14} width={9} height={9} fill="#666" rx={1}/>
        <text x={13} y={22} fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Steel hoops</text>
      </g>
    </g>
  )
}

// ── 3D Preview (cube) ────────────────────────────────────────────
function Cube3DView({ dims }) {
  const W = Math.min(dims.length * S * 0.5, 195)
  const H = Math.min(dims.height * S * 0.5, 145)
  const D = Math.min(dims.width  * S * 0.28, 85)
  const dxOff = D * 0.866
  const dyOff = D * 0.5

  const rightPts  = (W/2) + "," + (H/2)  + " " + (W/2+dxOff) + "," + (H/2-dyOff)  + " " + (W/2+dxOff) + "," + (-H/2-dyOff)  + " " + (W/2) + "," + (-H/2)
  const topPts    = (-W/2) + "," + (-H/2) + " " + (W/2) + "," + (-H/2) + " " + (W/2+dxOff) + "," + (-H/2-dyOff) + " " + (-W/2+dxOff) + "," + (-H/2-dyOff)
  const planks    = Math.floor(H / 13)
  const rPlanks   = Math.floor(W / 15)
  const doorW     = Math.min(52, W * 0.3)
  const doorH     = H * 0.77
  const doorX     = W/2 - doorW - 16
  const winY      = -H/2 + 22
  const heaterX   = -W/2 + 22
  const heaterY   = H/2 - 58
  const benchY    = H/2 - 22

  return (
    <g>
      <defs>
        <linearGradient id="c3d-front" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C6540"/>
          <stop offset="45%" stopColor="#B08A60"/>
          <stop offset="100%" stopColor="#8C6540"/>
        </linearGradient>
        <linearGradient id="c3d-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A5830"/>
          <stop offset="100%" stopColor="#4A3018"/>
        </linearGradient>
        <linearGradient id="c3d-roof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8A865"/>
          <stop offset="100%" stopColor="#8A6835"/>
        </linearGradient>
        <linearGradient id="c3d-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(180,220,255,0.55)"/>
          <stop offset="100%" stopColor="rgba(100,170,230,0.2)"/>
        </linearGradient>
        <linearGradient id="c3d-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A8A8A"/>
          <stop offset="100%" stopColor="#2A2A2A"/>
        </linearGradient>
        <radialGradient id="c3d-glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#FF9040" stopOpacity="1"/>
          <stop offset="65%" stopColor="#CC4400" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#880000" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="c3d-bench" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A870"/>
          <stop offset="100%" stopColor="#A06830"/>
        </linearGradient>
        <radialGradient id="c3d-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.45)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={dxOff * 0.4} cy={H/2 + 14} rx={W/2 + dxOff * 0.55 + 14} ry={dyOff + 10}
        fill="url(#c3d-shadow)" opacity="0.45"/>

      {/* ── Right side face ── */}
      <polygon points={rightPts} fill="url(#c3d-side)" stroke="#2A1808" strokeWidth="1.5"/>
      {Array.from({length: planks}, (_, i) => (
        <line key={i} x1={W/2} y1={-H/2 + (i+1)*13} x2={W/2+dxOff} y2={-H/2+(i+1)*13-dyOff}
          stroke="rgba(0,0,0,0.22)" strokeWidth="0.9"/>
      ))}
      {/* Side face sheen */}
      <polygon points={rightPts} fill="rgba(0,0,0,0.12)"/>

      {/* ── Front face ── */}
      <rect x={-W/2} y={-H/2} width={W} height={H}
        fill="url(#c3d-front)" stroke="#2A1808" strokeWidth="2.2"/>
      {/* Horizontal plank lines */}
      {Array.from({length: planks}, (_, i) => (
        <line key={i} x1={-W/2} y1={-H/2+(i+1)*13} x2={W/2} y2={-H/2+(i+1)*13}
          stroke="rgba(0,0,0,0.15)" strokeWidth="0.9"/>
      ))}
      {/* Corner + base trims */}
      <rect x={-W/2} y={-H/2} width={7} height={H} fill="rgba(0,0,0,0.2)" rx={1}/>
      <rect x={W/2-7}  y={-H/2} width={7} height={H} fill="rgba(0,0,0,0.12)" rx={1}/>
      <rect x={-W/2} y={H/2-7}  width={W} height={7} fill="rgba(0,0,0,0.18)"/>
      <rect x={-W/2} y={-H/2}   width={W} height={6} fill="rgba(0,0,0,0.14)"/>

      {/* ── Window ── */}
      <rect x={-W/2+16} y={winY} width={46} height={36} rx={2}
        fill="url(#c3d-glass)" stroke="#1E0E04" strokeWidth="1.5"/>
      <line x1={-W/2+39} y1={winY} x2={-W/2+39} y2={winY+36} stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
      <line x1={-W/2+16} y1={winY+18} x2={-W/2+62} y2={winY+18} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
      <rect x={-W/2+18} y={winY+2} width={14} height={9} rx={1} fill="rgba(255,255,255,0.2)"/>

      {/* ── Door ── */}
      <rect x={doorX-3} y={H/2-doorH-3} width={doorW+6} height={doorH+3} rx={2}
        fill="#100800" stroke="#080400" strokeWidth="1.5"/>
      <rect x={doorX} y={H/2-doorH} width={doorW} height={doorH} rx={1}
        fill="#1E0E04" stroke="#100800" strokeWidth="1"/>
      {/* Door glass + heater glow */}
      <rect x={doorX+5} y={H/2-doorH+doorH*0.14} width={doorW-10} height={doorH*0.44}
        rx={1} fill="url(#c3d-glow)" opacity="0.65"/>
      <rect x={doorX+5} y={H/2-doorH+doorH*0.14} width={doorW-10} height={doorH*0.44}
        rx={1} fill="rgba(140,200,255,0.12)" stroke="rgba(200,230,255,0.2)" strokeWidth="0.5"/>
      {/* Door handle */}
      <circle cx={doorX+9} cy={H/2-doorH*0.44} r={3.5} fill="#A0A0A0" stroke="#606060" strokeWidth="1"/>

      {/* ── Heater (visible through door gap) ── */}
      <rect x={heaterX} y={heaterY} width={28} height={36} rx={3}
        fill="url(#c3d-metal)" stroke="#1A1A1A" strokeWidth="1.2"/>
      {/* Heater stones */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={i} cx={heaterX + 5 + (i%3)*8} cy={heaterY + 6 + Math.floor(i/3)*7}
          rx={3.5} ry={2.5} fill={i%2===0 ? "#8A6A50" : "#6A5040"} stroke="#3A2820" strokeWidth="0.5"/>
      ))}
      {/* Heater glow */}
      <rect x={heaterX-4} y={heaterY-4} width={36} height={44} rx={4}
        fill="url(#c3d-glow)" opacity="0.35"/>

      {/* ── Bench ── */}
      <rect x={-W/2+12} y={benchY} width={W*0.55} height={12} rx={2}
        fill="url(#c3d-bench)" stroke="#6B4A28" strokeWidth="1.2"/>
      {/* Bench slats */}
      {Array.from({length: 5}, (_, i) => (
        <line key={i} x1={-W/2+14+(i*W*0.55/5)} y1={benchY} x2={-W/2+14+(i*W*0.55/5)} y2={benchY+12}
          stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
      ))}
      {/* Bench legs */}
      <line x1={-W/2+16} y1={benchY+12} x2={-W/2+16} y2={H/2-7} stroke="#6B4A28" strokeWidth="2"/>
      <line x1={-W/2+12+W*0.5} y1={benchY+12} x2={-W/2+12+W*0.5} y2={H/2-7} stroke="#6B4A28" strokeWidth="2"/>

      {/* ── Roof top face ── */}
      <polygon points={topPts} fill="url(#c3d-roof)" stroke="#2A1808" strokeWidth="1.5"/>
      {Array.from({length: rPlanks}, (_, i) => (
        <line key={i} x1={-W/2+(i+1)*15} y1={-H/2} x2={-W/2+(i+1)*15+dxOff} y2={-H/2-dyOff}
          stroke="rgba(0,0,0,0.15)" strokeWidth="0.8"/>
      ))}
      <polygon points={topPts} fill="rgba(255,255,255,0.06)"/>

      {/* Vent/chimney */}
      <rect x={dxOff*0.38-10} y={-H/2-dyOff*0.6-22} width={22} height={22}
        rx={2} fill="url(#c3d-metal)" stroke="#202020" strokeWidth="1"/>
      <rect x={dxOff*0.38-13} y={-H/2-dyOff*0.6-26} width={28} height={6}
        rx={1} fill="#555" stroke="#333" strokeWidth="0.8"/>
      {/* Smoke hint */}
      <circle cx={dxOff*0.38-2} cy={-H/2-dyOff*0.6-38} r={5} fill="rgba(160,160,160,0.18)"/>
      <circle cx={dxOff*0.38+2} cy={-H/2-dyOff*0.6-50} r={7} fill="rgba(160,160,160,0.12)"/>

      {/* Label */}
      <text x={dxOff/2} y={-H/2-dyOff-34}
        fill="#F26419" fontSize="12" fontFamily="'Segoe UI',sans-serif" fontWeight="700" textAnchor="middle">
        3D Preview — Cube Sauna
      </text>

      {/* Material legend */}
      <g transform={"translate(" + (W/2+dxOff+14) + "," + (-H/4 + 10) + ")"}>
        <rect x={0} y={0}  width={9} height={9} fill="#B08A60" rx={1}/>
        <text x={13} y={8}  fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Spruce wood</text>
        <rect x={0} y={14} width={9} height={9} fill="#5A5A5A" rx={1}/>
        <text x={13} y={22} fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Steel / metal</text>
        <rect x={0} y={28} width={9} height={9} fill="rgba(180,220,255,0.55)" rx={1} stroke="#6A9ABF" strokeWidth="0.5"/>
        <text x={13} y={36} fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Tempered glass</text>
        <rect x={0} y={42} width={9} height={9} fill="#D4A870" rx={1}/>
        <text x={13} y={50} fontSize="8" fill="#9CA3AF" fontFamily="'Segoe UI',sans-serif">Cedar bench</text>
      </g>
    </g>
  )
}
