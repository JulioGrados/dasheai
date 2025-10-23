import styled from 'styled-components'
import { Button, Icon, Card } from 'antd'

export const HeaderForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const HeaderFormTitle = styled.h1`
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

export const FormBox = styled.div`
  background: #fff;
  padding: 30px;
  border: 1px solid rgba(204, 204, 204, .5);
  box-shadow: 0px 1px 1px 0px rgba(204, 204, 204, .5);
`

export const FormBoxInformation = styled.div` 
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const FormData = styled.div`
  width: 70%; 
`

export const FormTitle = styled.h2`
  width: 30%;
`

export const FormLine = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, .5);
  margin-bottom: 25px;
`

export const TableOptions = styled.div`
  text-align: center;
`

export const TableOptionsItem = styled.a`
  margin: 0 8px;
`

export const TableOptionsItemIcon = styled(Icon)`
  font-size: 17px;
`

export const BodyForm = styled(Card)`
  padding: 0px;
`

export const BoxTop = styled.div`
  background: #fff;
  padding: 30px;
  border: 1px solid rgba(204, 204, 204, 0.5);
  box-shadow: 0px 1px 1px 0px rgba(204, 204, 204, 0.5);
  margin-top: 15px;
`

export const BoxTopTitle = styled.h3`
  margin-bottom: 20px;
  margin-top: 20px;
  color: rgba(0,0,0,.85);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
`

export const BoxTopBody = styled.div`
  display: flex;
  justify-content: space-around;
`