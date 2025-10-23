import moment from 'moment'
import { MEDIA_PATH } from 'utils/files/path'
import { Form, Input, InputNumber, message, DatePicker, Upload, Icon, Button } from 'antd'

import { FormSection, FormLeft, FormRight, UploadImage } from '../../components'
import { SelectUsers, SelectCourses, SelectAgreements } from '../../containers'
import {
  Box,
  HeaderActions,
  HeaderSection
} from 'components-path'

import { useStateData } from '../../hooks'

import { dataToPayload } from 'utils/functions/certificate'

import { CertificateGenerate } from './certificateGenerate'

const FormTemplate = ({ certificate, form, save, formRef, handleDelete }) => {
  const { data, changeData, cleanData } = useStateData(certificate)

  const cleanForm = () => {
    cleanData()
    form.resetFields()
  }
  
  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataValue = dataToPayload({
          ...data,
          ...values
        })
        const formData = new window.FormData()
        if (data.imageFile1) {
          formData.append('file1', data.imageFile1.originFileObj)
        }
        if (data.imageFile2) {
          formData.append('file2', data.imageFile2.originFileObj)
        }
        formData.append('data', JSON.stringify(dataValue))
        save(formData, redirect, cleanForm)
      }
    })
  }

  let dateStart
  if (data && data.certificate && data.certificate.ref) {
    const now = new Date(data.certificate.ref.date.toString())
    let evaluations = data && data.course && data.course.ref && data.course.ref.numberEvaluation
    if (evaluations <= 10) {
      evaluations = 70
    } else {
      evaluations = evaluations * 7
    }
    dateStart = evaluations * (24 * 60 * 60 * 1000)
    dateStart = new Date(Date.parse(now) - dateStart)
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      changeData('certiFile', e[e.length - 1])
      return e[e.length - 1]
    }
    changeData('certiFile', e.file)
    return e && e.fileList && e.fileList[e.fileList.length - 1]
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection
        title={`${certificate ? 'Editar' : 'Agregar'} Certificado`}
      >
        <HeaderActions
          path='/certificados'
          handleSubmit={handleSubmit}
          isSaveClean={!certificate}
          btnName={!certificate ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Codigo'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el codigo.'
                    }
                  ],
                  initialValue: certificate ? certificate.code : ''
                })(<Input onChange={event => changeData('code', event.target.value)}/>)}
              </Form.Item>

              <Form.Item label='Codigo Corto'>
                {getFieldDecorator('shortCode', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el codigo corto.'
                    }
                  ],
                  initialValue: data && data.shortCode
                })(<Input onChange={event => changeData('shortCode', event.target.value)} />)}
              </Form.Item>

              <Form.Item label='Usuario'>
                <SelectUsers
                  type='names'
                  user={data && data.linked && data.linked.ref }
                  onSelect={user => changeData('linked', user)}
                />
              </Form.Item>

              <Form.Item label='Curso'>
                <SelectCourses
                  course={data && data.course && data.course.ref }
                  onSelect={course => changeData('course', course)}
                />
              </Form.Item>

              <Form.Item label='Convenio'>
                <SelectAgreements
                  agreement={data.agreement}
                  onSelect={agreement => changeData('agreement', agreement)}
                />
              </Form.Item>

              <Form.Item label='Score'>
                {getFieldDecorator('score', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el score.'
                    }
                  ],
                  initialValue: data && data.score && Math.round(data.score)
                })(<InputNumber min={0} onChange={event => changeData('score', event)} />)}
              </Form.Item>

              <Form.Item label='Certificado digital'>
                <UploadImage
                  image={data.imageFile1}
                  url={data && data.file1}
                  handleChange={file => changeData('imageFile1', file)}
                />
              </Form.Item>

              <Form.Item label='Certificado digital'>
                <UploadImage
                  image={data.imageFile2}
                  url={data && data.file2}
                  handleChange={file => changeData('imageFile2', file)}
                />
              </Form.Item>

              <Form.Item label='Emisión'>
                {getFieldDecorator('emission', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la moneda.'
                    }
                  ],
                  initialValue: data ? moment(data.emission) : moment()
                })(<DatePicker onChange={event => changeData('emission', event.format('YYYY-MM-DD'))} />)}
              </Form.Item>
              <Form.Item label='Fecha'>
                {getFieldDecorator('date', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la moneda.'
                    }
                  ],
                  initialValue: data ? moment(data.date) : moment()
                })(<DatePicker onChange={event => changeData('date', event.format('YYYY-MM-DD'))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection>
            <FormLeft title='Procesos' />
            <FormRight>
              <Form.Item label='Descargar certificado:'>
                <CertificateGenerate
                  name={
                    `${data && data.linked && data.linked.ref && data.linked.ref.lastName}, ${data && data.linked && data.linked.ref && data.linked.ref.firstName}`
                  }
                  names={
                    `${data && data.linked && data.linked.ref && data.linked.ref.firstName} ${data && data.linked && data.linked.ref && data.linked.ref.lastName}`
                  }
                  course={data && data.course && data.course.ref && data.course.ref.name}
                  horas={data && data.course && data.course.ref && data.course.ref.academicHours}
                  inicio={
                    data
                      ? moment(dateStart).format('LL')
                      : ''
                  }
                  fin={
                    data
                      ? moment(data.date).format('LL')
                      : ''
                  }
                  colegio={
                    data && data.course && data.course.ref && data.course.ref.agreement && data.course.ref.agreement.institution
                  }
                  free={data && data.course && data.course.ref && data.course.ref.isFree}
                  dni={
                    data && data.linked && data.linked.ref && data.linked.ref.dni
                  }
                  code={data && data.shortCode}
                  type={
                    data && data.linked && data.linked.ref && data.linked.ref.document
                  }
                />
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const CertificateForm = Form.create()(FormTemplate)
