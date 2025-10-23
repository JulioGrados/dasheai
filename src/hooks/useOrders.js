import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getOrders,
  editOrder,
  addOrder,
  deleteOrder,
  reloadState
} from '../redux/order'

import { payloadToData } from 'utils/functions/order'

export const useOrders = () => {
  const {
    list,
    loading,
    error,
    current,
    loaded
  } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(
        getOrders({
          query: { annular: false },
          populate: ['student.ref', 'course.ref', 'receipt.ref', 'voucher.ref']
        })
      )
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editOrder(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addOrder({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteOrder(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const orders = list.map(order => payloadToData(order))

  return {
    orders,
    loading,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload
  }
}
