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

    // Registering QBT as a module type causes Quill to call QBT.register() (static),
    // which registers all table blots so table HTML persists in the editor.
    // We deliberately omit 'better-table' from the instance modules config so the
    // instance constructor never runs — it is the source of the addRange loop.
    if (!Quill.imports['modules/better-table']) {
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

const generateId = () => Math.random().toString(36).substr(2, 9)

const buildTableHTML = (rows, cols) => {
  let html = '<table class="quill-better-table"><colgroup>'
  for (let c = 0; c < cols; c++) html += '<col width="150">'
  html += '</colgroup><tbody>'
  for (let r = 0; r < rows; r++) {
    const rowId = `row-${generateId()}`
    html += `<tr data-row="${rowId}">`
    for (let c = 0; c < cols; c++) {
      const cellId = `cell-${generateId()}`
      html += `<td data-row="${rowId}" rowspan="1" colspan="1">`
      html += `<p class="qlbt-cell-line" data-row="${rowId}" data-cell="${cellId}" data-rowspan="1" data-colspan="1"><br></p>`
      html += '</td>'
    }
    html += '</tr>'
  }
  html += '</tbody></table>'
  return html
}

export const EditorQuill = ({ value, onChange, placeholder = 'Escribe el contenido del blog...' }) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const [modules, setModules] = useState(null)
  const wrapperRef = useRef(null)
  const isInsertingTable = useRef(false)

  // lockedValue never changes after mount — ReactQuill never gets a new value prop,
  // eliminating the onChange → parent re-render → setContents → text-change loop.
  const [lockedValue] = useState(value || '')
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
      // 'better-table' intentionally omitted — its constructor causes addRange errors.
      // Blots are registered via QBT.register() (static) when the module type is registered above.
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: true
      }
    })
  }, [])

  // External value changes (loading a different post) — update Quill directly,
  // never via the value prop so ReactQuill never re-renders.
  useEffect(() => {
    const normalized = value || ''
    if (normalized === lastReported.current) return
    lastReported.current = normalized
    const quill = getQuill(wrapperRef)
    if (!quill) return
    const delta = quill.clipboard.convert(normalized)
    quill.setContents(delta)
  }, [value])

  const handleChange = (content) => {
    if (isInsertingTable.current) return
    lastReported.current = content
    onChange(content)
  }

  const insertTable = () => {
    const quill = getQuill(wrapperRef)
    if (!quill) return

    const html = buildTableHTML(tableRows, tableCols)
    const range = quill.getSelection(true)
    const index = range ? range.index : quill.getLength()

    isInsertingTable.current = true
    quill.clipboard.dangerouslyPasteHTML(index, html)

    setTimeout(() => {
      isInsertingTable.current = false
      const finalHtml = quill.root.innerHTML
      lastReported.current = finalHtml
      onChange(finalHtml)
    }, 100)
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
                  value={lockedValue}
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
