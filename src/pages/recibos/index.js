import { Base, Private } from 'layouts-path'

import ListReceipts from 'views-path/receipt/containers/list'

const receipts = () => (
  <Base current='receipt-list' currentMenu='sale'>
    <ListReceipts />
  </Base>
)

export default Private(receipts)
