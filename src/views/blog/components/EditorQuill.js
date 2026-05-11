import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Switch } from 'antd'
import 'react-quill/dist/quill.snow.css'
import 'quill-better-table/dist/quill-better-table.css'

const BACKSPACE_KEY_CODE = 8

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const { default: QBT } = await import('quill-better-table')
    const { default: Quill } = await import('quill')

    class BetterTablePatched extends QBT {
      constructor (quill, options) {
        if (quill.keyboard && !quill.keyboard.bindings['Backspace']) {
          // Use .slice() to give QBT a COPY — prevents its pop()/splice()
          // from mutating Quill v1's real bindings stored under numeric key 8
          quill.keyboard.bindings['Backspace'] = (quill.keyboard.bindings[BACKSPACE_KEY_CODE] || []).slice()
        }
        super(quill, options)
      }
    }
    BetterTablePatched.keyboardBindings = QBT.keyboardBindings

    if (!Quill.imports['modules/better-table']) {
      Quill.register({ 'modules/better-table': BetterTablePatched }, true)
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

export const EditorQuill = ({ value, onChange, placeholder = 'Escribe el contenido del blog...' }) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const [modules, setModules] = useState(null)
  const wrapperRef = useRef(null)
  const isInsertingTable = useRef(false)

  // stableValue: lo que pasamos a ReactQuill como prop value.
  // Solo se actualiza cuando el contenido cambia DESDE AFUERA del editor
  // (por ejemplo, al cargar un post existente). Nunca se actualiza en
  // respuesta a nuestro propio onChange, lo que rompe el bucle infinito:
  //   insertTable → onChange → parent state → value prop → setEditorContents → text-change → loop
  const [stableValue, setStableValue] = useState(value || '')
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
      'better-table': {
        operationMenu: {
          items: {
            insertColumnRight: { text: 'Insertar columna derecha' },
            insertColumnLeft: { text: 'Insertar columna izquierda' },
            insertRowUp: { text: 'Insertar fila arriba' },
            insertRowDown: { text: 'Insertar fila abajo' },
            mergeCells: { text: 'Combinar celdas' },
            unmergeCells: { text: 'Separar celdas' },
            deleteColumn: { text: 'Eliminar columna' },
            deleteRow: { text: 'Eliminar fila' },
            deleteTable: { text: 'Eliminar tabla' }
          }
        }
      },
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: true
      }
    })
  }, [])

  useEffect(() => {
    const normalized = value || ''
    if (normalized !== lastReported.current) {
      lastReported.current = normalized
      setStableValue(normalized)
    }
  }, [value])

  const handleChange = (content) => {
    if (isInsertingTable.current) return
    lastReported.current = content
    onChange(content)
  }

  const insertTable = () => {
    if (!wrapperRef.current) return
    const container = wrapperRef.current.querySelector('.ql-container')
    if (!container || !container.__quill) return
    const quill = container.__quill
    const tableModule = quill.getModule('better-table')
    if (!tableModule) return

    isInsertingTable.current = true
    tableModule.insertTable(tableRows, tableCols)

    // Report final state once after table operations settle,
    // avoiding the insertTable → onChange → value prop → loop cycle
    setTimeout(() => {
      isInsertingTable.current = false
      const html = quill.root.innerHTML
      lastReported.current = html
      onChange(html)
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
            <span style={{ fontSize: '11px', color: '#999' }}>Clic derecho sobre la tabla para más opciones</span>
          </div>
          <div ref={wrapperRef}>
            {modules
              ? (
                <ReactQuill
                  theme='snow'
                  value={stableValue}
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
