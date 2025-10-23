import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { AgreementForm } from 'views-path/agreement/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getAgreement, editAgreement, reloadState } from 'redux-path/agreement'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditAgreement = () => {
  const router = useRouter()
  const agreementState = useReduxState('agreement')
  const fetchAgreement = useReduxFetch(getAgreement)
  const updateAgreement = useReduxEdit(
    editAgreement,
    'Se edito el convenio correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchAgreement(router.query.id)
  }, [])

  const { current, error } = agreementState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/convenios' : ''
    updateAgreement(current._id, data, urlRedirect, callback)
  }

  return (
    <AgreementForm
      {...agreementState}
      title='Editar Convenio'
      agreement={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditAgreement
