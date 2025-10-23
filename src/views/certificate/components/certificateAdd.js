import moment from 'moment'
import { Form, Input, InputNumber, message, DatePicker, Upload, Icon, Button } from 'antd'

import { FormSection, FormLeft, FormRight } from '../../../components'
import { SelectUsers, SelectCourses } from '../../../containers'
import {
  Box,
  HeaderActions,
  HeaderSection
} from 'components-path'

import { useStateData } from '../../../hooks'

import { dataToPayload } from 'utils/functions/certificate'

const FormTemplate = ({ certificate, form, save, formRef, handleDelete }) => {
  const { data, changeData, cleanData } = useStateData(certificate || {})

  const cleanForm = () => {
    cleanData()
    form.resetFields()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        data.linked = data.linked
          ? {
              ...data.linked,
              ref: data.linked
            }
          : ''
        data.course = data.course
          ? {
              ...data.course,
              ref: data.course
            }
          : ''
        const dataValue = dataToPayload({
          ...data,
          ...values
        })
        const formData = new window.FormData()
        formData.append('data', JSON.stringify(dataValue))

        save(formData, redirect, cleanForm)
      }
    })
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
                  user={data && data.linked }
                  onSelect={user => changeData('linked', user)}
                />
              </Form.Item>

              <Form.Item label='Curso'>
                <SelectCourses
                  course={data && data.course }
                  onSelect={course => changeData('course', course)}
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

              <Form.Item label='Fecha'>
                {getFieldDecorator('date', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la moneda'
                    }
                  ],
                  initialValue: moment()
                })(<DatePicker onChange={event => changeData('date', event.format('YYYY-MM-DD'))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const CertificateAddForm = Form.create()(FormTemplate)
