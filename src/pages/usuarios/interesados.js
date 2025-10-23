import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-interested' currentMenu='user'>
    <ListUsers role='Interesado' />
  </Base>
)

export default Private(Users)
