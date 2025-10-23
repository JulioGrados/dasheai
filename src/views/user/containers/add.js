import { UserForm } from 'views-path/user/components/form'

import { addUser } from 'redux-path/user'
import { useReduxAdd, useReduxState } from '../../../hooks/redux'

const AddUser = ({ role }) => {
  const userState = useReduxState('user')
  const createUser = useReduxAdd(addUser, 'Se creo el usuario correctamente')

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect
      ? role
        ? `/usuarios/${role.toLowerCase()}s`
        : '/usuarios'
      : ''
    createUser(data, urlRedirect, callback)
  }

  return (
    <UserForm
      {...userState}
      role={role}
      title={`Crear ${role || 'usuario'}`}
      onSubmit={handleSubmit}
    />
  )
}

export default AddUser
