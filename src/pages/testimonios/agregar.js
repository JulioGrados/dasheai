import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { TestimonyModify } from '../../views/testimony/testimonyModify'

const AddTestimonyPage = () => {
  return (
    <Base current='testimony' currentMenu='testimony'>
      <TestimonyModify />
    </Base>
  )
}

AddTestimonyPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddTestimonyPage
