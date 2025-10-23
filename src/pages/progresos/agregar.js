import { Base, Private } from 'layouts-path'

import AddProgress from 'views-path/progress/containers/add'

const Add = () => (
  <Base current='deal-progress' currentMenu='deal'>
    <AddProgress />
  </Base>
)

export default Private(Add)
