import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { DealAgreements } from '../../views/migrations/dealAgreements'

const DealAgreementsPage = () => {
  return (
    <Base current='migrations-deal-agreements' currentMenu='migrations'>
      <DealAgreements />
    </Base>
  )
}

DealAgreementsPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default DealAgreementsPage