import { useEffect, useState } from 'react'
import { Form, Input, Select, Transfer, Modal, Checkbox } from 'antd'
import { dataToPayload } from 'utils/functions/user'
import { useStateData, useEnrols } from '../../../hooks'
import { SelectListCourses } from '../../course/components/selectList'
import { ShippingForm } from './editShipping'

import { FormHeader, FormHeaderTitle, FormHeaderPlus } from '../styles/style'

import countriesData from 'utils/functions/countries'
import departments from 'utils/functions/departments'

import {
  Box,
  FormLeft,
  FormRight,
  FormDouble,
  UploadImage,
  FormSection,
  HeaderActions,
  HeaderSection,
  InputNumber
} from '../../../components'

import { Table, TableOptions } from 'components-path'

import moment from 'moment'
import { SelectAssessors } from '../../../containers'

const FormTemplate = ({
  user,
  loading,
  onSubmit,
  onDeleteDNI,
  onDeleteAccount,
  onDeleteAccountMoodle,
  onDeletePhoto,
  form,
  title,
  role = null
}) => {
  const initialCountry = countriesData.find(country => country.name === 'Perú')
  const { data, changeData, changeAllData } = useStateData(user)

  const [shipping, changeShipping] = useState()
  const [visible, changeVisible] = useState(false)

  const { enrols } = useEnrols({
    user: user && user._id
  })
  console.log('user', user)
  useEffect(() => {
    if (user) {
      changeAllData(user)
    } else {
      changeAllData({
        mobileCode: initialCountry.callingCode,
        country: initialCountry.name,
        roles: role ? [role] : []
      })
    }
  }, [user])

  if (data.shippings) {
    data.shippings.forEach((item, index) => (item.position = index))
  }

  const cleanForm = () => {
    // form.resetFields()
    changeAllData({
      mobileCode: initialCountry.callingCode,
      country: initialCountry.name
    })
  }

  const handleSelectCountry = item => {
    const country = countriesData.find(country => country.name === item)
    changeData('mobileCode', country.callingCode)
  }

  const handleSelectDepartament = item => {
    const department = departments.find(department => department.name === item)
    changeData('department', department)
  }

  const handleSelectAssessor = item => {
    changeData('reasign', { username: item.username, ref: item._id })
  }

  const handleSubmit = redirect => {
    form.validateFields((err, values) => {
      if (!err) {
        const userData = dataToPayload({
          ...data,
          ...values
        })
        console.log('userData', userData)
        const formData = new window.FormData()

        if (data.image) {
          formData.append('photo', data.image.originFileObj)
        }
        if (data.shippings) {
          formData.append('shippings', data.shippings)
        }
        formData.append('data', JSON.stringify(userData))
        onSubmit(formData, redirect, cleanForm)
      }
    })
  }

  const handleDeleteDNI = () => {
    onDeleteDNI(data, '/usuarios', cleanForm)
  }

  const handleDeleteCuenta = () => {
    onDeleteAccount(data, '/usuarios', cleanForm)
  }

  const handleDeleteCuentaMoodle = () => {
    onDeleteAccountMoodle(data, '/usuarios', cleanForm)
  }

  const handleDeletePhoto = () => {
    onDeletePhoto(data, '/usuarios', cleanForm)
  }

  const handleEditShipping = dataShinpping => {
    dataShinpping.date = dataShinpping.date._i / 1000
    // console.log(dataShinpping)
    const index = data.shippings.findIndex(
      item => item._id === dataShinpping._id
    )
    if (index !== -1) {
      data.position = index
      data.shippings[index] = dataShinpping
      changeData({ shippings: data.shippings })
      changeShipping(null)
    }
  }

  const handleAddShipping = dataShinpping => {
    dataShinpping.date = parseInt(dataShinpping.date._i.getTime() / 1000)
    data.position = data.shippings.length
    data.shippings.push(dataShinpping)
    changeData({ shippings: data.shippings })
    changeVisible(false)
  }

  let roles = [
    'Docente',
    'Administrador',
    'Interesado',
    'Estudiante',
    'Cliente',
    'Asesor',
    'Tesorero',
    'Recepcionista'
  ]

  roles = roles.map(rol => ({ key: rol, title: rol }))

  const { getFieldDecorator } = form

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date * 1000).format('DD/MM/YYYY')
    },
    {
      title: 'Curso',
      dataIndex: 'course',
      key: 'course',
      render: course => (course ? course.name : '')
    },
    {
      title: 'Nombres',
      dataIndex: 'firstName',
      key: 'firstName',
      render: firstName => firstName
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastName',
      key: 'lastName',
      render: lastName => lastName
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      render: dni => dni
    },
    {
      title: 'Celular',
      dataIndex: 'cellphone',
      key: 'cellphone',
      render: cellphone => cellphone
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
      render: address => address
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      key: 'priority',
      render: priority => priority
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: (_id, item) => (
        <TableOptions id={_id} onEdit={() => changeShipping(item)} />
      )
    }
  ]

  const enrolsCourse = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: name => name
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: price => price
    },
    {
      title: 'Moodle Id',
      dataIndex: 'moodleId',
      key: 'moodleId',
      render: moodleId => moodleId
    }
  ]

  return (
    <>
      <HeaderSection title={title}>
        <HeaderActions
          path='/usuarios'
          loading={loading}
          handleSubmit={handleSubmit}
          isSaveClean={!user}
          btnName={!user ? 'Agregar' : 'Editar'}
        />
      </HeaderSection>
      <Box>
        <Form>
          <FormSection hasLine>
            <FormLeft title='Información Inicial' />
            <FormRight>
              <FormDouble>
                <Form.Item label='Nombres'>
                  {getFieldDecorator('firstName', {
                    initialValue: user && user.firstName
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Apellidos'>
                  {getFieldDecorator('lastName', {
                    initialValue: user && user.lastName
                  })(<Input />)}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Nombres'>
                  {getFieldDecorator('names', {
                    initialValue: user && user.names
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Email'>
                  {getFieldDecorator('email', {
                    initialValue: user && user.email
                  })(<Input />)}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Tipo de documento de Identidad'>
                  {getFieldDecorator('document', {
                    initialValue: user && user.document
                  })(
                    <Select placeholder='Selecciona el tipo de documento de Identidad ...'>
                      <Select.Option value='DNI'>DNI</Select.Option>
                      <Select.Option value='Carné de Extranjería'>Carné de Extranjería</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label='Código del documento de Identidad'>
                  {getFieldDecorator('dni', {
                    initialValue: user && user.dni
                  })(<Input />)}
                  {user && user.dni && <a onClick={handleDeleteDNI}>Eliminar dni</a>}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='País'>
                  {getFieldDecorator('country', {
                    initialValue: data.country
                  })(
                    <Select
                      placeholder='Selecciona el país'
                      showSearch
                      onSelect={handleSelectCountry}
                    >
                      {countriesData.map((item, idx) => (
                        <Select.Option key={idx} value={item.name}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label='Departamento'>
                  {getFieldDecorator('department', {
                    initialValue: data.department
                  })(
                    <Select
                      placeholder='Selecciona el departamento'
                      showSearch
                      onSelect={handleSelectDepartament}
                    >
                      {departments.map((item, idx) => (
                        <Select.Option key={idx} value={item.name}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Celular'>
                  {getFieldDecorator('mobile', {
                    initialValue: user && user.mobile
                  })(<Input addonBefore={'+' + data.mobileCode} />)}
                </Form.Item>
                <Form.Item label='Dirección'>
                  {getFieldDecorator('address', {
                    initialValue: user && user.address
                  })(<Input />)}
                </Form.Item>
              </FormDouble>
              <FormDouble>
                <Form.Item label='Antenombre'>
                  {getFieldDecorator('beforeName', {
                    initialValue: user && user.beforeName
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='PhoneNoId'>
                  {getFieldDecorator('phoneNoId', {
                    initialValue: user && user.phoneNoId
                  })(<Input />)}
                </Form.Item>
              </FormDouble>
              <Form.Item label='Descripción'>
                {getFieldDecorator('description', {
                  initialValue: user && user.description
                })(<Input.TextArea rows={3} />)}
              </Form.Item>
              {role === 'Asesor' && (
                <Form.Item label='Seleccionar asesor:'>
                  <SelectAssessors
                    type='names'
                    reasign={data && data.reasign}
                    onSelect={handleSelectAssessor}
                  />
                </Form.Item>
              )}
            </FormRight>
          </FormSection>
          {role !== 'Interesado' && (
            <FormSection hasLine>
              <FormLeft title='Cuenta' />
              <FormRight>
                <FormDouble>
                  <Form.Item label='Username'>
                    {getFieldDecorator('username', {
                      initialValue: user && user.username
                    })(<Input placeholder='Username' />)}
                  </Form.Item>
                  <Form.Item label='Contraseña'>
                    {getFieldDecorator('password')(<Input type='password' />)}
                  </Form.Item>
                </FormDouble>
                <FormDouble>
                  <Form.Item label='MoodleId'>
                    {getFieldDecorator('moodleId', {
                      initialValue: user && user.moodleId
                    })(<Input placeholder='moodleId' />)}
                  </Form.Item>
                  <Form.Item>
                  </Form.Item>
                </FormDouble>
                {user && user.moodleId && <a onClick={handleDeleteCuentaMoodle}>Eliminar cuenta en dash y moodle</a>} - {user && user.username && <a onClick={handleDeleteCuenta}>Eliminar cuenta en dash</a>}
                <Form.Item label='Rol'>
                  <Transfer
                    dataSource={roles}
                    titles={['Roles', 'Actuales']}
                    targetKeys={data ? data.roles : []}
                    onChange={selected => changeData('roles', selected)}
                    render={item => item.title}
                  />
                </Form.Item>
                <Form.Item label='Foto'>
                  <UploadImage
                    image={data.image}
                    url={data.photo}
                    handleChange={photo => changeData('image', photo)}
                  />
                  {data && data.photo && <a onClick={handleDeletePhoto}>Eliminar Foto</a>}
                </Form.Item>
              </FormRight>
            </FormSection>
          )}
          {role === 'Asesor' && (
            <FormSection>
              <FormLeft title='Asesor' />
              <FormRight>
                <FormDouble>
                  <Form.Item label='Anexo Anura'>
                    {getFieldDecorator('annexed', {
                      initialValue: user && user.call && user.call.annexed
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Token Anura'>
                    {getFieldDecorator('token', {
                      initialValue: user && user.call && user.call.token
                    })(<Input />)}
                  </Form.Item>
                </FormDouble>
                <FormDouble>
                  <Form.Item label='Anexo Zadarma'>
                    {getFieldDecorator('annexedZadarma', {
                      initialValue: user && user.zadarma && user.zadarma.annexed
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Token Zadarma'>
                    {getFieldDecorator('tokenZadarma', {
                      initialValue: user && user.zadarma && user.zadarma.token
                    })(<Input />)}
                  </Form.Item>
                </FormDouble>
                <FormDouble>
                  <Form.Item label='¿Asesor activo?'>
                    {getFieldDecorator('status', {
                      valuePropName: 'checked',
                      initialValue: user ? user.status : false
                    })(<Checkbox />)}
                  </Form.Item>
                  <Form.Item label='¿Asesor Zadarma?'>
                    {getFieldDecorator('isZadarma', {
                      valuePropName: 'checked',
                      initialValue: user ? user.isZadarma : false
                    })(<Checkbox />)}
                  </Form.Item>
                  <Form.Item >
                    {/* {getFieldDecorator('position', {
                      valuePropName: 'checked',
                      initialValue: user ? user.position : false
                    })(<Checkbox />)} */}
                  </Form.Item>
                </FormDouble>
                <Form.Item label='Cursos'>
                  <SelectListCourses
                    courses={data.sellCourses}
                    onChange={courses => changeData('sellCourses', courses)}
                  />
                </Form.Item>
              </FormRight>
            </FormSection>
          )}
          {data.shippings && (
            <FormSection>
              <FormHeader>
                <FormHeaderTitle>Direcciones de envío</FormHeaderTitle>
                <FormHeaderPlus type='link' onClick={() => changeVisible(true)}>
                  Agregar dirección
                </FormHeaderPlus>
              </FormHeader>
              <Table
                columns={columns}
                dataSource={data.shippings}
                rowKey={'position'}
              />
            </FormSection>
          )}
        </Form>
      </Box>
      <Modal
        visible={!!shipping}
        title='Editar Dirección de Envío'
        footer={null}
        onCancel={() => changeShipping(null)}
      >
        <ShippingForm item={shipping} onSubmit={handleEditShipping} />
      </Modal>

      <Modal
        visible={!!visible}
        title='Crear Dirección de Envío'
        footer={null}
        onCancel={() => changeVisible(false)}
      >
        <ShippingForm onSubmit={handleAddShipping} />
      </Modal>
    </>
  )
}

export const UserForm = Form.create()(FormTemplate)
