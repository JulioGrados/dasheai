import { Table, TableOptions } from 'components-path'
import { SelectUsers } from 'containers-path'
import { MEDIA_PATH } from 'utils/files/path'

export const SelectStudent = ({ users = [], onChange }) => {
  const usersList = users.map(user => ({
    ...user.student,
    _id: user.student._id || user.student.ref
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
    const students = [
      ...users,
      {
        student: {
          ...user,
          ref: user._id
        },
        courses: []
      }
    ]
    onChange(students)
  }
  const columns = [
    {
      title: 'Names',
      dataIndex: 'names',
      key: 'names'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Código',
      dataIndex: 'mobileCode',
      key: 'mobileCode'
    },
    {
      title: 'Celular',
      dataIndex: 'mobile',
      key: 'mobile'
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
    roles: ''
  }

  return (
    <>
      <SelectUsers
        onSelect={handleSelect}
        type='email'
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
