import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectProgress = ({ progresses, progress, loading, onSelect }) => {
  return (
    <Select
      placeholder='Seleccione un estado de progreso...'
      notFoundContent={loading ? <Spin size='small' /> : null}
      onSelect={onSelect}
      value={progress ? progress._id : undefined}
      optionFilterProp='children'
      showSearch
    >
      {progresses.map(item => (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
