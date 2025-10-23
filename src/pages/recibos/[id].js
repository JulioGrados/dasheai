import { Base, Private } from 'layouts-path'

import EditReceipt from '../../views/receipt/containers/edit'

const Edit = () => (
  <Base current='receipt-list' currentMenu='sale'>
    <EditReceipt />
  </Base>
)

export default Private(Edit)
