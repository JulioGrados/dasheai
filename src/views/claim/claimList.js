import Link from 'next/link'
import { Button } from 'antd'
import { HeaderSection, Table, TableOptions, SearchRow, FilterRow } from '../../components'
import { useClaims } from '../../hooks'

import moment from 'moment'

export const ClaimList = () => {
  const { claims, loading, remove, loaded } = useClaims()
  const columns = getColumns(remove, claims)

  console.log(claims)

  return (
    <>
      <HeaderSection title='Lista de reclamos'>
        <Link href='/reclamos/agregar'>
          <Button type='primary'>Agregar reclamo</Button>
        </Link>
      </HeaderSection>
      <Table
        columns={columns}
        dataSource={claims}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (handleDelete, claims) => [
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
    render: createdAt => moment(createdAt).format('ll')
  },
  {
    title: 'Opción',
    dataIndex: 'option',
    key: 'option',
    ...FilterRow('option', claims)
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ...SearchRow('email', 'Buscar por email.')
  },
  {
    title: 'Nombres',
    dataIndex: 'firstName',
    key: 'firstName',
    ...SearchRow('firstName', 'Buscar por firstName.')
  },
  {
    title: 'Apellidos',
    dataIndex: 'lastName',
    key: 'lastName',
    ...SearchRow('lastName', 'Buscar por lastName.')
  },
  {
    title: 'DNI',
    dataIndex: 'dni',
    key: 'dni',
    ...SearchRow('dni', 'Buscar por dni.')
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='reclamo'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar este reclamo?'
      />
    )
  }
]
