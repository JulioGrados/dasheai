import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getCourses,
  editCourse,
  addCourse,
  deleteCourse,
  reloadState
} from '../redux/course'

export const useCourses = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.course
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getCourses({ sort: 'name' }))
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editCourse(id, data))
  }

  const create = async data => {
    return dispatch(addCourse(data))
  }

  const remove = async id => {
    return dispatch(deleteCourse(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const courses = list

  return {
    courses,
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
