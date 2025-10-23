import { useEffect } from 'react'
import { Form, DatePicker, Select, Input, Button } from 'antd'
import { SelectCourses } from '../../../containers'

import { dataToShipping } from 'utils/functions/user'

import { useStateData } from '../../../hooks'

import moment from 'moment'

const FormTemplate = ({ form, item, onSubmit }) => {
  const { data, changeData, cleanData, changeAllData } = useStateData(item)

  useEffect(() => {
    console.log(item)
    cleanForm()
    changeAllData(item)
  }, [item])
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const dataShipping = dataToShipping({
          ...data,
          ...values
        })
        onSubmit(dataShipping, cleanForm())
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label='Nombres'>
        {getFieldDecorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Ingresa el Nombre de la persona de envío.'
            }
          ],
          initialValue: data && data.firstName
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Apellidos'>
        {getFieldDecorator('lastName', {
          rules: [
            {
              required: true,
              message: 'Ingresa el Aepllido de la persona de envío.'
            }
          ],
          initialValue: data && data.lastName
        })(<Input />)}
      </Form.Item>
      <Form.Item label='DNI'>
        {getFieldDecorator('dni', {
          rules: [
            {
              required: true,
              message: 'Ingresa el DNI de la persona de envío.'
            }
          ],
          initialValue: data && data.dni
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Celular'>
        {getFieldDecorator('cellphone', {
          rules: [
            {
              required: true,
              message: 'Ingresa el celular de la persona de envío.'
            }
          ],
          initialValue: data && data.cellphone
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Fecha'>
        {getFieldDecorator('date', {
          rules: [
            {
              required: true,
              message: 'Ingresa la fecha de la persona de envío.'
            }
          ],
          initialValue:
            data && data.date ? moment(data.date * 1000) : moment(new Date())
        })(<DatePicker format='DD/MM/YYYY' />)}
      </Form.Item>
      <Form.Item label='Dirección'>
        {getFieldDecorator('address', {
          rules: [
            {
              required: true,
              message: 'Ingresa la Dirección de la persona de envío.'
            }
          ],
          initialValue: data && data.address
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Prioridad'>
        {getFieldDecorator('priority', {
          rules: [
            {
              required: true,
              message: 'Ingresa la Prioridad de la persona de envío.'
            }
          ],
          initialValue: data && data.priority
        })(
          <Select>
            <Select.Option value='Principal'>Principal</Select.Option>
            <Select.Option value='Secundario'>Secundario</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='Curso'>
        <SelectCourses
          course={data && data.course}
          onSelect={course => changeData('course', course)}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' onClick={handleSubmit}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export const ShippingForm = Form.create()(FormTemplate)
