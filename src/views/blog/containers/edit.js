import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { BlogForm } from '../components/form'
import { getBlog, editBlog } from 'redux-path/blog'
import { useReduxEdit, useReduxState } from '../../../hooks/redux'

const EditBlog = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const blogState = useReduxState('blog')

  const updateBlog = useReduxEdit(editBlog, 'Se actualizó el blog correctamente')

  useEffect(() => {
    if (router.query.id) {
      dispatch(getBlog(router.query.id, { populate: ['author'] }))
    }
  }, [router.query.id])

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/blogs' : ''
    updateBlog(router.query.id, data, urlRedirect, callback)
  }

  return (
    <BlogForm
      {...blogState}
      blog={blogState.current}
      title='Editar Blog'
      onSubmit={handleSubmit}
    />
  )
}

export default EditBlog
