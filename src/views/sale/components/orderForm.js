import moment from 'moment'
import { Form, DatePicker, Select, Button, message } from 'antd'

import { SelectReceipts, SelectVouchers } from 'containers-path'
import { InputNumber } from 'components-path'

import { useStateData } from '../../../hooks/index'
import { Selectbank } from '../../../components/select/bank'

const FormTemplate = ({ order, length, onSubmit, form }) => {
  const { data, changeData, cleanData } = useStateData(order || {})
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  // console.log('order', order)

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const orderData = {
          ...data,
          ...values,
          quotaNumber: data.quotaNumber || length + 1
        }
        if (orderData.status === 'Pagada') {
          if (!orderData.voucher) {
            message.error('El voucher es obligatorio!')
            return
          }
        }
        onSubmit(orderData)
        cleanForm()
      }
    })
  }

  const options = [
    {
      label: 'Pago Efectivo',
      value: 'Pago Efectivo',
      code: 'PEF'
    },
    {
      label: 'Interbank',
      value: 'Interbank',
      code: 'INT'
    },
    {
      label: 'BCP',
      value: 'BCP',
      code: 'BCP'
    },
    {
      label: 'BBVA',
      value: 'BBVA',
      code: 'BBVA'
    },
    {
      label: 'Banco de la Nación',
      value: 'Banco de la Nación',
      code: 'BN'
    },
    {
      label: 'Scotiabank',
      value: 'Scotiabank',
      code: 'SCK'
    },
    {
      label: 'Paypal',
      value: 'Paypal',
      code: 'PP'
    }
  ]

  const { getFieldDecorator } = form
  return (
    <Form>
      <Form.Item label='Monto'>
        {getFieldDecorator('amount', {
          rules: [
            {
              required: true,
              message: 'Ingresa el monto de la orden.'
            }
          ],
          initialValue: order && order.amount
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label='Fecha de cargo'>
        {getFieldDecorator('chargeDate', {
          rules: [
            {
              required: true,
              message: 'Ingresa la fecha de cargo de la orden.'
            }
          ],
          initialValue: order ? moment(order.chargeDate) : moment()
        })(<DatePicker />)}
      </Form.Item>
      <Form.Item label='Estado'>
        <Select
          placeholder='selecciona el estado...'
          onSelect={opt => changeData('status', opt)}
          value={data.status || 'Por Pagar'}
        >
          <Select.Option value='Por Pagar'>Por Pagar</Select.Option>
          <Select.Option value='Pagada'>Pagada</Select.Option>
          <Select.Option value='Cancelada'>Cancelada</Select.Option>
        </Select>
      </Form.Item>
      {data.status === 'Pagada' && (
        <>
          <Form.Item label='Fecha de Pago'>
            {getFieldDecorator('paymentDate', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa la fecha de pago de la orden.'
                }
              ],
              initialValue: order ? moment(order.paymentDate) : moment()
            })(<DatePicker />)}
          </Form.Item>

          <Form.Item label='Voucher'>
            <SelectVouchers
              voucher={data.voucher}
              onSelect={select => changeData('voucher', select)}
            />
          </Form.Item>
          <Form.Item label='Recibo'>
            <SelectReceipts
              receipt={data.receipt}
              onSelect={select => changeData('receipt', select)}
            />
          </Form.Item>
          {/* <Form.Item label='Banco'>
            <Selectbank
              options={options}
              bank={data.bank}
              onSelect={bank => changeData('bank', bank)}
            />
          </Form.Item> */}
        </>
      )}
      <Form.Item>
        <Button type='primary' onClick={handleSubmit}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  )
}

export const OrderForm = Form.create({ name: 'order' })(FormTemplate)
