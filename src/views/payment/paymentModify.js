import { useRouter } from 'next/router'

import { Box, HeaderSection, HeaderActions } from '../../components'

import { PaymentForm } from './paymentForm'
import { usePayments } from '../../hooks'
import { useRef } from 'react'

export const PaymentModify = ({ payment }) => {
  const router = useRouter()
  const { create, update, loading } = usePayments()
  const formRef = useRef()

  const savePayment = async data => {
    if (payment) {
      return await update(payment._id, data)
    } else {
      return await create(data)
    }
  }

  const handleSubmit = async redirect => {
    const submit = formRef.current && formRef.current.props.onSubmit
    const resp = await submit()
    if (redirect && resp.success) {
      router.push('/pagos')
    }
  }

  return (
    <>
      <HeaderSection title={`${payment ? 'Editar' : 'Agregar'} Forma de Pago`}>
        <HeaderActions
          path='/pagos'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!payment}
          btnName={!payment ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <PaymentForm formRef={formRef} save={savePayment} payment={payment} />
      </Box>
    </>
  )
}
