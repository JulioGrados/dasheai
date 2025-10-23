import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { MktViewCertificate } from '../../views/marketing/certificate'

const MktCertificates = () => {
  return (
    <Base current='marketing-certificados' currentMenu='marketing'>
      <MktViewCertificate />
    </Base>
  )
}

MktCertificates.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktCertificates