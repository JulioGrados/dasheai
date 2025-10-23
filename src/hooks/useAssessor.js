import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAssessors, editUser, addUser, reloadState } from '../redux/user'

import { payloadToData } from 'utils/functions/user'

export const useAssessor = () => {
  const { assessors, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (assessors.length === 0 && loading === false) {
      dispatch(
        getAssessors({
          query: {
            roles: { $in: ['Asesor', 'Administrador'] }
          }
        })
      )
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editUser(id, data))
  }

  const create = async data => {
    return dispatch(addUser(data))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  return {
    assessors: assessors.map(item => payloadToData(item)),
    loading,
    update,
    create,
    error,
    reload
  }
}
