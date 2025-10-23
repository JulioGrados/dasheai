import { Base, Private } from 'layouts-path'

import EditProgress from 'views-path/progress/containers/edit'

const Edit = () => (
  <Base current='deal-progress' currentMenu='deal'>
    <EditProgress />
  </Base>
)

export default Private(Edit)
