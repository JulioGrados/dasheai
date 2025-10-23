import { Select, Spin } from 'antd'
import { useLabels } from '../../hooks'

const { Option } = Select

export const SelectLabels = ({ values = [], onSelect }) => {
  const { labels } = useLabels()

  const handleSelect = _id => {
    const label = labels.find(item => item._id === _id)
    if (label) {
      values.push({
        ...label,
        ref: label._id
      })
      onSelect && onSelect(values)
    }
  }

  return (
    <Select
      mode='multiple'
      placeholder='Seleccione una etiqueta'
      //notFoundContent={loading ? <Spin size='small' /> : null}
      onSelect={handleSelect}
      value={values.map(item => item.ref)}
      optionFilterProp='children'
      showSearch
    >
      {labels.map(item => (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
