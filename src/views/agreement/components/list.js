import Link from 'next/link'
import { Button } from 'antd'

import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'

export const AgreementList = ({ list, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Institución',
      dataIndex: 'institution',
      ...SearchRow('institution')
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      ...SearchRow('slug')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ...SearchRow('description')
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='convenios'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este convenio?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Convenios'>
        <Link href='/convenios/agregar'>
          <Button type='primary'>Agregar Convenio</Button>
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
