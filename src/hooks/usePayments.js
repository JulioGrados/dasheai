import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getPayments,
  editPayment,
  addPayment,
  deletePayment,
  reloadState
} from '../redux/payment'

export const usePayments = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.payment
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getPayments())
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editPayment(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addPayment({ ...data }))
  }

  const remove = async id => {
    return dispatch(deletePayment(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const payments = list

  return {
    payments,
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
