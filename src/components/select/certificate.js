import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectCertificate = ({
  certificates,
  certificate,
  loading,
  onSelect,
  onSearch
}) => (
  <Select
    placeholder='Buscar certificado...'
    notFoundContent={loading ? <Spin size='small' /> : undefined}
    onSelect={onSelect}
    onSearch={onSearch}
    value={certificate ? certificate._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {certificates.map(d => (
      <Option key={d._id} value={d._id}>
        {d.code}
      </Option>
    ))}
  </Select>
)
