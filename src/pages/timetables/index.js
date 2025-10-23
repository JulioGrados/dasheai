import { Base, Private } from '../../layouts'
import ListTimeTables from '../../views/timetable/containers/list'

const Timetables = () => (
  <Base current='timetable-list' currentMenu='call-center'>
    <ListTimeTables />
  </Base>
)

export default Private(Timetables)