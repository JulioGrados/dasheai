import { SelectUser } from 'components-path'

import { searchUser } from 'redux-path/user'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectTeachers = ({ user, onSelect, type, query }) => {
  const { temp, loading } = useReduxState('user')
  const fetchUsers = useReduxFetch(searchUser)

  const handleSearch = value => {
    if (type === 'email') {
      query.email = { $regex: value, $options: 'i' }
    } else if (type === 'names') {
      query['personalInfo.names'] = { $regex: value, $options: 'i' }
    } else {
      query.username = { $regex: value, $options: 'i' }
    }

    const params = {
      query: {
        ...query
      },
      limit: 30
    }

    fetchUsers(params)
  }

  const handleSelect = id => {
    const item = temp.find(item => {
      return item._id === id
    })
    onSelect({ ...item, ref: item._id })
  }
  const userSelect = user && {
    ...user,
    names: user.names || user.username,
    _id: user._id ? user._id : user.ref
  }

  if (userSelect && !temp.find(item => item._id === userSelect._id)) {
    temp.push(userSelect)
  }

  temp.forEach(user => {
    user.names = user.personalInfo && user.personalInfo.names
  })

  console.log(temp)

  return (
    <SelectUser
      users={temp}
      type={type}
      user={userSelect}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
