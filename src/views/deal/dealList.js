import moment from 'moment'
import Link from 'next/link'
import { Button, Select, Input } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'
import { useDeals } from '../../hooks'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderFlex, HeaderButton } from './styles/styles'
import { useEffect, useState } from 'react'

import { getProgresses, deleteProgress } from 'redux-path/progress'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../hooks/redux'
import { searchDeals } from 'utils/api/deals'

const { Option } = Select

export const DealList = () => {
  const [names, setNames] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [list, setList] = useState([])

  const progressState = useReduxState('progress')
  const fetchProgresses = useReduxFetch(getProgresses)

  const { deals, loading, remove, loaded } = useDeals()
  
  useEffect(() => {
    if (progressState.list.length === 0) {
      fetchProgresses({ sort: 'order' })
    }
  }, [])


    if (deals) {
      setList(deals)
    }


  const handleButton = async () => {
    const query = []

    if (names) {
      const data = { 'client.names': { $regex: names, $options: 'i' } }
      query.push(data)
    }
    if (email) {
      const data = { 'client.email': { $regex: email, $options: 'i' } }
      query.push(data)
    }
    if (mobile) {
      const data = { 'client.mobile': parseInt(mobile) }
      query.push(data)
    }
    console.log('query', query)
    const data = await searchDeals(
      {
        aggregate:
        {
          aggregate: [
            {
              $lookup: {
                from: 'users',
                localField: 'client',
                foreignField: '_id',
                as: 'client'
              }
            },
            {
              $unwind: '$client'
            },
            {
              $match: {
                $or: query
              }
            }
          ]
        },
        sort: 'startDate'
      }
    )
    console.log('data', data)
  }
  
  const statusSale = progressState && progressState.list.filter(item => item.pipes.includes('deals'))
  const statusPayment = progressState && progressState.list.filter(item => item.pipes.includes('accounting'))
  
  const columns = getColumns(list, remove)
  return (
    <>
      <HeaderSection
        title='Lista de tratos'>
        <Link href='/tratos/agregar'>
          <Button type='primary'>Agregar Trato</Button>
        </Link>
      </HeaderSection>
      <HeaderFlex>
        <Input placeholder="Nombres" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setNames(value.target.value) }/>
        <Input placeholder="Email" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setEmail(value.target.value) }/>
        <Input placeholder="Celular" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setMobile(value.target.value) }/>
        <Select placeholder='Estado ...' style={{ width: '30%', margin: '0px 0px 8px 0px' }} >
          <Option value="Docente">Docente</Option>
          <Option value="Administrador">Administrador</Option>
          <Option value="Interesado">Interesado</Option>
          <Option value="Estudiante">Estudiante</Option>
          <Option value="Cliente">Cliente</Option>
          <Option value="Asesor">Asesor</Option>
          <Option value="Tesorero">Tesorero</Option>
          <Option value="Recepcionista">Recepcionista</Option>
        </Select>
        <Select placeholder='Etapa de venta ...' style={{ width: '30%', margin: '0px 0px 8px 0px' }} >
          {statusSale.map(item => (
            <Option value={item.name}>{item.name}</Option>  
          ))}
        </Select>
        <Select placeholder='Etapa de pago ...' style={{ width: '30%', margin: '0px 0px 8px 0px' }} >
          {statusPayment.map(item => (
            <Option value={item.name}>{item.name}</Option>  
          ))}
        </Select>
        <Input placeholder="ID" style={{ width: '30%', margin: '0px 0px 8px 0px' }} />
        <HeaderButton onClick={handleButton}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ x: 800 }}
        bordered
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    width: 150,
    title: 'Fecha Inicial',
    dataIndex: 'createdAt',
    key: 'createdAt',
    // sorter: (a, b) => moment(a.createdAt).isSameOrAfter(moment(b.createdAt)),
    render: createdAt => moment(createdAt).format('DD/MM/YYYY')
  },
  // {
  //   width: 150,
  //   title: 'Hora Inicial',
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   render: createdAt => moment(createdAt).format('HH:mm')
  // },
  {
    width: 150,
    title: 'Nombres del usuario',
    dataIndex: 'names',
    // ...SearchRow('names', 'Buscar por nombres del usuario')
  },
  {
    width: 150,
    title: 'Email del usuario',
    dataIndex: 'email',
    // ...SearchRow('email', 'Buscar por email del usuario')
  },
  {
    width: 150,
    title: 'Celular del usuario',
    dataIndex: 'mobile',
    // ...SearchRow('mobile', 'Buscar por celular del usuario')
  },
  {
    width: 150,
    title: 'Cursos',
    dataIndex: 'coursesNames',
    // ...SearchRow('coursesNames', 'Buscar por cursos.')
  },
  {
    width: 150,
    title: 'Asesor',
    dataIndex: 'assigned',
    // ...SearchRow('assigned', 'Buscar por asesor.')
  },
  {
    width: 150,
    title: 'Origen',
    dataIndex: 'origin',
    render: origin => origin || 'Stranger'
  },
  {
    width: 150,
    title: 'Estado',
    dataIndex: 'status',
    // ...FilterRow('status', list)
  },
  {
    width: 150,
    title: 'Etapa',
    dataIndex: 'progressName',
    // ...FilterRow('progressName', list)
  },
  {
    width: 150,
    title: 'Etapa de Pago',
    dataIndex: 'progressPaymentName',
    // ...FilterRow('progressPaymentName', list)
  },
  {
    width: 260,
    title: 'ID',
    dataIndex: 'identifier'
  },
  {
    width: 150,
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    fixed: 'right',
    render: _id => (
      <TableOptions
        id={_id}
        path='tratos'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar esta trato?'
        target
      />
    )
  }
]
