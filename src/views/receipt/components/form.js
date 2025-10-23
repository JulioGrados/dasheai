import moment from 'moment'
import { MEDIA_PATH } from 'utils/files/path'
import { SelectUsers } from 'containers-path'
import { Form, Input, Select, Button, Checkbox, Anchor, DatePicker } from 'antd'

import { dataToPayload } from 'utils/functions/receipt'

import { FormHeader, FormHeaderTitle, FormHeaderPlus, FormBody } from '../../user/styles/style'
import { FormTable } from '../../voucher/styles/styles'
import {
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight,
  Table
} from 'components-path'
import { useStateData } from '../../../hooks'
import { SelectPayment } from '../../../components/select/payment'

import { useEffect, useState } from 'react'

const { Link } = Anchor

const Option = Select.Option

const FormReceipt = ({ receipt, loading, onSubmit, onCancel, onReset, onNote, form, title }) => {
  const { data, changeData, cleanData } = useStateData((receipt) || {})

  const [assigned, setAssigend] = useState(receipt ? receipt.assigned : null)
  const [methodName, setMethodName] = useState(receipt ? receipt.methodName : null)
  const [subtraction, setSubstraction] = useState(0)
  const { orders = [] } = receipt
  // console.log('receipt', receipt)

  useEffect(() => {
    if (receipt && receipt.dateEmit) {
      // console.log('receipt.dateEmit', receipt.dateEmit)
      const date1 = new Date()
      const date2 = new Date(receipt.dateEmit)
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setSubstraction(diffDays)
    }
  }, [receipt])

  const cleanForm = () => {
    form.resetFields()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values.methodName = methodName
        values.assigned = assigned
        const templateData = ({ ...values, ...data })
        console.log('templateData', templateData)
        onSubmit(templateData, redirect, cleanForm)
      }
    })
  }

  const handleDelete = () => {
    const templateData = {
      orders: orders,
      receipt: receipt
    }
    onReset(templateData, '/recibos', cleanForm)
  }

  const handleReset = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values.methodName = methodName
        values.assigned = assigned
        const templateData = dataToPayload(values)
        onCancel(templateData, redirect, cleanForm)
      }
    })
    // const templateData = {
    //   orders: orders,
    //   receipt: receipt
    // }
    // onReset(templateData, redirect, cleanForm)
  }

  const handleNote = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values.methodName = methodName
        values.assigned = assigned
        const templateData = dataToPayload(values)
        onNote(templateData, redirect, cleanForm)
      }
    })
  }

  const handleSelect = assigned => {
    setAssigend(assigned)
  }

  const optionsPayment = [
    {
      label: 'Efectivo',
      name: 'Efectivo',
      code: '1'
    },
    {
      label: 'Visa',
      name: 'Visa',
      code: '2'
    },
    {
      label: 'Cheque',
      name: 'Cheque',
      code: '3'
    },
    {
      label: 'Deposito a cuenta',
      name: 'Deposito a cuenta',
      code: '4'
    },
    {
      label: 'Credito',
      name: 'Credito',
      code: '5'
    }
  ]

  const handlePayment = value => {
    // const search = options.find(item => item.name === methodName)
    setMethodName(value)
  }

  const { getFieldDecorator } = form

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: chargeDate => moment(chargeDate).format('DD/MM/YYYY')
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => amount
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => status
    }
  ]

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/recibos'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!receipt}
          btnName={!receipt ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Código'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el código del receipt.'
                    }
                  ],
                  initialValue: data && data.code
                })(<Input disabled/>)}
              </Form.Item>
              <Form.Item label='Serie'>
                {getFieldDecorator('serie', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la serie del receipt.'
                    }
                  ],
                  initialValue: data && data.serie
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Secuencial'>
                {getFieldDecorator('sequential', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la sequential del receipt.'
                    }
                  ],
                  initialValue: data && data.sequential
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Voucher ID'>
                {getFieldDecorator('voucher_id', {
                  initialValue: data && data.voucher_id
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Monto'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el monto del receipt.'
                    }
                  ],
                  initialValue: data && data.amount
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Factura?'>
                {getFieldDecorator('isBill', {
                  valuePropName: 'checked',
                  initialValue: data ? data.isBill : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='Nombres'>
                {getFieldDecorator('names', {
                  initialValue: data && data.names
                })(<Input/>)}
              </Form.Item>
              <Form.Item label='DNI'>
                {getFieldDecorator('dni', {
                  initialValue: data && data.dni
                })(<Input/>)}
              </Form.Item>
              <Form.Item label='Razón Social'>
                {getFieldDecorator('businessName', {
                  initialValue: data && data.businessName
                })(<Input/>)}
              </Form.Item>
              <Form.Item label='RUC'>
                {getFieldDecorator('ruc', {
                  initialValue: data && data.ruc
                })(<Input/>)}
              </Form.Item>
              <Form.Item label='Asesor asignado'>
                <SelectUsers
                  // query={query}
                  onSelect={handleSelect}
                  user={assigned}
                />
              </Form.Item>
              <Form.Item label='Método de pago'>
                <SelectPayment
                  options={optionsPayment}
                  methodName={methodName}
                  onSelect={handlePayment}
                />
              </Form.Item>
              <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  initialValue: data && data.status
                })(
                  <Select placeholder='Seleccione el estado de la operación'>
                    <Option value='Pendiente'>Pendiente</Option>
                    <Option value='Procesado'>Procesado</Option>
                    <Option value='Finalizada'>Finalizada</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Anulada?'>
                {getFieldDecorator('unsubscribe', {
                  valuePropName: 'checked',
                  initialValue: data ? data.unsubscribe : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='Se genero en negosy como boleta?'>
                {getFieldDecorator('isTicket', {
                  valuePropName: 'checked',
                  initialValue: data ? data.isTicket : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='Se genero en negosy como factura?'>
                {getFieldDecorator('isFacture', {
                  valuePropName: 'checked',
                  initialValue: data ? data.isFacture : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='Comprobante'>
                <Anchor>
                  <Link href={MEDIA_PATH + data.file} title='Ver archivo' target='_blank' />
                </Anchor>
              </Form.Item>
              <Form.Item label='Fecha de emisión'>
                {getFieldDecorator('dateEmit', {
                  initialValue: data && data.dateEmit ? moment(data.dateEmit).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('dateEmit', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
              <Form.Item label='Fecha de creación en crm'>
                {getFieldDecorator('date', {
                  initialValue: data && data.date ? moment(data.date).add(5, 'hours') : moment()
                })(<DatePicker onChange={event => changeData('date', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          {(receipt.isTicket || receipt.isFacture) && (!receipt.unsubscribe) &&
            < FormSection hasLine>
              <FormHeader>
                <FormHeaderTitle>Formulario para anular comprobante</FormHeaderTitle>
                <div>
                {(receipt.isTicket || receipt.isFacture) && (!receipt.unsubscribe) &&
                  <>
                    <Button
                      type="primary"
                      onClick={handleReset}
                    >
                      Comunicación de baja
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleNote}
                    >
                      Nota de crédito
                    </Button>
                  </>
                }
                </div>
              </FormHeader>
              <FormRight>
                <Form.Item label='Voucher ID'>
                  {getFieldDecorator('voucher_id', {
                    initialValue: receipt && receipt.voucher_id
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Asunto'>
                  {getFieldDecorator('annular', {
                    initialValue: receipt && receipt.annular
                  })(<Input />)}
                </Form.Item>
              </FormRight>
            </FormSection>
          }
          <FormSection hasLine>
            <FormHeader>
              <FormHeaderTitle>Ordenes</FormHeaderTitle>
              <div>
                {(!receipt.isTicket && !receipt.isFacture) && <Button
                  type="primary"
                  onClick={handleDelete}
                >
                  Eliminar
                </Button>}
              </div>
            </FormHeader>
            <FormTable
              columns={columns}
              dataSource={orders}
              rowKey='_id'
            />
          </FormSection>
          {(receipt.isNoteCreditFac || receipt.isNoteCreditTic) && (receipt.unsubscribe) &&
            <FormSection>
              <FormHeader>
                <FormHeaderTitle>Anulación del comprobante</FormHeaderTitle>
              </FormHeader>
              
              <FormBody>
                <Form.Item label='Voucher ID de la anulación'>
                  {getFieldDecorator('voucher_id_note', {
                    initialValue: receipt && receipt.voucher_id_note
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Se anuló Factura?'>
                  {getFieldDecorator('isNoteCreditFac', {
                    valuePropName: 'checked',
                    initialValue: receipt ? receipt.isNoteCreditFac : false
                  })(<Checkbox />)}
                </Form.Item>
                <Form.Item label='Comprobante de anulación'>
                  <Anchor>
                    <Link href={MEDIA_PATH + receipt.fileNote} title='Ver archivo' target='_blank' />
                  </Anchor>
                </Form.Item>
                <Form.Item label='Fecha de anulación'>
                  {getFieldDecorator('dateNote', {
                    initialValue: receipt && receipt.dateNote ? moment(receipt.dateNote).add(5, 'hours') : moment()
                  })(<DatePicker onChange={event => changeData('dateNote', new Date(event.format('YYYY-MM-DD')))} />)}
                </Form.Item>
              </FormBody>
            </FormSection>
          }
        </Form>
      </Box>
    </>
  )
}

export const ReceiptForm = Form.create()(FormReceipt)
