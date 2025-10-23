import moment from 'moment'
import toSlug from 'slug'
import { MEDIA_PATH } from 'utils/files/path'
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  Checkbox,
  DatePicker,
  Select
} from 'antd'

import {
  Box,
  FormLeft,
  EditorCK,
  FormRight,
  UploadImage,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from 'components-path'

import { SelectLabels } from '../../../components/select/SelectLabels'

import {
  SelectUsers,
  SelectCategories,
  SelectAgreements
} from 'containers-path'

import { SelectTeacher } from '../../user/components/selectTeacher'
import { dataToPayload } from 'utils/functions/course'
import { useStateData } from '../../../hooks'
import { SelectCountries } from './selectCountry'

import { useEffect } from 'react'
import { SelectCoin } from './money'
import { SelectBrochure } from './brochures'

const FormTemplate = ({ course, loading, onSubmit, form, title }) => {
  const { data, changeData, cleanData, changeAllData } = useStateData(course)

  const cleanForm = () => {
    form.resetFields()
    cleanData()
  }

  useEffect(() => {
    if (!course) {
      cleanForm()
    }
    changeAllData(course)
  }, [course])

  const changeSlug = e => {
    const newSlug = toSlug(e.target.value, { lower: true })
    form.setFieldsValue({ slug: newSlug })
    changeData('slug', newSlug)
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('values', values)
        // console.log('data', data)
        const dataCourse = dataToPayload({
          ...data,
          ...values
        })
        if (data.lessons) {
          dataCourse.lessons = JSON.parse(values.lessons)
        }
        const formData = new window.FormData()

        if (data.imageFile) {
          formData.append('image', data.imageFile.originFileObj)
        }
        if (data.shortimageFile) {
          formData.append('shortimage', data.shortimageFile.originFileObj)
        }
        if (data.opengraphFile) {
          formData.append('opengraph', data.opengraphFile.originFileObj)
        }
        if (data.brochureFile) {
          formData.append('brochureFile', data.brochureFile.originFileObj)
        }
        data.brochures && data.brochures.forEach((element, index) => {
          if (element.upload === false) {
            formData.append('brochure' + index, element.url.originFileObj)
          }
        })

        formData.append('data', JSON.stringify(dataCourse))
        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      changeData('brochureFile', e[e.length - 1])
      return e[e.length - 1]
    }
    changeData('brochureFile', e.file)
    return e && e.fileList && e.fileList[e.fileList.length - 1]
  }

  // console.log('course.pubished', new Date(course.published))

  // let lessons = JSON.stringify(course.lessons, undefined, 2)
  const { getFieldDecorator } = form
  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/cursos'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!course}
          btnName={!course ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información Inicial' />
            <FormRight>
              <Form.Item label='Nombre'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el nombres del curso.'
                    }
                  ],
                  initialValue: course && course.name
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Slug'>
                {getFieldDecorator('slug', {
                  rules: [
                    {
                      required: true,
                      message: 'Ingresa el slug del nombre del curso.'
                    }
                  ],
                  initialValue: data.slug || undefined
                })(<Input onChange={changeSlug} />)}
              </Form.Item>
              <Form.Item label='Nombre corto'>
                {getFieldDecorator('shortName', {
                  initialValue: course && course.shortName
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  initialValue: course && course.description
                })(<Input.TextArea rows={3} />)}
              </Form.Item>
              <Form.Item label='Descripción General'>
                {getFieldDecorator('descriptionGeneral', {
                  initialValue: course && course.descriptionGeneral
                })(<Input.TextArea rows={5} />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Información del curso' />
            <FormRight>
              <Form.Item label='Contenido'>
                <EditorCK
                  id='content-course'
                  data={data.content}
                  onChange={content => changeData('content', content)}
                />
              </Form.Item>
              <Form.Item label='Número de evaluaciones'>
                {getFieldDecorator('numberEvaluation', {
                  initialValue: course && course.numberEvaluation
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label='Fecha de migración de Certificados'>
                {getFieldDecorator('migrateCert', {
                  initialValue: course
                    ? moment(new Date(course.migrateCert))
                    : ''
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label='Fecha de migración de Modulos'>
                {getFieldDecorator('migrateMod', {
                  initialValue: course
                    ? moment(new Date(course.migrateMod))
                    : ''
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label='Fecha de migración de Testimonios'>
                {getFieldDecorator('migrateTesty', {
                  initialValue: course
                    ? moment(new Date(course.migrateTesty))
                    : ''
                })(<DatePicker />)}
              </Form.Item>

              <Form.Item label='Clases'>
                {getFieldDecorator('lessons', {
                  initialValue:
                    course && JSON.stringify(course.lessons, undefined, 2)
                })(<Input.TextArea rows={10} />)}
              </Form.Item>

              <Form.Item label='tipo de evaluaciones'>
                {getFieldDecorator('typeOfEvaluation', {
                  initialValue: course && course.typeOfEvaluation
                })(
                  <Select>
                    <Select.Option value='exams'>Examenes</Select.Option>
                    <Select.Option value='tasks'>Tareas</Select.Option>
                    <Select.Option value='both'>Ambos</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='Número de horas academicas'>
                {getFieldDecorator('academicHours', {
                  initialValue: course && course.academicHours
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label='Moodle ID'>
                {getFieldDecorator('moodleId', {
                  initialValue: course && course.moodleId
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label='Porcentaje del profesor'>
                {getFieldDecorator('percentageTeacher', {
                  initialValue: course && course.percentageTeacher
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label='Fecha de lanzamiento'>
                {getFieldDecorator('published', {
                  initialValue: course
                    ? moment(new Date(course.published))
                    : moment()
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label='Folleto'>
                <Upload
                  name='brochure'
                  // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  // showUploadList={false}
                  onChange={normFile}
                  defaultFileList={
                    data.brochure
                      ? [
                          {
                            uid: '-1',
                            name: `brochure-${data.name}.pdf'`,
                            status: 'done',
                            url: MEDIA_PATH + data.brochure
                          }
                        ]
                      : []
                  }
                >
                  <Button>
                    <Icon type='upload' /> Agregar Archivo
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item label='Estará oculto?'>
                {getFieldDecorator('isHidden', {
                  valuePropName: 'checked',
                  initialValue: course ? course.isHidden : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='¿No tendrá foro?'>
                {getFieldDecorator('isForo', {
                  valuePropName: 'checked',
                  initialValue: course ? course.isForo : false
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label='¿Será un curso con confirmación de cuenta?'>
                {getFieldDecorator('isConfirmation', {
                  valuePropName: 'checked',
                  initialValue: course ? course.isConfirmation : false
                })(<Checkbox />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Información comercial' />
            <FormRight>
              <Form.Item label='Precio'>
                {getFieldDecorator('price', {
                  initialValue: course && course.price
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Descuento'>
                {getFieldDecorator('discount', {
                  initialValue: course && course.discount
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Precio oferta'>
                {getFieldDecorator('priceOffert', {
                  initialValue: course && course.priceOffert
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Es Gratis'>
                {getFieldDecorator('isFree', {
                  valuePropName: 'checked',
                  initialValue: course ? course.isFree : false
                })(<Checkbox />)}
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Información Referencial' />
            <FormRight>
              <Form.Item label='Categoría'>
                <SelectCategories
                  category={data.category}
                  onSelect={category => changeData('category', category)}
                />
              </Form.Item>
              <Form.Item label='Autor'>
                <SelectUsers
                  user={data.author}
                  onSelect={user => changeData('author', user)}
                />
              </Form.Item>
              <Form.Item label='Convenio'>
                <SelectAgreements
                  agreement={data.agreement}
                  onSelect={agreement => changeData('agreement', agreement)}
                />
              </Form.Item>

              <Form.Item label='Etiquetas'>
                <SelectLabels
                  values={data.labels}
                  onSelect={labels => changeData('labels', labels)}
                />
              </Form.Item>

              <Form.Item label='Google ID'>
                {getFieldDecorator('googleId', {
                  initialValue: course && course.googleId
                })(<Input placeholder="Id del documento de google drive" />)}
              </Form.Item>
            </FormRight>
          </FormSection>
           <FormSection hasLine>
            <FormLeft title='Moneda' />
            <FormRight>
              <SelectCoin
                coins={data.coins}
                onChange={coins => {
                  console.log(coins)
                  changeData('coins', coins)
                }}
              />
              <br></br>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='País' />
            <FormRight>
              <SelectCountries
                countries={data.countries}
                onChange={countries => {
                  console.log(countries)
                  changeData('countries', countries)
                }}
              />
              <br></br>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Brochures' />
            <FormRight>
              <SelectBrochure
                brochures={data.brochures}
                onChange={brochures => {
                  console.log(brochures)
                  changeData('brochures', brochures)
                }}
              />
              <br></br>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Profesores' />
            <FormRight>
              <SelectTeacher
                users={data.teachers}
                onChange={teachers => changeData('teachers', teachers)}
              />
              <br></br>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='Imagenes' />
            <FormRight>
              <Form.Item label='Imagen'>
                <UploadImage
                  image={data.imageFile}
                  url={course && course.image}
                  handleChange={file => changeData('imageFile', file)}
                />
              </Form.Item>
              <Form.Item label='Imagen Corta'>
                <UploadImage
                  image={data.shortimageFile}
                  url={course && course.shortimage}
                  handleChange={file => changeData('shortimageFile', file)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
          <FormSection hasLine>
            <FormLeft title='SEO' />
            <FormRight>
              <Form.Item label='Titulo SEO'>
                {getFieldDecorator('titleSEO', {
                  initialValue: course && course.titleSEO
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Descripción SEO'>
                {getFieldDecorator('descriptionSEO', {
                  initialValue: course && course.descriptionSEO
                })(<Input.TextArea rows={3} />)}
              </Form.Item>
              <Form.Item label='Open Graph'>
                <UploadImage
                  image={data.opengraphFile}
                  url={course && course.opengraph}
                  handleChange={file => changeData('opengraphFile', file)}
                />
              </Form.Item>
            </FormRight>
          </FormSection>
        </Form>
      </Box>
    </>
  )
}

export const CourseForm = Form.create()(FormTemplate)