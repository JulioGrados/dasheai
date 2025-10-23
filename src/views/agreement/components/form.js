import { useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import toSlug from 'slug'

import { SelectUsers } from 'containers-path'

import {
  Box,
  FormLeft,
  FormRight,
  UploadImage,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from 'components-path'
import { dataToPayload } from 'utils/functions/agreement'

import { useStateData } from '../../../hooks'

const Option = Select.Option

const FormTemplate = ({ agreement, loading, onSubmit, form, title }) => {
  const { data, changeAllData, changeData, cleanData } = useStateData(
    agreement || {}
  )

  useEffect(() => {
    changeAllData(agreement || {})
  }, [agreement])

  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  const changeSlug = e => {
    const newSlug = toSlug(e.target.value, { lower: true })
    form.setFieldsValue({ slug: newSlug })
    changeData('slug', newSlug)
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const dataAgreement = dataToPayload({
          ...data,
          ...values
        })

        const formData = new window.FormData()
        if (data.imageFile) {
          formData.append('image', data.imageFile.originFileObj)
        }
        formData.append('data', JSON.stringify(dataAgreement))

        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/convenios'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!agreement}
          btnName={!agreement ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información' />
            <FormRight>
              <Form.Item label='Intitucion'>
                {getFieldDecorator('institution', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa los nombres de la institución.'
                    }
                  ],
                  initialValue: data && data.institution
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Slug'>
                {getFieldDecorator('slug', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el slug del nombre de la institución.'
                    }
                  ],
                  initialValue: data.slug || undefined
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Size X'>
                {getFieldDecorator('sizeX', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el tamaño en x del logo en certificado'
                    }
                  ],
                  initialValue: data && data.sizeX
                })(<InputNumber onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Size Y'>
                {getFieldDecorator('sizeY', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el tamaño en y del logo en certificado'
                    }
                  ],
                  initialValue: data && data.sizeY
                })(<InputNumber onChange={changeData} />)}
              </Form.Item>
              <Form.Item label='Template'>
                {getFieldDecorator('template', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el tipo de la plantilla.'
                    }
                  ],
                  initialValue: data && data.template
                })(
                  <Select
                    placeholder='Seleccione el tipo de plantilla...'
                    onChange={template => changeData('template', template)}
                  >
                    <Option value='template 1'>Template 1</Option>
                    <Option value='template 2'>Template 2</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Decano'>
                <SelectUsers
                  onSelect={dean => changeData('dean', dean)}
                  user={data.dean}
                />
              </Form.Item>
              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa la descripción de la institución.'
                    }
                  ],
                  initialValue: data && data.description
                })(<Input.TextArea rows={3} />)}
              </Form.Item>

              <Form.Item label='Hidden'>
                {getFieldDecorator('hidden', {
                  valuePropName: 'checked',
                  initialValue: (data && data.hidden) || false
                })(<Checkbox />)}
              </Form.Item>

              <Form.Item label='Imagen'>
                <UploadImage
                  image={data.imageFile}
                  url={agreement && data.image}
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

export const AgreementForm = Form.create()(FormTemplate)
