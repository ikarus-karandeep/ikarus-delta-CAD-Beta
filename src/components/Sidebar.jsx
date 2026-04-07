import { COMPONENTS, COMP_SVG } from '../constants.jsx'
import { useState, useEffect } from 'react'

function DimInput({ value, onChange, onCommit }) {
  const [local, setLocal] = useState(String(value))

  useEffect(() => { setLocal(String(value)) }, [value])

  return (
    <input
      className="prop-input"
      type="text"
      inputMode="numeric"
      value={local}
      onChange={e => setLocal(e.target.value)}
      onBlur={() => {
        const n = parseFloat(local)
        if (!isNaN(n) && n > 0) { onChange(n); onCommit(n) }
        else setLocal(String(value))   // restore last valid value
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') e.target.blur()
      }}
    />
  )
}

const STEP_TYPES = {
  0: [],
  1: ['door', 'window'],
  2: ['heater', 'bench'],
  3: ['light', 'vent', 'speaker', 'controlunit', 'thermometer', 'timer'],
  4: [],
}

const STEP_HINTS = {
  0: 'Adjust room dimensions below.',
  4: 'Your design is ready. Click BIM (IFC) to export.',
}

export default function Sidebar({ saunaType, onTypeSwitch, onCompDragStart, step, onStepChange, dims, onUpdateDims, selectedComp, onUpdateComp }) {
  const visibleTypes = STEP_TYPES[step] ?? []
  const visibleComps = COMPONENTS.filter(c => visibleTypes.includes(c.type))


  return (
    <aside className="sidebar" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>

      {/* Sauna type switcher */}
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

      {/* Component library (steps 1-3) */}
      {visibleComps.length > 0 && (
        <div className="sb-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className="sb-label">Components</div>
          <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 8, fontStyle: 'italic' }}>Drag or click to place</div>
          <div className="comp-scroll" style={{ maxHeight: 160 }}>
            {visibleComps.map(c => (
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
      )}

      {/* Step 0 / 4 hint */}
      {visibleComps.length === 0 && STEP_HINTS[step] && (
        <div className="sb-step-hint" style={{ flex: 'none', padding: '10px 14px' }}>
          <p className="sb-hint-text" style={{ textAlign: 'left' }}>{STEP_HINTS[step]}</p>
        </div>
      )}

      {/* ── Properties ── */}
      <div className="sb-section" style={{ flex: 1, overflowY: 'auto', borderBottom: 'none' }}>
        {selectedComp ? (
          <>
            <div className="sb-label">
              Properties — <span style={{ color: 'var(--orange)', textTransform: 'uppercase' }}>{selectedComp.type}</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Height (Z)</span>
              <input className="prop-input" type="number" value={Math.round(selectedComp.z)}
                onChange={e => onUpdateComp(selectedComp.id, { z: +e.target.value }, false)}
                onBlur={() => onUpdateComp(selectedComp.id, { z: selectedComp.z }, true)} />
            </div>
            <div className="prop-row">
              <span className="prop-label">Width</span>
              <input className="prop-input" type="number" value={Math.round(selectedComp.w)}
                onChange={e => onUpdateComp(selectedComp.id, { w: +e.target.value }, false)}
                onBlur={() => onUpdateComp(selectedComp.id, { w: selectedComp.w }, true)} />
            </div>
            <div className="prop-row">
              <span className="prop-label">Length/H</span>
              <input className="prop-input" type="number" value={Math.round(selectedComp.h)}
                onChange={e => onUpdateComp(selectedComp.id, { h: +e.target.value }, false)}
                onBlur={() => onUpdateComp(selectedComp.id, { h: selectedComp.h }, true)} />
            </div>
          </>
        ) : step === 0 ? (
          <>
            <div className="sb-label">Room Dimensions</div>
            {saunaType === 'barrel' ? (
              [
                { label: 'Diameter',       key: 'diameter' },
                { label: 'Height',         key: 'height' },
                { label: 'Wall Thickness', key: 'wall' },
              ].map(({ label, key }) => (
                <div className="prop-row" key={key}>
                  <span className="prop-label">{label}</span>
                  <DimInput
                    value={key === 'diameter' ? dims.length : dims[key]}
                    onChange={n => {
                      if (key === 'diameter') onUpdateDims({ ...dims, length: n, width: n }, false)
                      else onUpdateDims({ ...dims, [key]: n }, false)
                    }}
                    onCommit={n => {
                      if (key === 'diameter') onUpdateDims({ ...dims, length: n, width: n }, true)
                      else onUpdateDims({ ...dims, [key]: n }, true)
                    }}
                  />
                  <span className="prop-unit">cm</span>
                </div>
              ))
            ) : (
              [
                { label: 'Length',         key: 'length' },
                { label: 'Width',          key: 'width' },
                { label: 'Height',         key: 'height' },
                { label: 'Wall Thickness', key: 'wall' },
              ].map(({ label, key }) => (
                <div className="prop-row" key={key}>
                  <span className="prop-label">{label}</span>
                  <DimInput
                    value={dims[key]}
                    onChange={n => onUpdateDims({ ...dims, [key]: n }, false)}
                    onCommit={n => onUpdateDims({ ...dims, [key]: n }, true)}
                  />
                  <span className="prop-unit">cm</span>
                </div>
              ))
            )}
          </>
        ) : null}
      </div>

      {/* ── Navigation ── */}
      <div className="sb-nav-btns" style={{ display: 'flex', gap: '8px', padding: '16px', borderTop: '1px solid #e5e7eb', marginTop: 'auto' }}>
        {step > 0 && (
          <button className="nav-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onStepChange(step - 1)}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
        )}
        {step < 4 ? (
          <button className="nav-btn nav-next" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onStepChange(step + 1)}>
            Next
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ) : (
          <div style={{ flex: 1 }} />
        )}
      </div>

    </aside>
  )
}
