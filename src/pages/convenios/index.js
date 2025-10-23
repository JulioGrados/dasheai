import { Base, Private } from 'layouts-path'

import ListAgreements from 'views-path/agreement/containers/list'

const Agreements = () => (
  <Base current='agreement-list' currentMenu='courses'>
    <ListAgreements />
  </Base>
)

export default Private(Agreements)
