import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import ListDeals from 'views-path/deal/containers/list'


const DealPage = () => {
  return (
    <Base current='deals' currentMenu='deal'>
      <ListDeals />
    </Base>
  )
}

DealPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default DealPage
