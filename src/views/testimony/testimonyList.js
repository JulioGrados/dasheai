import Link from 'next/link'
import { Button } from 'antd'
import { HeaderSection, Table, TableOptions, SearchRow } from '../../components'
import { useTestimony } from '../../hooks'

import moment from 'moment'

import {
  FilterRow
} from 'components-path'

export const TestimonyList = () => {
  const { testimonies, loading, remove, loaded } = useTestimony()
  const columns = getColumns(remove, testimonies)
  console.log("data", testimonies)

  return (
    <>
      <HeaderSection title='Lista de testimonios'>
        <Link href='/testimonios/agregar'>
          <Button type='primary'>Agregar testimonio</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={testimonies}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (handleDelete, testimonies) => [
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
    render: createdAt => moment(createdAt).format('ll')
  },
  {
    title: 'Nombres',
    dataIndex: 'firstName',
    ...SearchRow('name', 'Buscar por nombres')
  },
  {
    title: 'Apellidos',
    dataIndex: 'lastName',
    ...SearchRow('last', 'Buscar por nombres')
  },
  {
    title: 'Email',
    dataIndex: 'linked.email',
    ...SearchRow('emails', 'Buscar por email')
  },
  {
    title: 'Curso',
    dataIndex: 'nameCourse',
    ...SearchRow('nameCourse', 'Buscar por curso')
  },
  {
    title: 'Puntaje',
    dataIndex: 'rate',
    sorter: (a, b) => a.rate - b.rate
  },
  {
    title: 'Comentario',
    dataIndex: 'comment',
    render: comment =>
      comment && comment.length > 100
        ? comment.substring(0, 100) + '...'
        : comment
  },
  {
    title: 'Status',
    dataIndex: 'status',
    ...FilterRow('status', testimonies)
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='testimonios/detail'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar esta testimonio?'
      />
    )
  }
]
