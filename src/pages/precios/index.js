import { Base, Private } from '../../layouts'

import { CourseListPrice } from '../../views/prices'

const Prices = () => (
  <Base current='prices-list' currentMenu='courses'>
    <CourseListPrice />
  </Base>
)

export default Private(Prices)
