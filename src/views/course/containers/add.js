import { CourseForm } from 'views-path/course/components/form'

import { addCourse } from 'redux-path/course'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddCourse = () => {
  const courseState = useReduxState('course')
  const createCourse = useReduxAdd(addCourse, 'Se creo el curso correctamente')

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/cursos' : ''
    createCourse(data, urlRedirect, callback)
  }

  return (
    <CourseForm {...courseState} title='Crear Curso' onSubmit={handleSubmit} />
  )
}

export default AddCourse
