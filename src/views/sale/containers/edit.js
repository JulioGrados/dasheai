import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { SaleForm } from 'views-path/sale/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getSale, editSale, cancelSale, reloadState } from 'redux-path/sale'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditSale = () => {
  const router = useRouter()
  const saleState = useReduxState('sale')
  const fetchSale = useReduxFetch(getSale)
  const updateSale = useReduxEdit(editSale, 'Se edito la venta correctamente')
  const update = useReduxEdit(cancelSale, 'Se anulo la venta correctamente')
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchSale(router.query.id)
  }, [])

  const { current, error } = saleState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/ventas' : ''
    updateSale(current._id, data, urlRedirect, callback)
  }

  const handleReset = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/ventas' : ''
    update(current._id, data, urlRedirect, callback)
  }

  return (
    <SaleForm
      {...saleState}
      title='Editar Venta'
      sale={current}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  )
}

export default EditSale
