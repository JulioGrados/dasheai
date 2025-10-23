import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getLabels,
  editLabel,
  addLabel,
  deleteLabel,
  reloadState
} from '../redux/label'

export const useLabels = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.label
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getLabels())
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editLabel(id, data))
  }

  const create = async data => {
    return dispatch(addLabel(data))
  }

  const remove = async id => {
    return dispatch(deleteLabel(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const labels = list

  return {
    labels,
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
