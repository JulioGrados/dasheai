import { Base, Private } from 'layouts-path'

import ListWhatsapps from 'views-path/whatsapp/containers/list'

const Whatsapps = () => (
  <Base current='whatsapp-list' currentMenu='call-center'>
    <ListWhatsapps />
  </Base>
)

export default Private(Whatsapps)
