import { HeaderSection, Table, SearchRow, FilterRow } from 'components-path'
import moment from 'moment'

export const LogList = ({ list, loading, loaded }) => {
  const columns = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      ...FilterRow('name', list)
    },
    {
      title: 'Sub Tipo',
      dataIndex: 'subtype',
      key: 'subtype',
      ...FilterRow('subtype', list)
    },
    {
      title: 'Encargado',
      dataIndex: 'assigned',
      key: 'assigned',
      ...SearchRow('assigned')
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      ...SearchRow('type')
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      ...SearchRow('content')
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => moment(createdAt).format('ll')
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de plantillas' />
      <Table
        columns={columns}
        dataSource={list}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
