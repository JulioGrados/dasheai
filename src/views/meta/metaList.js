import Link from 'next/link'
import { Button } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'
import { useMetas } from '../../hooks'

export const MetaList = () => {
  const { metas, loading, remove, loaded } = useMetas()
  const columns = getColumns(metas, remove)

  return (
    <>
      <HeaderSection title='Lista de Metadata'>
        <Link href='/metas/agregar'>
          <Button type='primary'>Agregar Metadata</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={metas}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Dominio',
    dataIndex: 'domain',
    ...FilterRow('domain', list)
  },
  {
    title: 'Titulo',
    dataIndex: 'title',
    ...SearchRow('title')
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
        path='metas'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar esta metadata?'
      />
    )
  }
]
