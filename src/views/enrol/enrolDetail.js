import Link from 'next/link'
import { Box, HeaderSection } from '../../components'
import { Button, Descriptions, Tag, Table, DatePicker, message } from 'antd'
import { payloadToData } from 'utils/functions/enrol'
import { getEnrolCertificate, sendEnrol, sendEnrolCertificate } from 'utils/api/enrols'
import moment from 'moment'

import { useLessons } from '../../hooks'
import { Certificate } from './certificate'
import { SendCertificate } from './sendCertificate'
import { CreateConstanceConclude } from './constance'
import { CreateConstanceTake } from './constanceTake'
import { SendConstanceTake } from './sendConstanceTake'
import { SendConstanceConclude } from './sendConstance'
import { detailOpenCourse } from 'utils/api/courses'
import { useEffect, useState } from 'react'

import { BoxTop, BoxTopTitle, BoxTopBody } from '../../styles/templates/style'

export const EnrolDetail = ({ enrol }) => {
  const [current, setCurrent] = useState(null)
  const [emit, setEmit] = useState(moment().format('YYYY/M/D'))
  const [disabled, setDisabled] = useState(false)
  
  let data = payloadToData(enrol)
  const course = enrol.course.ref

  const { lessons } = useLessons({
    course: course && course._id
  })

  useEffect(() => {
    async function fetchCourse () {
      const response = await detailOpenCourse({
        query: { slug: course && course.slug },
        populate: ['agreement.ref']
      })
      setCurrent(response)
    }
    fetchCourse()
  }, [course])

  const onChangeEmit = e => {
    setEmit(moment(e).format('YYYY/M/D'))
  }

  if (data.linkedLastName) {
    const end = data.linkedLastName.substring(
      data.linked.lastName.length - 1,
      data.linked.lastName.length
    )

    if (end === ' ') {
      data.linkedLastName = data.linkedLastName.substring(
        0,
        data.linkedLastName.length - 1
      )
    }
  }

  let constanceData = []
  let constanceTake = []

  if (lessons) {
    let evaluations = []
    enrol.exams.forEach(item => evaluations.push(item))
    enrol.tasks.forEach(item => evaluations.push(item))
    lessons.sort((a, b) => (a.order > b.order ? 1 : -1))
    enrol &&
      (constanceData = lessons.map(item => {
        const calification =
          item.evaluation &&
          item.evaluation.name &&
          evaluations.find(element => element.name === item.evaluation.name)

        const data = {
          _id: item._id,
          number: item.order,
          lesson: item.name,
          score: calification && calification.score ? calification.score : '-',
          date: calification && calification.date ? calification.date : ''
        }
        return data
      }))

    constanceTake = lessons.map(item => {
      return {
        number: item.order,
        lesson: item.name
      }
    })
  }
  constanceData = constanceData.sort((a, b) => (a.number > b.number ? 1 : -1))
  
  let date_start
  if (data && data.certificate && data.certificate.ref && course) {
    let now = new Date(data.certificate.ref.date.toString())
    let evaluations = course.numberEvaluation
    if (evaluations <= 10) {
      evaluations = 70
    } else {
      evaluations = evaluations * 7
    }
    date_start = evaluations * (24 * 60 * 60 * 1000)
    date_start = new Date(Date.parse(now) - date_start)
  }

  const handleSendConstance = async (data) => {
    const data64 = data.replace('data:application/pdf;filename=generated.pdf;base64,', '')
    const formData = new window.FormData()
    const msg = {
      to: enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.email, //{enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.email}
      cc: 'cursos@eai.edu.pe',
      from: 'cursos@eai.edu.pe',
      subject: `Constancia -  ${enrol && enrol.course && enrol.course.ref && enrol.course.ref.name} - ${enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.lastName.toUpperCase()}, ${enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.firstName.toUpperCase()}`,
      fromname: `Escuela Americana de Innovación`,
      html: `Saludos estudiante ${enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.lastName.toUpperCase()}, ${enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.firstName.toUpperCase()} adjuntamos la constancia solicitada.`,
      pdf: data64,
      constance: true
    }
    
    formData.append('data', JSON.stringify(msg))
    const send = await sendEnrol(msg)
    
    if (send.success) {
      message.success('Se envió correctamente el mail', 3)
      changeSetDisbled(false)
    }
  }

  const handleSendCertificate = async () => {
    changeSetDisbled(true)
    const send = await sendEnrolCertificate(enrol)
    if (send.success) {
      message.success('Se envió correctamente el mail', 3)
      changeSetDisbled(false)
    }
  }

  const handlegetCertificate = async () => {
    changeSetDisbled(true)
    const send = await getEnrolCertificate({ _id: enrol._id })
    if (send.success) {
      var w = window.open('about:blank')
      setTimeout(() => {
        w.document.body.appendChild(w.document.createElement('iframe')).src = "data:image/png;base64," + send.png
        w.document.body.style.margin = 0
        w.document.getElementsByTagName("iframe")[0].style.width = '100%'
        w.document.getElementsByTagName("iframe")[0].style.height = '100%'
        w.document.getElementsByTagName("iframe")[0].style.border = 0
      }, 0)
      changeSetDisbled(false)
    }
  }

  const changeSetDisbled = value => {
    setDisabled(value)
  }

  return (
    <>
      <HeaderSection title='Detalle de matricula'>
        <Link href='/matriculas'>
          <Button>Regresar</Button>
        </Link>
      </HeaderSection>
      <Box>
        <div id='my-node'>
          <Descriptions title='Información' layout='vertical' bordered>
            <Descriptions.Item label='Usuario' span={1}>
              {data.linkedName}
            </Descriptions.Item>
            <Descriptions.Item label='Curso' span={1}>
              {data.courseName}
            </Descriptions.Item>
            <Descriptions.Item label='Email' span={1}>
              {data.linkedEmail}
            </Descriptions.Item>
            <Descriptions.Item label='Nota' span={1}>
              {data.certificate
                ? data.certificate.ref
                  ? Math.round(data.certificate.ref.score)
                  : data.score
                  ? Math.round(data.score)
                  : '0'
                : data.score
                ? Math.round(data.score)
                : '0'}
            </Descriptions.Item>
            {/* <Descriptions.Item label='Fecha de Inicio' span={1}>
            {moment(date_start).format('LL')}
          </Descriptions.Item> */}
            <Descriptions.Item label='Fecha de Enrol' span={1}>
              {data && moment(data.date).format('LL')}
            </Descriptions.Item>

            <Descriptions.Item label='Estado' span={1}>
              {!data.isFinished === true ? (
                <>
                  {data.certificate ? (
                    <Tag color='green'>Aprobado</Tag>
                  ) : (
                    <Tag color='blue'>No termina</Tag>
                  )}
                </>
              ) : (
                <Tag color='green'>Aprobado</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Código' span={1}>
              {data.certificate &&
                data.certificate.ref &&
                data.certificate.ref.shortCode}
            </Descriptions.Item>
            <Descriptions.Item label='Fecha de Inicio' span={1}>
              {data.certificate &&
                data.certificate.ref &&
                moment(date_start).format('DD/MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label='Fecha de Fin' span={1}>
              {data.certificate &&
                data.certificate.ref &&
                moment(data.certificate.ref.date).format('DD/MM/YYYY')}
            </Descriptions.Item>
            {constanceData && constanceData.length > 0 && (
              <Descriptions.Item label='Modulos' span={3}>
                <Table
                  size='small'
                  columns={getColumns()}
                  dataSource={sort(constanceData)}
                  rowKey='_id'
                  pagination={false}
                />
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </Box>
      <BoxTop>
        <Descriptions title='Información de la constancia y certificado:' layout='vertical' bordered>
          <Descriptions.Item label='to' span={1}>
              {enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.email}
          </Descriptions.Item>
          <Descriptions.Item label='from' span={1}>
            docente@eai.edu.pe
          </Descriptions.Item>
          <Descriptions.Item label='Fecha de Emisión'>
            <DatePicker
              value={moment(new Date(emit))}
              onChange={onChangeEmit}
            />
          </Descriptions.Item>
          <Descriptions.Item label='Subject' span={3}>
            Constancia -  {enrol && enrol.course && enrol.course.ref && enrol.course.ref.name} - {enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.lastName.toUpperCase()}, {enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.firstName.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label='Html' span={3}>
            Saludos estudiante {enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.lastName.toUpperCase()}, {enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.firstName.toUpperCase()} adjuntamos la constancia solicitada.
          </Descriptions.Item>
        </Descriptions>
        <br></br>
        <Descriptions title='Eventos:' layout='vertical' bordered>
          {
            enrol && enrol.isFinished && (
            <>
              <Descriptions.Item label='PDF Constancia Termino:' span={2}>
                <CreateConstanceConclude
                  name={
                    data.linkedLastName.toUpperCase() +
                    ', ' +
                    data.linkedFirstName.toUpperCase()
                  }
                  constancia={data.courseName}
                  horas={course.academicHours}
                  inicio={
                    data.certificate && data.certificate.ref
                      ? moment(date_start).format('LL')
                      : ''
                  }
                  fin={
                    data.certificate && data.certificate.ref
                      ? moment(data.certificate.ref.date).format('LL')
                      : ''
                  }
                  colegio={
                    current && current.agreement
                      ? current.agreement.ref
                        ? current.agreement.ref.institution
                        : current.agreement.institution
                      : ''
                  }
                  free={current && current.isFree ? true : false}
                  dni={
                    enrol &&
                    enrol.linked &&
                    enrol.linked.ref &&
                    enrol.linked.ref.dni
                      ? enrol.linked.ref.dni
                      : ''
                  }
                  type={
                    enrol &&
                    enrol.linked &&
                    enrol.linked.ref &&
                    enrol.linked.ref.document
                      ? enrol.linked.ref.document
                      : ''
                  }
                  emit={moment(new Date(emit)).format('LL')}
                  modules={constanceData && constanceData.length}
                  tables={[
                    {
                      columns: [
                        { header: 'MOD.', dataKey: 'number' },
                        { header: 'TEMA', dataKey: 'lesson' },
                        { header: 'NOTA', dataKey: 'score' }
                      ],
                      data: constanceData && constanceData
                    }
                  ]}
                />
              </Descriptions.Item>
              <Descriptions.Item label='Enviar Constancia Termino:' span={2}>
                <SendConstanceConclude
                  disabled={disabled}
                  changeSetDisbled={changeSetDisbled}
                  name={
                    data.linkedLastName.toUpperCase() +
                    ', ' +
                    data.linkedFirstName.toUpperCase()
                  }
                  constancia={data.courseName}
                  horas={course.academicHours}
                  inicio={
                    data.certificate && data.certificate.ref
                      ? moment(date_start).format('LL')
                      : ''
                  }
                  fin={
                    data.certificate && data.certificate.ref
                      ? moment(data.certificate.ref.date).format('LL')
                      : ''
                  }
                  colegio={
                    current && current.agreement
                      ? current.agreement.ref
                        ? current.agreement.ref.institution
                        : current.agreement.institution
                      : ''
                  }
                  free={current && current.isFree ? true : false}
                  dni={
                    enrol &&
                    enrol.linked &&
                    enrol.linked.ref &&
                    enrol.linked.ref.dni
                      ? enrol.linked.ref.dni
                      : ''
                  }
                  type={
                    enrol &&
                    enrol.linked &&
                    enrol.linked.ref &&
                    enrol.linked.ref.document
                      ? enrol.linked.ref.document
                      : ''
                  }
                  emit={moment(new Date(emit)).format('LL')}
                  modules={constanceData && constanceData.length}
                  tables={[
                    {
                      columns: [
                        { header: 'MOD.', dataKey: 'number' },
                        { header: 'TEMA', dataKey: 'lesson' },
                        { header: 'NOTA', dataKey: 'score' }
                      ],
                      data: constanceData && constanceData
                    }
                  ]}
                  onHandleConstance={handleSendConstance}
                />
              </Descriptions.Item>
            </>
            )
          }
          <Descriptions.Item label='PDF Constancia Llevando:' span={2}>
            <CreateConstanceTake
              name={
                data.linkedLastName.toUpperCase() +
                ', ' +
                data.linkedFirstName.toUpperCase()
              }
              constancia={data.courseName}
              horas={course.academicHours}
              dni={
                enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.dni
                  ? enrol.linked.ref.dni
                  : ''
              }
              type={
                enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.document
                  ? enrol.linked.ref.document
                  : ''
              }
              emit={moment(new Date(emit)).format('LL')}
              modules={constanceData && constanceData.length}
              tables={[
                {
                  columns: [
                    { header: 'MOD.', dataKey: 'number' },
                    { header: 'TEMA', dataKey: 'lesson' }
                  ],
                  data: constanceTake && constanceTake
                }
              ]}
            />
          </Descriptions.Item>
          <Descriptions.Item label='Enviar Constancia Llevando:' span={2}>
            <SendConstanceTake
              disabled={disabled}
              changeSetDisbled={changeSetDisbled}
              name={
                data.linkedLastName.toUpperCase() +
                ', ' +
                data.linkedFirstName.toUpperCase()
              }
              constancia={data.courseName}
              horas={course.academicHours}
              dni={
                enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.dni
                  ? enrol.linked.ref.dni
                  : ''
              }
              type={
                enrol && enrol.linked && enrol.linked.ref && enrol.linked.ref.document
                  ? enrol.linked.ref.document
                  : ''
              }
              emit={moment(new Date(emit)).format('LL')}
              modules={constanceData && constanceData.length}
              tables={[
                {
                  columns: [
                    { header: 'MOD.', dataKey: 'number' },
                    { header: 'TEMA', dataKey: 'lesson' }
                  ],
                  data: constanceTake && constanceTake
                }
              ]}
              onHandleConstance={handleSendConstance}
            />
          </Descriptions.Item>
          <Descriptions.Item label='PDF Certificado:' span={2}>
            <Button disabled={disabled} onClick={handlegetCertificate}>PDF Certificado</Button>
          </Descriptions.Item>
          <Descriptions.Item label='Enviar Certificado:' span={2}>
            <Button disabled={disabled} onClick={handleSendCertificate}>Enviar mail Certificado</Button>
          </Descriptions.Item>
        </Descriptions>
      </BoxTop>
    </>
  )
}

const sort = datos => {
  return datos.sort((a, b) => !a.number || a.number - b.number)
}

const getColumns = () => {
  const columns = [
    {
      title: 'Numero',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Nombre',
      dataIndex: 'lesson',
      key: 'lesson'
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: date => (date ? moment(date * 1000).format('DD/MM/YYYY') : 0)
    },
    {
      title: 'Nota',
      dataIndex: 'score',
      key: 'score',
      render: score => (score ? score : 0)
    },
    {
      title: 'Aprobado',
      dataIndex: 'score',
      key: 'pass',
      render: score => (score >= 12 ? 'Si' : 'No')
    }
  ]

  return columns
}
