import { Form, Input, Select, message } from 'antd'

import { FormSection, FormLeft, FormRight, InputNumber } from '../../components'
import { useStateData } from '../../hooks'

import { SelectUsers, SelectCourses } from '../../containers'

export const EnrolForm = Form.create()(({ enrol, form, save, formRef }) => {
  const { data, changeData, cleanData } = useStateData(enrol)

  const cleanForm = () => {
    cleanData()
    form.resetFields()
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const resp = await save({ ...values, ...data })
      if (resp && resp.success) {
        cleanForm()
        return resp
      } else {
        message.error((resp && resp.message) || 'Error en el servidor')
        return { success: false }
      }
    } catch (error) {
      return { success: false }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormSection>
        <FormLeft title='Información' />
        <FormRight>
          <Form.Item label='Usuario'>
            <SelectUsers
              user={data.linked}
              onSelect={user => changeData('linked', user)}
            />
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
})
