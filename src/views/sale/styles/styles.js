import styled from 'styled-components'

export const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #FFF;
  padding: 20px;
`

export const HeaderFlexFilter = styled.div`
  display: flex;
`

export const HeaderFlexFilterItem = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`

export const HeaderFlexFilterItemDate = styled.span`
  font-size: 14px;
  font-weight: 300;
  display: inline-block;
  margin-left: 10px;
`

export const HeaderFlexFilterItemName = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const HeaderFlexMount = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderFlexMountName = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const HeaderFlexMountPrice = styled.span`
  font-size: 17px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
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
