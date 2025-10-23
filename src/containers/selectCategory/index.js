import { SelectCategory } from 'components-path'
import { useEffect } from 'react'

import { getCategories } from 'redux-path/category'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectCategories = ({ category, onSelect }) => {
  const { list, loading } = useReduxState('category')
  const fetchCategories = useReduxFetch(getCategories)

  useEffect(() => {
    if (list.length === 0) {
      fetchCategories()
    }
  }, [])

  const handleSelect = id => {
    const item = list.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectCategory = category && {
    ...category,
    _id: category._id || category.ref
  }

  return (
    <SelectCategory
      categories={list}
      category={selectCategory}
      loading={loading}
      onSelect={handleSelect}
    />
  )
}
