import { Base, Private } from 'layouts-path'

import ListEmails from 'views-path/email/containers/list'

const Emails = () => (
  <Base current='email-list' currentMenu='call-center'>
    <ListEmails />
  </Base>
)

export default Private(Emails)
