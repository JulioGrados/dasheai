import { FormInformation, FormLine } from './styles'

export const FormSection = ({ children, hasLine }) => {
  return (
    <>
      <FormInformation>{children}</FormInformation>
      {hasLine && <FormLine />}
    </>
  )
}
