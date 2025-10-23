import { DropDown } from './dropdown'

import {
  Navbar,
  Container,
  NavbarContainer,
  NavbarUser,
  NavbarImg
} from './style'

import { MEDIA_PATH } from 'utils/files/path'

export const Header = ({ handleLogout, user }) => {
  const image =
    user && user.photo ? MEDIA_PATH + user.photo : '/static/img/pp.jpeg'
  return (
    <Navbar>
      <Container>
        <NavbarContainer>
          <NavbarUser>
            <NavbarImg src={image} alt='' />
            {user && user.username}
            <DropDown handleLogout={handleLogout} user={user} />
          </NavbarUser>
        </NavbarContainer>
      </Container>
    </Navbar>
  )
}
