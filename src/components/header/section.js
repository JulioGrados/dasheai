import { HeaderSectionContent, HeaderSectionTitle } from './style'

export const HeaderSection = ({ children, title }) => {
  return (
    <HeaderSectionContent>
      <HeaderSectionTitle>{title}</HeaderSectionTitle>
      {children}
    </HeaderSectionContent>
  )
}
