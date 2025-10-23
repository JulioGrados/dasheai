import { TimetableList } from '../components/list'
import { payloadToData } from 'utils/functions/timetable'
import { useEffect } from 'react'

import { getTimetables, deleteTimetable } from '../../../redux/timetable'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListTimeTables = () => {
  const timetableState = useReduxState('timetable')
  const fetchTimetables = useReduxFetch(getTimetables)
  const handleDelete = useReduxRemove(
    deleteTimetable,
    'El timetable se elimino correctamente'
  )

  useEffect(() => {
    if (timetableState.list.length === 0) {
      fetchTimetables()
    }
  }, [])
  // console.log(timetableState.list)
  const timetables = timetableState.list.map(item => payloadToData(item))
  console.log(timetables)
  return (
    <TimetableList
      {...timetableState}
      timetables={timetables}
      handleDelete={handleDelete}
    />
  )
}

export default ListTimeTables
