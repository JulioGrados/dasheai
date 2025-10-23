import { isLoggedUser } from 'utils/functions/auth'
import { detailCompany } from 'utils/api/companies'

import { Base } from '../../layouts'
import { CompanyModify } from '../../views/company/companyModify'

const EditCompanyPage = ({ company }) => {
  return (
    <Base current='company-list' currentMenu='company'>
      {company && <CompanyModify company={company} />}
    </Base>
  )
}

EditCompanyPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const company = await detailCompany(id, {}, jwt)
  if (company.success) {
    return { company }
  }
  return {}
}

export default EditCompanyPage
