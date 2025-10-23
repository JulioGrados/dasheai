import { Table, TableOptions } from 'components-path'
import { SelectUsers } from 'containers-path'
import { MEDIA_PATH } from 'utils/files/path'

export const SelectTeacher = ({ users = [], onChange }) => {
  const usersList = users.map(user => ({
    ...user,
    _id: user._id || user.ref
  }))

  const handleDelete = id => {
    const index = usersList.findIndex(item => item._id === id)
    if (index !== -1) {
      usersList.splice(index, 1)
    }
    onChange(usersList)
  }
  const handleSelect = user => {
    const index = usersList.findIndex(item => item._id === user._id)
    if (index === -1) {
      usersList.push(user)
    } else {
      usersList[index] = user
    }
    onChange(usersList)
  }
  const columns = [
    {
      title: 'Names',
      dataIndex: 'names',
      key: 'names'
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Pais',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'Foto',
      dataIndex: 'photo',
      key: 'photo',
      render: photo => <img src={MEDIA_PATH + photo} width='50' />
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este usuario?'
        />
      )
    }
  ]

  const query = {
    roles: 'Docente'
  }

  return (
    <>
      <SelectUsers
        onSelect={handleSelect}
        query={query}
        type='names'
        role='Docente'
      />
      <Table
        size='small'
        columns={columns}
        dataSource={usersList}
        rowKey='_id'
      />
    </>
  )
}
