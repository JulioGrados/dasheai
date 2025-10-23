import { Base, Private } from 'layouts-path'

import ListVouchers from 'views-path/voucher/containers/list'

const Vouchers = () => (
  <Base current='vouchers-list' currentMenu='sale'>
    <ListVouchers />
  </Base>
)

export default Private(Vouchers)
