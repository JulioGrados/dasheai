import { CallList } from '../components/list'
import { payloadToData } from 'utils/functions/call'
import { useEffect } from 'react'

import { getCalls, deleteCall } from 'redux-path/call'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'

const ListCalls = () => {
  const callState = useReduxState('call')
  const fetchCalls = useReduxFetch(getCalls)
  const handleDelete = useReduxRemove(
    deleteCall,
    'La llamada se elimino correctamente'
  )

  useEffect(() => {
    if (callState.list.length === 0) {
      fetchCalls()
    }
  }, [])
  console.log(callState.list)
  const calls = callState.list.map(item => payloadToData(item))
  // console.log(calls)
  return (
    <CallList
      {...callState}
      calls={calls}
      handleDelete={handleDelete}
    />
  )
}

export default ListCalls
