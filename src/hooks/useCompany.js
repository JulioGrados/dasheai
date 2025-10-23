import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getCompanies,
  editCompany,
  addCompany,
  deleteCompany,
  reloadState
} from '../redux/company'

export const useCompanies = () => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.company
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getCompanies())
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editCompany(id, data))
  }

  const create = async data => {
    return dispatch(addCompany(data))
  }

  const remove = async id => {
    return dispatch(deleteCompany(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const companies = list

  return {
    companies,
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
