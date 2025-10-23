import moment from 'moment'
import { SelectUsers, SelectCourses, SelectCertificates } from '../../../containers'
import { Form, Input, InputNumber, Select, Anchor, DatePicker } from 'antd'

import countriesData from 'utils/functions/countries'
import departments from 'utils/functions/departments'

import {
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight
} from 'components-path'

import { useStateData } from '../../../hooks'

const { Link } = Anchor

const Option = Select.Option

const FormEnrol = ({ enrol, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData } = useStateData({
    ...enrol,
    shipping: enrol.shipping || {}
  })
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataEnrol = ({ ...values, ...data })
        onSubmit(dataEnrol, redirect, cleanForm)
      }
    })
  }

  const handleSelectCountry = country => {
    data.shipping.country = country
  }

  const handleSelectDepartament = department => {
    data.shipping.department = department
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/matriculas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!enrol}
          btnName={!enrol ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Estudiante'>
                <SelectUsers
                  type='username'
                  user={data && data.linked}
                  onSelect={user => changeData('user', user)}
                />
              </Form.Item>
              <Form.Item label='Curso'>
                <SelectCourses
                  course={data && data.course }
                  onSelect={course => changeData('course', course)}
                />
              </Form.Item>
              <Form.Item label='Certificado'>
                <SelectCertificates
                  certificate={data && data.certificate }
                  onSelect={certificate => changeData('certificate', certificate)}
                />
              </Form.Item>
              <Form.Item label='Moodle ID:'>
                {getFieldDecorator('moodleId', {
                  initialValue: data && data.moodleId
                })(<Input onChange={event => changeData('moodleId', event.target.value)}/>)}
              </Form.Item>
              <Form.Item label='Nota:'>
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
                      message: 'Ingresa la moneda.'
                    }
                  ],
                  initialValue: moment()
                })(<DatePicker onChange={event => changeData('date', event.format('YYYY-MM-DD'))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection>
            <FormLeft title='Shipping' />
            <FormRight>
              <Form.Item label='Nombres:'>
                {getFieldDecorator('shipping.firstName', {
                  initialValue: data && data.shipping && data.shipping.firstName
                })(<Input onChange={event => (data.shipping.firstName = event.target.value)}/>)}
              </Form.Item>
              <Form.Item label='Apellidos:'>
                {getFieldDecorator('shipping.lastName', {
                  initialValue: data && data.shipping && data.shipping.lastName
                })(<Input onChange={event => (data.shipping.lastName = event.target.value)}/>)}
              </Form.Item>
              <Form.Item label='DNI:'>
                {getFieldDecorator('shipping.dni', {
                  initialValue: data && data.shipping && data.shipping.dni
                })(<Input onChange={event => (data.shipping.dni = event.target.value)}/>)}
              </Form.Item>
              <Form.Item label='Celular:'>
                {getFieldDecorator('shipping.cellphone', {
                  initialValue: data && data.shipping && data.shipping.cellphone
                })(<Input onChange={event => (data.shipping.cellphone = event.target.value)}/>)}
              </Form.Item>
              <Form.Item label='Dirección:'>
                {getFieldDecorator('shipping.address', {
                  initialValue: data && data.shipping && data.shipping.address
                })(<Input onChange={event => (data.shipping.address = event.target.value) }/>)}
              </Form.Item>
              <Form.Item label='País'>
                {getFieldDecorator('shipping.country', {
                  initialValue: data && data.shipping && data.shipping.country
                })(
                  <Select
                    placeholder='Selecciona el país'
                    showSearch
                    onSelect={handleSelectCountry}
                  >
                    {countriesData.map((item, idx) => (
                      <Select.Option key={idx} value={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Departamento'>
                {getFieldDecorator('shipping.department', {
                  initialValue: data && data.shipping && data.shipping.department
                })(
                  <Select
                    placeholder='Selecciona el departamento'
                    showSearch
                    onSelect={handleSelectDepartament}
                  >
                    {departments.map((item, idx) => (
                      <Select.Option key={idx} value={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const EnrolForm = Form.create()(FormEnrol)
