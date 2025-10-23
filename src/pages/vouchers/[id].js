import { Base, Private } from 'layouts-path'

import EditVoucher from 'views-path/voucher/containers/edit'

const Edit = () => (
  <Base current='vouchers-list' currentMenu='sale'>
    <EditVoucher />
  </Base>
)

export default Private(Edit)
