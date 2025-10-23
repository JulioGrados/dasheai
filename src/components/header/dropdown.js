import { Menu, Dropdown, Icon } from 'antd'
import { NavBarDropDownContent } from './style'

const menu = handleLogout => {
  return (
    <Menu>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.alipay.com/'
        >
          Editar perfil
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.taobao.com/'
        >
          Cambiar contraseña
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={handleLogout} rel='noopener noreferrer'>
          Cerrar sesión
        </a>
      </Menu.Item>
    </Menu>
  )
}

export const DropDown = ({ handleLogout, user }) => (
  <Dropdown overlay={menu(handleLogout)}>
    <NavBarDropDownContent className='ant-dropdown-link' href='#'>
      {user && user.names} <Icon type='down' />
    </NavBarDropDownContent>
  </Dropdown>
)
