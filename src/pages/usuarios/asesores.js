import { Base, Private } from 'layouts-path'

import ListUsers from 'views-path/user/containers/list'

const Users = () => (
  <Base current='user-assessors' currentMenu='user'>
    <ListUsers role='Asesor' />
  </Base>
)

export default Private(Users)
