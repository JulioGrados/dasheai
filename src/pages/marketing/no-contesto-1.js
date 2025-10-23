import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { NotAnswer1List } from '../../views/marketing/notanswer1'

const MktNotAnswer1 = () => {
  return (
    <Base current='marketing-notanswer1' currentMenu='marketing'>
      <NotAnswer1List />
    </Base>
  )
}

MktNotAnswer1.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktNotAnswer1