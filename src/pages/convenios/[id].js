import { Base, Private } from 'layouts-path'

import EditAgreement from 'views-path/agreement/containers/edit'

const Edit = () => (
  <Base current='agreement-list' currentMenu='courses'>
    <EditAgreement />
  </Base>
)

export default Private(Edit)
