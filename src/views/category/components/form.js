import { useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import toSlug from 'slug'

import {
  Box,
  FormLeft,
  FormRight,
  UploadImage,
  FormSection,
  HeaderActions,
  HeaderSection
} from 'components-path'

const FormTemplate = ({ category, loading, onSubmit, form, title }) => {
  const [image, setImage] = useState(null)
  const [slug, setSlug] = useState(category ? category.slug : '')

  const cleanForm = () => {
    form.resetFields()
    setImage(null)
    setSlug('')
  }

  useEffect(() => {
    if (category) {
      setSlug(category.slug)
    } else {
      setSlug('')
    }
  }, [category])

  const changeSlug = e => {
    const newSlug = toSlug(e.target.value, { lower: true })
    form.setFieldsValue({ slug: newSlug })
    setSlug(newSlug)
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const formData = new window.FormData()

        if (image) {
          formData.append('image', image.originFileObj)
        }
        formData.append('data', JSON.stringify(values))

        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/categorias'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!category}
          btnName={!category ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection>
            <FormLeft title='Datos Principales' />
            <FormRight>
              <Form.Item label='Nombre'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el nombre de la categoria.'
                    }
                  ],
                  initialValue: category && category.name
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Slug'>
                {getFieldDecorator('slug', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el slug del nombre de la categoria.'
                    }
                  ],
                  initialValue: slug
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  initialValue: category && category.description
                })(<Input.TextArea rows={3} />)}
              </Form.Item>
              <Form.Item label='Imagen'>
                <UploadImage
                  image={image}
                  url={category && category.image}
                  handleChange={image => setImage(image)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const CategoryForm = Form.create()(FormTemplate)
