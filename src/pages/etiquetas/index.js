import { isLoggedUser } from 'utils/functions/auth'

import { Base } from '../../layouts'
import { LabelList } from '../../views/label/labelList'

const LabelPage = () => {
  return (
    <Base current='labels' currentMenu='courses'>
      <LabelList />
    </Base>
  )
}

LabelPage.getInitialProps = async ctx => await isLoggedUser(ctx)

export default LabelPage
