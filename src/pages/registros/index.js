import { Base, Private } from 'layouts-path'

import ListLogs from 'views-path/log/containers/list'

const Logs = () => (
  <Base current='log-list' currentMenu='log'>
    <ListLogs />
  </Base>
)

export default Private(Logs)
