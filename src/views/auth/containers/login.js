import { loginUser } from 'redux-path/auth'
import { LoginForm } from '../components/form'
import { useLogin } from '../../../hooks/auth'

import { LoginContainer, LoginLogo, LoginTitle } from '../styles/login.styd'
import { useReduxState } from '../../../hooks/redux'

export const Login = () => {
  const authState = useReduxState('auth')

  const handleLogin = useLogin(loginUser, '/')

  return (
    <LoginContainer>
      <LoginLogo src='/static/img/eai_color.svg' alt='Imagen Logo' />
      {/* <LoginTitle>Administrador EAI</LoginTitle> */}
      <LoginForm {...authState} handleLogin={handleLogin} />
    </LoginContainer>
  )
}
