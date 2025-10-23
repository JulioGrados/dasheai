import moment from 'moment'
import { Form, Select, message, DatePicker, Input } from 'antd'

import { FormSection, FormLeft, FormRight, FormDouble } from '../../components'
import { useStateData } from '../../hooks'

import { SelectUsers, SelectProgresses } from '../../containers'
import { SelectListCourses } from '../course/components/selectList'
import { useEffect } from 'react'

import currenciesData from 'utils/functions/currencies'
import { SelectStudent } from '../user/components/selectStudent'

export const DealForm = Form.create()(({ deal, form, save, formRef }) => {
  const { data, changeData, changeAllData, cleanData } = useStateData((deal))

  const cleanForm = () => {
    cleanData()
    form.resetFields()
  }

  useEffect(() => {
    changeAllData((deal))
  }, [deal])

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

  const handleSelect = (value) => {
    const money = currenciesData.find(item => item.code === value)
    changeData('money', money)
  }

  const { getFieldDecorator } = form

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormSection>
        <FormLeft title='Información' />
        <FormRight>
          <FormDouble>
            <Form.Item label='Usuario'>
              <SelectUsers
                type='names'
                user={data.client}
                onSelect={user => changeData('client', user)}
              />
            </Form.Item>
            <Form.Item label='Asesor'>
              <SelectUsers
                role='Asesor'
                user={data.assessor}
                onSelect={user => changeData('assessor', user)}
              />
            </Form.Item>
          </FormDouble>

          <FormDouble>
            <Form.Item label='Etapa'>
              <SelectProgresses
                pipe='deals'
                progress={data.progress}
                onSelect={progress => changeData('progress', progress)}
              />
            </Form.Item>
            <Form.Item label='Etapa de pago'>
              <SelectProgresses
                pipe='accounting'
                progress={data.progressPayment}
                onSelect={progressPayment =>
                  changeData('progressPayment', progressPayment)
                }
              />
            </Form.Item>
          </FormDouble>

          <FormDouble>
            <Form.Item label='Origen'>
              {getFieldDecorator('origin', {
                initialValue: data && data.origin
              })(
                <Select
                  placeholder='Seleccione el origen ...'
                  onChange={origin => changeData('origin', origin)}
                >
                  <Select.Option value='facebook lead'>facebook lead</Select.Option>
                  <Select.Option value='sitio web'>sitio web</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label='Fecha de inicio'>
              {getFieldDecorator('createdAt', {
                initialValue: data.createdAt ? moment(data.createdAt) : moment()
              })(<DatePicker onChange={event => changeData('createdAt', new Date(event.format('YYYY-MM-DD')))} />)}
            </Form.Item>
          </FormDouble>

          <Form.Item label='Moneda'>
            {getFieldDecorator('money', {
              initialValue: data && data.money && data.money.code
            })(
              <Select
                placeholder='Selecciona la moneda ...'
                onSelect={handleSelect}
                showSearch
              >
                {currenciesData.map((item, idx) => (
                  <Select.Option key={idx} value={item.code}>
                    {item.code}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Estado'>
            <Select
              placeholder='Selecciona un estado'
              value={data.status}
              onSelect={status => changeData('status', status)}
            >
              <Select.Option value='Abierto'>Abierto</Select.Option>
              <Select.Option value='Ganado'>Ganado</Select.Option>
              <Select.Option value='Perdido'>Perdido</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Estado de Pago'>
            <Select
              placeholder='Selecciona un estado de pago'
              value={data.statusPayment}
              onSelect={statusPayment => changeData('statusPayment', statusPayment)}
            >
              <Select.Option value='Abierto'>Abierto</Select.Option>
              <Select.Option value='Sale'>Sale</Select.Option>
              <Select.Option value='Pago'>Pago</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Estudiantes'>
            <SelectStudent
              users={data.students}
              onChange={students => changeData('students', students)}
            />
          </Form.Item>
        </FormRight>
      </FormSection>
    </Form>
  )
})
