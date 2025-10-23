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

export const UserListSMS = ({ users, loading, loaded, handleDelete, role, handleSearch }) => {

  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 200,
      // ...SearchRow('names', 'Buscar por nombres y apellidos.')
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastName',
      key: 'lastName',
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
      title: 'Estudiante',
      dataIndex: 'roles',
      // ...FilterRow('roles', users, !!role),
      render: roles => roles.includes('Estudiante') ? 'Si' : 'No',
      width: 200
    }
  ]

  return (
    <>
      <HeaderSection title='Lista de usuarios para SMS'>
        
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={users}
        loading={!loaded && loading}
        rowKey='_id'
        scroll={{ x: 800 }}
        pagination={{ pageSize: 1000 }}
        size='middle'
        bordered
      />
    </>
  )
}
