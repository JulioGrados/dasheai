import { TemplateForm } from 'views-path/template/components/form'

import { addTemplate } from 'redux-path/template'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddTemplate = () => {
  const templateState = useReduxState('template')
  const createTemplate = useReduxAdd(
    addTemplate,
    'Se creo el usuario correctamente'
  )

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/plantillas' : ''
    createTemplate(data, urlRedirect, callback)
  }

  return (
    <TemplateForm
      {...templateState}
      title='Crear Plantilla'
      onSubmit={handleSubmit}
    />
  )
}

export default AddTemplate
