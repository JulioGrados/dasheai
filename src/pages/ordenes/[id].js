import { Base, Private } from 'layouts-path'

import EditOrder from '../../views/orders/container/edit'

const Edit = () => (
  <Base current='order-list' currentMenu='sale'>
    <EditOrder />
  </Base>
)

export default Private(Edit)
