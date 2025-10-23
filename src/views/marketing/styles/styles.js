import styled from 'styled-components'

export const HeaderFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  padding: 20px;
`
export const HeaderFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background-color: #fff;
`
export const HeaderButton = styled.a`
  width: 50px;
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
