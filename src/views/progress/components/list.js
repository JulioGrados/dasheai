import Link from 'next/link'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from 'components-path'
import { Button } from 'antd'

export const ProgressList = ({ list, loading, loaded, handleDelete }) => {
  // console.log(list)
  const columns = [
    {
      title: 'Orden',
      dataIndex: 'order'
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...SearchRow('name', 'Busca por nombre de la etapa.')
    },
    {
      title: 'Pipe',
      dataIndex: 'pipesName',
      key: 'pipesName',
      ...SearchRow('pipesName')
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='progresos'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este columna de progreso?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Etapas'>
        <Link href='/progresos/agregar'>
          <Button type='primary'>Agregar etapa</Button>
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
