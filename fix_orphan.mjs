import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.jsx'
const lines = readFileSync(path, 'utf8').split('\n')

// Find the second 'Barrel3DView' function signature — that's the old orphaned body
// The orphaned body starts right after the new function's closing brace with `  const rx = ...`
// Strategy: find the line with 'const rx = (dims.length / 2) * S * 0.75' that is NOT inside any function
// and remove from there up to (and including) the next standalone '}'

let orphanStart = -1
let orphanEnd   = -1

// The orphaned code starts right after line 387 '}' — we look for the specific rx/ry lines
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const rx = (dims.length / 2) * S * 0.75')) {
    orphanStart = i
    break
  }
}

if (orphanStart === -1) {
  console.log('Orphan already removed.')
  process.exit(0)
}

// Walk forward to find the closing brace block that ends it (the old barrel's closing })
// which is: "  )\n}\n"
let depth = 0
for (let i = orphanStart; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === '{') depth++
    else if (ch === '}') depth--
  }
  // The orphan block ends when we hit the lone closing `}` of the return block
  if (lines[i].trim() === '}' && depth === 0) {
    orphanEnd = i
    break
  }
}

if (orphanEnd === -1) { console.error('Could not find orphan end'); process.exit(1) }
console.log('Removing lines', orphanStart + 1, 'to', orphanEnd + 1)

const newLines = [...lines.slice(0, orphanStart), ...lines.slice(orphanEnd + 1)]
writeFileSync(path, newLines.join('\n'), 'utf8')
console.log('SUCCESS')
