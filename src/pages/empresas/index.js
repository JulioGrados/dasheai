import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { CompanyList } from '../../views/company/companyList'

const ComapanyPage = () => {
  return (
    <Base current='company-list' currentMenu='company'>
      <CompanyList />
    </Base>
  )
}

ComapanyPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default ComapanyPage
