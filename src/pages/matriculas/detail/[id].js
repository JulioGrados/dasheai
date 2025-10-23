import { isLoggedUser } from 'utils/functions/auth'
import { detailEnrol } from 'utils/api/enrols'

import { Base } from '../../../layouts'
import { EnrolDetail } from '../../../views/enrol/enrolDetail'

const DetailEnrolPage = ({ enrol }) => {
  return (
    <Base current='enrols' currentMenu='courses'>
      {enrol && <EnrolDetail enrol={enrol} />}
    </Base>
  )
}

DetailEnrolPage.getInitialProps = async ctx => {
  const { jwt } = await isLoggedUser(ctx)
  const { id } = ctx.query
  const enrol = await detailEnrol(
    id,
    {
      populate: ['course.ref', 'linked.ref', 'certificate.ref']
    },
    jwt
  )
  if (enrol.success) {
    return { enrol: enrol }
  }
  return {}
}

export default DetailEnrolPage
