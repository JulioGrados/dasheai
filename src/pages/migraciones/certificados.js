import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { CertificateUploads } from '../../views/migrations/certificates'

const CertificatesPage = () => {
  return (
    <Base current='migrations-certificates' currentMenu='migrations'>
      <CertificateUploads />
    </Base>
  )
}

CertificatesPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default CertificatesPage
