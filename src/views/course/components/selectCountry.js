import { Table, TableOptions } from 'components-path'
import { Select } from 'antd'
import dataCountries from 'utils/functions/dataCountries'

export const SelectCountries = ({ countries = [], onChange }) => {
  const countriesList = countries.map((country, index) => {
    if(country._id) {
      return {
        ...country
      }  
    } else {
      return {
        ...country,
        _id: index
      }
    }
  })
  
  const handleDelete = id => {
    const index = countriesList.findIndex(item => item._id === id)
    if (index !== -1) {
      countriesList.splice(index, 1)
    }
    onChange(countriesList)
  }
  const handleSelect = country => {
    const index = countriesList.findIndex(item => item.name === country)
    if (index === -1) {
      const data = dataCountries.find(item => item.name === country)
      countriesList.push(data)
    }
    onChange(countriesList)
  }
  const columns = [
    {
      title: 'Names',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Llamada',
      dataIndex: 'callingCode',
      key: 'callingCode'
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: code => (
        <TableOptions
          id={code}
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este país?'
        />
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder='Selecciona el país'
          showSearch
          onSelect={handleSelect}
        >
          {dataCountries.map((item, idx) => (
            <Select.Option key={idx} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table
        size='small'
        columns={columns}
        dataSource={countriesList}
        rowKey='_id'
      />
    </>
  )
}
