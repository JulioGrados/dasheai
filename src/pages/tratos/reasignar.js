import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { ReasignList } from '../../views/deal/dealReasign'


const Reasign = () => {
  return (
    <Base current='deal-reasign' currentMenu='deal'>
      <ReasignList />
    </Base>
  )
}

Reasign.getInitialProps = async ctx => await isLoggedUser(ctx)

export default Reasign
