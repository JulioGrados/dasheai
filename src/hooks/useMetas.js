import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getMetas,
  editMeta,
  addMeta,
  deleteMeta,
  reloadState
} from '../redux/meta'

export const useMetas = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.meta
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getMetas())
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editMeta(id, data))
  }

  const create = async data => {
    return dispatch(addMeta(data))
  }

  const remove = async id => {
    return dispatch(deleteMeta(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const metas = list

  return {
    metas,
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
