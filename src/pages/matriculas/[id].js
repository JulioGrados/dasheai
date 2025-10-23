import { Base, Private } from 'layouts-path'

import EditEnrol from '../../views/enrol/containers/edit'

const Edit = () => (
  <Base current='enrols' currentMenu='courses'>
    <EditEnrol />
  </Base>
)

export default Private(Edit)
