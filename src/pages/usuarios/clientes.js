import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-clients' currentMenu='user'>
    <ListUsers role='Cliente' />
  </Base>
)

export default Users
