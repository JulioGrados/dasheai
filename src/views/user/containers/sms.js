import { UserListSMS } from '../components/sms'
import { payloadToData } from 'utils/functions/user'
import { useEffect } from 'react'

import { getUsers, deleteUser } from 'redux-path/user'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListUsersSMS = ({ role }) => {
  const userState = useReduxState('user')
  const fetchUsers = useReduxFetch(getUsers)
  const handleDelete = useReduxRemove(
    deleteUser,
    'El usuario se elimino correctamente'
  )

  useEffect(() => {
    if (userState.list.length === 0) {
      fetchUsers({celular: { $exists: true }})
    }
  }, [])

  const handleSearch = data => {
    const query = {}
    if (data.names) {
      query.names = { $regex: data.names, $options: 'i' }
    }

    if (data.username) {
      query.username = { $regex: data.username, $options: 'i' }
    }

    if (data.email) {
      query.email = { $regex: data.email, $options: 'i' }
    }

    if (data.dni) {
      query.dni = { $regex: data.dni, $options: 'i' }
    }

    if (data.mobile) {
      query.mobile = data.mobile
    }

    if (data.rol) {
      query.roles = { $in: [data.rol] }
    }
    fetchUsers({ query: query })
  }

  // let users = userState.list.map(item => payloadToData(item))
  let users = userState.list
  // console.log('userState.list', userState.list)

  if (role) {
    users = users.filter(user => user.roles.includes(role))
  }

  return (
    <UserListSMS
      {...userState}
      role={role}
      users={users}
      handleDelete={handleDelete}
      handleSearch={handleSearch}
    />
  )
}

export default ListUsersSMS
