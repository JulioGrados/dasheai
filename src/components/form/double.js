import { FormRow, FormRowItem } from './styles'

export const FormDouble = ({ children }) => {
  return (
    <FormRow>
      {children &&
        children.length &&
        children.map((item, idx) => (
          <FormRowItem key={idx}>{item}</FormRowItem>
        ))}
    </FormRow>
  )
}
