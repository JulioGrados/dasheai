import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { CertificateForm } from '../certificate/components/certificateForm'
import { useCertificates } from '../../hooks'
import { useRef } from 'react'

import { reloadState } from 'redux-path/certificate'

import {
  useReduxDispatch,
  useReduxEdit
} from '../../hooks/redux'
import { editCertificate } from '../../redux/certificate'

export const CertificateModify = ({ certificate }) => {
  const formRef = useRef()

  const updateCertificate = useReduxEdit(
    editCertificate,
    'Se edito el curso correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  const handleSubmit = (data, redirect, callback) => {
    console.log('data handle', data)
    const urlRedirect = redirect ? '/certificados' : ''
    updateCertificate(certificate._id, data, urlRedirect, callback)
  }

  return (
    <>
      <CertificateForm
        formRef={formRef}
        save={handleSubmit}
        certificate={certificate}
      />
    </>
  )
}
