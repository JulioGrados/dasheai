import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getLessons,
  editLesson,
  addLesson,
  addLessonsMoodle,
  deleteLesson,
  reloadState
} from '../redux/lesson'

export const useLessons = ({ course } = {}) => {
  const { list, newLessons, loading, error, current, loaded } = useSelector(
    state => state.lesson
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && course) {
      console.log(course)
      dispatch(
        getLessons({
          query: { 'course.ref': course }
        })
      )
    }

    // if (list.length === 0 && loading === false) {
    //   dispatch(getLessons())
    // }
  }, [course])

  const update = async (id, data) => {
    return dispatch(editLesson(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addLesson({ ...data }))
  }

  const migrate = async data => {
    return dispatch(addLessonsMoodle({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteLesson(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const lessons = list

  return {
    lessons,
    loading,
    update,
    create,
    migrate,
    error,
    current,
    remove,
    loaded,
    reload,
    newLessons
  }
}
