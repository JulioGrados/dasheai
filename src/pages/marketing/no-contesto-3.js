import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { NotAnswer3List } from '../../views/marketing/notanswer3'

const MktNotAnswer3 = () => {
  return (
    <Base current='marketing-notanswer3' currentMenu='marketing'>
      <NotAnswer3List />
    </Base>
  )
}

MktNotAnswer3.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktNotAnswer3