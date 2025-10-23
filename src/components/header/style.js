import styled from 'styled-components'
import { Button } from 'antd'

export const Navbar = styled.header`
  height: 55px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
`

export const Container = styled.div`
  padding: 0px 20px;
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 55px;
`

export const NavbarUser = styled.div`
  display: flex;
  align-items: center;
`

export const NavbarImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`

export const NavBarDropDownContent = styled.span`
  cursor: pointer;
`

export const HeaderSectionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const HeaderSectionTitle = styled.h1`
  margin: 0;
  font-size: 25px;
  font-weight: 600;
  color: #000;
  text-align: left;
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ActionButton = styled(Button)`
  margin-left: 10px;
`
