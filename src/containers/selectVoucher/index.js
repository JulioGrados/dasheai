import { SelectVoucher } from 'components-path'

import { searchVoucher } from 'redux-path/voucher'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectVouchers = ({ voucher, onSelect }) => {
  const { temp, loading } = useReduxState('voucher')
  const fetchVouchers = useReduxFetch(searchVoucher)

  const handleSearch = value => {
    const params = {
      query: {
        code: { $regex: value, $options: 'i' }
      },
      limit: 20,
      select: 'code'
    }

    fetchVouchers(params)
  }

  const handleSelect = id => {
    const item = temp.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectVoucher = voucher && {
    ...voucher,
    _id: voucher._id || voucher.ref
  }

  console.log('select voucher', selectVoucher)

  if (selectVoucher && !temp.find(item => item._id === selectVoucher._id)) {
    temp.push(selectVoucher)
  }

  return (
    <SelectVoucher
      vouchers={temp}
      voucher={selectVoucher}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
