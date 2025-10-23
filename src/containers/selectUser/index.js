import { SelectUser } from 'components-path'

import { searchUser } from 'redux-path/user'
import { useReduxFetch, useReduxState } from '../../hooks/redux'

export const SelectUsers = ({
  type = 'username',
  query = {},
  user,
  onSelect,
  role = ''
}) => {
  const { temp, loading } = useReduxState('user')
  const fetchUsers = useReduxFetch(searchUser)

  const handleSearch = value => {
    if (type === 'email') {
      query.email = { $regex: value, $options: 'i' }
    } else if (type === 'names') {
      query.names = { $regex: value, $options: 'i' }
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
    onSelect({
      ...item,
      ref: item._id,
      names: item.names,
      email: item.email
    })
  }

  const userSelect = user && {
    ...user,
    names: user.names,
    email: user.email,
    roles: [role],
    _id: user._id ? user._id : user.ref
  }

  if (userSelect && !temp.find(item => item._id === userSelect._id)) {
    temp.push(userSelect)
  }

  const users = temp
    .map(user => ({
      ...user,
      names: user.names,
      email: user.email
    }))
    .filter(user => {
      return !role || user.roles.includes(role)
    })

  return (
    <SelectUser
      users={users}
      type={type}
      user={userSelect}
      loading={loading}
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  )
}
