import { Base, Private } from 'layouts-path'

import EditSale from 'views-path/sale/containers/edit'

const Edit = () => (
  <Base current='sale-list' currentMenu='sale'>
    <EditSale />
  </Base>
)

export default Private(Edit)
