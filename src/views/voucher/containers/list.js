import { VoucherList } from '../components/list'
import { payloadToData } from 'utils/functions/voucher'
import { useEffect } from 'react'

import { getVouchers, deleteVoucher } from 'redux-path/voucher'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListVouchers = () => {
  const voucherState = useReduxState('voucher')
  const fetchVouchers = useReduxFetch(getVouchers)
  const handleDelete = useReduxRemove(
    deleteVoucher,
    'El voucher se elimino correctamente'
  )

  useEffect(() => {
    if (voucherState.list.length === 0) {
      fetchVouchers()
    }
  }, [])
  // console.log(voucherState.list)
  const vouchers = voucherState.list.map(item => payloadToData(item))
  console.log(vouchers)
  return (
    <VoucherList
      // {...voucherState}
      vouchers={vouchers}
      handleDelete={handleDelete}
    />
  )
}

export default ListVouchers
