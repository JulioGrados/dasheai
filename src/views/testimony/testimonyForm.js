import { Form, Input, message, Rate, Select } from 'antd'
import { FormSection, FormLeft, FormRight, InputNumber } from '../../components'
import { useEffect } from 'react'
import { useStateData } from '../../hooks'
import { SelectCourses, SelectUsers } from '../../containers'

import { dataToPayload, payloadToData } from 'utils/functions/testimonies'

export const TestimonyForm = Form.create()(
  ({ testimony, form, save, formRef }) => {
    const { data, changeData, cleanData, changeAllData } = useStateData(
      payloadToData(testimony)
    )

    useEffect(() => {
      changeAllData(payloadToData(testimony))
    }, [testimony])

    const cleanForm = () => {
      form.resetFields()
      cleanData()
    }

    const handleSubmit = async () => {
      try {
        const values = await form.validateFields()
        const dataValue = dataToPayload({
          ...data,
          ...values
        })
        console.log('dataValue', dataValue)
        const resp = await save(dataValue)

        if (resp && resp.success) {
          cleanForm()
          return resp
        } else {
          message.error((resp && resp.message) || 'Error en el servidor')
          return { success: false }
        }
      } catch (error) {
        console.log(error)
        return { success: false }
      }
    }

    const { getFieldDecorator } = form

    return (
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormSection>
          <FormLeft title='Información' />
          <FormRight>
            <Form.Item label='Estudiante'>
              <SelectUsers
                onSelect={linked => changeData('linked', linked)}
                user={data.linked}
              />
            </Form.Item>
            <Form.Item label='Nombres'>
              {getFieldDecorator('firstName', {
                initialValue: data.linked ? data.linked.firstName : ''
              })(<Input onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Apellidos'>
              {getFieldDecorator('lastName', {
                initialValue: data.linked ? data.linked.lastName : ''
              })(<Input onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Email'>
              {getFieldDecorator('email', {
                initialValue: data.linked ? data.linked.email : ''
              })(<Input onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='DNI'>
              {getFieldDecorator('dni', {
                initialValue: data.linked ? data.linked.dni : ''
              })(<InputNumber onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Departamento'>
              {getFieldDecorator('department', {
                initialValue: data.linked ? data.linked.department : ''
              })(<Input onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Ciudad'>
              {getFieldDecorator('city', {
                initialValue: data.linked ? data.linked.city : ''
              })(<Input onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Estado'>
              {getFieldDecorator('status', {
                initialValue: data && data.status
              })(
                <Select
                  placeholder='Seleccione el estado ...'
                  onChange={status => changeData('status', status)}
                >
                  <Select.Option value='Revisar'>Revisar</Select.Option>
                  <Select.Option value='No visible'>No visible</Select.Option>
                  <Select.Option value='Visible'>Visible</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label='Puntaje'>
              {getFieldDecorator('rate', {
                initialValue: data && data.rate
              })(<Rate onChange={changeData} />)}
            </Form.Item>
            <Form.Item label='Comentario'>
              {getFieldDecorator('comment', {
                initialValue: data && data.comment
              })(<Input.TextArea rows={3} />)}
            </Form.Item>
            <Form.Item label='Curso'>
              <SelectCourses
                course={data.course}
                onSelect={course => changeData('course', course)}
              />
            </Form.Item>
          </FormRight>
        </FormSection>
      </Form>
    )
  }
)
