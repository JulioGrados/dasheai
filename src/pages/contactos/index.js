import { Base, Private } from 'layouts-path'

import ListContacts from 'views-path/contact/containers/list'

const Contacts = () => (
  <Base current='contact-list' currentMenu='contact'>
    <ListContacts />
  </Base>
)

export default Private(Contacts)
