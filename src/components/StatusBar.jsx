export default function StatusBar({ saunaType, cursor, objCount }) {
  return (
    <div className="status-bar">
      <div className="status-item"><div className="status-dot" /><span>{saunaType === 'barrel' ? 'Barrel Sauna' : 'Cube Sauna'}</span></div>
      {/* <div className="status-item">Mode: <span>2D Plan View</span></div> */}
      {/* <div className="status-item">Cursor: <span>X {cursor.x}  Y {cursor.y}</span></div> */}
      {/* <div className="status-item">Objects: <span>{objCount}</span></div> */}
      {/* <div className="status-item status-right">Ikarus CAD v2.4</div> */}
    </div>
  )
}
