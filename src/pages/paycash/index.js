import { Base, Private } from 'layouts-path'

import ListCharges from '../../views/paycash/container/list'

const Paycashs = () => (
  <Base current='paycash-list' currentMenu='sale'>
    <ListCharges />
  </Base>
)

export default Private(Paycashs)
