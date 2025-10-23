import { useState, useRef } from 'react'
import Highlighter from 'react-highlight-words'
import { Input, Icon, Button, Tooltip } from 'antd'

export const SearchRow = (dataIndex, placeholder = 'Buscar...') => {
  let searchInput = useRef(null)
  const [searchText, changeText] = useState('')

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
    changeText(selectedKeys[0])
  }

  const handleReset = clearFilters => {
    clearFilters()
    changeText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => (searchInput = node)}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Limpiar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Tooltip title='Buscar'>
        <Icon
          type='search'
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      </Tooltip>
    ),
    onFilter: (value, record) =>
      record &&
      value &&
      record[dataIndex] &&
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select())
      }
    },
    render: text =>
      text && (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
  })

  return getColumnSearchProps(dataIndex)
}
