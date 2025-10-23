import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { TestimonyList } from '../../views/testimony/testimonyList'

const TestimonyPage = () => {
  return (
    <Base current='testimony' currentMenu='testimony'>
      <TestimonyList />
    </Base>
  )
}

TestimonyPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default TestimonyPage
