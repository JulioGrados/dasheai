import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { DealClient } from '../../views/deal/dealClient'

const ClientDealPage = () => {
  return (
    <Base current='deal-client' currentMenu='deal'>
      <DealClient />
    </Base>
  )
}

ClientDealPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default ClientDealPage
