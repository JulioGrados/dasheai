import { useState, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Switch } from 'antd'
import 'react-quill/dist/quill.snow.css'
import 'quill-better-table/dist/quill-better-table.css'

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const { default: QuillBetterTable } = await import('quill-better-table')
    const { default: Quill } = await import('quill')
    if (!Quill.imports['modules/better-table']) {
      Quill.register({ 'modules/better-table': QuillBetterTable }, true)
    }
    return RQ
  },
  { ssr: false, loading: () => <p>Cargando editor...</p> }
)

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'direction',
  'align',
  'link',
  'image',
  'video'
]

export const EditorQuill = ({ value, onChange, placeholder = 'Escribe el contenido del blog...' }) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const quillRef = useRef(null)

  const modules = useMemo(() => ({
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
  }), [])

  const insertTable = () => {
    if (!quillRef.current) return
    const editor = quillRef.current.getEditor()
    const tableModule = editor.getModule('better-table')
    if (tableModule) {
      tableModule.insertTable(tableRows, tableCols)
    }
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
            <span style={{ fontSize: '12px', color: '#666' }}>filas x</span>
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
              style={{
                padding: '3px 10px',
                fontSize: '12px',
                border: '1px solid #1890ff',
                borderRadius: '4px',
                backgroundColor: '#1890ff',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              + Tabla
            </button>
            <span style={{ fontSize: '11px', color: '#999' }}>Clic derecho sobre la tabla para mas opciones</span>
          </div>
          <ReactQuill
            ref={quillRef}
            theme='snow'
            value={value || ''}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            style={{ minHeight: '300px' }}
          />
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
