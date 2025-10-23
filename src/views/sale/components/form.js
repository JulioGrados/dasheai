import moment from 'moment'
import { Form, DatePicker, Select, Button } from 'antd'

import {
  Box,
  FormLeft,
  FormRight,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from 'components-path'
import { SelectListCourses } from '../../course/components/selectList'
import { FormHeader, FormHeaderTitle, FormHeaderPlus } from '../../user/styles/style'
import { OrdersSale } from './orders'

import { SelectUsers } from 'containers-path'

import { dataToPayload } from 'utils/functions/sale'
import { useStateData } from '../../../hooks'
import { useEffect } from 'react'

const FormTemplate = ({ sale, loading, onReset, onSubmit, form, title }) => {
  const { data, changeData, cleanData } = useStateData((sale) || {})
  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  console.log('data', data)
  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataSale = ({ ...values, ...data })
        // console.log('dataSale', dataSale)
        onSubmit(dataSale, redirect, cleanForm)
      }
    })
  }

  const handleReset = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataSale = ({ ...values, ...data })
        onReset(dataSale, '/ventas', cleanForm)
      }
    })
  }
  const { getFieldDecorator } = form
  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/ventas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!sale}
          btnName={!sale ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          {/* <FormSection hasLine>
            <FormLeft title='Cursos' />
            <FormRight>
              <SelectListCourses
                courses={data.courses}
                onChange={courses => changeData('courses', courses)}
              />
            </FormRight>
          </FormSection> */}
          <FormSection hasLine>
            <FormLeft title='Cliente' />
            <FormRight>
              <Form.Item label='Cliente'>
                <SelectUsers
                  type='names'
                  user={data.user}
                  onSelect={user => changeData('user', user)}
                />
              </Form.Item>
              <Form.Item label='Encargado'>
                <SelectUsers
                  user={data.assigned}
                  onSelect={assigned => changeData('assigned', assigned)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Informacion de la venta' />
            <FormRight>
              <Form.Item label='Precio'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'El precio de la venta es requerido.'
                    }
                  ],
                  initialValue: sale && sale.amount
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label='Moneda'>
                {getFieldDecorator('currency', {
                  initialValue: (sale && sale.currency) || 'pen'
                })(
                  <Select placeholder='selecciona la moneda...'>
                    <Select.Option value='pen'>Soles (PEN)</Select.Option>
                    <Select.Option value='usd'>Dolares (USD)</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  initialValue: (sale && sale.status) || 'Pagando'
                })(
                  <Select placeholder='selecciona el estado...'>
                    <Select.Option value='Pagando'>Pagando</Select.Option>
                    <Select.Option value='Finalizada'>Finalizada</Select.Option>
                    <Select.Option value='Cancelada'>Cancelada</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Fecha de venta para crm'>
                {getFieldDecorator('dateOfSale', {
                  initialValue: sale ? moment(sale.dateOfSale).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('dateOfSale', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
              <Form.Item label='Fecha de creación'>
                {getFieldDecorator('createdAt', {
                  initialValue: data && data.createdAt ? moment(data.createdAt).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('createdAt', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection>
            <FormHeader>
              <FormHeaderTitle>Ordenes</FormHeaderTitle>
              <div>
                <Button
                  type="primary"
                  onClick={handleReset}
                >
                  Anular
                </Button>
              </div>
            </FormHeader>
            {/* <FormLeft title='Ordenes' /> */}
            
              <OrdersSale
                orders={data.orders}
                onChange={orders => changeData('orders', orders)}
              />
            
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const SaleForm = Form.create({ name: 'course' })(FormTemplate)
