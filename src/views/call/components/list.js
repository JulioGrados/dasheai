import Link from 'next/link'
import moment from 'moment'

import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'
import { Button } from 'antd'

export const CallList = ({ calls, loading, loaded, handleDelete }) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...SearchRow('name')
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      ...SearchRow('date', 'Buscar fecha'),
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
      render: date => moment(date).format('ll')
    },
    {
      title: 'Asesor asignado',
      dataIndex: 'assignedName',
      key: 'assignedName',
      ...SearchRow('assignedName')
    },
    {
      title: 'Usuario vinculado',
      dataIndex: 'linkedName',
      key: 'linkedName',
      ...SearchRow('linkedName')
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='llamadas'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta llamada?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de llamadas'></HeaderSection>
      <Table
        columns={columns}
        dataSource={calls}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
