import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { TemplateForm } from 'views-path/template/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getTemplate, editTemplate, reloadState } from 'redux-path/template'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditTemplate = () => {
  const router = useRouter()
  const templateState = useReduxState('template')
  const fetchTemplate = useReduxFetch(getTemplate)
  const updateTemplate = useReduxEdit(
    editTemplate,
    'Se edito la plantilla correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchTemplate(router.query.id)
  }, [])

  const { current, error } = templateState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }
  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/plantillas' : ''
    updateTemplate(current._id, data, urlRedirect, callback)
  }

  return (
    <TemplateForm
      {...templateState}
      title='Editar plantilla'
      template={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditTemplate
