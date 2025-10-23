import { Base, Private } from 'layouts-path'

import ListProgresses from 'views-path/progress/containers/list'

const Progresses = () => (
  <Base current='deal-progress' currentMenu='deal'>
    <ListProgresses />
  </Base>
)

export default Private(Progresses)
