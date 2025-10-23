import { useEffect } from 'react'
import Router from 'next/router'
import { session } from 'utils'

import { Loader } from '../../components'
import { Fixed } from '../fixed'

import { PrivateMiddle } from './styles'

export const Private = Page => () => {
  const jwt = session.getCookie('jwt')
  const userSession = session.getCookie('user')
  const user = userSession ? JSON.parse(userSession) : null

  const isLogged =
    jwt && user && user.roles && user.roles.includes('Administrador')

  useEffect(() => {
    if (!isLogged) {
      Router.push('/login')
    }
  }, [])

  if (isLogged) {
    return <Page />
  } else {
    return (
      <Fixed>
        <PrivateMiddle>
          <Loader />
        </PrivateMiddle>
      </Fixed>
    )
  }
}
