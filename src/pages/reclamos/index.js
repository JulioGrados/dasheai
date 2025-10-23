import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { ClaimList } from '../../views/claim/claimList'

const ClaimPage = () => {
  return (
    <Base current='claim-list' currentMenu='claim'>
      <ClaimList />
    </Base>
  )
}

ClaimPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default ClaimPage
