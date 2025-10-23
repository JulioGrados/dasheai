import moment from 'moment'
import Link from 'next/link'
import { Button, Select, Input } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../../components'

import { SearchOutlined } from '@ant-design/icons'
import { HeaderFlex, HeaderButton } from '../styles/styles'
import { useEffect, useState } from 'react'

import { dashDeals } from 'utils/api/deals'
import { payloadToData } from 'utils/functions/deal'

export const DealsList = ({ list, loading, loaded, handleDelete }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [id, setID] = useState()

  const [deals, setDeals] = useState([])

  useEffect(() => {
    if (list) {
      setDeals(list)
    }
  }, [list])

  const handleButton = async () => {
    const query = []

    if (firstName) {
      const data = { 'client.firstName': { $regex: firstName, $options: 'i' } }
      query.push(data)
    }
    if (lastName) {
      const data = { 'client.lastName': { $regex: lastName, $options: 'i' } }
      query.push(data)
    }
    if (email) {
      const data = { 'client.email': { $regex: email, $options: 'i' } }
      query.push(data)
    }
    if (mobile) {
      const data = { 'client.mobile': parseInt(mobile) }
      query.push(data)
    }
    if (id) {
      const data = { _id: id }
      query.push(data)
    }

    const data = await dashDeals({query})
    const filter = data.map(item => payloadToData(item))
    setDeals(filter)
  }

  const columns = [
    {
      width: 150,
      title: 'Fecha Inicial',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).isSameOrAfter(moment(b.createdAt)),
      render: createdAt => moment(createdAt).format('DD/MM/YYYY')
    },
    {
      width: 150,
      title: 'Hora Inicial',
      dataIndex: 'hour',
      key: 'hour',
      render: hour => moment(hour).format('HH:mm')
    },
    {
      width: 150,
      title: 'Nombres del usuario',
      dataIndex: 'names',
    },
    {
      width: 150,
      title: 'Email del usuario',
      dataIndex: 'email'
    },
    {
      width: 150,
      title: 'Celular del usuario',
      dataIndex: 'mobile'
    },
    {
      width: 150,
      title: 'Cursos',
      dataIndex: 'coursesNames'
    },
    {
      width: 150,
      title: 'Asesor',
      dataIndex: 'assigned'
    },
    {
      width: 150,
      title: 'Origen',
      dataIndex: 'origin',
      render: origin => origin || 'Stranger'
    },
    {
      width: 150,
      title: 'Estado',
      dataIndex: 'status'
    },
    {
      width: 150,
      title: 'Etapa',
      dataIndex: 'progressName'
    },
    {
      width: 150,
      title: 'Etapa de Pago',
      dataIndex: 'progressPaymentName'
    },
    {
      width: 260,
      title: 'ID',
      dataIndex: 'identifier'
    },
    {
      width: 150,
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      fixed: 'right',
      render: _id => (
        <TableOptions
          id={_id}
          path='tratos'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta trato?'
          target
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection
        title='Lista de tratos'>
        <Link href='/tratos/agregar'>
          <Button type='primary'>Agregar Trato</Button>
        </Link>
      </HeaderSection>
      <HeaderFlex>
        <Input placeholder="Nombres" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setFirstName(value.target.value)} value={firstName} />
        <Input placeholder="Apellidos" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setLastName(value.target.value) } value={lastName}/>
        <Input placeholder="Email" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setEmail(value.target.value) } value={email}/>
        <Input placeholder="Celular" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setMobile(value.target.value)} value={mobile} />
        <Input placeholder="ID del trato" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setID(value.target.value) } value={id}/>
        <HeaderButton onClick={handleButton}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        dataSource={deals}
        loading={!loaded && loading}
        rowKey='_id'
        scroll={{ x: 800 }}
        bordered
      />
    </>
  )
}
