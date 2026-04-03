import { S, uid } from '../constants.jsx'

export const getDefaultComps = (type, dims) => {
  if (type === 'barrel') {
    const rx = (dims.length / 2) * S
    const ry = (dims.width / 2) * S
    const tw = dims.wall * S
    return [
      { id: uid() + 1, type: 'heater', x: 0, y: -ry + tw + 60, z: 41, w: 44, h: 40 },
      { id: uid() + 2, type: 'bench',  style: 'L-Shape', x: (-rx + tw + 6) + (rx - tw - 36)/2, y: ry/2, z: 45, w: rx - tw - 36, h: 40 },
      { id: uid() + 3, type: 'door',   x: 0, y: ry - tw/2, z: 0, w: 72, h: 40, rot: 0 },
    ]
  } else {
    const W = dims.length * S
    const H = dims.width * S
    const tw = dims.wall * S
    const hw = W / 2, hh = H / 2
    return [
      { id: uid() + 1, type: 'heater', x: hw - tw - 60, y: -hh + tw + 120, z: 41, w: 54, h: 44 },
      { id: uid() + 2, type: 'bench',  style: 'L-Shape', x: 0, y: -hh + tw + 45, z: 45, w: W - tw * 2 - 12, h: 44 },
      { id: uid() + 3, type: 'door',   x: 0, y: hh - tw/2, z: 0, w: 76, h: 40, rot: 0 },
    ]
  }
}
