import moment from 'moment'
import { Spin, Modal, Button, message } from 'antd'
import {
  UserOutlined,
  ClusterOutlined,
  FileSearchOutlined,
  CommentOutlined,
  ScheduleOutlined,
  ExceptionOutlined,
  ContactsOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import { HeaderSection, Table, SearchRow } from '../../components'
import { editCourse } from 'redux-path/course'
import {
  useCertificates,
  useCourses,
  useLessons,
  useTestimony,
  useUsers,
  useEnrols
} from '../../hooks'
import { useReduxEdit } from '../../hooks/redux'
import { useEffect, useState } from 'react'

import { dataToPayload } from 'utils/functions/course'

export const MigrateList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [load, setLoad] = useState(false)

  const { courses } = useCourses()
  courses.map(course => {
    course.index = course._id
    return course
  })
  const { newCertificates, loading, migrate } = useCertificates()
  const { add, shippings, loading: loadingEnrols } = useEnrols()
  const { newUsers, newGrades, loading: loadingUsers, migrate: migrateUsers, grade, evaluations, enrols, certificates } = useUsers()
  const {
    newLessons,
    loading: loadingLesson,
    migrate: migrateLesson
  } = useLessons()

  const updateCourse = useReduxEdit(
    editCourse,
    'Se edito el curso correctamente'
  )

  const hasSelected = selectedRowKeys.length > 0

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const start = () => {
    setLoad(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoad(false)
    }, 1000)
  }

  const {
    testimonies,
    loading: loadingTestimony,
    migrate: migrateTestimony
  } = useTestimony()

  const [visibleCert, changeVisibleCert] = useState(false)
  const [visibleShip, changeVisibleShip] = useState(false)
  const [visibleUsers, changeVisibleUsers] = useState(false)
  const [visibleGrades, changeVisibleGrades] = useState(false)
  const [visibleEvaluations, changeVisibleEvaluations] = useState(false)
  const [visibleEnrols, changeVisibleEnrols] = useState(false)
  const [visibleCertificates, changeVisibleCertificates] = useState(false)
  const [visibleLess, changeVisibleLess] = useState(false)
  const [visibleTesti, changeVisibleTesti] = useState(false)
  const [usersMigrate, changeUsersMigrate] = useState(false)
  const [gradesMigrate, changeGradesMigrate] = useState(false)
  const [migateEnrol, changeMigrateEnrol] = useState(false)
  const [course, setCourse] = useState()

  const handleMassCertificates = async () => {
    await selectedRowKeys && selectedRowKeys.reduce(async (promise, moodleId) => {
      await promise
      const contents = await handleMigrate(moodleId)
    }, Promise.resolve())
  }

  const handleMassModules = async () => {
    await selectedRowKeys && selectedRowKeys.reduce(async (promise, moodleId) => {
      await promise
      const contents = await handleMigrateLesson(moodleId)
    }, Promise.resolve())
  }

  const handleMassTestimonies = async () => {
    await selectedRowKeys && selectedRowKeys.reduce(async (promise, moodleId) => {
      await promise
      const contents = await handleMigrateTestimony(moodleId)
    }, Promise.resolve())
  }

  const handleMigrateTestimony = async id => {
    changeVisibleTesti(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      await migrateTestimony({ courseId: courses[index].moodleId })
      const courseData = courses[index]
      courseData.migrateTesty = new Date()

      const formData = new window.FormData()
      const dataCourse = dataToPayload({
        ...courseData,
        ...courseData
      })
      formData.append('data', JSON.stringify(dataCourse))

      await updateCourse(courses[index]._id, formData)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateShipping = async id => {
    changeVisibleShip(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      await shippings({ courseId: courses[index].moodleId })
      console.log('add', add)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrate = async id => {
    console.log('id', id)
    changeVisibleCert(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      await migrate({ courseId: courses[index].moodleId })
      const courseData = courses[index]
      courseData.migrateCert = new Date()

      const formData = new window.FormData()
      const dataCourse = dataToPayload({
        ...courseData,
        ...courseData
      })
      formData.append('data', JSON.stringify(dataCourse))

      await updateCourse(courses[index]._id, formData)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateGrades = async id => {
    console.log('id', id)
    changeVisibleGrades(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      const gradesNews = await grade({ courseId: courses[index].moodleId, usersMoodle: usersMigrate })
      delete gradesNews.success
      const grades = [...new Array(Object.keys(gradesNews).length)].map((val, idx) => gradesNews[idx])
      console.log('gradesNews', gradesNews)
      changeGradesMigrate(grades)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateEvaluations = async id => {
    console.log('id', id)
    changeVisibleEvaluations(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      const evaluationsNews = await evaluations({ courseId: courses[index].moodleId })
      console.log('evaluationsNews', evaluationsNews)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateEnrols = async id => {
    console.log('id', id)
    changeVisibleEnrols(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      const enrolsNews = await enrols({ courseId: courses[index].moodleId, grades: gradesMigrate })
      console.log('enrolsNews', enrolsNews)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateCertificates = async id => {
    console.log('id', id)
    changeVisibleCertificates(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      const certificatesNews = await certificates({ courseId: courses[index].moodleId })
      console.log('certificatesNews', certificatesNews)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateUsers = async id => {
    console.log('id', id)
    changeVisibleUsers(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      const usersNews = await migrateUsers({ courseId: courses[index].moodleId })
      delete usersNews.success
      const user = [...new Array(Object.keys(usersNews).length)].map((val, idx) => usersNews[idx])
      console.log('users', user)
      changeUsersMigrate(user)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  const handleMigrateLesson = async id => {
    changeVisibleLess(true)
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])

    if (courses && courses[index].moodleId) {
      await migrateLesson({ courseId: courses[index].moodleId })
      const courseData = courses[index]
      courseData.migrateMod = new Date()

      const formData = new window.FormData()
      const dataCourse = dataToPayload({
        ...courseData,
        ...courseData
      })
      formData.append('data', JSON.stringify(dataCourse))

      await updateCourse(courses[index]._id, formData)
    } else {
      message.error('El curso no tiene Moodle ID')
    }
  }

  console.log('newCertificates', newCertificates)
  console.log('add', add)
  console.log('newLessons', newLessons)

  const columns = [
    {
      title: 'Curso',
      dataIndex: 'name',
      ...SearchRow('name')
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      ...SearchRow('slug')
    },
    {
      title: 'Moodle ID',
      dataIndex: 'moodleId'
    },
    {
      title: 'Migrar Certificados',
      dataIndex: 'migrateCert',
      render: migrateCert =>
        migrateCert ? moment(migrateCert).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Migrar Modulos',
      dataIndex: 'migrateMod',
      render: migrateMod =>
        migrateMod ? moment(migrateMod).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Migrar Testimonios',
      dataIndex: 'migrateTesty',
      render: migrateTesty =>
        migrateTesty ? moment(migrateTesty).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Acciones',
      align: 'center',
      dataIndex: 'index',
      key: 'index',
      render: index => {
        return (
          <>
            <FileSearchOutlined
              title='Migrar certificados'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrate(index)}
            />
            <ClusterOutlined
              title='Migrar Modulos'
              style={{ fontSize: '16px', color: '#08c', marginLeft: '10px' }}
              onClick={() => handleMigrateLesson(index)}
            />
            <CommentOutlined
              title='Migrar Testimonios'
              style={{ fontSize: '16px', color: '#08c', marginLeft: '10px' }}
              onClick={() => handleMigrateTestimony(index)}
            />
            <ShoppingOutlined
              title='Migrar Shipping'
              style={{ fontSize: '16px', color: '#08c', marginLeft: '10px' }}
              onClick={() => handleMigrateShipping(index)}
            />
          </>
        )
      }
    },
    {
      title: 'Acciones personalizadas',
      align: 'center',
      dataIndex: '_id',
      key: '_id',
      render: _id => {
        return (
          <>
            <UserOutlined
              title='Migrar Usuarios'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateUsers(_id)}
            />
            <ScheduleOutlined
              title='Migrar Grados'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateGrades(_id)}
            />
            <ExceptionOutlined
              title='Migrar Evaluaciones'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateEvaluations(_id)}
            />
            <ContactsOutlined
              title='Migrar Enrols'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateEnrols(_id)}
            />
            <ScheduleOutlined
              title='Migrar Certificados'
              type='file-text'
              style={{ fontSize: '15px', color: '#08c' }}
              onClick={() => handleMigrateCertificates(_id)}
            />
          </>
        )
      }
    }
  ]

  return (
    <>
      <HeaderSection title='Migraciones'>
        {courses && (
          <>
            <Button type='primary' disabled={!hasSelected} onClick={handleMassCertificates}>Masiva de Certificados</Button>
            <Button type='primary' disabled={!hasSelected} onClick={handleMassModules}>Masiva de Módulos</Button>
            <Button type='primary' disabled={!hasSelected} onClick={handleMassTestimonies}>Masiva de Testimonios</Button>
            <Button type='primary' disabled={!hasSelected} onClick={start} loading={load}>
              Reload
            </Button>
          </>
        )}
      </HeaderSection>

      {courses && (
        <Table
          rowSelection={{ ...rowSelection }}
          columns={columns}
          pagination={{ pageSize: 50 }}
          dataSource={courses}
          rowKey='_id'
          size='middle'
        />
      )}

      <Modal
        visible={!!visibleCert}
        title='Migrar certificados del curso'
        footer={null}
        closable={false}
      >
        {!loading
          ? (
              <>
                <p>Todos los datos actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleCert(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los certificados de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleUsers}
        title='Migrar usuarios del curso'
        footer={null}
        closable={false}
      >
        {!loadingUsers
          ? (
              <>
                <p>Todos los usuarios actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleUsers(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los usuarios de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleGrades}
        title='Migrar usuarios del curso'
        footer={null}
        closable={false}
      >
        {!loadingUsers
          ? (
              <>
                <p>Todos los grados actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleGrades(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los grados de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleEvaluations}
        title='Migrar usuarios del curso'
        footer={null}
        closable={false}
      >
        {!loadingUsers
          ? (
              <>
                <p>Todos los evaluaciones actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleEvaluations(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los evaluaciones de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleEnrols}
        title='Migrar usuarios del curso'
        footer={null}
        closable={false}
      >
        {!loadingUsers
          ? (
              <>
                <p>Todos los enrols actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleEnrols(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los enrols de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleCertificates}
        title='Migrar usuarios del curso'
        footer={null}
        closable={false}
      >
        {!loadingUsers
          ? (
              <>
                <p>Todos los certificados actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleCertificates(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los certificados de el {course && course.name}{' '}
              ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleLess}
        title='Migrar Modulos del curso'
        footer={null}
        closable={false}
      >
        {!loadingLesson
          ? (
              <>
                <p>Todos los modulos actualizados de el {course && course.name}</p>
                <Button type='primary' onClick={() => changeVisibleLess(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los modulos de el {course && course.name} ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleTesti}
        title='Migrar Testimonios del curso'
        footer={null}
        closable={false}
      >
        {!loadingTestimony
          ? (
              <>
                <p>
              Todos los testimonios actualizados de el {course && course.name}
                </p>
                <Button type='primary' onClick={() => changeVisibleTesti(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los testimonios de el {course && course.name} ...
                </p>
              </>
            )}
      </Modal>
      <Modal
        visible={!!visibleShip}
        title='Migrar Testimonios del curso'
        footer={null}
        closable={false}
      >
        {!loadingEnrols
          ? (
              <>
                <p>
              Todos los shippings actualizados de el {course && course.name}
                </p>
                <Button type='primary' onClick={() => changeVisibleShip(false)}>
              Cerrar
                </Button>
              </>
            )
          : (
              <>
                <Spin />
                <p>
              Se esta migrando los shippings de el {course && course.name} ...
                </p>
              </>
            )}
      </Modal>
    </>
  )
}
