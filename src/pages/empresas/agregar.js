import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { CompanyModify } from '../../views/company/companyModify'

const AddCompanyPage = () => {
  return (
    <Base current='company-list' currentMenu='company'>
      <CompanyModify />
    </Base>
  )
}

AddCompanyPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddCompanyPage
