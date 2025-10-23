import { Base, Private } from 'layouts-path'

import EditCourse from 'views-path/course/containers/edit'

const Edit = () => (
  <Base current='courses-list' currentMenu='courses'>
    <EditCourse />
  </Base>
)

export default Private(Edit)
