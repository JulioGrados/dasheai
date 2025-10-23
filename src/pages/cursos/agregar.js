import { Base, Private } from 'layouts-path'

import AddCourse from 'views-path/course/containers/add'

const Add = () => (
  <Base current='courses-list' currentMenu='courses'>
    <AddCourse />
  </Base>
)

export default Private(Add)
