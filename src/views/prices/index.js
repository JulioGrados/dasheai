import moment from 'moment'

import { useState } from 'react'
import { Input, Select, Button, message } from 'antd'


import {
  Table,
  SearchRow,
  HeaderSection
} from 'components-path'
import { useCourses } from '../../hooks'
import {
  HeaderFilter,
  HeaderButton,
  HeaderFilterSelect,
  HeaderFilterRight,
  HeaderFilterLeft
} from './styles/styles'

import currenciesData from 'utils/functions/currencies'
import { priceCourse } from 'utils/api/courses'


export const CourseListPrice = () => {
  const { courses } = useCourses()
  const [items, setItems] = useState([])
  const [money, setMoney] = useState()
  const [amount, setAmount] = useState()

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setItems(selectedRows)
    }
  }

  const handleSelect = (coin) => {
    setMoney(coin)
  }

  const handleSubmit = async () => {
    if (items && money && amount) {
      const data = {
        courses: items,
        money: money,
        amount: amount
      }

      const response = await priceCourse(data)
      if (response.success) {
        if (response.errorCourses.length) {
          message.warning('Para algunos cursos no se agrego el monto y moneda.')
        } else {
          console.log('entro 2')
          message.success('El proceso se realizó exitosamente.')
        }
      } else {
        message.error('No se realizó el proceso.')
      }
    } else {
      message.error('Seleccionar cursos, moneda y agregar monto')
    }
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: 150,
      ...SearchRow('name')
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      width: 150,
      ...SearchRow('slug')
    },
    {
      width: 150,
      title: 'Nombre corto',
      dataIndex: 'shortName',
      ...SearchRow('shortName')
    },
    {
      width: 150,
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      width: 150,
      title: 'Moodle ID',
      dataIndex: 'moodleId',
      key: 'moodleId',
      ...SearchRow('moodleId', 'Buscar por Moodle ID.')
    },
    {
      width: 150,
      title: 'Publicado',
      dataIndex: 'published',
      key: 'published',
      sorter: (a, b) => moment(a.published).isSameOrAfter(moment(b.published)),
      render: published => moment(published).format('ll')
    }
  ]

  return (
    <>
      <HeaderSection title='Precios'>
        
      </HeaderSection>
      <HeaderFilter>
        <HeaderFilterLeft>
          <Input value={amount} placeholder="Ingresar precio" onChange={event => setAmount(event.target.value)} />
        </HeaderFilterLeft>
        <HeaderFilterRight>
          <HeaderFilterSelect>
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
          </HeaderFilterSelect>
          <HeaderButton onClick={handleSubmit}>Agregar moneda</HeaderButton>
        </HeaderFilterRight>
      </HeaderFilter>
      <Table
        columns={columns}
        dataSource={courses}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 100 }}
        loading={!courses}
        bordered
        rowKey='_id'
        rowSelection={rowSelection}
      />
    </>
  )
}
