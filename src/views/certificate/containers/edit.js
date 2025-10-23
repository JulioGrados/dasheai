import { useRouter } from 'next/router'

import { CertificateForm } from '../certificateForm'
import { useEffect } from 'react'

import { reloadState } from 'redux-path/certificate'
import { Loader, WarningAlert } from 'components-path'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'
import { editCertificate, getCertificate } from '../../../redux/certificate'

export const CertificateModify = () => {
  const router = useRouter()
  const certificateState = useReduxState('certificate')
  const fetchCertificate = useReduxFetch(getCertificate)
  const updateCertificate = useReduxEdit(
    editCertificate,
    'Se edito el curso correctamente'
  )

  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchCertificate(router.query.id)
  }, [])

  const { current, error } = certificateState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    console.log('data handle', data)
    const urlRedirect = redirect ? '/certificados' : ''
    updateCertificate(current._id, data, urlRedirect, callback)
    reload()
  }

  return (
    <>
      <CertificateForm
        {...certificateState}
        title='Editar Certificado'
        save={handleSubmit}
        certificate={current}
      />
    </>
  )
}
