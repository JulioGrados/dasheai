import moment from 'moment'
import { MEDIA_PATH } from 'utils/files/path'
import { SelectUsers } from 'containers-path'
import { Form, Input, Select, Button, Anchor, Upload, Icon, DatePicker, Checkbox } from 'antd'

import { dataToPayload } from 'utils/functions/voucher'
import { Selectbank } from '../../../components/select/bank'

import { FormHeader, FormHeaderTitle, FormHeaderPlus } from '../../user/styles/style'
import { FormTable } from '../styles/styles'
import {
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight,
  UploadImage,
  Table
} from 'components-path'
import { useStateData } from '../../../hooks'
import { useEffect, useState } from 'react'

import currenciesData from 'utils/functions/currencies'
import { SelectPayment } from '../../../components/select/payment'

const Option = Select.Option
const { Link } = Anchor

const FormVoucher = ({ voucher, loading, onSubmit, onReset, onDelete, form, title, user }) => {
  const [assigned, setAssigend] = useState(voucher ? voucher.assigned : null)
  const [validator, setValidator] = useState(voucher && voucher.validator ? voucher.validator : user)
  const [extras, setExtras] = useState([])
  const { data, changeData, cleanData, changeAllData } = useStateData(voucher)
  const { orders = [] } = voucher
  console.log('voucher', voucher)
  const options = [
    {
      label: 'Pago Efectivo',
      name: 'Pago Efectivo',
      code: 'PEF'
    },
    {
      label: 'Interbank',
      name: 'Interbank',
      code: 'INT'
    },
    {
      label: 'Interbank Ahorros',
      name: 'Interbank Ahorros',
      code: 'ITA'
    },
    {
      label: 'Yape',
      name: 'Yape',
      code: 'YAP'
    },
    {
      label: 'Plin',
      name: 'Plin',
      code: 'PLI'
    },
    {
      label: 'BCP',
      name: 'BCP',
      code: 'BCP'
    },
    {
      label: 'BBVA',
      name: 'BBVA',
      code: 'BBVA'
    },
    {
      label: 'Banco de la Nación',
      name: 'Banco de la Nación',
      code: 'BN'
    },
    {
      label: 'Banco de la Nación Ahorros',
      name: 'Banco de la Nación Ahorros',
      code: 'BNA'
    },
    {
      label: 'Scotiabank',
      name: 'Scotiabank',
      code: 'SCK'
    },
    {
      label: 'Paypal',
      name: 'Paypal',
      code: 'PP'
    },
    {
      label: 'Lukita',
      name: 'Lukita',
      code: 'LUK'
    },
    {
      label: 'Pago Link',
      name: 'Pago Link',
      code: 'PAG'
    },
    {
      label: 'Western Union',
      name: 'Western Union',
      code: 'WU'
    },
    {
      label: 'Paycash',
      name: 'Paycash',
      code: 'PAY'
    },
    {
      label: 'Innovacion Link',
      name: 'Innovacion Link',
      code: 'EAILINK'
    }
  ]

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
  
  const cleanForm = () => {
    form.resetFields()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values.validator = validator
        const templateData = dataToPayload({
          ...data,
          ...values
        })
        console.log('templateData', templateData)
        const formData = new window.FormData()
        if (data.imageFile) {
          formData.append('image', data.imageFile.originFileObj)
        }

        if (data.extraFile) {
          data.extraFile.forEach((element, index) => {
            formData.append('file' + index, element.originFileObj)
          })
        }
        formData.append('data', JSON.stringify(templateData))
        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const handleReset = redirect => {
    const templateData = {
      orders: orders,
      voucher: voucher
    }
    onReset(templateData, redirect, cleanForm)
  }

  const handleRemove = () => {
    onDelete(voucher._id)
  }

  const handleBank = bank => {
    const search = options.find(item => item.name === bank)
    changeData('bank', search)
    changeData('code', data.bank.code + '-' + data.operationNumber)
  }

  const handlePayment = methodName => {
    // const search = options.find(item => item.name === methodName)
    changeData('methodName', methodName)
  }

  const handleOperationNumber = operationNumber => {
    changeData('operationNumber', operationNumber)
    changeData('code', data.bank.code + '-' + data.operationNumber)
  }

  const handleSelect = money => {
    const index = currenciesData.find(item => item.code === money)
    if (index) {
      changeData('money', index)
    }
  }

  const handleSelectValidator = assigned => {
    setValidator(assigned)
  }
  
  const normFile = (e) => {
    
    if (Array.isArray(e)) {
      changeData('extraFile', e[e.length - 1])
      return e[e.length - 1]
    }
    
    if (e.file && e.file.originFileObj) {
      setExtras([...extras, {
        uid: e.file.originFileObj.uid,
        name: e.file.originFileObj.name,
        status: 'done',
        url: e.file.originFileObj.name
      }])
      if (data.extraFile) {
        data.extraFile = [...data.extraFile, e.file]
      } else {
        data.extraFile =  [e.file]
      }
    }
    return e && e.fileList && e.fileList[e.fileList.length - 1]
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
                  initialValue: data && data.code
                })(<Input disabled onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Monto'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el monto del voucher.'
                    }
                  ],
                  initialValue: data && data.amount
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Residuo'>
                {getFieldDecorator('residue', {
                  initialValue: data && data.residue
                })(<Input onChange={changeData}/>)}
              </Form.Item>
              <Form.Item label='Moneda'>
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
              <Form.Item label='Número de operación'>
                {getFieldDecorator('operationNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el número de operación del voucher.'
                    }
                  ],
                  initialValue: data && data.operationNumber
                })(<Input onChange={event => handleOperationNumber(event.target.value)} />)}
              </Form.Item>
              <Form.Item label='Asesor asignado'>
                <SelectUsers
                  // query={query}
                  onSelect={assigned => changeData('assigned', assigned)}
                  user={data.assigned}
                />
              </Form.Item>
              <Form.Item label='Validado?'>
                {getFieldDecorator('validation', {
                  valuePropName: 'checked',
                  initialValue: data ? data.validation : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='Administrador validador'>
                <SelectUsers
                  // query={query}
                  onSelect={handleSelectValidator}
                  user={validator}
                />
              </Form.Item>
              <Form.Item label='Banco'>
                <Selectbank
                  options={options}
                  bank={data.bank}
                  onSelect={handleBank}
                />
              </Form.Item>
              <Form.Item label='Método de pago'>
                <SelectPayment
                  options={optionsPayment}
                  methodName={data.methodName}
                  onSelect={handlePayment}
                />
              </Form.Item>
              <Form.Item label='Fecha'>
                {getFieldDecorator('date', {
                  initialValue: moment(data.date).add(5, 'hours')
                })(<DatePicker onChange={event => changeData('date', new Date(event.format('YYYY-MM-DD')))} />)}
              </Form.Item>
              <Form.Item label='Imagen Corta'>
                <UploadImage
                  image={data.imageFile}
                  url={data.image}
                  handleChange={file => changeData('imageFile', file)}
                />
              </Form.Item>
              <Form.Item label='Extras'>
                <Upload
                  name='extras'
                  // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  // showUploadList={false}
                  onChange={normFile}
                  fileList={
                    extras
                  }
                >
                  <Button>
                    <Icon type='upload' /> Agregar Archivo
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item label='Imagen'>
                <Anchor>
                  <Link href={MEDIA_PATH + voucher.image } title='Ver archivo' target='_blank' />
                </Anchor>
              </Form.Item>
              <Form.Item label='Imagenes extra'>
                {
                  data.extras && data.extras.map((item, index) => (
                    <Anchor key={index}>
                      <Link href={MEDIA_PATH + item } title='Ver archivo' target='_blank' />
                    </Anchor>
                  ))
                }
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection>
            <FormHeader>
              <FormHeaderTitle>Ordenes</FormHeaderTitle>
              <Button
                type="primary"
                disabled={voucher.reset}
                onClick={handleRemove}
              >
                Remove
              </Button>
              <Button
                type="primary"
                disabled={!voucher.reset}
                onClick={handleReset}
              >
                Reset
              </Button>
            </FormHeader>
            <FormTable
              columns={columns}
              dataSource={orders}
              rowKey='_id'
            />
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const VoucherForm = Form.create()(FormVoucher)
