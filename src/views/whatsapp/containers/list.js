import { WhatsappList } from '../components/list'
import { payloadToData } from 'utils/functions/whatsapp'
import { useEffect } from 'react'

import { getWhatsapps, deleteWhatsapp } from 'redux-path/whatsapp'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListWhatsapps = () => {
  const whatsappState = useReduxState('whatsapp')
  const fetchWhatsapp = useReduxFetch(getWhatsapps)

  const handleDelete = useReduxRemove(
    deleteWhatsapp,
    'El whatsapp se elimino correctamente'
  )

  useEffect(() => {
    if (whatsappState.list.length === 0) {
      fetchWhatsapp()
    }
  }, [])
  // console.log(whatsappState.list)
  const whatsapps = whatsappState.list.map(item => payloadToData(item))
  // console.log(whatsapps)
  return (
    <WhatsappList
      {...whatsappState}
      whatsapps={whatsapps}
      handleDelete={handleDelete}
    />
  )
}

export default ListWhatsapps
