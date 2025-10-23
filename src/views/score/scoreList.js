import Link from 'next/link'
import { Select, Button } from 'antd'
import {
  SearchRow,
  HeaderSection,
  Table,
  TableOptions,
  Box
} from '../../components'

import { useCourses, useEnrols, useLessons } from '../../hooks'

import { useState } from 'react'

import moment from 'moment'

export const ScoreList = () => {
  const [course, setCourse] = useState()

  const { courses } = useCourses()

  const { enrols, loading, remove, loaded } = useEnrols({
    course: course && course._id,
    isFinished: true
  })

  const { lessons } = useLessons({
    course: course && course._id
  })

  // console.log('lessons', lessons)
  // console.log('course', course)
  console.log('enrols', enrols)

  let enrolsFilter = []

  if (course && enrols && lessons) {
    let dateStart = 0
    let evaluations = course.numberEvaluation
    if (evaluations <= 10) {
      evaluations = 70
    } else {
      evaluations = evaluations * 7
    }
    dateStart = evaluations * (24 * 60 * 60 * 1000)
    enrolsFilter = enrols.map(enrol => {
      console.log('enrol', enrol)
      const evaluations = []
      enrol.exams.forEach(item => evaluations.push(item))
      enrol.tasks.forEach(item => evaluations.push(item))
      lessons.sort((a, b) => (a.order > b.order ? 1 : -1))
      const modules = lessons.map(item => {
        const calification = evaluations.find(element => {
          if (item.evaluation && item.evaluation.name === element.name) {
            return element
          }
        })
        const data = {
          number: item.order,
          lesson: item.name,
          score: calification && calification.score ? calification.score : '-'
        }
        return data
      })
      enrol._id = enrol.certificate && enrol.certificate.ref && enrol.certificate.ref._id
      enrol.end = enrol.certificate && enrol.certificate.ref && enrol.certificate.ref.date
      enrol.lessons = lessons && lessons
      enrol.modules = modules && modules
      enrol.courseName = course.name
      enrol.start = new Date(Date.parse(enrol.end) - dateStart)
      if (enrol.linked && enrol.linked.ref && enrol.linked.ref.shippings) {
        const shippingFilter = enrol.linked.ref.shippings.filter(
          element => element.course.moodleId === course.moodleId
        )

        const shipping = shippingFilter.find(
          enrol => enrol.priority === 'Principal'
        )

        if (shipping) {
          enrol.delivery = shipping.date
          enrol.shippingFirstName = shipping.firstName
          enrol.shippingLastName = shipping.lastName
          enrol.shippingDni = shipping.dni
          enrol.shippingCellPhone = shipping.cellphone
          enrol.shippingAddress = shipping.address
        }
      }
      if (enrol.modules) {
        enrol.modules.forEach(
          (mod, index) => mod.score && (enrol['mod' + (index + 1)] = mod.score)
        )
      }
      return enrol
    })
  }

  const columns = getColumns(enrolsFilter, remove)

  const handleSelect = id => {
    const index = courses.findIndex(item => item._id === id)
    setCourse(courses[index])
  }

  console.log('enrolsFilter', enrolsFilter)
  return (
    <>
      <HeaderSection title='Lista de Calificaciones'>
        {/* <Link href='/certificados/agregar'>
          <Button type='primary'>Agregar certificado</Button>
        </Link> */}
      </HeaderSection>
      <Box>
        <Select
          showSearch
          placeholder='Selecciona un curso'
          onSelect={handleSelect}
          value={course && course._id}
          style={{ width: '100%' }}
          // onSearch={() => }
        >
          {courses.map(course => (
            <Select.Option key={course._id} value={course._id}>
              {course.name}
            </Select.Option>
          ))}
        </Select>
      </Box>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        dataSource={enrolsFilter}
        scroll={{ x: 800 }}
        loading={!loaded && loading}
        rowKey='_id'
        bordered
        size='middle'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Información General',
    children: [
      {
        title: 'Fecha de Procesamiento',
        width: 150,
        dataIndex: 'processing',
        render: processing => processing ? moment(processing).format('DD/MM/YYYY') : ''
      },
      {
        title: 'Email',
        width: 150,
        dataIndex: 'linkedEmail',
        ...SearchRow('linkedEmail')
      },
      {
        title: 'Nombres',
        width: 150,
        dataIndex: 'linkedFirstName',
        ...SearchRow('linkedFirstName')
      },
      {
        title: 'Apellidos',
        width: 150,
        dataIndex: 'linkedLastName',
        ...SearchRow('linkedLastName')
      },
      {
        title: 'Curso',
        width: 150,
        dataIndex: 'courseName',
        render: courseName => courseName
      }
    ]
  },
  {
    title: 'Información del Certificado',
    children: [
      {
        title: 'Nota Final',
        width: 100,
        dataIndex: 'score',
        render: score => Math.round(score)
      },
      {
        title: 'Código',
        width: 100,
        dataIndex: 'code',
        render: code => code
      },
      {
        title: 'Inicio',
        width: 150,
        dataIndex: 'start',
        render: start => moment(start).format('DD/MM/YYYY')
      },
      {
        title: 'Fin',
        width: 150,
        dataIndex: 'end',
        render: end => moment(end).format('DD/MM/YYYY')
      }
    ]
  },
  {
    title: 'Datos de Envió',
    children: [
      {
        title: 'Fecha destinatario',
        width: 150,
        dataIndex: 'delivery',
        render: delivery =>
          delivery ? moment(delivery * 1000).format('DD/MM/YYYY') : ''
      },
      {
        title: 'Nombres destinatario',
        width: 150,
        dataIndex: 'shippingFirstName',
        render: shippingFirstName =>
          shippingFirstName || ''
      },
      {
        title: 'Apellidos destinatario',
        width: 150,
        dataIndex: 'shippingLastName',
        render: shippingLastName => (shippingLastName || '')
      },
      {
        title: 'DNI destinatario',
        width: 150,
        dataIndex: 'shippingDni',
        render: shippingDni => (shippingDni || '')
      },
      {
        title: 'Celular destinatario',
        width: 150,
        dataIndex: 'shippingCellPhone',
        render: shippingCellPhone =>
          shippingCellPhone || ''
      },
      {
        title: 'Dirección destinatario',
        width: 150,
        dataIndex: 'shippingAddress',
        render: shippingAddress => (shippingAddress || '')
      }
    ]
  },
  {
    title: 'Modulos',
    children: [
      {
        title: 'Modulo 1',
        width: 100,
        dataIndex: 'mod1',
        render: mod1 => (mod1 || '')
      },
      {
        title: 'Modulo 2',
        width: 100,
        dataIndex: 'mod2',
        render: mod2 => (mod2 || '')
      },
      {
        title: 'Modulo 3',
        width: 100,
        dataIndex: 'mod3',
        render: mod3 => (mod3 || '')
      },
      {
        title: 'Modulo 4',
        width: 100,
        dataIndex: 'mod4',
        render: mod4 => (mod4 || '')
      },
      {
        title: 'Modulo 5',
        width: 100,
        dataIndex: 'mod5',
        render: mod5 => (mod5 || '')
      },
      {
        title: 'Modulo 6',
        width: 100,
        dataIndex: 'mod6',
        render: mod6 => (mod6 || '')
      },
      {
        title: 'Modulo 7',
        width: 100,
        dataIndex: 'mod7',
        render: mod7 => (mod7 || '')
      },
      {
        title: 'Modulo 8',
        width: 100,
        dataIndex: 'mod8',
        render: mod8 => (mod8 || '')
      },
      {
        title: 'Modulo 9',
        width: 100,
        dataIndex: 'mod9',
        render: mod9 => (mod9 || '')
      },
      {
        title: 'Modulo 10',
        width: 100,
        dataIndex: 'mod10',
        render: mod10 => (mod10 || '')
      },
      {
        title: 'Modulo 11',
        width: 100,
        dataIndex: 'mod11',
        render: mod11 => (mod11 || '')
      },
      {
        title: 'Modulo 12',
        width: 100,
        dataIndex: 'mod12',
        render: mod12 => (mod12 || '')
      },
      {
        title: 'Modulo 13',
        width: 100,
        dataIndex: 'mod13',
        render: mod13 => (mod13 || '')
      },
      {
        title: 'Modulo 14',
        width: 100,
        dataIndex: 'mod14',
        render: mod14 => (mod14 || '')
      },
      {
        title: 'Modulo 15',
        width: 100,
        dataIndex: 'mod15',
        render: mod15 => (mod15 || '')
      },
      {
        title: 'Modulo 16',
        width: 100,
        dataIndex: 'mod16',
        render: mod16 => (mod16 || '')
      }

    ]
  },
  {
    title: 'Opciones',
    children: [
      {
        title: 'Opciones',
        width: 100,
        dataIndex: '_id',
        key: '_id',
        render: _id => <TableOptions id={_id} path='certificados' target />
      }
    ]
  }
]
