import { COMPONENTS, COMP_SVG } from '../constants.jsx'
import { useState, useEffect } from 'react'
import { COMPONENT_CONSTRAINTS } from '../utils/componentConstraints.js'

const getMaxCount = type => COMPONENT_CONSTRAINTS[type]?.maxCount ?? Infinity

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

export default function Sidebar({
  saunaType, onTypeSwitch, step, onStepChange, dims, onUpdateDims,
  selectedComp, onUpdateComp,
  placedComps, pendingPlacementType, validSlots, hoveredSlotIdx,
  onCompClick, onSlotHover, onSlotPlace, onCancelPlacement,
}) {
  const visibleTypes = STEP_TYPES[step] ?? []
  const visibleComps = COMPONENTS.filter(c => visibleTypes.includes(c.type))
  const isInPlacementMode = !!pendingPlacementType


  return (
    <aside className="sidebar" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>

      {/* ── Sauna type switcher ── */}
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

      {/* ── Component library (steps 1–3) ── */}
      {visibleComps.length > 0 && (
        <div style={{
          flex: isInPlacementMode ? '1 1 0' : '0 0 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 12px 0',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          {/* Fixed header — never scrolls */}
          <div className="sb-label">Components</div>
          <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 8, fontStyle: 'italic', flexShrink: 0 }}>
            Click a component to see valid placement options
          </div>

          {/* Scrollable list (non-placement mode) or flex-fill column (placement mode) */}
          <div style={{
            flex: isInPlacementMode ? '1 1 0' : '0 0 auto',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: isInPlacementMode ? 'hidden' : 'hidden',
            maxHeight: isInPlacementMode ? 'none' : 220,
            overflowY: isInPlacementMode ? 'hidden' : 'auto',
          }}>
            {visibleComps.map(c => {
              const maxCount  = getMaxCount(c.type)
              const placed    = placedComps.filter(p => p.type === c.type).length
              const isMaxed   = placed >= maxCount
              const isPending = pendingPlacementType === c.type

              return (
                <div key={c.type} style={isPending
                  ? { flex: '1 1 0', minHeight: 0, display: 'flex', flexDirection: 'column' }
                  : { flexShrink: 0 }
                }>
                  {/* ── Component row ── */}
                  <div
                    className={`comp-item ${isPending ? 'comp-pending' : ''} ${isMaxed ? 'comp-maxed' : ''}`}
                    style={{ flexShrink: 0 }}
                    draggable={!isMaxed}
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', c.type)
                      e.dataTransfer.effectAllowed = 'copy'
                      onCompClick(c.type)
                    }}
                    onClick={() => !isMaxed && onCompClick(c.type)}
                    title={isMaxed ? `Max ${maxCount} allowed` : `Click to place · drag to canvas`}
                  >
                    <svg viewBox="-16 -16 32 32" width="22" height="22" fill="none" overflow="visible">
                      {COMP_SVG[c.type]}
                    </svg>
                    <span>{c.label}</span>
                    <span className={`comp-badge ${isPending ? 'badge-pending' : isMaxed ? 'badge-maxed' : ''}`}>
                      {isMaxed
                        ? `${placed}/${maxCount} max`
                        : isPending
                          ? 'Selecting…'
                          : `${placed}/${maxCount}`}
                    </span>
                  </div>

                  {/* ── Inline position cards ── */}
                  {isPending && (
                    <div style={{
                      flex: '1 1 0', minHeight: 0,
                      display: 'flex', flexDirection: 'column',
                      background: 'var(--bg)',
                      borderTop: '1px solid var(--border)',
                      overflow: 'hidden',
                    }}>
                      {/* Header */}
                      <div style={{
                        flexShrink: 0, display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', padding: '8px 12px 7px',
                        background: '#fff', borderBottom: '1px solid var(--border)',
                      }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.7px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                          Placement Slot
                          {validSlots.length > 0 && (
                            <span style={{ background: 'var(--orange)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>
                              {validSlots.length}
                            </span>
                          )}
                        </span>
                        <button
                          onClick={onCancelPlacement}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text-2)', lineHeight: 1, padding: '0 2px', opacity: 0.45 }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 1}
                          onMouseLeave={e => e.currentTarget.style.opacity = 0.45}
                        >✕</button>
                      </div>

                      {validSlots.length === 0 ? (
                        <p style={{ padding: '14px 12px', fontSize: 11, color: 'var(--text-2)', fontStyle: 'italic', margin: 0 }}>
                          No valid positions available.
                        </p>
                      ) : (
                        /* 2-col card grid — fills all remaining height, scrolls */
                        <div style={{
                          flex: '1 1 0', minHeight: 0,
                          overflowY: 'auto',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 8,
                          padding: '10px 10px 14px',
                          alignContent: 'start',
                        }}>
                          {validSlots.map((slot, idx) => {
                            const isHovered = hoveredSlotIdx === idx
                            // Split "Bottom Wall – Far Left" → ["Bottom Wall", "Far Left"]
                            const parts = slot.label.split(' – ')
                            const primary = parts[0] || slot.label
                            const secondary = parts[1] || ''
                            return (
                              <div
                                key={idx}
                                onMouseEnter={() => onSlotHover(idx)}
                                onMouseLeave={() => onSlotHover(null)}
                                onClick={() => onSlotPlace(slot)}
                                style={{
                                  display: 'flex', flexDirection: 'column', gap: 2,
                                  padding: '10px 12px',
                                  background: isHovered ? 'var(--orange-pale)' : '#fff',
                                  border: `1.5px solid ${isHovered ? 'var(--orange)' : 'var(--border)'}`,
                                  borderRadius: 8,
                                  cursor: 'pointer',
                                  userSelect: 'none',
                                  transition: 'border-color 0.13s, background 0.13s',
                                  boxShadow: isHovered ? '0 2px 8px rgba(242,100,25,0.12)' : '0 1px 3px rgba(0,0,0,0.05)',
                                }}
                              >
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
                                  {primary}
                                </span>
                                {secondary && (
                                  <span style={{ fontSize: 11, fontWeight: 400, color: isHovered ? 'var(--orange)' : 'var(--text-2)', lineHeight: 1.2 }}>
                                    {secondary}
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 0 / 4 hint */}
      {visibleComps.length === 0 && STEP_HINTS[step] && (
        <div className="sb-step-hint" style={{ flex: 'none', padding: '10px 14px' }}>
          <p className="sb-hint-text" style={{ textAlign: 'left' }}>{STEP_HINTS[step]}</p>
        </div>
      )}

      {/* ── Properties panel ── */}
      <div className="sb-section" style={{ flex: isInPlacementMode ? 'none' : 1, overflowY: 'auto', borderBottom: 'none' }}>
        {selectedComp ? (
          <>
            <div className="sb-label">
              Properties — <span style={{ color: 'var(--orange)', textTransform: 'uppercase' }}>{selectedComp.type}</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Height (Z)</span>
              <DimInput 
                value={Math.round(selectedComp.z)}
                onChange={n => onUpdateComp(selectedComp.id, { z: n }, false)}
                onCommit={n => onUpdateComp(selectedComp.id, { z: n }, true)} 
              />
              <span className="prop-unit">cm</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Width</span>
              <DimInput 
                value={Math.round(selectedComp.w)}
                onChange={n => onUpdateComp(selectedComp.id, { w: n }, false)}
                onCommit={n => onUpdateComp(selectedComp.id, { w: n }, true)} 
              />
              <span className="prop-unit">cm</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Length/H</span>
              <DimInput 
                value={Math.round(selectedComp.h)}
                onChange={n => onUpdateComp(selectedComp.id, { h: n }, false)}
                onCommit={n => onUpdateComp(selectedComp.id, { h: n }, true)} 
              />
              <span className="prop-unit">cm</span>
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
