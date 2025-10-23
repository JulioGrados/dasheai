import Link from 'next/link'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from 'components-path'
import { HeaderFlex, HeaderButton } from '../styles/style'

import { Button, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Option } = Select

export const UserList = ({ users, loading, loaded, handleDelete, role, handleSearch }) => {
  const [names, setNames] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [dni, setDni] = useState()
  const [rol, setRol] = useState()

  const handleButton = () => {
    const data = {
      names: names ? names : null,
      username: username ? username : null,
      email: email ? email : null,
      mobile: mobile ? mobile : null,
      dni: dni ? dni : null,
      rol: rol ? rol : null
    }
    handleSearch(data)
  }

  const columns = [
    {
      title: 'Nombres Completos',
      dataIndex: 'names',
      key: 'names',
      width: 200,
      // ...SearchRow('names', 'Buscar por nombres y apellidos.')
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: 200,
      // ...SearchRow('username', 'Buscar por username.')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      // ...SearchRow('email', 'Buscar por email.')
    },
    {
      title: 'Celular',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 200,
      // ...SearchRow('mobile', 'Buscar por celular')
    },
    {
      title: 'Tipo de documento',
      dataIndex: 'document',
      key: 'document',
      width: 200
    },
    {
      title: 'Número de documento',
      dataIndex: 'dni',
      key: 'dni',
      width: 200,
      // ...SearchRow('dni', 'Buscar por dni')
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      // ...FilterRow('roles', users, !!role),
      render: roles => roles.join(', '),
      width: 200
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: _id => (
        <TableOptions
          id={_id}
          path='usuarios'
          role={role}
          onDelete={handleDelete}
          confirm='¿Estas seguro de eliminar este usuario?'
        />
      )
    }
  ]

  return (
    <>
      <HeaderSection title={`Lista de ${role || 'usuario'}s`}>
        <Link
          href={role ? `/usuarios/agregar?role=${role}` : '/usuarios/agregar'}
        >
          <Button type='primary'>Agregar {role || 'usuario'}</Button>
        </Link>
      </HeaderSection>
      <HeaderFlex>
        <Input placeholder="Nombres" style={{ width: '30%', margin: '0px 0px 8px 0px' }} value={names} onChange={ value => { setNames(value.target.value) } }/>
        <Input placeholder="Username" style={{ width: '30%', margin: '0px 0px 8px 0px' }} value={username} onChange={ value => { setUsername(value.target.value) } } />
        <Input placeholder="Email" style={{ width: '30%', margin: '0px 0px 8px 0px' }} value={email} onChange={ value => { setEmail(value.target.value) } } />
        <Input placeholder="Celular" style={{ width: '30%', margin: '0px 0px 8px 0px' }} value={mobile} onChange={ value => { setMobile(value.target.value) } } />
        <Input placeholder="Número de documento" style={{ width: '30%', margin: '0px 0px 8px 0px' }} value={dni} onChange={ value => { setDni(value.target.value) } } />
        <Select value={rol} placeholder='Elegir rol ...' style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setRol(value)}>
          <Option value="Docente">Docente</Option>
          <Option value="Administrador">Administrador</Option>
          <Option value="Interesado">Interesado</Option>
          <Option value="Estudiante">Estudiante</Option>
          <Option value="Cliente">Cliente</Option>
          <Option value="Asesor">Asesor</Option>
          <Option value="Tesorero">Tesorero</Option>
          <Option value="Recepcionista">Recepcionista</Option>
        </Select>
        <HeaderButton onClick={handleButton}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        dataSource={users}
        loading={!loaded && loading}
        rowKey='_id'
        scroll={{ x: 800 }}
        size='middle'
        bordered
      />
    </>
  )
}
