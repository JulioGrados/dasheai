import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { NotAnswer2List } from '../../views/marketing/notanswer2'

const MktNotAnswer2 = () => {
  return (
    <Base current='marketing-notanswer2' currentMenu='marketing'>
      <NotAnswer2List />
    </Base>
  )
}

MktNotAnswer2.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktNotAnswer2