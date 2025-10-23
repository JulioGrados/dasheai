import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectPayment = ({
  options,
  methodName,
  loading,
  onSelect
}) => (
  <Select
    placeholder='Seleccione un método de pago...'
    notFoundContent={loading ? <Spin size='small' /> : null}
    onSelect={onSelect}
    value={methodName ? methodName : undefined}
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
