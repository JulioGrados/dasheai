import { SelectReceipt } from 'components-path'

import { searchReceipt } from 'redux-path/receipt'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectReceipts = ({ receipt, onSelect }) => {
  const { temp, loading } = useReduxState('receipt')
  const fetchReceipts = useReduxFetch(searchReceipt)

  const handleSearch = value => {
    const params = {
      query: {
        code: { $regex: value, $options: 'i' }
      },
      limit: 20,
      select: 'code'
    }

    fetchReceipts(params)
  }

  const handleSelect = id => {
    const item = temp.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectReceipt = receipt && {
    ...receipt,
    _id: receipt._id || receipt.ref
  }

  if (selectReceipt && !temp.find(item => item._id === selectReceipt._id)) {
    temp.push(selectReceipt)
  }

  return (
    <SelectReceipt
      receipts={temp}
      receipt={selectReceipt}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
