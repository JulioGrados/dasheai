import { ReceiptList } from '../components/list'
import { payloadToData } from 'utils/functions/receipt'
import { useEffect } from 'react'

import { getReceipts, deleteReceipt, resetReceipt } from 'redux-path/receipt'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListReceipts = () => {
  const receiptState = useReduxState('receipt')
  const fetchReceipts = useReduxFetch(getReceipts)
  const handleDelete = useReduxRemove(
    resetReceipt,
    'El recibo se elimino correctamente'
  )

  useEffect(() => {
    if (receiptState.list.length === 0) {
      fetchReceipts()
    }
  }, [])

  const receipts = receiptState.list.map(item => payloadToData(item))
  console.log('receipts', receipts)
  return (
    <ReceiptList
      {...receiptState}
      receipts={receipts}
      handleDelete={handleDelete}
    />
  )
}

export default ListReceipts
