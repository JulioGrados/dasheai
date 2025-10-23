import { LogList } from '../components/list'
import { useEffect } from 'react'

import { getLogs } from 'redux-path/log'
import { useReduxState, useReduxFetch } from '../../../hooks/redux'

const ListLogs = () => {
  const logState = useReduxState('log')
  const fetchLogs = useReduxFetch(getLogs)

  useEffect(() => {
    if (logState.list.length === 0) {
      fetchLogs()
    }
  }, [])

  return <LogList {...logState} />
}

export default ListLogs
