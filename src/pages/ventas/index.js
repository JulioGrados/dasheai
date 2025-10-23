import { Base, Private } from 'layouts-path'

import ListSales from 'views-path/sale/containers/list'

const Sales = () => (
  <Base current='sale-list' currentMenu='sale'>
    <ListSales />
  </Base>
)

export default Private(Sales)
