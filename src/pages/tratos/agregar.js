import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { DealModify } from '../../views/deal/dealModify'

const AddDealPage = () => {
  return (
    <Base current='deals' currentMenu='deal'>
      <DealModify />
    </Base>
  )
}

AddDealPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddDealPage
