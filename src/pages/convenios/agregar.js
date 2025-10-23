import { Base, Private } from 'layouts-path'

import AddAgreement from 'views-path/agreement/containers/add'

const Add = () => (
  <Base current='agreement-list' currentMenu='courses'>
    <AddAgreement />
  </Base>
)

export default Private(Add)
