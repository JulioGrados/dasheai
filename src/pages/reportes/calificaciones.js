import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { RatingsList } from '../../views/reports/ratings'

const RatingsPage = () => {
  return (
    <Base current='reportes-calificaciones' currentMenu='reportes'>
      <RatingsList />
    </Base>
  )
}

RatingsPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default RatingsPage
