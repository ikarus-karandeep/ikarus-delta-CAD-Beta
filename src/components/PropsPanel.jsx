import { DOOR_OPTIONS, WINDOW_OPTIONS, BENCH_OPTIONS } from '../constants.jsx'

export default function PropsPanel({ dims, onUpdateDims, selectedComp, onUpdateComp }) {
  const updateDim = (key, val, commit = false) => {
    const n = parseFloat(val)
    if (!isNaN(n) && n > 0) {
      const nextDims = { ...dims, [key]: n }
      onUpdateDims(nextDims, commit)
    }
  }

  return (
    <aside className="props-panel" onClick={e => e.stopPropagation()}>
      <div className="pp-header">
        <div className="pp-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
            <line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
          </svg>
          Properties {selectedComp ? `— ${selectedComp.type.toUpperCase()}` : ''}
        </div>
      </div>

      {selectedComp ? (
        <div className="pp-section">
          <div className="pp-section-label">Selected Object</div>

          {/* Position and Size */}
          <div className="prop-row">
            <span className="prop-label">Pos X</span>
            <input className="prop-input" type="number" value={Math.round(selectedComp.x)}
              onChange={e => onUpdateComp(selectedComp.id, { x: +e.target.value }, false)}
              onBlur={() => onUpdateComp(selectedComp.id, { x: selectedComp.x }, true)} />
          </div>
          <div className="prop-row">
            <span className="prop-label">Pos Y</span>
            <input className="prop-input" type="number" value={Math.round(selectedComp.y)}
              onChange={e => onUpdateComp(selectedComp.id, { y: +e.target.value }, false)}
              onBlur={() => onUpdateComp(selectedComp.id, { y: selectedComp.y }, true)} />
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

          {/* Object specific styling options */}
          {selectedComp.type === 'door' && (
            <div className="prop-row">
              <span className="prop-label">Style</span>
              <select className="prop-input" value={selectedComp.style || 'Full Glass'}
                onChange={e => onUpdateComp(selectedComp.id, { style: e.target.value }, true)}>
                {DOOR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
          {selectedComp.type === 'window' && (
            <div className="prop-row">
              <span className="prop-label">Style</span>
              <select className="prop-input" value={selectedComp.style || 'Clear Pane'}
                onChange={e => onUpdateComp(selectedComp.id, { style: e.target.value }, true)}>
                {WINDOW_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
          {selectedComp.type === 'bench' && (
            <div className="prop-row">
              <span className="prop-label">Style</span>
              <select className="prop-input" value={selectedComp.style || 'L-Shape'}
                onChange={e => onUpdateComp(selectedComp.id, { style: e.target.value }, true)}>
                {BENCH_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
        </div>
      ) : (
        <div className="pp-section">
          <div className="pp-section-label">General Dimensions</div>
          {[
            { label: 'Length',         key: 'length' },
            { label: 'Width',          key: 'width' },
            { label: 'Height',         key: 'height' },
            { label: 'Wall Thickness', key: 'wall' },
          ].map(({ label, key }) => (
            <div className="prop-row" key={key}>
              <span className="prop-label">{label}</span>
              <input className="prop-input" type="number" value={dims[key]}
                onChange={e => updateDim(key, e.target.value, false)}
                onBlur={() => updateDim(key, dims[key], true)}
                min="10" max="1000" />
              <span className="prop-unit">cm</span>
            </div>
          ))}
        </div>
      )}

      {/* No footer needed as all changes are real-time */}
    </aside>
  )
}
