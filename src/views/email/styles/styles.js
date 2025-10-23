import styled from 'styled-components'

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