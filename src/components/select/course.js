import { Select, Spin } from 'antd'

const { Option } = Select

export const SelectCourse = ({
  courses,
  course,
  loading,
  onSelect,
  onSearch
}) => (
  <Select
    placeholder='Buscar curso...'
    notFoundContent={loading ? <Spin size='small' /> : undefined}
    onSelect={onSelect}
    onSearch={onSearch}
    value={course ? course._id : undefined}
    optionFilterProp='children'
    showSearch
  >
    {courses.map(d => (
      <Option key={d._id} value={d._id}>
        {d.name}
      </Option>
    ))}
  </Select>
)
