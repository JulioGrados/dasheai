import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { AddCertificate } from '../../views/certificate/containers/add'

const AddCertificatePage = () => {
  return (
    <Base current='certificates' currentMenu='courses'>
      <AddCertificate />
    </Base>
  )
}

AddCertificatePage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddCertificatePage
