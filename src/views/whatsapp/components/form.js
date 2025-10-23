import { SelectUsers, SelectTemplates } from 'containers-path'
import {
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight
} from 'components-path'
import { Form, Input, Select } from 'antd'

import { useEffect } from 'react'
import { FormDouble } from '../../../components'
import { useStateData } from '../../../hooks'

const Option = Select.Option

const FormWhatsapp = ({ whatsapp, loading, onSubmit, form, title }) => {
  const { data, changeAllData, changeData } = useStateData(whatsapp || {})

  const cleanForm = () => {
    form.resetFields()
    changeAllData({})
  }

  useEffect(() => {
    changeAllData(whatsapp || {})
  }, [whatsapp])

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
         const dataWhatsapp = {
          ...data,
          ...values
        }
        onSubmit(dataWhatsapp, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  console.log('data', data)

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/whatsapps'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!whatsapp}
          btnName={!whatsapp ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información' />
            <FormRight>
              <FormDouble>
                <Form.Item label='Asesor asignado'>
                <SelectUsers
                  type='username'
                  user={data && data.assigned}
                  onSelect={user => changeData('assigned', user)}
                />
                </Form.Item>
                <Form.Item label='Usuario vinculado'>
                <SelectUsers
                  type='names'
                  user={data && data.linked}
                  onSelect={linkedName => changeData('linked', linkedName)}
                />
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Plantilla'>
                  <SelectTemplates
                    template={data && data.template}
                    onSelect={templa => changeData('template', templa)}
                  />
                </Form.Item>
                <Form.Item label='Número'>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: false,
                        message: 'Ingresa el número'
                      }
                    ],
                    initialValue: data && data.phone
                  })(<Input onChange={changeData} />)}
                </Form.Item>
              </FormDouble>
                <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  rules: [
                    {
                      required: false,
                      message: 'Ingresa el número'
                    }
                  ],
                  initialValue: data && data.status
                })(
                  <Select>
                    <Option value='En cola'>En cola</Option>
                    <Option value='Enviado'>Enviado</Option>
                    <Option value='Entregado'>Entregado</Option>
                    <Option value='Leído'>Leído</Option>
                    <Option value='Rechazado'>Rechazado</Option>
                  </Select>
                )}
                </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const WhatsappForm = Form.create()(FormWhatsapp)