import { CourseList } from '../components/list'
import { useEffect } from 'react'

import { payloadToData } from 'utils/functions/course'

import { getCourses, deleteCourse } from 'redux-path/course'
import { useCourses } from '../../../hooks'

import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListCourses = () => {
  const courseState = useReduxState('course')
  const { courses } = useCourses()
  if (courseState) {
    courseState.list = courses
  }
  const handleDelete = useReduxRemove(
    deleteCourse,
    'El curso se elimino correctamente'
  )

  useEffect(() => {
    if (courseState.list.length === 0) {
      courseState.list = courses
    }
  }, [])

  const list = courseState.list.map(item => {
    const course = payloadToData(item)
    course.id = item._id
    course.isHidden = course.isHidden ? 'Sí' : 'No'
    course.brochure = course.brochure ? 'Sí' : 'No'
    course.opengraph = course.opengraph ? 'Sí' : 'No'
    course.isForo = course.isForo ? 'Sí' : 'No'
    course.moodleId = course.moodleId || 'No'
    return course
  })

  return <CourseList {...courseState} list={list} handleDelete={handleDelete} />
}

export default ListCourses
