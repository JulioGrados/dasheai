import { Base, Private } from 'layouts-path'

import AddTemplate from 'views-path/template/containers/add'

const Add = () => (
  <Base current='template-list' currentMenu='call-center'>
    <AddTemplate />
  </Base>
)

export default Private(Add)
