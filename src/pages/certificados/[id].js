import { Base } from '../../layouts'
import { CertificateModify } from '../../views/certificate/containers/edit'

const EditCertificatePage = () => {
  return (
    <Base current='certificates' currentMenu='courses'>
      <CertificateModify/>
    </Base>
  )
}

export default EditCertificatePage
