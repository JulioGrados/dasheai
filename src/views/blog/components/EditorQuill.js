import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Switch } from 'antd'
import 'react-quill/dist/quill.snow.css'
import 'quill-better-table/dist/quill-better-table.css'

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const { default: QBT } = await import('quill-better-table')
    const { default: Quill } = await import('quill')

    if (!Quill.imports['modules/better-table']) {
      // QBT.register() must be called explicitly — it does NOT run at import time.
      QBT.register()

      // QBT was compiled against Quill v2-dev. Parchment v1's Registry.query checks:
      //   (scope & Scope.LEVEL & blot.scope) && (scope & Scope.TYPE & blot.scope)
      // Container-based QBT blots inherit no scope from Parchment's ContainerBlot
      // → query returns null → "Unable to create table blot" during optimize().
      // Fix: set BLOCK_BLOT_SCOPE (10) on each affected blot class so the lookup succeeds.
      const BLOCK_BLOT_SCOPE = 10
      ;['formats/table', 'formats/table-row', 'formats/table-body',
        'formats/table-col-group', 'formats/table-container', 'formats/table-view'
      ].forEach(path => {
        const blot = Quill.import(path)
        if (blot && blot.scope == null) blot.scope = BLOCK_BLOT_SCOPE
      })

      // QBT's optimize() calls this.enforceAllowedChildren() — a Parchment v2 method
      // that doesn't exist in Parchment v1. Add it to both Container and Block prototypes
      // so all QBT blots (Container-based and Block-based) can call it without throwing.
      const enforceAllowedChildren = function () {
        if (!this.statics.allowedChildren) return
        this.children.forEach(child => {
          if (this.statics.allowedChildren.some(allowed => child instanceof allowed)) return
          child.unwrap()
        })
      }
      const Container = Quill.import('blots/container')
      const Block = Quill.import('blots/block')
      if (typeof Container.prototype.enforceAllowedChildren !== 'function') {
        Container.prototype.enforceAllowedChildren = enforceAllowedChildren
      }
      if (typeof Block.prototype.enforceAllowedChildren !== 'function') {
        Block.prototype.enforceAllowedChildren = enforceAllowedChildren
      }

      // TableRow.checkMerge() calls super.checkMerge() which doesn't exist in
      // Parchment v1's ContainerBlot — rows never merge same row-id cells into one row.
      if (typeof Container.prototype.checkMerge !== 'function') {
        Container.prototype.checkMerge = function () {
          return this.next !== null && this.next.constructor === this.constructor
        }
      }

      // Parchment v2 ContainerBlot.optimize() wraps in requiredContainer and merges
      // adjacent same-type blots. Parchment v1 doesn't do either. TableBody needs to
      // wrap in TableContainer, TableContainer in TableViewWrapper, and all three need
      // to merge adjacent siblings so the table hierarchy collapses correctly.
      ;['formats/table-body', 'formats/table-container', 'formats/table-view'].forEach(bPath => {
        const blot = Quill.import(bPath)
        if (!blot || blot.prototype._v2OptimizePatched) return
        const orig = blot.prototype.optimize
        blot.prototype.optimize = function (context) {
          if (orig) orig.call(this, context)
          if (this.statics.requiredContainer &&
              !(this.parent instanceof this.statics.requiredContainer)) {
            this.wrap(this.statics.requiredContainer.blotName)
          }
          if (this.next !== null && this.next.constructor === this.constructor) {
            this.next.moveChildren(this)
            this.next.remove()
          }
        }
        blot.prototype._v2OptimizePatched = true
      })

      Quill.register({ 'modules/better-table': QBT }, true)
    }

    return RQ
  },
  { ssr: false }
)

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'script',
  'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'direction', 'align',
  'link', 'image', 'video',
  'table-cell-line', 'table', 'table-row', 'table-body',
  'table-col', 'table-col-group', 'table-container', 'table-view'
]

const getQuill = (wrapperRef) => {
  if (!wrapperRef.current) return null
  const container = wrapperRef.current.querySelector('.ql-container')
  return (container && container.__quill) ? container.__quill : null
}


