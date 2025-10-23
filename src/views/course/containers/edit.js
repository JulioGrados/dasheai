import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { CourseForm } from '../components/form'
import { Loader, WarningAlert } from 'components-path'

import { getCourse, editCourse, reloadState } from 'redux-path/course'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditCourse = () => {
  const router = useRouter()
  const courseState = useReduxState('course')
  const fetchCourse = useReduxFetch(getCourse)
  const updateCourse = useReduxEdit(
    editCourse,
    'Se edito el curso correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchCourse(router.query.id)
  }, [])

  const { current, error } = courseState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/cursos' : ''
    updateCourse(current._id, data, urlRedirect, callback)
  }

  return (
    current && <CourseForm
      {...courseState}
      title='Editar Curso'
      course={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditCourse
