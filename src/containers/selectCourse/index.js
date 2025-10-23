import { SelectCourse } from 'components-path'

import { searchCourse } from 'redux-path/course'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectCourses = ({ course, onSelect }) => {
  const { temp, loading } = useReduxState('course')
  const fetchCourses = useReduxFetch(searchCourse)
  const handleSearch = value => {
    const params = {
      query: {
        name: { $regex: value, $options: 'i' }
      },
      limit: 20,
      select:
        'name shortName slug moodleId price currency published brochure academicHours'
    }

    fetchCourses(params)
  }

  const handleSelect = id => {
    const item = temp.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectCourse = course && {
    ...course,
    _id: course._id || course.ref
  }

  if (selectCourse && !temp.find(item => item._id === selectCourse._id)) {
    temp.push(selectCourse)
  }

  return (
    <SelectCourse
      courses={temp}
      course={selectCourse}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
