import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { MetaModify } from '../../views/meta/metaModify'

const AddMetaPage = () => {
  return (
    <Base current='metas' currentMenu=''>
      <MetaModify />
    </Base>
  )
}

AddMetaPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddMetaPage
