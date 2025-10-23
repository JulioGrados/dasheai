import moment from 'moment'

import { HeaderSection, Table, SearchRow, FilterRow } from 'components-path'

export const ContactList = ({ contacts, loading, loaded }) => {
  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'names',
      key: 'names',
      ...SearchRow('names')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...SearchRow('email')
    },
    {
      title: 'Asunto',
      dataIndex: 'affair',
      key: 'affair',
      ...SearchRow('affair')
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      ...FilterRow('status', contacts)
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
      render: date => moment(date).format('ll')
    },
    {
      /*
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
     */
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Contactos' />
      <Table
        columns={columns}
        dataSource={contacts}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
