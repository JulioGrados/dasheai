import { TemplateList } from '../components/list'
import { payloadToData } from 'utils/functions/template'
import { useEffect } from 'react'

import { getTemplates, deleteTemplate } from 'redux-path/template'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListTemplates = () => {
  const templateState = useReduxState('template')
  const fetchTemplates = useReduxFetch(getTemplates)
  const handleDelete = useReduxRemove(
    deleteTemplate,
    'El template se elimino correctamente'
  )

  useEffect(() => {
    if (templateState.list.length === 0) {
      fetchTemplates()
    }
  }, [])
  console.log(templateState.list)
  const templates = templateState.list.map(item => payloadToData(item))
  // console.log(templates)
  return (
    <TemplateList
      {...templateState}
      templates={templates}
      handleDelete={handleDelete}
    />
  )
}

export default ListTemplates
