import { Icon, Tooltip } from 'antd'

export const FilterRow = (column, items, unique = false) => {
  const getFilters = () => {
    let list = []
    for (const item of items) {
      if (Array.isArray(item[column])) {
        item[column].forEach(listItem => {
          if (listItem && !list.includes(listItem)) {
            list.push(listItem)
          }
        })
      } else if (item[column] && !list.includes(item[column])) {
        list.push(item[column])
      }
    }

    return list.map(item => {
      return {
        text: item,
        value: item
      }
    })
  }

  const getColumnFilterProps = dataIndex => ({
    key: dataIndex,
    filterIcon: filtered => (
      <Tooltip title='Filtrar'>
        <Icon
          type='filter'
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      </Tooltip>
    ),
    filters: getFilters(),
    onFilter: (value, record) =>
      record && value && record[dataIndex] && Array.isArray(record[dataIndex])
        ? unique
          ? record[dataIndex]
              .map(item => {
                return item
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
                  ? true
                  : false
              })
              .filter(i => i).length ===
            record[dataIndex].map(item => {
              return item
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            }).length
          : record[dataIndex]
              .map(item => {
                return item
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
              })
              .filter(i => i).length > 0
        : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
  })

  return getColumnFilterProps(column)
}
