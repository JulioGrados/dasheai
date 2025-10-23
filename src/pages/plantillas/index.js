import { Base, Private } from 'layouts-path'

import ListTemplates from 'views-path/template/containers/list'

const Templates = () => (
  <Base current='template-list' currentMenu='call-center'>
    <ListTemplates />
  </Base>
)

export default Private(Templates)
