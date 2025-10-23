import { OrderList } from '../components/list'
import { payloadToData } from 'utils/functions/order'
import { useEffect } from 'react'

import { getOrders, deleteOrder } from '../../../redux/order'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListOrders = () => {
  const orderState = useReduxState('order')
  const fetchOrders = useReduxFetch(getOrders)
  const handleDelete = useReduxRemove(
    deleteOrder,
    'La orden se elimino correctamente'
  )

  useEffect(() => {
    if (orderState.list.length === 0) {
      fetchOrders({ populate: ['student.ref', 'course.ref', 'receipt.ref', 'voucher.ref'], sort: '-createdAt' })
    }
  }, [])

  const orders = orderState.list.map(item => payloadToData(item))
  return <OrderList {...orderState} list={orders} handleDelete={handleDelete} />
}

export default ListOrders
