import { DealsList } from '../components/list'

import { getDeals, deleteDeal } from '../../../redux/deal'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

import { payloadToData } from 'utils/functions/deal'

import { useEffect } from 'react'

const ListDeals = () => {
  // const { deals, loading, remove, loaded } = useDeals()
  const agreementState = useReduxState('deal')
  const fetchDeals = useReduxFetch(getDeals)
  const handleDelete = useReduxRemove(
    deleteDeal,
    'El trato se elimino correctamente'
  )

  useEffect(() => {
    if (agreementState.list.length === 0) {
      fetchDeals({ populate: ['client'], limit: 10 })
    }
  }, [])

  const deals = agreementState.list.map(item => payloadToData(item))

  return (
    <DealsList list={deals} handleDelete={handleDelete} />
  )
}

export default ListDeals
