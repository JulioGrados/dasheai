import styled from 'styled-components'

import { Icon } from 'antd'

export const WarningBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20px 70px;
  width: 480px;
  margin: 0 auto;
`

export const WarningBoxText = styled.p`
  margin: 0;
  padding-left: 15px;
  font-size: 17px;
  font-weight: 300;
  line-height: 1.7;
`

export const WarningBoxIcon = styled(Icon)`
  font-size: 24px;
  color: #f4bb63;
`
