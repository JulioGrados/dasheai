import { isLoggedUser } from 'utils/functions/auth'
import { detailMeta } from 'utils/api/metas'

import { Base } from '../../layouts'
import { MetaModify } from '../../views/meta/metaModify'

const EditMetaPage = ({ meta }) => {
  return (
    <Base current='metas' currentMenu=''>
      {meta && <MetaModify meta={meta} />}
    </Base>
  )
}

EditMetaPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const meta = await detailMeta(id, {}, jwt)
  if (meta.success) {
    return { meta }
  }
  return {}
}

export default EditMetaPage
