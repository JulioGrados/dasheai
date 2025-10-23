import { SaleList } from '../components/list'
import { payloadToData } from 'utils/functions/sale'
import { useEffect } from 'react'

import { getSales, deleteSale } from 'redux-path/sale'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListSales = () => {
  const saleState = useReduxState('sale')
  const fetchSales = useReduxFetch(getSales)
  const handleDelete = useReduxRemove(
    deleteSale,
    'La venta se elimino correctamente'
  )

  useEffect(() => {
    if (saleState.list.length === 0) {
      fetchSales({ populate: ['user.ref', 'deal'], sort: '-dateOfSale', limit: 50 })
    }
  }, [])
  console.log('saleState.list', saleState.list)
  // const handleFilter = (start, end) => {
  //   fetchSales({ query: { dateOfSale: { $gte: start, $lte: end } }, populate: ['user.ref', 'deal'], sort: '-dateOfSale' })
  // }

  const sales = saleState.list.map(item => payloadToData(item))
  return <SaleList {...saleState} list={sales} handleDelete={handleDelete} start={new Date(2020, 0, 1)} end={new Date()} />
}

export default ListSales
