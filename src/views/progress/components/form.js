import { Form, Input, Select } from 'antd'

import {
  Box,
  HeaderSection,
  HeaderActions,
  FormSection,
  FormLeft,
  FormRight,
  InputNumber
} from 'components-path'
import { FormDouble } from '../../../components'

const FormTemplate = ({ progress, loading, onSubmit, form, title }) => {
  const cleanForm = () => {
    form.resetFields()
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/progresos'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!progress}
          btnName={!progress ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Información' />
            <FormRight>
              <FormDouble>
                <Form.Item label='Orden'>
                  {getFieldDecorator('order', {
                    rules: [
                      {
                        required: true,
                        message: 'Ingresa la posicón del progreso.'
                      }
                    ],
                    initialValue:
                      progress && progress.order ? progress.order : '0'
                  })(<InputNumber min={0} />)}
                </Form.Item>
                <Form.Item label='Nombre'>
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: 'Ingresa el nombre del progreso.'
                      }
                    ],
                    initialValue: progress && progress.name
                  })(<Input />)}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Clave'>
                  {getFieldDecorator('key', {
                    rules: [
                      {
                        required: true,
                        message: 'Selecciona la clave del progreso.'
                      }
                    ],
                    initialValue: (progress && progress.key) || 'progress'
                  })(
                    <Select placeholder='Selecciona una clave'>
                      <Select.Option value='initial'>Inicial</Select.Option>
                      <Select.Option value='won'>Ganados</Select.Option>
                      <Select.Option value='lost'>Perdidos</Select.Option>
                      <Select.Option value='progress'>
                        Otro Progreso
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label='Pipe'>
                  {getFieldDecorator('pipes', {
                    rules: [
                      {
                        required: true,
                        message: 'Selecciona el pipe.'
                      }
                    ],
                    initialValue: progress && progress.pipes
                  })(
                    <Select placeholder='Selecciona un pipe' mode='multiple'>
                      <Select.Option value='deals'>Tratos</Select.Option>
                      <Select.Option value='accounting'>
                        Contabilidad
                      </Select.Option>
                      <Select.Option value='courses'>Cursos</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </FormDouble>
              <Form.Item label='Color'>
                {getFieldDecorator('color', {
                  initialValue: progress && progress.color
                })(<Input type='color' />)}
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const ProgressForm = Form.create()(FormTemplate)
