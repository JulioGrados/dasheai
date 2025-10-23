import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { CategoryForm } from 'views-path/category/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getCategory, editCategory, reloadState } from 'redux-path/category'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditCategory = () => {
  const router = useRouter()
  const categoryState = useReduxState('category')
  const fetchCategory = useReduxFetch(getCategory)
  const updateCategory = useReduxEdit(
    editCategory,
    'Se edito la categoria correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchCategory(router.query.id)
  }, [])

  const { current, error } = categoryState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/categorias' : ''
    updateCategory(current._id, data, urlRedirect, callback)
  }

  return (
    <CategoryForm
      {...categoryState}
      title='Editar Categoría'
      category={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditCategory
