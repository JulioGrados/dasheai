import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Loader, WarningAlert } from 'components-path'

import { getOrder, editOrder, reloadState } from '../../../redux/order'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'
import { OrderForm } from '../components/form'

const EditOrder = () => {
  const router = useRouter()
  const orderState = useReduxState('order')
  const fetchOrder = useReduxFetch(getOrder)
  const updateOrder = useReduxEdit(editOrder, 'Se edito la orden correctamente')
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchOrder(router.query.id)
  }, [])

  const { current, error } = orderState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/ordenes' : ''
    updateOrder(current._id, data, urlRedirect, callback)
  }

  return (
    <OrderForm
      {...orderState}
      title='Editar orden'
      order={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditOrder
