const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../node_modules/quill-better-table/dist/quill-better-table.js')

if (!fs.existsSync(filePath)) {
  console.log('quill-better-table not found, skipping patch.')
  process.exit(0)
}

let content = fs.readFileSync(filePath, 'utf8')

const buggyCode = `    let thisBinding = quill.keyboard.bindings['Backspace'].pop();
    quill.keyboard.bindings['Backspace'].splice(0, 1, thisBinding);`

const fixedCode = `    const _backspaceBindings = quill.keyboard.bindings['Backspace'] || quill.keyboard.bindings[8];
    let thisBinding = _backspaceBindings && _backspaceBindings.length ? _backspaceBindings.pop() : null;
    if (thisBinding) _backspaceBindings.splice(0, 1, thisBinding);`

if (content.includes(buggyCode)) {
  content = content.replace(buggyCode, fixedCode)
  fs.writeFileSync(filePath, content, 'utf8')
  console.log('✓ quill-better-table patched: Backspace binding key fixed.')
} else if (content.includes(fixedCode)) {
  console.log('✓ quill-better-table already patched.')
} else {
  console.warn('⚠ quill-better-table: patch target not found, may need manual review.')
}
