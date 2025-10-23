import { Base, Private } from 'layouts-path'

import ListOrders from '../../views/orders/container/list'

const Orders = () => (
  <Base current='order-list' currentMenu='sale'>
    <ListOrders />
  </Base>
)

export default Private(Orders)
