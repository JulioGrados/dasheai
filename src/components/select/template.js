import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectTemplate = ({ templates, template, loading, onSelect }) => {
  console.log('template', template)
  console.log('idx', idx)
  return (
    <Select
      placeholder='Buscar plantilla...'
      notFoundContent={loading ? <Spin size='small' /> : null}
      onSelect={onSelect}
      value={template ? template.name : undefined}
      optionFilterProp='children'
      showSearch
    >
      {templates.map((d, idx) => (
        <Option key={d.id} value={d.name}>
          {d.name}
        </Option>
      ))}
    </Select>
  )
}
