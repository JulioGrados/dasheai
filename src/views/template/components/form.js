import { SelectUsers } from 'containers-path'
import {
  EditorCK,
  HeaderSection,
  HeaderActions,
  Box,
  FormSection,
  FormLeft,
  FormRight
} from 'components-path'
import { Form, Input, Select } from 'antd'
import { Variables } from './variables'
import { dataToPayload } from 'utils/functions/template'

import { useEffect } from 'react'
import { FormDouble } from '../../../components'
import { useStateData } from '../../../hooks'

const Option = Select.Option

const FormTemplate = ({ template, loading, onSubmit, form, title }) => {
  const { data, changeAllData, changeData } = useStateData(template || {})

  const cleanForm = () => {
    form.resetFields()
    changeAllData({})
  }

  useEffect(() => {
    changeAllData(template || {})
  }, [template])

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          ...data,
          ...values
        }
        const templateData = dataToPayload(values)
        onSubmit(templateData, redirect, cleanForm)
      }
    })
  }

  const query = {
    roles: { $in: ['Administrador', 'Asesor'] }
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/plantillas'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!template}
          btnName={!template ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información' />
            <FormRight>
              <FormDouble>
                <Form.Item label='Nombre'>
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: 'Ingresa el nombre de la plantilla.'
                      }
                    ],
                    initialValue: template && template.name
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Tipo'>
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: 'Ingresa el tipo de la plantilla.'
                      }
                    ],
                    initialValue: template && template.type
                  })(
                    <Select
                      placeholder='Seleccione el tipo de plantilla...'
                      onChange={type => changeData('type', type)}
                    >
                      <Option value='WhatsApp'>WhatsApp</Option>
                      <Option value='Email'>Email</Option>
                    </Select>
                  )}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Area'>
                  {getFieldDecorator('area', {
                    rules: [
                      {
                        required: true,
                        message: 'Ingresa el area de la plantilla.'
                      }
                    ],
                    initialValue: template && template.area
                  })(
                    <Select placeholder='Seleccione el area de la plantilla...'>
                      <Option value='sales'>Ventas</Option>
                      <Option value='accounting'>Contabilidad</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label='Autor'>
                  <SelectUsers
                    query={query}
                    onSelect={author => changeData('author', author)}
                    user={data.author}
                  />
                </Form.Item>
              </FormDouble>

              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa una descripción a la plantilla.'
                    }
                  ],
                  initialValue: template && template.description
                })(<Input.TextArea rows={3} />)}
              </Form.Item>

              <Form.Item label='Contenido'>
                <EditorCK
                  id='editor1'
                  data={data.content}
                  onChange={data => changeData('content', data)}
                />
              </Form.Item>

              <Form.Item label='Variables'>
                <Variables
                  variables={data.variables}
                  onChange={data => changeData('variables', data)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
          {data.type === 'Email' && (
            <>
              <FormSection>
                <FormLeft title='Para email' />
                <FormRight>
                  <FormDouble>
                    <Form.Item label='De'>
                      {getFieldDecorator('from', {
                        initialValue: template && template.from
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label='Emisor'>
                      {getFieldDecorator('sender', {
                        initialValue: template && template.sender
                      })(<Input />)}
                    </Form.Item>
                  </FormDouble>
                  <Form.Item label='Asunto'>
                    {getFieldDecorator('preheader', {
                      initialValue: template && template.preheader
                    })(<Input />)}
                  </Form.Item>
                </FormRight>
              </FormSection>
            </>
          )}
        </Form>
      </Box>
    </>
  )
}

export const TemplateForm = Form.create()(FormTemplate)
