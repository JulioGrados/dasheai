import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { LabelModify } from '../../views/label/labelModify'

const AddLabelPage = () => {
  return (
    <Base current='labels' currentMenu='courses'>
      <LabelModify />
    </Base>
  )
}

AddLabelPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default AddLabelPage
