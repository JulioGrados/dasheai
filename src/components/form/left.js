import { FormTitle } from './styles'

export const FormLeft = ({ title, name = '', children }) => {
  return (
    <div>
      {' '}
      <FormTitle>
        {title} {name}
      </FormTitle>{' '}
      {children}
    </div>
  )
}
