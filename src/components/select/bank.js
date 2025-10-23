import { Select, Spin } from 'antd'

const { Option } = Select

export const Selectbank = ({
  options,
  bank,
  loading,
  onSelect
}) => (
  <Select
    placeholder='Seleccione un banco...'
    notFoundContent={loading ? <Spin size='small' /> : null}
    onSelect={onSelect}
    value={bank ? bank.name : undefined}
    optionFilterProp='children'
    showSearch
  >
    {options.map(item => (
      <Option key={item.code} value={item.name} code={item.code}>
        {item.name}
      </Option>
    ))}
  </Select>
)
