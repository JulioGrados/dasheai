import { CertificateAddForm } from '../components/certificateAdd'
import {
  useReduxAdd,
  useReduxState
} from '../../../hooks/redux'
import { addCertificate } from '../../../redux/certificate'

export const AddCertificate = () => {
  const certificateState = useReduxState('certificate')
  const createCourse = useReduxAdd(addCertificate, 'Se creo el certificado correctamente')

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/certificados' : ''
    createCourse(data, urlRedirect, callback)
  }

  return (
    <>
      <CertificateAddForm
        {...certificateState}
        title='Editar Certificado'
        save={handleSubmit}
      />
    </>
  )
}
