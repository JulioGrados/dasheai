import { isLoggedUser } from 'utils/functions/auth'
import { detailLabel } from 'utils/api/labels'

import { Base } from '../../layouts'
import { LabelModify } from '../../views/label/labelModify'

const EditLabelPage = ({ label }) => {
  return (
    <Base current='labels' currentMenu='courses'>
      {label && <LabelModify label={label} />}
    </Base>
  )
}

EditLabelPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const label = await detailLabel(id, {}, jwt)
  if (label.success) {
    return { label }
  }
  return {}
}

export default EditLabelPage
