import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectUser = ({
  users,
  user,
  type,
  loading,
  onSelect,
  onSearch
}) => (
  <Select
    placeholder='Busca usuario...'
    notFoundContent={loading ? <Spin size='small' /> : null}
    onSelect={onSelect}
    onSearch={onSearch}
    value={user ? user._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {users.map(d => (
      <Option key={d._id} value={d._id}>
        {d[type]}
      </Option>
    ))}
  </Select>
)
