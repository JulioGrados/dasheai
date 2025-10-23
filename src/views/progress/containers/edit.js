import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ProgressForm } from 'views-path/progress/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getProgress, editProgress, reloadState } from 'redux-path/progress'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditProgress = () => {
  const router = useRouter()
  const progressState = useReduxState('progress')
  const fetchProgress = useReduxFetch(getProgress)
  const updateProgress = useReduxEdit(
    editProgress,
    'Se edito el progreso correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchProgress(router.query.id)
  }, [])

  const { current, error } = progressState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/progresos' : ''
    updateProgress(current._id, data, urlRedirect, callback)
  }

  return (
    <ProgressForm
      {...progressState}
      title='Editar Etapa'
      progress={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditProgress
