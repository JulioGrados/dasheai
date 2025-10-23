import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { PaymentList } from '../../views/payment/paymentList'

const PaymentPage = () => {
  return (
    <Base current='payments' currentMenu='sale'>
      <PaymentList />
    </Base>
  )
}

PaymentPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default PaymentPage
