// ─── Scale: 1 cm = 1.25 px in canvas world-space ───────────────
export const S = 1.25

// ─── Unique ID generator ────────────────────────────────────────
let _uid = Date.now()
export const uid = () => ++_uid

// ─── Component Library ───────────────────────────────────────────
export const COMPONENTS = [
  { type: 'heater', label: 'Heater', count: '1×' },
  { type: 'bench',  label: 'Bench',  count: '2×' },
  { type: 'door',   label: 'Door',   count: '1×' },
  { type: 'window', label: 'Window', count: '2×' },
  { type: 'vent',   label: 'Vent',   count: '2×' },
  { type: 'light',  label: 'Light',  count: '3×' },
]

export const COMP_SVG = {
  heater:  <><rect x="-14" y="-14" width="28" height="28" rx="4" stroke="#F26419" strokeWidth="2" fill="rgba(242,100,25,0.15)"/><line x1="-8" y1="-5" x2="8" y2="-5" stroke="#F26419" strokeWidth="1"/><line x1="-8" y1="0" x2="8" y2="0" stroke="#F26419" strokeWidth="1"/><line x1="-8" y1="5" x2="8" y2="5" stroke="#F26419" strokeWidth="1"/><circle cx="8" cy="-8" r="3" stroke="#F26419" strokeWidth="0.8" fill="none"/></>,
  bench:   <><rect x="-14" y="-7" width="28" height="14" rx="1" stroke="#6B5B45" strokeWidth="2" fill="rgba(180,130,70,0.25)"/><line x1="-10" y1="-7" x2="-10" y2="7" stroke="#6B5B45" strokeWidth="0.8"/><line x1="-4" y1="-7" x2="-4" y2="7" stroke="#6B5B45" strokeWidth="0.8"/><line x1="2" y1="-7" x2="2" y2="7" stroke="#6B5B45" strokeWidth="0.8"/><line x1="8" y1="-7" x2="8" y2="7" stroke="#6B5B45" strokeWidth="0.8"/></>,
  door:    <><rect x="-9" y="-14" width="18" height="28" rx="1" stroke="#F26419" strokeWidth="1.5" fill="rgba(242,100,25,0.1)"/><circle cx="6" cy="0" r="2" fill="#F26419"/></>,
  window:  <><rect x="-13" y="-10" width="26" height="20" rx="1" stroke="#1A1F2E" strokeWidth="1.2" fill="rgba(135,206,250,0.2)"/><line x1="0" y1="-10" x2="0" y2="10" stroke="#1A1F2E" strokeWidth="0.8"/><line x1="-13" y1="0" x2="13" y2="0" stroke="#1A1F2E" strokeWidth="0.8"/></>,
  vent:    <><circle cx="0" cy="0" r="10" stroke="#1A1F2E" strokeWidth="1.2" fill="rgba(135,200,220,0.15)"/><line x1="-6" y1="0" x2="6" y2="0" stroke="#1A1F2E" strokeWidth="1"/><line x1="0" y1="-6" x2="0" y2="6" stroke="#1A1F2E" strokeWidth="1"/><circle cx="0" cy="0" r="2" stroke="#1A1F2E" strokeWidth="0.8" fill="none"/></>,
  light:   <><circle cx="0" cy="-2" r="8" stroke="#F5C542" strokeWidth="1.3" fill="rgba(245,197,66,0.15)"/><line x1="-10" y1="-2" x2="-6" y2="-2" stroke="#F5C542" strokeWidth="1"/><line x1="6" y1="-2" x2="10" y2="-2" stroke="#F5C542" strokeWidth="1"/><line x1="0" y1="-12" x2="0" y2="-8" stroke="#F5C542" strokeWidth="1"/></>,
}

// ─── Properties Panel Options ───────────────────────────────────
export const DOOR_OPTIONS   = ['Full Glass','Half Glass','Frosted','Solid Wood']
export const WINDOW_OPTIONS = ['Clear Pane', 'Frosted', 'Divided Grid', 'Horizontal Slats']
export const BENCH_OPTIONS  = ['L-Shape','U-Shape','Single Row','Double Row','No Bench']
