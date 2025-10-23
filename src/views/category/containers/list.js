import { CategoryList } from '../components/list'
import { useEffect } from 'react'

import { getCategories, deleteCategory } from 'redux-path/category'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListUsers = ({ handleShowModal }) => {
  const categoryState = useReduxState('category')
  const fetchCategories = useReduxFetch(getCategories)
  const handleDelete = useReduxRemove(
    deleteCategory,
    'La categoria se elimino correctamente'
  )

  useEffect(() => {
    if (categoryState.list.length === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <CategoryList
      {...categoryState}
      handleDelete={handleDelete}
      handleShowModal={handleShowModal}
    />
  )
}

export default ListUsers
