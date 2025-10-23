import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectAssessor = ({ users, user, loading, onSelect }) => {
  return (
    <Select
      placeholder='Seleccione un asesor...'
      notFoundContent={loading ? <Spin size='small' /> : null}
      onSelect={onSelect}
      value={user ? user._id : undefined}
      optionFilterProp='children'
      showSearch
    >
      {users.map(item => (
        <Option key={item._id} value={item._id}>
          {item.names}
        </Option>
      ))}
    </Select>
  )
}
