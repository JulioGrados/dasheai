import { EmailList } from '../components/list'
import { payloadToData } from 'utils/functions/email'
import { useEffect } from 'react'

import { getEmails, deleteEmail } from 'redux-path/email'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListEmails = () => {
  const emailState = useReduxState('email')
  const fetchEmails = useReduxFetch(getEmails)

  const handleDelete = useReduxRemove(
    deleteEmail,
    'El template se elimino correctamente'
  )

  useEffect(() => {
    if (emailState.list.length === 0) {
      fetchEmails({ populate: ['linked.ref'], limit: 10 })
    }
  }, [])
  // console.log(emailState.list)
  const emails = emailState.list.map(item => payloadToData(item))
  console.log(emails)
  return (
    <EmailList
      {...emailState}
      emails={emails}
      handleDelete={handleDelete}
    />
  )
}

export default ListEmails
