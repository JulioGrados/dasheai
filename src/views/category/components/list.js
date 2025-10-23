import Link from 'next/link'
import { Button } from 'antd'

import { Table, SearchRow, TableOptions, HeaderSection } from 'components-path'

export const CategoryList = ({ list, loading, loaded, handleDelete }) => {
  console.log(list)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...SearchRow('name')
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      ...SearchRow('slug')
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='categorias'
          onDelete={handleDelete}
          confirm='¿Estas seguro de eliminar esta categoria?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Categorías'>
        <Link href='/categorias/agregar'>
          <Button type='primary'>Agregar categoria</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={list}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
