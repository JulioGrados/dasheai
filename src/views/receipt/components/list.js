import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { HeaderSection, Table, TableOptions, SearchRow } from 'components-path'

export const ReceiptList = ({ receipts, loading, loaded, handleDelete, handleCancel }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    if (receipts) {
      setList(receipts)
    }
  }, [receipts])  

  const columns = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      width: 150,
      ...SearchRow('code')
    },
    {
      title: 'Factura',
      dataIndex: 'ticket',
      key: 'ticket',
      width: 150,
      ...SearchRow('ticket')
    },
    {
      title: 'Nombres',
      dataIndex: 'names',
      key: 'names',
      width: 150,
      ...SearchRow('names')
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      width: 150,
      ...SearchRow('dni')
    },
    {
      title: 'Razón Social',
      dataIndex: 'businessName',
      key: 'businessName',
      width: 150,
      ...SearchRow('businessName')
    },
    {
      title: 'RUC',
      dataIndex: 'ruc',
      key: 'ruc',
      width: 150,
      ...SearchRow('ruc')
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      ...SearchRow('amount')
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      ...SearchRow('status')
    },
    {
      title: 'Asesor asignado',
      dataIndex: 'assignedName',
      key: 'assignedName',
      width: 150,
      ...SearchRow('assignedName')
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      width: 150,
      render: _id => (
        <TableOptions
          id={_id}
          path='recibos'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta recibos?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de comprobantes' />
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 800 }}
        dataSource={list}
        loading={!loaded && loading}
        rowKey='id'
        size='middle'
      />
    </>
  )
}
