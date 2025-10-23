import moment from 'moment'
import { Form, DatePicker, Select } from 'antd'

import {
  Box,
  FormLeft,
  FormRight,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from 'components-path'

import { SelectUsers } from 'containers-path'

import { dataToPayload } from 'utils/functions/sale'
import { useStateData } from '../../../hooks'
import { SelectCourses } from '../../../containers/selectCourse'
import currenciesData from 'utils/functions/currencies'

const FormTemplate = ({ order, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData } = useStateData((order) || {})
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  // console.log('data', data)
  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataOrder = ({ ...values, ...data })
        // console.log('dataOrder', dataOrder)
        onSubmit(dataOrder, redirect, cleanForm)
      }
    })
  }
  
  const handleSelect = money => {
    const index = currenciesData.find(item => item.code === money)
    if (index) {
      changeData('money', index)
    }
  }

  console.log('data', data)

  const { getFieldDecorator } = form
  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/ordenes'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!order}
          btnName={!order ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>

            <FormRight>
              <Form.Item label='Asesor'>
                <SelectUsers
                  user={data.assigned}
                  onSelect={assigned => changeData('assigned', assigned)}
                />
              </Form.Item>
              <Form.Item label='Estudiante'>
                <SelectUsers
                  disabled
                  type='email'
                  user={data.student}
                  onSelect={student => changeData('student', student)}
                />
              </Form.Item>
              <Form.Item label='Curso'>
                <SelectCourses
                  disabled
                  course={data.course}
                  onSelect={course => changeData('course', course)}
                />
              </Form.Item>
              <Form.Item label='Precio'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'El precio de la venta es requerido.'
                    }
                  ],
                  initialValue: data && data.amount
                })(<InputNumber disabled />)}
              </Form.Item>
              <Form.Item label='Banco'>
                <Select
                  placeholder='Selecciona la moneda'
                  showSearch
                  value={data && data.money && data.money.code}
                  onSelect={handleSelect}
                >
                  {currenciesData.map((item, idx) => (
                    <Select.Option key={idx} value={item.code}>
                      {item.code}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  initialValue: (data && data.status) || 'Pagando'
                })(
                  <Select disabled placeholder='selecciona el estado...'>
                    <Select.Option value='Pagando'>Pagando</Select.Option>
                    <Select.Option value='Finalizada'>Finalizada</Select.Option>
                    <Select.Option value='Cancelada'>Cancelada</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Fecha de creación editable'>
                {getFieldDecorator('createdAt', {
                  initialValue: data && data.createdAt ? moment(data.createdAt).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('createdAt', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const OrderForm = Form.create({ name: 'course' })(FormTemplate)
