import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-list' currentMenu='user'>
    <ListUsers />
  </Base>
)

export default Private(Users)
