import { AgreementList } from '../components/list'
import { useEffect } from 'react'

import { getAgreements, deleteAgreement } from 'redux-path/agreement'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListAgreements = () => {
  const agreementState = useReduxState('agreement')
  const fetchAgreements = useReduxFetch(getAgreements)
  const handleDelete = useReduxRemove(
    deleteAgreement,
    'El convenio se elimino correctamente'
  )

  useEffect(() => {
    if (agreementState.list.length === 0) {
      fetchAgreements()
    }
  }, [])

  return <AgreementList {...agreementState} handleDelete={handleDelete} />
}

export default ListAgreements
