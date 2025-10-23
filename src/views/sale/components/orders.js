import { useState } from 'react'
import { Button, Modal } from 'antd'

import { OrderForm } from './orderForm'
import { Table, TableOptions } from 'components-path'

import {
  useReduxRemove
} from '../../../hooks/redux'

import { deleteOrder } from '../../../redux/order'

export const OrdersSale = ({ orders = [], onChange }) => {
  const orderDelete = useReduxRemove(
    deleteOrder,
    'La orden se elimino correctamente'
  )

  // const handleEdit = order => {
  //   setItem(order)
  //   setVisible(true)
  // }
  const handleDelete = id => {
    orderDelete(id)
    const index = orders.findIndex(item => item._id === id)
    if (index !== -1) {
      orders.splice(index, 1)
    }
    onChange(orders)
  }
  // const handleSuccess = order => {
  //   const index = orders.findIndex(
  //     item => item.quotaNumber === order.quotaNumber
  //   )
  //   if (index !== -1) {
  //     orders[index] = order
  //   } else {
  //     orders.push(order)
  //   }
  //   setVisible(false)
  //   setItem(null)
  //   onChange(orders)
  // }

  const columns = [
    {
      title: 'Número',
      dataIndex: 'quotaNumber',
      key: 'quotaNumber'
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: (_id) => (
        <TableOptions
          id={_id}
          path='ordenes'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta orden?'
        />
      )
    }
  ]
  console.log('orders', orders)
  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey='quotaNumber' />
      {/* <Modal
        title='Ordenes'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <OrderForm
          order={item}
          onSubmit={handleSuccess}
          length={orders.length}
        />
      </Modal> */}
    </>
  )
}
