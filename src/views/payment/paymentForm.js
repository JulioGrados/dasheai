import { Form, Input, Select, message } from 'antd'

import { FormSection, FormLeft, FormRight, InputNumber } from '../../components'

export const PaymentForm = Form.create()(({ payment, form, save, formRef }) => {
  const cleanForm = () => {
    form.resetFields()
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const resp = await save(values)
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

  const { getFieldDecorator } = form

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormSection>
        <FormLeft title='Información' />
        <FormRight>
          <Form.Item label='Tipo'>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa el tipo.'
                }
              ],
              initialValue: payment && payment.type
            })(
              <Select placeholder='Selecciona un tipo'>
                <Select.Option value='niubiz'>Niubiz</Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Monto'>
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa el monto del pago.'
                }
              ],
              initialValue: payment && payment.amount
            })(<InputNumber min={0} />)}
          </Form.Item>

          <Form.Item label='Moneda'>
            {getFieldDecorator('currency', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa la moneda.'
                }
              ],
              initialValue: (payment && payment.currency) || 'pen'
            })(
              <Select placeholder='Selecciona la moneda'>
                <Select.Option value='pen'>Soles</Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Url de pago'>
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa la url.'
                }
              ],
              initialValue: payment && payment.url
            })(<Input />)}
          </Form.Item>
        </FormRight>
      </FormSection>
    </Form>
  )
})
