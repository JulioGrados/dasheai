import Link from 'next/link'
import moment from 'moment'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from 'components-path'

import { Button } from 'antd'

export const ChargesList = ({ list, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Fecha',
      width: 150,
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: date => moment(date).add(5, 'hours').format('DD/MM/YYYY')
    },
    {
      title: 'Nombres Estudiante',
      width: 150,
      dataIndex: 'linkedFirstName',
      key: 'linkedFirstName',
      ...SearchRow('linkedFirstName')
    },
    {
      title: 'Apellidos Estudiante',
      width: 150,
      dataIndex: 'linkedLastName',
      key: 'linkedLastName',
      ...SearchRow('linkedLastName')
    },
    {
      title: 'Email Estudiante',
      width: 150,
      dataIndex: 'linkedEmail',
      key: 'linkedEmail',
      ...SearchRow('linkedEmail')
    },
    {
      title: 'Asesor',
      width: 150,
      dataIndex: 'assignedName',
      ...FilterRow('assignedName', list)
    },
    {
      title: 'Monto',
      width: 150,
      dataIndex: 'amount',
    },
    {
      title: 'Estado',
      width: 150,
      dataIndex: 'statusPayment',
      ...FilterRow('statusPayment', list)
    },
    {
      title: 'Moneda',
      width: 150,
      dataIndex: 'money',
    },
    {
      title: 'Trato',
      width: 150,
      dataIndex: 'deal'
    },
    {
      title: 'Opciones',
      width: 150,
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='paycash'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Ventas'>
        <Link href='/paycash/agregar'>
          <Button type='primary'>Agregar venta</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 800 }}
        dataSource={list}
        loading={!loaded && loading}
        rowKey='_id'
        size='middle'
      />
    </>
  )
}
