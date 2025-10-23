import { UserList } from '../components/list'
import { payloadToData } from 'utils/functions/exportar'
import { useEffect, useState } from 'react'

import { getUsers, deleteUser } from 'redux-path/user'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../../hooks/redux'
import fs from 'fs'
import ObjectsToCsv from 'objects-to-csv'
import { parse } from 'path'

const ExportUsers = ( ) => {
  const userState = useReduxState('user')
  const fetchUsers = useReduxFetch(getUsers)
  const [csv, setCsv] = useState()

  useEffect(() => {
    if (userState.list.length === 0) {
      const query= {}
      query.roles = { $in: ['Estudiante'] }
      fetchUsers({ query: query })
    }
  }, [])

  useEffect(() => {
    if (userState.list) {
      convertCsv(userState.list)
    }
  }, [userState])
  
  const convertCsv = async userState => {
    let users = userState.map(item => payloadToData(item))
    const data = await new ObjectsToCsv(users).toString()
    setCsv(data)
  }
  

  return (
    csv ?  <div>
              {csv.split("\n").map((i,key) => {
                  return <div key={key}>{i}</div>;
              })}
          </div>
          :
          <div>Espere ...</div>
  )
}

export default ExportUsers
