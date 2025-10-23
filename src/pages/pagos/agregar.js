import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { PaymentModify } from '../../views/payment/paymentModify'

const AddPaymentPage = () => {
  return (
    <Base current='payments' currentMenu='sale'>
      <PaymentModify />
    </Base>
  )
}

AddPaymentPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddPaymentPage
