import moment from 'moment'

import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'

export const WhatsappList = ({ whatsapps, loading, loaded, handleDelete }) => {
  const columns = [
    {
      width: 150,
      title: 'Asesor asigando',
      dataIndex: 'assignedName',
      key: 'assignedName',
      ...SearchRow('assignedName')
    },
    {
      width: 150,
      title: 'Usuario vinculado',
      dataIndex: 'linkedName',
      key: 'linkedName',
      ...SearchRow('linkedName')
    },
    {
      width: 150,
      title: 'Plantilla',
      dataIndex: 'template',
      key: 'template',
      ...SearchRow('template')
    },
    {
      width: 150,
      title: 'Número',
      dataIndex: 'phone',
      key: 'phone',
      ...SearchRow('phone')
    },
    {
      width: 150,
      title: 'Estado',
      dataIndex: 'status',
      key: 'status'
    },
    {
      width: 150,
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      ...SearchRow('date', 'Buscar por fecha'),
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
      render: date => moment(date).format('ll')
    },
    {
      width: 150,
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='whatsapps'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este whatsapp?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de whatsapps'></HeaderSection>
      <Table
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={whatsapps}
        loading={!loaded && loading}
        rowKey='_id'
        bordered
      />
    </>
  )
}
