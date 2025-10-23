import { useEffect } from 'react'
import { Form, Input, Table, Select, Button } from 'antd'
import { SelectUsers } from 'containers-path'
import {
  Box,
  EditorCK,
  FormLeft,
  FormRight,
  FormSection,
  HeaderActions,
  HeaderSection
} from 'components-path'
import { dataToPayload } from 'utils/functions/email'

import { useStateData } from '../../../hooks'

const Option = Select.Option

const FormTemplate = ({ email, loading, onSubmit, form, title }) => {
  const { data, changeAllData, changeData, cleanData } = useStateData(
    email || {}
  )

  useEffect(() => {
    changeAllData(email || {})
  }, [email])

  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(data, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <Button type='primary' onClick={handleSubmit}>Reenviar</Button>
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  initialValue: data && data.status
                })(
                  <Select>
                    <Select.Option value='Enviado'>Enviado</Select.Option>
                    <Select.Option value='Entregado'>Entregado</Select.Option>
                    <Select.Option value='Abierto'>Abierto</Select.Option>
                    <Select.Option value='Interacción'>Interacción</Select.Option>
                    <Select.Option value='Spam'>Spam</Select.Option>
                    <Select.Option value='Rechazado'>Rechazado</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Usuario asociado'>
                <SelectUsers
                  type={'email'}
                  user={data.linked && data.linked.ref}
                  onSelect={user => changeData('linked', user)}
                />
              </Form.Item>
              <Form.Item label='Asesor'>
                <SelectUsers
                  user={data.assigned}
                  onSelect={user => changeData('assigned', user)}
                />
              </Form.Item>
              <Form.Item label='To'>
                {getFieldDecorator('to', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el to del email.'
                    }
                  ],
                  initialValue: data && data.to
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='From'>
                {getFieldDecorator('from', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el from del email.'
                    }
                  ],
                  initialValue: data && data.from
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Subject'>
                {getFieldDecorator('subject', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el subject del email.'
                    }
                  ],
                  initialValue: data && data.subject
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Fromname'>
                {getFieldDecorator('fromname', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el fromname del email.'
                    }
                  ],
                  initialValue: data && data.fromname
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Preheader'>
                {getFieldDecorator('preheader', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el preheader del email.'
                    }
                  ],
                  initialValue: data && data.preheader
                })(<Input onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Contenido'>
                <EditorCK
                  id='content-course'
                  data={data.content}
                  onChange={content => changeData('content', content)}
                />
              </Form.Item>
              <Form.Item label='Attachments'>
                <Table dataSource={data.attachments || []} columns={columns} bordered />
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

const columns = [
  {
    title: 'Archivo',
    dataIndex: 'filename',
    key: 'filename'
  },
  {
    title: 'Url',
    dataIndex: 'url',
    render: url => <a target='_blank'>{url}</a>
  }
]

export const EmailForm = Form.create()(FormTemplate)
