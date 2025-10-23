import { Base, Private } from 'layouts-path'

import EditEmail from '../../views/email/containers/edit'

const Edit = () => (
  <Base current='email-list' currentMenu='email'>
    <EditEmail />
  </Base>
)

export default Private(Edit)
