import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { AnswerList } from '../../views/reports/answer'

const AnswerPage = () => {
  return (
    <Base current='reportes-contesto' currentMenu='reportes'>
      <AnswerList />
    </Base>
  )
}

AnswerPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AnswerPage
