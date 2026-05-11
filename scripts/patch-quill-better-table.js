const fs = require('fs')
const path = require('path')

// ── Patch 1: quill-better-table — Backspace binding key ──────────────────────
const qbtPath = path.join(__dirname, '../node_modules/quill-better-table/dist/quill-better-table.js')

if (!fs.existsSync(qbtPath)) {
  console.log('quill-better-table not found, skipping patch.')
} else {
  let content = fs.readFileSync(qbtPath, 'utf8')

  const buggyCode = `    let thisBinding = quill.keyboard.bindings['Backspace'].pop();
    quill.keyboard.bindings['Backspace'].splice(0, 1, thisBinding);`

  const fixedCode = `    const _backspaceBindings = quill.keyboard.bindings['Backspace'] || quill.keyboard.bindings[8];
    let thisBinding = _backspaceBindings && _backspaceBindings.length ? _backspaceBindings.pop() : null;
    if (thisBinding) _backspaceBindings.splice(0, 1, thisBinding);`

  if (content.includes(buggyCode)) {
    content = content.replace(buggyCode, fixedCode)
    fs.writeFileSync(qbtPath, content, 'utf8')
    console.log('✓ quill-better-table patched: Backspace binding key fixed.')
  } else if (content.includes(fixedCode)) {
    console.log('✓ quill-better-table already patched.')
  } else {
    console.warn('⚠ quill-better-table: patch target not found, may need manual review.')
  }
}

// ── Patch 2: quill — addRange without try-catch causes rAF loop on invalid ranges ─
const quillPath = path.join(__dirname, '../node_modules/quill/dist/quill.js')

if (!fs.existsSync(quillPath)) {
  console.log('quill not found, skipping patch.')
} else {
  let content = fs.readFileSync(quillPath, 'utf8')

  const buggyAddRange = `          selection.removeAllRanges();
          selection.addRange(range);`

  const fixedAddRange = `          selection.removeAllRanges();
          try { selection.addRange(range); } catch (_) {}`

  if (content.includes(buggyAddRange)) {
    content = content.replace(buggyAddRange, fixedAddRange)
    fs.writeFileSync(quillPath, content, 'utf8')
    console.log('✓ quill patched: addRange wrapped in try-catch.')
  } else if (content.includes(fixedAddRange)) {
    console.log('✓ quill already patched.')
  } else {
    console.warn('⚠ quill: patch target not found, may need manual review.')
  }
}
