import { Base, Private } from 'layouts-path'

import AddVoucher from 'views-path/voucher/containers/add'

const Add = () => (
  <Base current='vouchers-list' currentMenu='sale'>
    <AddVoucher />
  </Base>
)

export default Private(Add)
