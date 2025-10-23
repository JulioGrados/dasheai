import { MEDIA_PATH } from 'utils/files/path'

import { Table, TableOptions } from 'components-path'
import { Input, Select, Button, Upload, Icon } from 'antd'
import { useState } from 'react'

import currenciesData from 'utils/functions/currencies'

export const SelectBrochure = ({ brochures = [], onChange }) => {
  const [mount, setMount] = useState()
  const [brochure, setBrochure] = useState()
  const [money, setMoney] = useState()
  console.log('brochures', brochures)
  const brochuresList = brochures && brochures.map((item, index) => {
    return {
      ...item,
      id: index
    }
  })
  const handleDelete = id => {
    const index = brochuresList.findIndex(item => item.id === id)
    if (index !== -1) {
      brochuresList.splice(index, 1)
    }
    onChange(brochuresList)
  }
  const handleSelect = value => {
    setMoney(value)
  }

  const handleAdd = () => {
    if (brochure && money) {
      const data = {
        upload: false,
        money: money,
        url: brochure
      }
      brochuresList.push(data)
      onChange(brochuresList)
      setBrochure(), setMoney()
    } else {
      console.log('Falta información')
    }
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      setBrochure(e[e.length - 1])
      return e[e.length - 1]
    }
    setBrochure(e.file)
    console.log('e.file', e.file)
    console.log('data.brochureFile', brochure)
    return e && e.fileList && e.fileList[e.fileList.length - 1]
  }

  const columns = [
    {
      title: 'Moneda',
      dataIndex: 'money',
      key: 'money'
    },
    {
      title: 'Brochure',
      dataIndex: 'url',
      render: url => url.name ? url.name : url
    },
    {
      title: 'Upload',
      dataIndex: 'upload',
      render: upload => upload ? 'Sí' : 'No'
    },
    {
      title: 'Opciones',
      dataIndex: 'id',
      key: 'id',
      render: code => (
        <TableOptions
          id={code}
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esté brochure?'
        />
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Upload
          name='brochure'
          onChange={normFile}
          defaultFileList={
            brochure
              ? [
                  {
                    uid: '-1',
                    name: `brochure-${brochure}.pdf'`,
                    status: 'done',
                    url: MEDIA_PATH + brochure
                  }
                ]
              : []
          }
        >
          <Button>
            <Icon type='upload' /> Agregar Archivo
          </Button>
        </Upload>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder='Selecciona la moneda'
          showSearch
          value={money}
          onSelect={handleSelect}
        >
          {currenciesData.map((item, idx) => (
            <Select.Option key={idx} value={item.code}>
              {item.code}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button type="link" onClick={handleAdd}>Agregar brochure</Button>
      </div>
      <Table
        size='small'
        columns={columns}
        dataSource={brochuresList}
        rowKey='id'
      />
    </>
  )
}
