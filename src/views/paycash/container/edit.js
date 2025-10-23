import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Loader, WarningAlert } from 'components-path'

import { getCharge, editCharge, reloadState } from '../../../redux/charge'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'
import { ChargeForm } from '../components/form'

const EditPaycash = () => {
  const router = useRouter()
  const chargeState = useReduxState('charge')
  const fetchOrder = useReduxFetch(getCharge)
  const updateCharge = useReduxEdit(editCharge, 'Se edito la referencia de paycash correctamente')
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchOrder(router.query.id)
  }, [])

  const { current, error } = chargeState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/paycash' : ''
    updateCharge(current._id, data, urlRedirect, callback)
  }

  return (
    <ChargeForm
      {...chargeState}
      title='Editar referencia de paycash'
      charge={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditPaycash
