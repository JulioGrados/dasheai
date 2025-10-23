import styled from 'styled-components'
import { Button } from 'antd'

export const FormRightTitle = styled.h3`
  font-weight: 500;
  margin: 0 0 15px 0;
  font-size: 18px;
`

export const FormHeader = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`

export const FormBody = styled.div`
  width: 100%;
`

export const FormHeaderTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin: 0;
`

export const FormHeaderPlus = styled(Button)`
  display: inline-block;
`

export const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #FFF;
  padding: 20px;
`

export const HeaderButton = styled.a`
  width: 30%;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  :hover {
    background-color: #40a9ff;
  }
`
