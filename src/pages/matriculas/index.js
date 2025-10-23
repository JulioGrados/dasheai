import { isLoggedUser } from 'utils/functions/auth'

import { Base, Private } from '../../layouts'
import { EnrolList } from '../../views/enrol/enrolList'

const EnrolPage = () => {
  return (
    <Base current='enrols' currentMenu='courses'>
      <EnrolList />
    </Base>
  )
}

export default EnrolPage
