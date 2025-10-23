import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectCategory = ({ categories, category, loading, onSelect }) => {
  return (
    <Select
      placeholder='Seleccione una categoria...'
      notFoundContent={loading ? <Spin size='small' /> : null}
      onSelect={onSelect}
      value={category ? category._id : undefined}
      optionFilterProp='children'
      showSearch
    >
      {categories.map(item => (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
