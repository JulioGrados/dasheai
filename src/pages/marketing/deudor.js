import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { DebtorList } from '../../views/marketing/debtor'

const MktDebtor = () => {
  return (
    <Base current='marketing-debtor' currentMenu='marketing'>
      <DebtorList />
    </Base>
  )
}

MktDebtor.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktDebtor