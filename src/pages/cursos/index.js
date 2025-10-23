import { Base, Private } from 'layouts-path'

import ListCourses from 'views-path/course/containers/list'

const Courses = () => (
  <Base current='courses-list' currentMenu='courses'>
    <ListCourses />
  </Base>
)

export default Private(Courses)
