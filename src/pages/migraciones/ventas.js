import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { SaleUploads } from '../../views/migrations/sales'

const CertificatesPage = () => {
  return (
    <Base current='migrations-sales' currentMenu='migrations'>
      <SaleUploads />
    </Base>
  )
}

CertificatesPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default CertificatesPage
