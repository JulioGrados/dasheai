import { CategoryForm } from 'views-path/category/components/form'

import { addCategory } from 'redux-path/category'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddCategory = () => {
  const categoryState = useReduxState('category')
  const createCategory = useReduxAdd(
    addCategory,
    'Se creo la categoria correctamente'
  )

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/categorias' : ''
    createCategory(data, urlRedirect, callback)
  }

  return (
    <CategoryForm
      {...categoryState}
      title='Crear Categoría'
      onSubmit={handleSubmit}
    />
  )
}

export default AddCategory
