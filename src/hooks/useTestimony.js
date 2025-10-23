import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { payloadToData } from 'utils/functions/testimonies'
import {
  getTestimonies,
  editTestimony,
  addTestimony,
  addTestimoniesMoodle,
  deleteTestimony,
  reloadState
} from '../redux/testimony'

export const useTestimony = () => {
  const { list, newTestimonies, loading, error, current, loaded } = useSelector(
    state => state.testimony
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (list.length === 0 && loading === false) {
      dispatch(getTestimonies({ populate: ['course.ref', 'linked.ref'] }))
    }
  }, [])

  const update = async (id, data) => {
    return dispatch(editTestimony(id, data))
  }

  const create = async data => {
    return dispatch(addTestimony(data))
  }

  const migrate = async data => {
    return dispatch(addTestimoniesMoodle({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteTestimony(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const testimonies = list.map(item => payloadToData(item))

  return {
    testimonies,
    loading,
    update,
    create,
    migrate,
    error,
    current,
    remove,
    loaded,
    reload,
    newTestimonies
  }
}
