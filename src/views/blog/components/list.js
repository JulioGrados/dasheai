import Link from 'next/link'
import { Button, Tag } from 'antd'
import moment from 'moment'

import {
  Table,
  SearchRow,
  FilterRow,
  TableOptions,
  HeaderSection
} from 'components-path'

const statusColors = {
  'Borrador': 'orange',
  'Publicado': 'green',
  'Archivado': 'gray'
}

export const BlogList = ({ list, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      width: 200,
      ...SearchRow('title')
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      width: 250,
      render: (text) => text ? (text.length > 50 ? text.substring(0, 50) + '...' : text) : '-'
    },
    {
      title: 'Autor',
      dataIndex: 'authorName',
      width: 150,
      ...SearchRow('authorName')
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      width: 100,
      ...FilterRow('status', list),
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>{status || 'Sin estado'}</Tag>
      )
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      width: 120,
      sorter: (a, b) => moment(a.date).isSameOrAfter(moment(b.date)),
      render: date => date ? moment(date).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      width: 120,
      sorter: (a, b) => moment(a.createdAt).isSameOrAfter(moment(b.createdAt)),
      render: date => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'ID',
      dataIndex: '_id',
      width: 100,
      ...SearchRow('_id', 'Buscar por ID.')
    },
    {
      width: 150,
      title: 'Opciones',
      dataIndex: '_id',
      key: 'options',
      fixed: 'right',
      render: _id => (
        <TableOptions
          id={_id}
          path='blogs'
          onDelete={handleDelete}
          confirm='¿Estás seguro de eliminar este blog?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Blogs'>
        <Link href='/blogs/agregar'>
          <Button type='primary'>Agregar Blog</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 20 }}
        bordered
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
