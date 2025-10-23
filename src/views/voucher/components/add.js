import moment from 'moment'
import { SelectUsers } from 'containers-path'
import { Form, Input, Select } from 'antd'

import { dataToPayload } from 'utils/functions/voucher'

import {
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight
} from 'components-path'

import { useState } from 'react'

import { useStateData } from '../../../hooks'

const Option = Select.Option

const FormAddVoucher = ({ voucher, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData, changeAllData } = useStateData({})

  const [assigned, setAssigend] = useState(null)
  console.log('voucher', voucher)
  const cleanForm = () => {
    form.resetFields()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values.assigned = assigned
        const templateData = dataToPayload(values)
        onSubmit(templateData, redirect, cleanForm)
      }
    })
  }

  const handleSelect = assigned => {
    setAssigend(assigned)
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/vouchers'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!voucher}
          btnName={!voucher ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Código'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el código del voucher.'
                    }
                  ],
                  initialValue: voucher && voucher.code
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Monto'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el monto del voucher.'
                    }
                  ],
                  initialValue: voucher && voucher.amount
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Residuo'>
                {getFieldDecorator('residue', {
                  initialValue: voucher && voucher.residue
                })(<Input disabled/>)}
              </Form.Item>
              <Form.Item label='Moneda'>
                {getFieldDecorator('currency', {
                  initialValue: voucher ? voucher.currency : 'Sol'
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Número de operación'>
                {getFieldDecorator('operationNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el número de operación del voucher.'
                    }
                  ],
                  initialValue: voucher && voucher.operationNumber
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Asesor asignado'>
                <SelectUsers
                  // query={query}
                  onSelect={handleSelect}
                  user={assigned}
                />
              </Form.Item>
              <Form.Item label='Banco'>
                {getFieldDecorator('bank', {
                  initialValue: voucher && voucher.bank && voucher.bank.name
                })(
                  <Select placeholder='Seleccione el banco de la operación'>
                    <Option value='PEF'>Pago Efectivo</Option>
                    <Option value='BCP'>BCP</Option>
                    <Option value='Banco de la Nación'>
                      Banco de la Nación
                    </Option>
                    <Option value='Interbank'>Interbank</Option>
                    <Option value='BBVA'>BBVA</Option>
                    <Option value='Scotiabank'>Scotiabank</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Orden'>
                {getFieldDecorator('order', {
                  initialValue: voucher && voucher.order
                })(<Input />)}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const VoucherAddForm = Form.create()(FormAddVoucher)
