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

// ── Patch 3: quill-better-table — matchTableCell missing '\n' push ────────────────
// matchTableHeader has `if (lines.indexOf('\n') < 0) lines.push('\n')` but matchTableCell
// doesn't. Without it, plain-text <td> cells (no embedded newline) never get
// the table-cell-line Delta attribute and render as plain text after paste.

if (!fs.existsSync(qbtPath)) {
  // already logged above
} else {
  let content = fs.readFileSync(qbtPath, 'utf8')

  // matchTableCell splits op.insert at '\n' chars, pushes tailStr, then reduces via forEach.
  // The forEach uses op.attributes (unique to matchTableCell vs matchTableHeader) so this
  // target string is only found once in the file.
  const buggyMatchCell =
    `      if (tailStr) lines.push(tailStr);\n` +
    `      lines.forEach(text => {\n` +
    `        text === '\\n' ? newDelta.insert('\\n', op.attributes) : newDelta.insert(text, _omit(op.attributes, ['table', 'table-cell-line']));`

  const fixedMatchCell =
    `      if (tailStr) lines.push(tailStr);\n` +
    `      if (lines.indexOf('\\n') < 0) { lines.push('\\n'); }\n` +
    `      lines.forEach(text => {\n` +
    `        text === '\\n' ? newDelta.insert('\\n', op.attributes) : newDelta.insert(text, _omit(op.attributes, ['table', 'table-cell-line']));`

  if (content.includes(buggyMatchCell)) {
    content = content.replace(buggyMatchCell, fixedMatchCell)
    fs.writeFileSync(qbtPath, content, 'utf8')
    console.log('✓ quill-better-table patched: matchTableCell missing newline fixed.')
  } else if (content.includes("if (lines.indexOf('\\n') < 0) { lines.push('\\n'); }")) {
    console.log('✓ quill-better-table matchTableCell already patched.')
  } else {
    console.warn('⚠ quill-better-table: matchTableCell patch target not found, runtime fix will apply.')
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

  // Guard: only touch the browser selection when the range's node is in the document.
  // Without this, removeAllRanges() clears the cursor and addRange fails silently,
  // leaving the editor with no cursor and unable to accept input.
  const fixedAddRange = `          if (range.startContainer && range.startContainer.isConnected !== false) {
            selection.removeAllRanges();
            try { selection.addRange(range); } catch (_) {}
          }`

  if (content.includes(buggyAddRange)) {
    content = content.replace(buggyAddRange, fixedAddRange)
    fs.writeFileSync(quillPath, content, 'utf8')
    console.log('✓ quill patched: addRange wrapped in try-catch.')
  } else if (content.includes('isConnected !== false') ||
             content.includes("try { selection.addRange(range); } catch (_) {}")) {
    console.log('✓ quill already patched.')
  } else {
    console.warn('⚠ quill: patch target not found, may need manual review.')
  }
}
