import { isLoggedUser } from 'utils/functions/auth'
import { detailPayment } from 'utils/api/payments'

import { Base } from '../../layouts'
import { PaymentModify } from '../../views/payment/paymentModify'

const EditPaymentPage = ({ payment }) => {
  return (
    <Base current='payments' currentMenu='sale'>
      {payment && <PaymentModify payment={payment} />}
    </Base>
  )
}

EditPaymentPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const payment = await detailPayment(id, {}, jwt)
  if (payment.success) {
    return { payment }
  }
  return {}
}

export default EditPaymentPage
