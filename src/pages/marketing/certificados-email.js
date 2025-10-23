import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { MktViewEmail } from '../../views/marketing/email'

const MktCertificatesEmail = () => {
  return (
    <Base current='marketing-email' currentMenu='marketing'>
      <MktViewEmail />
    </Base>
  )
}

MktCertificatesEmail.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktCertificatesEmail