import moment from 'moment'

import { Table, TableOptions } from 'components-path'

import { SelectCourses } from 'containers-path'

export const SelectListCourses = ({ courses = [], onChange }) => {
  const coursesList = courses.map(course => ({
    ...course,
    _id: course._id || course.ref
  }))

  const handleDelete = id => {
    const index = coursesList.findIndex(item => item._id === id)
    coursesList.splice(index, 1)
    onChange(coursesList)
  }
  const handleSelect = course => {
    const index = coursesList.findIndex(item => item._id === course._id)
    if (index === -1) {
      coursesList.push(course)
    }
    onChange(coursesList)
  }
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Publicado',
      dataIndex: 'published',
      key: 'published',
      render: date => moment(date).format('ll')
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar este curso?'
        />
      )
    }
  ]

  return (
    <>
      <SelectCourses onSelect={handleSelect} />
      <Table
        size='small'
        columns={columns}
        dataSource={coursesList}
        rowKey='_id'
      />
    </>
  )
}
