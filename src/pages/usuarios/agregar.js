import { Base, Private } from 'layouts-path'
import { isLoggedUser } from 'utils/functions/auth'

import AddUser from 'views-path/user/containers/add'

const Add = ({ role }) => (
  <Base current='user-list' currentMenu='user'>
    <AddUser role={role} />
  </Base>
)

Add.getInitialProps = async ctx => {
  await isLoggedUser(ctx)
  const { role } = ctx.query
  return { role }
}

export default Add
