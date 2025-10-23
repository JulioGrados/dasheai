import styled from 'styled-components'

export const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #FFF;
  padding: 20px;
`

export const HeaderButton = styled.a`
  width: 150px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  :hover {
    background-color: #40a9ff;
    color: #fff;
  }
`

export const HeaderFilterLeft = styled.div`
  font-size: 15px;
  font-weight: 600;
`

export const HeaderFilterRight = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderFilterSelect = styled.div`
  width: 250px;
  div {
    width: 100%;
  }
`

export const HeaderFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`