import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { EnrolForm } from '../components/form'
import { Loader, WarningAlert } from 'components-path'

import { getEnrol, editEnrol, reloadState } from '../../../redux/enrol'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditEnrol = () => {
  const router = useRouter()
  const enrolState = useReduxState('enrol')
  const fetchEnrol = useReduxFetch(getEnrol)
  const updateEnrol = useReduxEdit(
    editEnrol,
    'Se edito el enrol correctamente'
  )

  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchEnrol(router.query.id)
  }, [])

  const { current, error } = enrolState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/matriculas' : ''
    updateEnrol(current._id, data, urlRedirect, callback)
  }

  return (
    <EnrolForm
      {...enrolState}
      title='Editar Enrol'
      enrol={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditEnrol
