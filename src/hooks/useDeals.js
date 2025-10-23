import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { payloadToData } from 'utils/functions/deal'
import {
  getDeals,
  editDeal,
  addDeal,
  deleteDeal,
  reloadState,
  combineDeal,
  clientDeal
} from '../redux/deal'

export const useDeals = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.deal
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getDeals({ populate: ['client'], limit: 10 }))
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editDeal(id, data))
  }

  const create = async data => {
    return dispatch(addDeal(data))
  }

  const mix = async data => {
    return dispatch(combineDeal(data))
  }

  const change = async data => {
    return dispatch(clientDeal(data))
  }

  const remove = async id => {
    return dispatch(deleteDeal(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const deals = list.map(item => payloadToData(item))

  return {
    deals,
    loading,
    update,
    create,
    mix,
    change,
    error,
    current,
    deal: current,
    remove,
    loaded,
    reload
  }
}
