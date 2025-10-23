import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { DealMix } from '../../views/deal/dealMix'

const AddDealPage = () => {
  return (
    <Base current='deal-mix' currentMenu='deal'>
      <DealMix />
    </Base>
  )
}

AddDealPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddDealPage
