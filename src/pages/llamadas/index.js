import { Base, Private } from 'layouts-path'

import ListCalls from 'views-path/call/containers/list'

const calss = () => (
  <Base current='call-list' currentMenu='call-center'>
    <ListCalls />
  </Base>
)

export default Private(calss)
