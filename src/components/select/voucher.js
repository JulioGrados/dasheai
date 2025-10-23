import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectVoucher = ({
  vouchers,
  voucher,
  loading,
  onSelect,
  onSearch
}) => (
  <Select
    placeholder='Buscar voucher...'
    notFoundContent={loading ? <Spin size='small' /> : undefined}
    onSelect={onSelect}
    onSearch={onSearch}
    value={voucher ? voucher._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {vouchers.map(d => (
      <Option key={d._id} value={d._id}>
        {d.code}
      </Option>
    ))}
  </Select>
)
