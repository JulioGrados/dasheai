import toSlug from 'slug'
import { Form, Input, message } from 'antd'
import { FormSection, FormLeft, FormRight } from '../../components'
import { useEffect, useState } from 'react'

export const LabelForm = Form.create()(({ label, form, save, formRef }) => {
  const [slug, changeSlug] = useState()

  const cleanForm = () => {
    form.resetFields()
    changeSlug('')
  }

  useEffect(() => {
    if (label) {
      changeSlug(label.slug)
    }
  }, [label])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      values.slug = slug
      const resp = await save(values)
      if (resp && resp.success) {
        cleanForm()
        return resp
      } else {
        message.error((resp && resp.message) || 'Error en el servidor')
        return { success: false }
      }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  const { getFieldDecorator } = form

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormSection>
        <FormLeft title='Información' />
        <FormRight>
          <Form.Item label='Nombre'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa el nombre de la etiqueta.'
                }
              ],
              initialValue: label && label.name
            })(
              <Input
                onChange={e =>
                  changeSlug(toSlug(e.target.value, { lower: true }))
                }
              />
            )}
          </Form.Item>

          <Form.Item label='Slug'>
            {getFieldDecorator('slug', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa el slug de la etiqueta.'
                }
              ],
              initialValue: slug
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Descripción'>
            {getFieldDecorator('description', {
              initialValue: label && label.description
            })(<Input.TextArea rows={3} />)}
          </Form.Item>
        </FormRight>
      </FormSection>
    </Form>
  )
})
