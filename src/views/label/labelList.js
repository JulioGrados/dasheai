import Link from 'next/link'
import { Button } from 'antd'
import { HeaderSection, Table, TableOptions, SearchRow } from '../../components'
import { useLabels } from '../../hooks'

export const LabelList = () => {
  const { labels, loading, remove, loaded } = useLabels()
  const columns = getColumns(remove)

  return (
    <>
      <HeaderSection title='Lista de etiquetas'>
        <Link href='/etiquetas/agregar'>
          <Button type='primary'>Agregar Etiqueta</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={labels}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = handleDelete => [
  {
    title: 'Nombre',
    dataIndex: 'name',
    ...SearchRow('name', 'Buscar por nombre')
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    ...SearchRow('slug', 'Buscar por slug.')
  },
  {
    title: 'Descripción',
    dataIndex: 'description'
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='etiquetas'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar esta etiqueta?'
      />
    )
  }
]
