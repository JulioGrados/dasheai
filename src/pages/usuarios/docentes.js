import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-teachers' currentMenu='user'>
    <ListUsers role='Docente' />
  </Base>
)

export default Private(Users)
