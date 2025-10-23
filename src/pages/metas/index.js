import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { MetaList } from '../../views/meta/metaList'

const MetaPage = () => {
  return (
    <Base current='metas' currentMenu=''>
      <MetaList />
    </Base>
  )
}

MetaPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default MetaPage
