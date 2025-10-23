import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { ScoreList } from '../../views/score/scoreList'

const ScorePage = () => {
  return (
    <Base current='score' currentMenu='courses'>
      <ScoreList />
    </Base>
  )
}

ScorePage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default ScorePage
