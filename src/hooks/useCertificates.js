import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getCertificates,
  editCertificate,
  addCertificate,
  addCertificatesMoodle,
  deleteCertificate,
  listDealAgreements,
  reloadState
} from '../redux/certificate'

import { payloadToData } from 'utils/functions/certificate'

export const useCertificates = ({ course } = {}) => {
  const {
    list,
    add,
    newCertificates,
    loading,
    error,
    current,
    loaded
  } = useSelector(state => state.certificate)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && course) {
      console.log(course)
      dispatch(
        getCertificates({
          query: { 'course.ref': course },
          populate: ['linked.ref', 'course.ref']
        })
      )
    }

    // if (list.length === 0 && loading === false) {
    //   dispatch(getCertificates())
    // }
  }, [course])

  const update = async (id, data) => {
    return dispatch(editCertificate(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addCertificate({ ...data }))
  }

  const migrate = async data => {
    return dispatch(addCertificatesMoodle({ ...data }))
  }

  const dealagree = async course => {
    return dispatch(listDealAgreements({query: {'course.ref': course._id }}))
  }

  const remove = async id => {
    return dispatch(deleteCertificate(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const certificates = list.map(certificate => payloadToData(certificate))

  return {
    certificates,
    loading,
    dealagree,
    update,
    create,
    migrate,
    error,
    current,
    remove,
    loaded,
    reload,
    newCertificates,
    add
  }
}
