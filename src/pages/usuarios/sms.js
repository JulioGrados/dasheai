import { Base, Private } from 'layouts-path'

import ListUsersSMS from 'views-path/user/containers/sms'

const Users = () => (
  <Base current='user-sms' currentMenu='user'>
    <ListUsersSMS />
  </Base>
)

export default Private(Users)