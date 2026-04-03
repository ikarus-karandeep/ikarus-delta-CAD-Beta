export default function Navbar({ onExport, onExportIFC, projectName, setProjectName, onUndo, onRedo, canUndo, canRedo }) {
  return (
    <nav className="navbar" onClick={e => e.stopPropagation()}>
      <div className="nav-logo">
        <svg viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="6" fill="#F26419" />
          <path d="M6 20L14 8L22 20Z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="3" fill="white" opacity="0.9" />
        </svg>
        <span className="nav-logo-text">Ikarus <b>CAD</b></span>
      </div>
      <div className="nav-divider" />
      <input className="nav-project" value={projectName} onChange={e => setProjectName(e.target.value)} />
      <div className="nav-spacer" />

      <button className="nav-btn" title="Undo (Ctrl+Z)" onClick={onUndo} disabled={!canUndo}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M3 13A9 9 0 1 0 6 6.2" /></svg>
      </button>
      <button className="nav-btn" title="Redo (Ctrl+Y)" onClick={onRedo} disabled={!canRedo}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M21 13a9 9 0 1 1-3-6.8" /></svg>
      </button>
      <div className="nav-divider" />
      <button className="nav-export" onClick={onExport} title="Download SVG">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
        SVG
      </button>
      <button className="nav-export nav-ifc" onClick={onExportIFC} title="Download IFC BIM Data">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        BIM (IFC)
      </button>
    </nav>
  )
}
