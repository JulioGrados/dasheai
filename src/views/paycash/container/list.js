import { ChargesList } from '../components/list'
import { payloadToData } from 'utils/functions/charge'
import { useEffect } from 'react'

import { getCharges, deleteCharge } from '../../../redux/charge'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListCharges = () => {
  const chargeState = useReduxState('charge')
  const fetchOrders = useReduxFetch(getCharges)
  const handleDelete = useReduxRemove(
    deleteCharge,
    'La referencia en paycash se elimino correctamente'
  )

  useEffect(() => {
    if (chargeState.list.length === 0) {
      fetchOrders({ populate: ['linked.ref'], sort: '-startDate' })
    }
  }, [])

  const charges = chargeState.list.map(item => payloadToData(item))
  return <ChargesList {...chargeState} list={charges} handleDelete={handleDelete} />
}

export default ListCharges
