import moment from 'moment'
import { Form, DatePicker, Select } from 'antd'

import {
  Box,
  FormRight,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from 'components-path'

import { SelectUsers } from 'containers-path'
import { useStateData } from '../../../hooks'
import currenciesData from 'utils/functions/currencies'

const FormTemplate = ({ charge, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData } = useStateData((charge) || {})
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataCharge = ({ ...values, ...data })
        // console.log('dataCharge', dataCharge)
        onSubmit(dataCharge, redirect, cleanForm)
      }
    })
  }
  
  const handleSelect = money => {
    const index = currenciesData.find(item => item.code === money)
    if (index) {
      changeData('money', index)
    }
  }

  const { getFieldDecorator } = form
  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/ordenes'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!charge}
          btnName={!charge ? 'Agregar' : 'Editar'}
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
              <Form.Item label='Cliente'>
                <SelectUsers
                  disabled
                  type='email'
                  user={data.linked}
                  onSelect={linked => changeData('linked', linked)}
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
              <Form.Item label='Moneda'>
                <Select
                  disabled
                  placeholder='Selecciona la moneda'
                  showSearch
                  value={data && data.money}
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
                {getFieldDecorator('statusPayment', {
                  initialValue: (data && data.statusPayment) || 'Por Pagar'
                })(
                  <Select placeholder='selecciona el estado...' onSelect={item => changeData('statusPayment', item)}>
                    <Select.Option value='Por Pagar'>Por Pagar</Select.Option>
                    <Select.Option value='Pago'>Pago</Select.Option>
                    <Select.Option value='Cancelada'>Cancelada</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Fecha de creación'>
                {getFieldDecorator('startDate', {
                  initialValue: data && data.startDate ? moment(data.startDate) : moment()
                })(<DatePicker disabled />)}
              </Form.Item>
              <Form.Item label='Fecha de finalización'>
                {getFieldDecorator('endDate', {
                  initialValue: data && data.endDate ? moment(data.endDate) : moment()
                })(<DatePicker disabled />)}
              </Form.Item>
              <Form.Item label='Fecha de pago'>
                {getFieldDecorator('payDate', {
                  initialValue: data && data.payDate ? moment(data.payDate).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('payDate', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const ChargeForm = Form.create({ name: 'course' })(FormTemplate)
