import Link from 'next/link'
import moment from 'moment'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'

import { useOrders } from '../../hooks'

export const AnswerList = () => {
  const { orders } = useOrders()
  console.log('orders', orders)
  const columns = getColumns(orders)
  return (
    <>
      <HeaderSection title='Reportes de Calificaciones'>
      </HeaderSection>
      <Table
        columns={columns}
        pagination={{ pageSize: 500 }}
        dataSource={orders}
        scroll={{ x: 800 }}
        rowKey='_id'
        bordered
        size='middle'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Fecha de Procesamiento',
    width: 150,
    dataIndex: 'processing',
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.processing) - new Date(b.processing),
    render: processing => moment(processing).format('DD/MM/YYYY')
  },
  {
    title: 'Tipo',
    width: 150,
    dataIndex: 'statusOrder',
    ...SearchRow('statusOrder')
  },
  {
    title: 'Email Estudiante',
    width: 150,
    dataIndex: 'linkedEmail',
    ...SearchRow('linkedEmail')
  },
  {
    title: 'Nombres Estudiante',
    width: 150,
    dataIndex: 'linkedFirstName',
    ...SearchRow('linkedFirstName')
  },
  {
    title: 'Apellidos Estudiante',
    width: 150,
    dataIndex: 'linkedLastName',
    ...SearchRow('linkedLastName')
  },
  {
    title: 'DNI Estudiante',
    width: 150,
    dataIndex: 'linkedDNI',
    ...SearchRow('linkedDNI')
  },
  {
    title: 'ID Curso',
    width: 150,
    dataIndex: 'courseId',
    ...SearchRow('courseId')
  },
  {
    title: 'Moodle ID',
    width: 150,
    dataIndex: 'courseMoodleId',
    ...SearchRow('courseMoodleId')
  },
  {
    title: 'Curso',
    width: 150,
    dataIndex: 'courseName',
    ...SearchRow('courseName')
  },
  {
    title: 'Colegio Profesional',
    width: 150,
    dataIndex: 'agreement',
    ...SearchRow('agreement')
  },
  {
    title: 'Opciones',
    width: 100,
    dataIndex: 'ref',
    key: 'ref',
    render: ref => <TableOptions id={ref} path='ordenes' />
  }
]
