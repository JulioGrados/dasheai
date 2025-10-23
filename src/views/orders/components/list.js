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

export const OrderList = ({ list, loading, loaded, handleDelete }) => {
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
      dataIndex: 'assessorUsername',
      ...FilterRow('assessorUsername', list)
    },
    {
      title: 'Anulada',
      width: 150,
      dataIndex: 'annular',
      key: 'annular',
      render: (annular) => annular ? 'Sí' : 'No',
    },
    {
      title: 'Estado',
      width: 150,
      dataIndex: 'status',
      ...FilterRow('status', list)
    },
    {
      title: 'Monto',
      width: 150,
      dataIndex: 'amount',
    },
    {
      title: 'Moneda',
      width: 150,
      dataIndex: 'currency',
    },
    {
      title: 'Venta',
      width: 150,
      dataIndex: 'sale',
      ...FilterRow('sale', list),
      render: sale => sale ? sale : ''
    },
    {
      title: 'Opciones',
      width: 150,
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='ordenes'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta venta?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Ventas'>
        <Link href='/ordernes/agregar'>
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
