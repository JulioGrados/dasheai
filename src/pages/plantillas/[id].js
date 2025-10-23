import { Base, Private } from 'layouts-path'

import EditTemplate from 'views-path/template/containers/edit'

const Edit = () => (
  <Base current='template-list' currentMenu='call-center'>
    <EditTemplate />
  </Base>
)

export default Private(Edit)
