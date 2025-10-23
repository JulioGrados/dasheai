import { isLoggedUser } from 'utils/functions/auth'
import { detailDeal } from 'utils/api/deals'

import { Base } from '../../layouts'
import { DealModify } from '../../views/deal/dealModify'

const EditDealPage = ({ deal }) => {
  return (
    <Base current='deals' currentMenu='deal'>
      {deal && <DealModify deal={deal} />}
    </Base>
  )
}

EditDealPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const deal = await detailDeal(id, { populate: ['client'] }, jwt)
  if (deal.success) {
    return { deal }
  }
  return {}
}

export default EditDealPage
