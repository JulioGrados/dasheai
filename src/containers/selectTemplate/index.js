import { SelectTemplate } from 'components-path'
import { useEffect } from 'react'

import { getTemplates } from '../../redux/template'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectTemplates = ({ template, onSelect }) => {
  const { list, loading } = useReduxState('template')
  const fetchTemplates = useReduxFetch(getTemplates)

  useEffect(() => {
    if (list.length === 0) {
      fetchTemplates()
    }
  }, [])

  const handleSelect = name => {
    const item = list.find(item => {
      return item.name === name
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectTemplate = template && {
    ...template,
    name: template.name
  }

  return (
    <SelectTemplate
      templates={list}
      template={selectTemplate}
      loading={loading}
      onSelect={handleSelect}
    />
  )
}