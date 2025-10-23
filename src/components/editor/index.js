import CKEditor from 'ckeditor4-react'

export const EditorCK = ({ id, data = '', onChange }) => {
  return (
    <CKEditor
      id={id}
      editorName={id}
      data={data}
      onChange={content => onChange(content.editor.getData())}
      config={{ extraPlugins: 'emoji' }}
    />
  )
}
