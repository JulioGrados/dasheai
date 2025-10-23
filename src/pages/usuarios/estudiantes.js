import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-students' currentMenu='user'>
    <ListUsers role='Estudiante' />
  </Base>
)

export default Private(Users)
