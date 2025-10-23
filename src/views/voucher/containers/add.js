import { VoucherAddForm } from 'views-path/voucher/components/add'

import { addVoucher } from 'redux-path/voucher'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddVoucher = () => {
  const voucherState = useReduxState('voucher')
  const voucherTemplate = useReduxAdd(
    addVoucher,
    'Se creo el voucher correctamente'
  )

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/vouchers' : ''
    console.log(data)
    voucherTemplate(data, urlRedirect, callback)
  }

  return (
    <VoucherAddForm
      {...voucherState}
      title='Crear Voucher'
      onSubmit={handleSubmit}
    />
  )
}

export default AddVoucher
