import { ProgressForm } from 'views-path/progress/components/form'

import { addProgress } from 'redux-path/progress'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddProgress = () => {
  const progressState = useReduxState('progress')
  const createProgress = useReduxAdd(
    addProgress,
    'Se creo el progreso correctamente'
  )

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/progresos' : ''
    createProgress(data, urlRedirect, callback)
  }

  return (
    <ProgressForm
      {...progressState}
      title='Crear Etapa'
      onSubmit={handleSubmit}
    />
  )
}

export default AddProgress
