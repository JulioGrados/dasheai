import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { MigrateList } from '../../views/certificate/migrateList'

const MigratePage = () => {
  return (
    <Base current='migrate' currentMenu='courses'>
      <MigrateList />
    </Base>
  )
}

MigratePage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MigratePage
