import { AgreementForm } from 'views-path/agreement/components/form'

import { addAgreement } from 'redux-path/agreement'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddAgreement = () => {
  const agreementState = useReduxState('agreement')
  const createAgreement = useReduxAdd(
    addAgreement,
    'Se creo el convenio correctamente'
  )

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/convenios' : ''
    createAgreement(data, urlRedirect, callback)
  }

  return (
    <AgreementForm
      {...agreementState}
      title='Crear Convenio'
      onSubmit={handleSubmit}
    />
  )
}

export default AddAgreement
