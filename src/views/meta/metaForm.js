import { useEffect } from 'react'
import { Form, Input, Select, message } from 'antd'

import {
  FormSection,
  FormLeft,
  FormRight,
  InputNumber,
  UploadImage
} from '../../components'
import { useStateData } from '../../hooks'
import { dataToPayload } from 'utils/functions/meta'

import { MetaPages } from './metaPages'

export const MetaForm = Form.create()(({ meta, form, save, formRef }) => {
  const { data, changeData, changeAllData } = useStateData(
    meta || { pages: [] }
  )

  useEffect(() => {
    changeData(meta || {})
  }, [meta])

  const cleanForm = () => {
    changeAllData()
    form.resetFields()
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const dataMeta = dataToPayload({
        ...data,
        ...values
      })
      const formData = new window.FormData()
      if (data.opengraphFile) {
        formData.append('opengraph', data.opengraphFile.originFileObj)
      }
      if (data.opengraphFB) {
        formData.append('fb.image', data.opengraphFB.originFileObj)
      }
      if (data.opengraphTW) {
        formData.append('tw.image', data.opengraphTW.originFileObj)
      }
      formData.append('data', JSON.stringify(dataMeta))

      const resp = await save(formData)
      if (resp && resp.success) {
        cleanForm()
        return resp
      } else {
        message.error((resp && resp.message) || 'Error en el servidor')
        return { success: false }
      }
    } catch (error) {
      return { success: false }
    }
  }

  const { getFieldDecorator } = form

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormSection hasLine>
        <FormLeft title='Información' />
        <FormRight>
          <Form.Item label='Dominio'>
            {getFieldDecorator('domain', {
              rules: [
                {
                  required: true,
                  message: 'Ingresa el tipo.'
                }
              ],
              initialValue: (meta && meta.domain) || 'https://www.eai.edu.pe'
            })(
              <Select placeholder='Selecciona un dominio'>
                <Select.Option value='https://www.eai.edu.pe'>
                  EAI
                </Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Titulo'>
            {getFieldDecorator('title', {
              initialValue: meta && meta.title
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Descripción'>
            {getFieldDecorator('description', {
              initialValue: meta && meta.description
            })(<Input.TextArea />)}
          </Form.Item>

          <Form.Item label='Telefono'>
            {getFieldDecorator('phone', {
              initialValue: meta && meta.phone
            })(<InputNumber />)}
          </Form.Item>

          <Form.Item label='Color del tema'>
            {getFieldDecorator('themeColor', {
              initialValue: meta && meta.themeColor
            })(<Input type='color' />)}
          </Form.Item>
        </FormRight>
      </FormSection>
      <FormSection hasLine>
        <FormLeft title='Dirección' />
        <FormRight>
          <Form.Item label='Tipo'>
            {getFieldDecorator('address.type', {
              initialValue: meta && meta.address && meta.address.type
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Calle'>
            {getFieldDecorator('address.street', {
              initialValue: meta && meta.address && meta.address.street
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Localidad'>
            {getFieldDecorator('address.locality', {
              initialValue: meta && meta.address && meta.address.locality
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Codigo Postal'>
            {getFieldDecorator('address.postalCode', {
              initialValue: meta && meta.address && meta.address.postalCode
            })(<InputNumber />)}
          </Form.Item>

          <Form.Item label='Country'>
            {getFieldDecorator('address.country', {
              initialValue: meta && meta.address && meta.address.country
            })(<Input />)}
          </Form.Item>
        </FormRight>
      </FormSection>
      <FormSection hasLine>
        <FormLeft title='OpenGraph' />
        <FormRight>
          <Form.Item label='Titulo'>
            {getFieldDecorator('og.title', {
              initialValue: meta && meta.og && meta.og.title
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Descripción'>
            {getFieldDecorator('og.description', {
              initialValue: meta && meta.og && meta.og.description
            })(<Input.TextArea />)}
          </Form.Item>

          <Form.Item label='Url'>
            {getFieldDecorator('og.url', {
              initialValue: meta && meta.og && meta.og.url
            })(<Input />)}
          </Form.Item>

          <Form.Item label='SiteName'>
            {getFieldDecorator('og.siteName', {
              initialValue: meta && meta.og && meta.og.siteName
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Imagen'>
            <UploadImage
              image={data.opengraphFile}
              url={meta && meta.og && meta.og.image}
              handleChange={file => changeData('opengraphFile', file)}
            />
          </Form.Item>
        </FormRight>
      </FormSection>
      <FormSection hasLine>
        <FormLeft title='Facebook' />
        <FormRight>
          <Form.Item label='ID'>
            {getFieldDecorator('fb.id', {
              initialValue: meta && meta.fb && meta.fb.id
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Pagina'>
            {getFieldDecorator('fb.page', {
              initialValue: meta && meta.fb && meta.fb.page
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Imagen'>
            <UploadImage
              image={data.opengraphFB}
              url={meta && meta.fb && meta.fb.image}
              handleChange={file => changeData('opengraphFB', file)}
            />
          </Form.Item>
        </FormRight>
      </FormSection>
      <FormSection hasLine>
        <FormLeft title='Twitter' />
        <FormRight>
          <Form.Item label='ID'>
            {getFieldDecorator('tw.id', {
              initialValue: meta && meta.tw && meta.tw.id
            })(<Input />)}
          </Form.Item>

          <Form.Item label='User'>
            {getFieldDecorator('tw.page', {
              initialValue: meta && meta.tw && meta.tw.page
            })(<Input placeholder='@user' />)}
          </Form.Item>

          <Form.Item label='Imagen'>
            <UploadImage
              image={data.opengraphTW}
              url={meta && meta.tw && meta.tw.image}
              handleChange={file => changeData('opengraphTW', file)}
            />
          </Form.Item>
        </FormRight>
      </FormSection>
      <MetaPages
        pages={data.pages}
        onChange={pages => changeData('pages', pages)}
      />
    </Form>
  )
})
