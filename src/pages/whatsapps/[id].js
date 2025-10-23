import { Base, Private } from 'layouts-path'

import EditWhatsapp from '../../views/whatsapp/containers/edit'

const Edit = () => (
  <Base current='whatsapp-list' currentMenu='call-center'>
    <EditWhatsapp />
  </Base>
)

export default Private(Edit)