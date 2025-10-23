import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getEnrols,
  editEnrol,
  listEnrolAgreements,
  updateGradeMoodle,
  addShippingsMoodle,
  addEnrol,
  deleteEnrol,
  reloadState
} from '../redux/enrol'

import { payloadToData } from 'utils/functions/enrol'

export const useEnrols = ({ course, user, isFinished } = {}) => {
  const { list, loading, error, current, loaded, add } = useSelector(
    state => state.enrol
  )
  const dispatch = useDispatch()

  useEffect(() => {
    /* if (list.length === 0 && loading === false && !course && !user) {
      dispatch(getEnrols())
    } else */
    if (loading === false && user) {
      dispatch(
        getEnrols({
          query: { 'linked.ref': user }
        })
      )
    } else if (loading === false && course) {
      dispatch(
        getEnrols({
          query: { 'course.ref': course, isFinished: isFinished },
          populate: ['certificate.ref', 'linked.ref']
        })
      )
    }
  }, [course, user])

  const update = async (id, data) => {
    return dispatch(editEnrol(id, data))
  }

  const shippings = async data => {
    return dispatch(addShippingsMoodle({ ...data }))
  }

  const create = async data => {
    return dispatch(addEnrol(data))
  }

  const enrolsagree = async course => {
    return dispatch(listEnrolAgreements({query: {'course.ref': course._id }}))
  }

  const remove = async id => {
    return dispatch(deleteEnrol(id))
  }

  const migrate = async (id) => {
    return dispatch(updateGradeMoodle(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  let enrols = list.map(enrol => payloadToData(enrol))

  if (course) {
    enrols = enrols.filter(item => item.course.ref === course)
  }

  if (user) {
    enrols = enrols.filter(item => item.linked.ref === user)
  }

  return {
    enrols,
    enrolsagree,
    loading,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload,
    migrate,
    shippings,
    add
  }
}
