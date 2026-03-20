import { useEffect } from 'react'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select
} from 'antd'

import {
  Box,
  FormLeft,
  FormRight,
  UploadImage,
  FormSection,
  HeaderActions,
  HeaderSection
} from 'components-path'

import { EditorQuill } from './EditorQuill'
import { useStateData } from '../../../hooks'

const { Option } = Select
const { TextArea } = Input

const FormTemplate = ({ blog, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData, changeAllData } = useStateData(blog)

  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  useEffect(() => {
    if (!blog) {
      cleanForm()
    }
    changeAllData(blog)
  }, [blog])

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const blogData = {
          ...values,
          content: data.content,
          date: values.date ? values.date.toISOString() : new Date().toISOString()
        }

        const formData = new window.FormData()

        // Manejar imagen si existe
        if (data.imageFile && data.imageFile.originFileObj) {
          formData.append('image', data.imageFile.originFileObj)
        }

        formData.append('data', JSON.stringify(blogData))
        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/blogs'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!blog}
          btnName={!blog ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información del Blog' />
            <FormRight>
              <Form.Item label='Título'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el título del blog.'
                    }
                  ],
                  initialValue: blog && blog.title
                })(<Input placeholder='Título del blog' />)}
              </Form.Item>
              <Form.Item label='Asunto'>
                {getFieldDecorator('subject', {
                  initialValue: blog && blog.subject
                })(<Input placeholder='Asunto del blog' />)}
              </Form.Item>
              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa una descripción del blog.'
                    }
                  ],
                  initialValue: blog && blog.description
                })(<TextArea rows={3} placeholder='Descripción breve del blog' />)}
              </Form.Item>
            </FormRight>
          </FormSection>

          <FormSection hasLine>
            <FormLeft title='Contenido' />
            <FormRight>
              <Form.Item label='Contenido del Blog'>
                <EditorQuill
                  value={data.content}
                  onChange={content => changeData('content', content)}
                  placeholder='Escribe el contenido completo del blog aquí...'
                />
              </Form.Item>
            </FormRight>
          </FormSection>

          <FormSection hasLine>
            <FormLeft title='Configuración' />
            <FormRight>
              <Form.Item label='Fecha de Publicación'>
                {getFieldDecorator('date', {
                  initialValue: blog && blog.date ? moment(blog.date) : moment()
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label='Estado'>
                {getFieldDecorator('status', {
                  initialValue: blog && blog.status ? blog.status : 'Borrador'
                })(
                  <Select placeholder='Selecciona un estado'>
                    <Option value='Borrador'>Borrador</Option>
                    <Option value='Publicado'>Publicado</Option>
                    <Option value='Archivado'>Archivado</Option>
                  </Select>
                )}
              </Form.Item>
            </FormRight>
          </FormSection>

          <FormSection hasLine>
            <FormLeft title='Imagen' />
            <FormRight>
              <Form.Item label='Imagen del Blog'>
                <UploadImage
                  image={data.imageFile}
                  url={blog && blog.image}
                  handleChange={file => changeData('imageFile', file)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const BlogForm = Form.create()(FormTemplate)
