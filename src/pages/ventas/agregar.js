import { Base, Private } from 'layouts-path'

import AddSale from 'views-path/sale/containers/add'

const Add = () => (
  <Base current='sale-list' currentMenu='sale'>
    <AddSale />
  </Base>
)

export default Private(Add)
