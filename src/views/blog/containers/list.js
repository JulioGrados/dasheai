import { BlogList } from '../components/list'
import { useEffect } from 'react'

import { getBlogs, deleteBlog } from 'redux-path/blog'
import { useBlogs } from '../../../hooks'

import {
  useReduxState,
  useReduxRemove
} from '../../../hooks/redux'

const ListBlogs = () => {
  const blogState = useReduxState('blog')
  const { blogs } = useBlogs()

  if (blogState) {
    blogState.list = blogs
  }

  const handleDelete = useReduxRemove(
    deleteBlog,
    'El blog se eliminó correctamente'
  )

  useEffect(() => {
    if (blogState.list.length === 0) {
      blogState.list = blogs
    }
  }, [])

  const list = blogState.list.map(item => {
    return {
      ...item,
      authorName: item.author ? item.author.names || item.author.email : 'Sin autor'
    }
  })

  return <BlogList {...blogState} list={list} handleDelete={handleDelete} />
}

export default ListBlogs
