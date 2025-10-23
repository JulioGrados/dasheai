import { ContactList } from '../components/list'
import { useEffect } from 'react'

import { getContacts, deleteContact } from 'redux-path/contact'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListContacts = () => {
  const contactState = useReduxState('contact')
  const fetchContacts = useReduxFetch(getContacts)
  const handleDelete = useReduxRemove(
    deleteContact,
    'El contacto se elimino correctamente'
  )

  useEffect(() => {
    if (contactState.list.length === 0) {
      fetchContacts()
    }
  }, [])

  return (
    <ContactList
      {...contactState}
      contacts={contactState.list}
      handleDelete={handleDelete}
    />
  )
}

export default ListContacts
