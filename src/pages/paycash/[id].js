import { Base, Private } from 'layouts-path'

import EditPaycash from '../../views/paycash/container/edit'

const Edit = () => (
  <Base current='paycash-list' currentMenu='sale'>
    <EditPaycash />
  </Base>
)

export default Private(Edit)
