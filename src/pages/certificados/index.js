import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { CertificateList } from '../../views/certificate/containers/list'

const CertificatePage = () => {
  return (
    <Base current='certificates' currentMenu='courses'>
      <CertificateList />
    </Base>
  )
}

CertificatePage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default CertificatePage
