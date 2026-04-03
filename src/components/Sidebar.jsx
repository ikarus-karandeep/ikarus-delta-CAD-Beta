import { COMPONENTS, COMP_SVG } from '../constants.jsx'

export default function Sidebar({ saunaType, onTypeSwitch, onCompDragStart }) {
  return (
    <aside className="sidebar" onClick={e => e.stopPropagation()}>
      <div className="sb-section">
        <div className="sb-label">Sauna Type</div>
        <div className="type-btns">
          <div className={`type-btn ${saunaType === 'barrel' ? 'tb-active' : ''}`} onClick={() => onTypeSwitch('barrel')}>
            <svg viewBox="0 0 40 22" fill="none">
              <ellipse cx="20" cy="11" rx="18" ry="10" stroke="currentColor" strokeWidth="1.5" />
              {[11,20,29].map(x => <line key={x} x1={x} y1={2} x2={x} y2={20} stroke="currentColor" strokeWidth="0.7" strokeDasharray="2,1.5" />)}
            </svg>
            Barrel
          </div>
          <div className={`type-btn ${saunaType === 'cube' ? 'tb-active' : ''}`} onClick={() => onTypeSwitch('cube')}>
            <svg viewBox="0 0 40 22" fill="none">
              <rect x="4" y="2" width="32" height="18" stroke="currentColor" strokeWidth="1.5" rx="1" />
              <rect x="8" y="6" width="24" height="10" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2,1.5" />
            </svg>
            Cube
          </div>
        </div>
      </div>

      <div className="sb-section" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingBottom: 0, borderBottom: 'none' }}>
        <div className="sb-label">Component Library</div>
        <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 8, fontStyle: 'italic' }}>Drag or click to place</div>
        <div className="comp-scroll">
          {COMPONENTS.map(c => (
            <div
              key={c.type}
              className="comp-item"
              draggable
              onDragStart={e => onCompDragStart(e, c.type)}
              onClick={() => onCompDragStart({ dataTransfer: { setData:()=>{} }, preventDefault:()=>{} }, c.type, true)}
            >
              <svg viewBox="-16 -16 32 32" width="22" height="22" fill="none" overflow="visible">
                {COMP_SVG[c.type]}
              </svg>
              <span>{c.label}</span>
              <span className="comp-badge">Add</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
