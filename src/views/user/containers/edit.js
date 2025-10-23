import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { UserForm } from 'views-path/user/components/form'
import { Loader, WarningAlert } from 'components-path'

import { getUser, editUser, deleteDniUser, deleteAccountUser, deleteAccountUserMoodle, deletePhotoUser, reloadState } from 'redux-path/user'
import {
  useReduxState,
  useReduxFetch,
  useReduxDispatch,
  useReduxEdit
} from '../../../hooks/redux'

const EditUser = ({ role }) => {
  const router = useRouter()
  const userState = useReduxState('user')
  const fetchUser = useReduxFetch(getUser)
  const updateUser = useReduxEdit(editUser, 'Se edito el usuario correctamente')
  const deleteDni = useReduxEdit(deleteDniUser, 'Se elimino DNI correctamente')
  const deleteAccount = useReduxEdit(deleteAccountUser, 'Se elimino cuenta correctamente')
  const deleteAccountMoodle = useReduxEdit(deleteAccountUserMoodle, 'Se elimino cuenta correctamente de moodle')
  const deletePhoto = useReduxEdit(deletePhotoUser,'Se elimino Foto correctamente')
  const reload = useReduxDispatch(reloadState)

  useEffect(() => {
    reload()
    fetchUser(router.query.id)
  }, [])

  const { current, error } = userState

  if (!current) {
    if (error) {
      return <WarningAlert message={error} />
    }
    return <Loader />
  }

  const handleSubmit = (data, redirect, callback) => {
    const urlRedirect = redirect
      ? role
          ? `/usuarios/${getRoute(role)}`
          : '/usuarios'
      : ''

    updateUser(current._id, data, urlRedirect, callback)
  }

  const handleDeleteDni = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/usuarios' : ''
    deleteDni(current._id, data, urlRedirect, callback)
  }

  const handleDeleteAccount = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/usuarios' : ''
    deleteAccount(current._id, data, urlRedirect, callback)
  }

  const handleDeleteAccountMoodle = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/usuarios' : ''
    deleteAccountMoodle(current._id, data, urlRedirect, callback)
  }

  const handleDeletePhoto = (data, redirect, callback) => {
    const urlRedirect = redirect ? '/usuarios' : ''
    deletePhoto(current._id, data, urlRedirect, callback)
  }

  return (
    <UserForm
      {...userState}
      role={role}
      title={`Editar ${role || 'usuario'}`}
      user={current}
      onSubmit={handleSubmit}
      onDeleteDNI={handleDeleteDni}
      onDeletePhoto={handleDeletePhoto}
      onDeleteAccount={handleDeleteAccount}
      onDeleteAccountMoodle={handleDeleteAccountMoodle}
    />
  )
}

function getRoute (role) {
  if (role === 'Asesor') {
    return `${role.toLowerCase()}es`
  } else {
    return `${role.toLowerCase()}s`
  }
}

export default EditUser
