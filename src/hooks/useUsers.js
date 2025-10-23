import { useSelector, useDispatch } from 'react-redux'

import {
  editUser,
  addUser,
  addUsersMoodle,
  addGradeMoodle,
  addEvaluationsMoodle,
  addCertificatesMoodle,
  addEnrolsMoodle,
  deleteUser,
  reloadState
} from '../redux/user'

export const useUsers = () => {
  const { list, newUsers, newGrades, newEvaluations, newEnrols, newCertificates, loading, error, current, loaded } = useSelector(
    state => state.user
  )
  const dispatch = useDispatch()

  const update = async (id, data) => {
    return dispatch(editUser(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addUser({ ...data }))
  }

  const migrate = async data => {
    return dispatch(addUsersMoodle({ ...data }))
  }

  const grade = async data => {
    return dispatch(addGradeMoodle({ ...data }))
  }

  const evaluations = async data => {
    return dispatch(addEvaluationsMoodle({ ...data }))
  }

  const enrols = async data => {
    return dispatch(addEnrolsMoodle({ ...data }))
  }

  const certificates = async data => {
    return dispatch(addCertificatesMoodle({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteUser(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const users = list

  return {
    users,
    loading,
    grade,
    evaluations,
    certificates,
    enrols,
    update,
    create,
    migrate,
    error,
    current,
    remove,
    loaded,
    reload,
    newUsers,
    newGrades,
    newEvaluations,
    newEnrols,
    newCertificates
  }
}
