import { WarningBox, WarningBoxText, WarningBoxIcon } from './style'

export const WarningAlert = ({ message }) => {
  return (
    <WarningBox>
      <WarningBoxIcon type='alert' />
      <WarningBoxText>{message}</WarningBoxText>
    </WarningBox>
  )
}
