import { SelectProgress } from 'components-path'
import { useEffect } from 'react'

import { getProgresses } from 'redux-path/progress'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectProgresses = ({ progress, pipe, onSelect }) => {
  const { list, loading } = useReduxState('progress')
  const fetchProgresses = useReduxFetch(getProgresses)

  const progresses = list.filter(
    item => !pipe || item.pipes.find(p => p === pipe)
  )

  useEffect(() => {
    if (list.length === 0) {
      fetchProgresses()
    }
  }, [])

  const handleSelect = id => {
    const item = list.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }

  const selectProgress = progress && {
    ...progress,
    _id: progress._id || progress.ref
  }

  return (
    <SelectProgress
      progresses={progresses}
      progress={selectProgress}
      loading={loading}
      onSelect={handleSelect}
    />
  )
}
