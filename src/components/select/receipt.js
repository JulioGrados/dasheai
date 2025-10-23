import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectReceipt = ({
  receipts,
  receipt,
  loading,
  onSelect,
  onSearch
}) => (
  <Select
    placeholder='Buscar recibo...'
    notFoundContent={loading ? <Spin size='small' /> : undefined}
    onSelect={onSelect}
    onSearch={onSearch}
    value={receipt ? receipt._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {receipts.map(d => (
      <Option key={d._id} value={d._id}>
        {d.code}
      </Option>
    ))}
  </Select>
)
