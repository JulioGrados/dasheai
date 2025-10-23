import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { EnrolsGeneralList } from '../../views/reports/enrols'

const EnrolsGeneralPage = () => {
  return (
    <Base current='reportes-matriculas' currentMenu='reportes'>
      <EnrolsGeneralList />
    </Base>
  )
}

EnrolsGeneralPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default EnrolsGeneralPage
