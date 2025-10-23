import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { WhatsappForm } from '../components/form'
import { Loader, WarningAlert } from 'components-path'

import { getWhatsapp, editWhatsapp, reloadState} from 'redux-path/whatsapp'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditWhatsapp = () => {
  const router = useRouter()
  const whatsappState = useReduxState('whatsapp')
  const fetchWhatsapp = useReduxFetch(getWhatsapp)
  const updateWhatsapp = useReduxEdit(
    editWhatsapp,
    'Se edito la plantilla correctamente'
  )
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchWhatsapp(router.query.id)
  }, [])

  const { current, error } = whatsappState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/whatsapp' : ''
    updateWhatsapp(current._id, data, urlRedirect, callback)
  }

  return (
    <WhatsappForm
      {...whatsappState}
      title='Editar whatsapp'
      whatsapp={current}
      onSubmit={handleSubmit}
    />
  )
}

export default EditWhatsapp