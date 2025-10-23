import {  Select, Modal, Button, Spin } from 'antd'
import {
  ContactsOutlined
} from '@ant-design/icons'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow,
  Box
} from '../../components'
import { useEnrols, useCourses } from '../../hooks'
import { useState } from 'react'

export const EnrolList = () => {
  const [course, setCourse] = useState()
  const [enrol, setEnrol] = useState()
  const [visibleEnrol, changeVisibleEnrol] = useState(false)

  let { enrols, loading, remove, loaded, migrate } = useEnrols({
    course: course && course._id
  })
  const { courses } = useCourses()

  const handleMigrateEnrols = async id => {
    changeVisibleEnrol(true)
    const update = await migrate(id)
    setEnrol(update)
  }

  const handleDelete = async id => {
    await remove(id)
  }

  const handleSelect = id => {
    console.log(id)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])
  }
  // const columns = getColumns(enrols)

  if (enrols && course) {
    enrols.map(item => {
      item.courseName = course.name
      return item
    })
  }


  const columns = [
    {
      title: 'Curso',
      dataIndex: 'courseName',
      ...SearchRow('courseName')
    },
    {
      title: 'Nombres Completos',
      dataIndex: 'linkedName',
      ...SearchRow('linkedName')
    },
    {
      title: 'Email',
      dataIndex: 'linkedEmail',
      ...SearchRow('linkedEmail')
    },
    {
      title: 'Examenes',
      dataIndex: 'examsTakenNumber',
      sorter: (a, b) => a.examsTakenNumber - b.examsTakenNumber,
      render: (examsTakenNumber, item) =>
        `${examsTakenNumber}/${item.examsNumber}`
    },
    {
      title: 'Tareas',
      dataIndex: 'tasksTakenNumber',
      sorter: (a, b) => a.tasksTakenNumber - b.tasksTakenNumber,
      render: (tasksTakenNumber, item) =>
        `${tasksTakenNumber}/${item.tasksNumber}`
    },
    {
      title: 'Certificado',
      dataIndex: 'finish',
      key: 'finish',
      ...SearchRow('finish')
    },
    {
      title: 'Nota Final',
      dataIndex: 'score',
      key: 'score',
      render: score => (score ? Math.round(score) : '')
    },
    {
      title: 'Opciones',
      align: 'center',
      dataIndex: '_id',
      key: '_id',
      render: _id => {
        return (
          <>
            <TableOptions
              view
              onDelete={handleDelete}
              id={_id}
              path='matriculas'
              confirm='Estas seguro de eliminar esta matricula?'
            />
            <ContactsOutlined
              title='Migrar Enrols'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateEnrols(_id)}
            />
          </>
        )
      }
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de Matrículas' />
      <Box>
        <Select
          showSearch
          placeholder='Selecciona un curso'
          onSelect={handleSelect}
          value={course && course._id}
          style={{ width: '100%' }}
          filterOption={
            (input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {courses.map(course => (
            <Select.Option key={course._id} value={course._id}>
              {course.name}
            </Select.Option>
          ))}
        </Select>
      </Box>

      {enrols && (
        <Table
          columns={columns}
          pagination={{ pageSize: 50 }}
          dataSource={enrols}
          loading={!loaded && loading}
          rowKey='_id'
        />
      )}
      <Modal
        visible={!!visibleEnrol}
        title='Migrar Enrol del usuario'
        footer={null}
        closable={false}
      >
        {!loading
          ? (
              <>
                <div>
                  El enrol se ha actualizado si ha aprobado procede a realizar el proceso de certificados:
                  <p>Usuario:</p>
                  <p>Nombres: {enrol && enrol.linked.firstName + ' ' + enrol.linked.lastName}</p>
                  <p>Correo : {enrol && enrol.linked.email}</p>
                  <p>Curso:</p>
                  <p>Nombre: {enrol && enrol.course.name }</p>
                </div>
              <Button type='primary' onClick={() => {
                setEnrol('')
                changeVisibleEnrol(false)
              }}>
                  Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
                  Se esta migrando el enrol ...
                </p>
              </>
            )}
      </Modal>
    </>
  )
}


