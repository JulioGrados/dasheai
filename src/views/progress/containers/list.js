import { ProgressList } from '../components/list'
import { useEffect } from 'react'

import { getProgresses, deleteProgress } from 'redux-path/progress'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListProgresses = () => {
  const progressState = useReduxState('progress')
  const fetchProgresses = useReduxFetch(getProgresses)
  const handleDelete = useReduxRemove(
    deleteProgress,
    'El progreso se elimino correctamente'
  )

  useEffect(() => {
    if (progressState.list.length === 0) {
      fetchProgresses({ sort: 'order' })
    }
  }, [])

  const list = progressState.list.map(i => ({
    ...i,
    pipesName: i.pipes.join(', ')
  }))

  return (
    <ProgressList {...progressState} list={list} handleDelete={handleDelete} />
  )
}

export default ListProgresses
