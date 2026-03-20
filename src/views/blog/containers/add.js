import { BlogForm } from '../components/form'

import { addBlog } from 'redux-path/blog'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddBlog = () => {
  const blogState = useReduxState('blog')
  const createBlog = useReduxAdd(addBlog, 'Se creó el blog correctamente')

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/blogs' : ''
    createBlog(data, urlRedirect, callback)
  }

  return (
    <BlogForm {...blogState} title='Crear Blog' onSubmit={handleSubmit} />
  )
}

export default AddBlog
