import { isLoggedUser } from 'utils/functions/auth'
import { detailTestimony } from 'utils/api/testimonies'

import { Base } from '../../../layouts'
import { TestimonyModify } from '../../../views/testimony/testimonyModify'

const EditTestimonyPage = ({ testimony }) => {
  return (
    <Base current='testimony' currentMenu='testimony'>
      {testimony && <TestimonyModify testimony={testimony} />}
    </Base>
  )
}

EditTestimonyPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const testimony = await detailTestimony(id, { populate: ['linked.ref'] }, jwt)
  if (testimony.success) {
    return { testimony: testimony }
  }
  return {}
}

export default EditTestimonyPage
