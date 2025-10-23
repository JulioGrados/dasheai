import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { VoucherForm } from 'views-path/voucher/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getVoucher, editVoucher, resetVoucher, deleteVoucher, reloadState } from 'redux-path/voucher'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit,
  useReduxRemove
} from '../../../hooks/redux'

const EditVoucher = () => {
  const router = useRouter()
  const voucherState = useReduxState('voucher')
  const authState = useReduxState('auth')
  const fetchVoucher = useReduxFetch(getVoucher)
  const updateVoucher = useReduxEdit(
    editVoucher,
    'Se edito el voucher correctamente'
  )

  const handleDelete = useReduxRemove(
    deleteVoucher,
    'El voucher se elimino correctamente',
    '/vouchers'
  )

  const reset = useReduxEdit(
    resetVoucher,
    'Se edito el voucher correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchVoucher(router.query.id)
  }, [])

  const { current, error } = voucherState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/vouchers' : ''
    updateVoucher(current._id, data, urlRedirect, callback)
  }

  const handleReset = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/vouchers' : ''
    reset(current._id, data, urlRedirect, callback)
  }

  return (
    <VoucherForm
      {...voucherState}
      title='Editar voucher'
      voucher={current}
      onSubmit={handleSubmit}
      onReset={handleReset}
      onDelete={handleDelete}
      user={authState.user}
    />
  )
}

export default EditVoucher
