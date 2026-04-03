import { S } from '../constants.jsx'

export const constrainComponent = (comp, currentDims, currentType, otherComps = []) => {
  const tw = currentDims.wall * S
  const rx = (currentDims.length / 2) * S
  const ry = (currentDims.width / 2) * S

  let { x, y, z, w, h, type } = comp
  const halfW = (w || 44) / 2
  const halfH = (h || 40) / 2
  let rot = comp.rot || 0

  // 1. Boundary Constraints
  if (currentType === 'cube') {
    const isWallLock = ['window', 'vent', 'door'].includes(type)
    if (isWallLock) {
      // Snap to center of nearest wall thickness
      const distL = Math.abs(x - (-rx + tw/2))
      const distR = Math.abs(x - (rx - tw/2))
      const distT = Math.abs(y - (-ry + tw/2))
      const distB = Math.abs(y - (ry - tw/2))

      const minDist = Math.min(distL, distR, distT, distB)
      if (minDist === distL) { x = -rx + tw/2; rot = 90 }
      else if (minDist === distR) { x = rx - tw/2; rot = 90 }
      else if (minDist === distT) { y = -ry + tw/2; rot = 0 }
      else if (minDist === distB) { y = ry - tw/2; rot = 0 }

      // Keep position within box limits
      x = Math.max(-rx + tw/2, Math.min(rx - tw/2, x))
      y = Math.max(-ry + tw/2, Math.min(ry - tw/2, y))
    } else {
      x = Math.max(-rx + tw + halfW, Math.min(rx - tw - halfW, x))
      y = Math.max(-ry + tw + halfH, Math.min(ry - tw - halfH, y))
    }
    z = Math.max(tw + 5, Math.min(currentDims.height * S - tw - 10, z))
  } else {
    const brx = Math.max(10, rx - tw/2)
    const bry = Math.max(10, ry - tw/2)

    if (['window', 'vent'].includes(type)) {
      // Project to center of wall perimeter
      const angle = Math.atan2(y, x)
      x = brx * Math.cos(angle)
      y = bry * Math.sin(angle)
      rot = (angle * 180 / Math.PI) + 90
    } else {
      const brx_int = Math.max(10, rx - tw - 5)
      const bry_int = Math.max(10, ry - tw - 5)
      const dist = (x / brx_int) ** 2 + (y / bry_int) ** 2
      if (dist > 0.95) {
        const angle = Math.atan2(y, x)
        x = brx_int * 0.95 * Math.cos(angle)
        y = bry_int * 0.95 * Math.sin(angle)
      }
    }
    const r = ry - tw
    const zMax = Math.sqrt(Math.max(0, r**2 - y**2))
    z = Math.max(-r + 10, Math.min(zMax - 10, z))
  }

  // 2. Collision Detection (physical bounds checking, but not blocking yet)
  const physicalItems = ['heater', 'bench', 'steps', 'window', 'vent']
  if (physicalItems.includes(type)) {
    for (const other of otherComps) {
      if (other.id === comp.id || !physicalItems.includes(other.type)) continue

      // Footprint overlap check (2D x/y plane)
      const margin = 2
      const overX = Math.abs(x - other.x) < (halfW + (other.w||44)/2) + margin
      const overY = Math.abs(y - other.y) < (halfH + (other.h||40)/2) + margin

      if (overX && overY) {
        // Collision detected but not blocking in constrainComponent
        // The checkCollision function will handle the blocking
      }
    }
  }

  // 3. Asset-specific snapping
  if (type === 'heater') {
    if (Math.abs(z - 41) < 30) z = 41
  }
  if (type === 'bench') {
    const snapZ = [45 * S, 90 * S]
    snapZ.forEach(sz => { if (Math.abs(z - sz) < 15) z = sz })
  }
  if (type === 'light') {
    const ceilingZ = (currentType === 'cube' ? currentDims.height * S - tw - 15 : ry - tw - 15)
    if (Math.abs(z - ceilingZ) < 30) z = ceilingZ
  }

  return { ...comp, x, y, z, rot }
}

export const checkCollision = (comp, allComps) => {
  const physicalItems = ['heater', 'bench', 'steps', 'window', 'vent', 'door']
  if (!physicalItems.includes(comp.type)) return false

  return allComps.some(other => {
    if (other.id === comp.id || !physicalItems.includes(other.type)) return false
    const margin = 2

    const rotC = (comp.rot || 0) % 180
    const rotO = (other.rot || 0) % 180
    const cw  = (rotC === 90 || rotC === 270) ? (comp.h||40) : (comp.w||44)
    const ch  = (rotC === 90 || rotC === 270) ? (comp.w||44) : (comp.h||40)
    const ow  = (rotO === 90 || rotO === 270) ? (other.h||40) : (other.w||44)
    const oh  = (rotO === 90 || rotO === 270) ? (other.w||44) : (other.h||40)

    const overX = Math.abs(comp.x - other.x) < (cw/2 + ow/2) + margin
    const overY = Math.abs(comp.y - other.y) < (ch/2 + oh/2) + margin
    return overX && overY
  })
}
