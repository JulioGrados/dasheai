import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getClaims,
  editClaim,
  addClaim,
  deleteClaim,
  reloadState
} from '../redux/claim'

export const useClaims = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.claim
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getClaims())
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editClaim(id, data))
  }

  const create = async data => {
    return dispatch(addClaim(data))
  }

  const remove = async id => {
    return dispatch(deleteClaim(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const claims = list
  return {
    claims,
    loading,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload
  }
}