export const EditorQuill = ({ value, onChange, placeholder = 'Escribe el contenido del blog...' }) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const [modules, setModules] = useState(null)
  const wrapperRef = useRef(null)
  const isInsertingTable = useRef(false)

  // editorHtml mirrors what Quill currently contains and is passed as value to ReactQuill.
  // ReactQuill's componentDidUpdate compares value vs getEditorContents() — keeping them
  // in sync prevents it from calling setEditorContents (which would wipe user edits).
  const [editorHtml, setEditorHtml] = useState(value || '')
  const lastReported = useRef(value || '')

  useEffect(() => {
    setModules({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      'better-table': true,
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: true
      }
    })
  }, [])

  // QBT's matchTableCell is missing the `'\n'` push that matchTableHeader has.
  // Without it, plain-text <td> cells never get the table-cell-line Delta attribute
  // and render as plain text. Replace the 'td' matcher once the editor is ready.
  useEffect(() => {
    if (!modules) return
    const quill = getQuill(wrapperRef)
    if (!quill) return
    const clipboard = quill.getModule('clipboard')
    if (!clipboard) return
    const matchers = clipboard.matchers
    const tdIdx = matchers ? matchers.findIndex(([sel]) => sel === 'td') : -1
    if (tdIdx === -1) return
    matchers[tdIdx] = ['td', function (node, delta) {
      const row = node.parentNode
      const tableParent = row && row.parentNode
      const table = tableParent && tableParent.tagName === 'TABLE'
        ? tableParent
        : (tableParent && tableParent.parentNode)
      const rows = table ? Array.from(table.querySelectorAll('tr')) : (row ? [row] : [])
      const cells = row ? Array.from(row.querySelectorAll('td')) : [node]
      const rowId = rows.indexOf(row) + 1
      const cellId = cells.indexOf(node) + 1
      const colspan = node.getAttribute('colspan') || false
      const rowspan = node.getAttribute('rowspan') || false
      const Delta = delta.constructor

      if (delta.length() === 0) {
        return new Delta().insert('\n', {
          'table-cell-line': { row: rowId, cell: cellId, rowspan, colspan }
        })
      }

      // Pass 1: split each string op at '\n' boundaries, adding table-cell-line to '\n' ops.
      // Add a trailing '\n' if none present (the missing fix in QBT's matchTableCell).
      let pass1 = delta.reduce((d, op) => {
        if (op.insert && typeof op.insert === 'string') {
          const lines = []
          let insertStr = op.insert
          let start = 0
          for (let i = 0; i < insertStr.length; i++) {
            if (insertStr.charAt(i) === '\n') {
              if (i === 0) { lines.push('\n') } else { lines.push(insertStr.substring(start, i)); lines.push('\n') }
              start = i + 1
            }
          }
          const tailStr = insertStr.substring(start)
          if (tailStr) lines.push(tailStr)
          if (lines.indexOf('\n') < 0) lines.push('\n')
          lines.forEach(text => {
            text === '\n'
              ? d.insert('\n', op.attributes)
              : d.insert(text, op.attributes)
          })
        } else {
          d.insert(op.insert, op.attributes)
        }
        return d
      }, new Delta())

      // Pass 2: stamp table-cell-line on every '\n'-starting op.
      return pass1.reduce((d, op) => {
        if (op.insert && typeof op.insert === 'string' && op.insert.startsWith('\n')) {
          d.insert(op.insert, Object.assign({}, op.attributes, {
            'table-cell-line': { row: rowId, cell: cellId, rowspan, colspan }
          }))
        } else {
          d.insert(op.insert, op.attributes)
        }
        return d
      }, new Delta())
    }]
  }, [modules])

  // External value changes (loading a different post) — update editorHtml so ReactQuill
  // calls setEditorContents with the new content.
  useEffect(() => {
    const normalized = value || ''
    if (normalized === lastReported.current) return
    lastReported.current = normalized
    setEditorHtml(normalized)
  }, [value])

  const handleChange = (content) => {
    if (isInsertingTable.current) return
    setEditorHtml(content)
    lastReported.current = content
    onChange(content)
  }

  const insertTable = () => {
    const quill = getQuill(wrapperRef)
    if (!quill) return

    const tableModule = quill.getModule('better-table')
    if (!tableModule) return

    // Block handleChange during insertTable so intermediate optimize-cycle
    // text-change events don't trigger parent re-renders before we're done.
    isInsertingTable.current = true
    tableModule.insertTable(tableRows, tableCols)
    // updateContents + optimize run synchronously, so the table DOM is fully
    // built the moment insertTable() returns. Capture immediately.
    isInsertingTable.current = false

    const finalHtml = quill.root.innerHTML
    setEditorHtml(finalHtml)
    lastReported.current = finalHtml
    onChange(finalHtml)
  }

  const handleHtmlChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Switch
          checked={isHtmlMode}
          onChange={() => setIsHtmlMode(!isHtmlMode)}
          checkedChildren='HTML'
          unCheckedChildren='Visual'
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {isHtmlMode ? 'Modo HTML - Edita el codigo directamente' : 'Modo Visual - Usa el editor'}
        </span>
      </div>

      {isHtmlMode ? (
        <textarea
          value={value || ''}
          onChange={handleHtmlChange}
          placeholder='Escribe el HTML aqui... Ejemplo: <p>Texto</p> <strong>Negrita</strong> <table>...</table>'
          style={{
            width: '100%',
            minHeight: '400px',
            padding: '15px',
            fontFamily: 'Monaco, Menlo, Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            resize: 'vertical',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4'
          }}
        />
      ) : (
        <>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Insertar tabla:</span>
            <input
              type='number'
              min='1'
              max='10'
              value={tableRows}
              onChange={(e) => setTableRows(Number(e.target.value))}
              style={{ width: '50px', padding: '2px 6px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '12px' }}
            />
            <span style={{ fontSize: '12px', color: '#666' }}>filas ×</span>
            <input
              type='number'
              min='1'
              max='10'
              value={tableCols}
              onChange={(e) => setTableCols(Number(e.target.value))}
              style={{ width: '50px', padding: '2px 6px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '12px' }}
            />
            <span style={{ fontSize: '12px', color: '#666' }}>columnas</span>
            <button
              onClick={insertTable}
              disabled={!modules}
              style={{
                padding: '3px 10px',
                fontSize: '12px',
                border: '1px solid #1890ff',
                borderRadius: '4px',
                backgroundColor: modules ? '#1890ff' : '#ccc',
                color: '#fff',
                cursor: modules ? 'pointer' : 'not-allowed'
              }}
            >
              + Tabla
            </button>
          </div>
          <div ref={wrapperRef}>
            {modules
              ? (
                <ReactQuill
                  theme='snow'
                  value={editorHtml}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                  placeholder={placeholder}
                  style={{ minHeight: '300px' }}
                />
                )
              : <p style={{ color: '#999', fontSize: '13px' }}>Cargando editor...</p>}
          </div>
        </>
      )}

      {isHtmlMode && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '12px' }}>
          <strong>Etiquetas disponibles:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li><code>&lt;strong&gt;</code> - Negrita</li>
            <li><code>&lt;em&gt;</code> - Cursiva</li>
            <li><code>&lt;ul&gt;&lt;li&gt;</code> - Lista con vinetas</li>
            <li><code>&lt;ol&gt;&lt;li&gt;</code> - Lista numerada</li>
            <li><code>&lt;table&gt;&lt;thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th&gt;&lt;td&gt;</code> - Tablas</li>
            <li><code>&lt;a href=""&gt;</code> - Enlaces</li>
            <li><code>&lt;h2&gt;, &lt;h3&gt;</code> - Titulos</li>
            <li><code>&lt;blockquote&gt;</code> - Citas</li>
          </ul>
        </div>
      )}
    </div>
  )
}
