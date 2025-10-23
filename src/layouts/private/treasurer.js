import { session } from 'utils'
import { useRouter } from 'next/router'

export const Treasurer = () => {
  const router = useRouter()
  const jwt = session.getCookie('jwt')
  const userSession = session.getCookie('user')
  const user = userSession ? JSON.parse(userSession) : null
  let isTeseor = false
  // console.log('user', user)
  // console.log('userSession', userSession)
  // console.log('jwt', jwt)
  const isLogged =
    jwt && user && user.roles && user.roles.includes('Administrador')
  // console.log('router.pathname', router.pathname)
  if (router.pathname === '/' ||
    router.pathname === '/usuarios/clientes' ||
    router.pathname === '/usuarios/[id]' ||
    router.pathname === '/matriculas' ||
    router.pathname === '/matriculas/detail/[id]') {
    isTeseor = jwt && user && user.roles && user.roles.includes('Tesorero')
  }

  if (user) {
    if (isLogged) {
      return true
    } else if (isTeseor) {
      isTeseor = false
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
