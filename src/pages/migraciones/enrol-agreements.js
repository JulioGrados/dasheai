import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { EnrolAgreements } from '../../views/migrations/enrolAgreements'

const EnrolAgreementsPage = () => {
  return (
    <Base current='migrations-enrol-agreements' currentMenu='migrations'>
      <EnrolAgreements />
    </Base>
  )
}

EnrolAgreementsPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default EnrolAgreementsPage