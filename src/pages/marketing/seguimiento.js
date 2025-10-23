import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { TracingList } from '../../views/marketing/tracing'

const MktTracing = () => {
  return (
    <Base current='marketing-tracing' currentMenu='marketing'>
      <TracingList />
    </Base>
  )
}

MktTracing.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MktTracing