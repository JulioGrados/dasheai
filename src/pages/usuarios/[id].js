import { Base, Private } from 'layouts-path'
import { isLoggedUser } from 'utils/functions/auth'

import EditUser from 'views-path/user/containers/edit'

const Edit = ({ role }) => (
  <Base current='user-list' currentMenu='user'>
    <EditUser role={role} />
  </Base>
)

Edit.getInitialProps = async ctx => {
  await isLoggedUser(ctx)
  const { role } = ctx.query
  console.log('role', role)
  return { role }
}

export default Edit
