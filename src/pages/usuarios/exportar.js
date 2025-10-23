import { Base, Private } from 'layouts-path'

import ExportUsers from 'views-path/user/containers/exportar'

const Exports = () => (
  <Base current='user-export' currentMenu='user'>
    <ExportUsers />
  </Base>
)

export default Private(Exports)