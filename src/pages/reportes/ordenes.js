import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { OrdersList } from '../../views/reports/orders'

const RatingsPage = () => {
  return (
    <Base current='reportes-ordenes' currentMenu='reportes'>
      <OrdersList />
    </Base>
  )
}

RatingsPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default RatingsPage
