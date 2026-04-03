import { readFileSync, writeFileSync } from 'fs'

const path    = 'src/App.jsx'
const snippet = readFileSync('cube3d_snippet.jsx', 'utf8')
const lines   = readFileSync(path, 'utf8').split('\n')

// Extract only the Cube3DView portion from the snippet
const sLines       = snippet.split('\n')
const cubeStartIdx = sLines.findIndex(l => l.startsWith('// ── 3D Preview (cube)'))
const cubeEndIdx   = sLines.findLastIndex(l => l.trim() === '}')
const cubeBlock    = sLines.slice(cubeStartIdx, cubeEndIdx + 1).join('\n')

// Find insertion point: just before '// ── CompShape'
const insertBefore = lines.findIndex(l => l.startsWith('// ── CompShape'))
if (insertBefore === -1) { console.error('CompShape marker not found'); process.exit(1) }
console.log('Inserting Cube3DView before line', insertBefore + 1)

const newLines = [
  ...lines.slice(0, insertBefore),
  cubeBlock,
  '',
  ...lines.slice(insertBefore)
]

writeFileSync(path, newLines.join('\n'), 'utf8')
console.log('SUCCESS')
