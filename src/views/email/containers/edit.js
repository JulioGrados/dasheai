import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { EmailForm } from 'views-path/email/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getEmail, addEmail, reloadState } from 'redux-path/email'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxAdd
} from '../../../hooks/redux'

const EditEmail = () => {
  const router = useRouter()
  const emailState = useReduxState('email')
  const fetchEmail = useReduxFetch(getEmail)
  const resendEmail = useReduxAdd(
    addEmail,
    'Se reenvio correctamente'
  )

  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchEmail(router.query.id)
  }, [])

  const { current, error } = emailState
  console.log('emailState', emailState)
  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = '/emails'
    resendEmail(data, urlRedirect, callback)
  }
  return (
    <EmailForm
      {...emailState}
      title='Editar email'
      email={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditEmail
