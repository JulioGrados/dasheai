import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ReceiptForm } from 'views-path/receipt/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getReceipt, editReceipt, resetReceipt, noteReceipt, reloadState, cancelReceipt } from 'redux-path/receipt'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditReceipt = () => {
  const router = useRouter()
  const receiptState = useReduxState('receipt')
  const fetchReceipt = useReduxFetch(getReceipt)
  const updateReceipt = useReduxEdit(
    editReceipt,
    'Se edito el recibo correctamente'
  )

  const update = useReduxEdit(
    cancelReceipt,
    'Se realizó la comunicación de baja el recibo correctamente'
  )

  const note = useReduxEdit(
    noteReceipt,
    'Se envió la nota de crédito electronica del recibo correctamente'
  )

  const reset = useReduxEdit(
    resetReceipt,
    'El recibo se elimino correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchReceipt(router.query.id)
  }, [])

  const { current, error } = receiptState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/recibos' : ''
    updateReceipt(current._id, data, urlRedirect, callback)
  }

  const handleCancel = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/recibos' : ''
    update(current._id, data, urlRedirect, callback)
  }

  const handleNote = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/recibos' : ''
    note(current._id, data, urlRedirect, callback)
  }

  const handleReset = async () => {
    await reset(current._id)
    router.push('/recibos')
  }

  return (
    <ReceiptForm
      {...receiptState}
      title='Editar recibo'
      receipt={current}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onReset={handleReset}
      onNote={handleNote}
    />
  )
}

export default EditReceipt
