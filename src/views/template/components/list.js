import Link from 'next/link'

import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'
import { Button } from 'antd'
import { FilterRow } from '../../../components'

export const TemplateList = ({ templates, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...SearchRow('name', 'Buscar por nombre')
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Autor',
      dataIndex: 'authorName',
      key: 'authorName',
      ...SearchRow('authorName', 'Buscar autor.')
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      ...FilterRow('type', templates)
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='plantillas'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta plantilla?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de plantillas'>
        <Link href='/plantillas/agregar'>
          <Button type='primary'>Agregar plantilla</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={templates}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
