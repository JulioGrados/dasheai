import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getBlogs,
  editBlog,
  addBlog,
  deleteBlog,
  reloadStateBlog
} from '../redux/blog'

export const useBlogs = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.blog
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getBlogs({ sort: '-createdAt' }))
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editBlog(id, data))
  }

  const create = async data => {
    return dispatch(addBlog(data))
  }

  const remove = async id => {
    return dispatch(deleteBlog(id))
  }

  const reload = async () => {
    return dispatch(reloadStateBlog())
  }

  const blogs = list

  return {
    blogs,
    loading,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload
  }
}
