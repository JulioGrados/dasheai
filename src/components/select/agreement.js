import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectAgreement = ({
  agreements,
  agreement,
  loading,
  onSelect
}) => (
  <Select
    placeholder='Seleccione un convenio...'
    notFoundContent={loading ? <Spin size='small' /> : null}
    onSelect={onSelect}
    value={agreement ? agreement._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {agreements.map(item => (
      <Option key={item._id} value={item._id}>
        {item.institution}
      </Option>
    ))}
  </Select>
)
