import toSlug from 'slug'
import { Form, Input, message } from 'antd'
import {
  FormSection,
  FormLeft,
  FormRight,
  InputNumber,
  FormDouble
} from '../../components'
import { useEffect, useState } from 'react'

export const CompanyForm = Form.create()(({ company, form, save, formRef }) => {
  const [slug, changeSlug] = useState()

  const cleanForm = () => {
    form.resetFields()
    changeSlug('')
  }

  useEffect(() => {
    if (company) {
      changeSlug(company.slug)
    }
  }, [company])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      values.slug = slug
      const formData = new window.FormData()
      /* if (data.imageFile) {
        formData.append('image', data.imageFile.originFileObj)
      } */
      formData.append('data', JSON.stringify(values))

      const resp = await save(formData)
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
          <FormDouble>
            <Form.Item label='Nombre'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Ingresa el nombre de la empresa.'
                  }
                ],
                initialValue: company && company.name
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
                    message: 'Ingresa el slug de la empresa.'
                  }
                ],
                initialValue: slug
              })(<Input />)}
            </Form.Item>
          </FormDouble>

          <FormDouble>
            <Form.Item label='Ruc'>
              {getFieldDecorator('ruc', {
                rules: [
                  {
                    required: true,
                    message: 'Ingresa el ruc de la empresa.'
                  }
                ],
                initialValue: company && company.ruc
              })(<InputNumber />)}
            </Form.Item>

            <Form.Item label='Razón Social'>
              {getFieldDecorator('businessName', {
                rules: [
                  {
                    required: true,
                    message: 'Ingresa la razón social de la empresa.'
                  }
                ],
                initialValue: company && company.businessName
              })(<Input />)}
            </Form.Item>
          </FormDouble>
          <FormDouble>
            <Form.Item label='País'>
              {getFieldDecorator('country', {
                initialValue: company && company.businessName
              })(<Input />)}
            </Form.Item>

            <Form.Item label='Dirección'>
              {getFieldDecorator('address', {
                initialValue: company && company.address
              })(<Input />)}
            </Form.Item>
          </FormDouble>
          <FormDouble>
            <Form.Item label='Email'>
              {getFieldDecorator('send', {
                initialValue: company && company.send
              })(<Input />)}
            </Form.Item>

            <Form.Item>
            </Form.Item>
          </FormDouble>

          <Form.Item label='Descripción'>
            {getFieldDecorator('description', {
              initialValue: company && company.description
            })(<Input.TextArea rows={3} />)}
          </Form.Item>
        </FormRight>
      </FormSection>
    </Form>
  )
})
