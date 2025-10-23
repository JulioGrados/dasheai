import Link from 'next/link'
import moment from 'moment'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from 'components-path'

import {
  HeaderFlex,
  HeaderButton
} from '../styles/styles'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input } from 'antd'

import { useState, useEffect } from 'react'
import { searchSales } from 'utils/api/sales'
import { payloadToData } from 'utils/functions/sale'

export const SaleList = ({ list, loading, loaded, handleDelete, handleFilter, start, end }) => {
  // const [startFilterDate, setStartFilterDate] = useState(start)
  // const [endFilterDate, setEndFilterDate] = useState(end)
  // const [amount, setAmount] = useState(0)
  const [sales, setSales] = useState([])
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()

  useEffect(() => {
    if (list) {
      // let amountSum = 0
      // list.forEach(element => { if (element.status === 'Finalizada') { amountSum = amountSum + element.amount } })
      // setAmount(amountSum)
      setSales(list)
    }
  }, [list])

  // const onChangeStart = (e) => {
  //   setStartFilterDate(moment(e).format('YYYY/M/D'))
  //   handleFilter(new Date(moment(e).format('YYYY/M/D')), new Date(endFilterDate))
  // }

  // const onChangeEnd = (e) => {
  //   setEndFilterDate(moment(e).format('YYYY/M/D'))
  //   handleFilter(new Date(startFilterDate), new Date(moment(e).format('YYYY/M/D')))
  // }

  const columns = [
    {
      title: 'Fecha',
      width: 150,
      dataIndex: 'dateOfSale',
      key: 'dateOfSale',
      sorter: (a, b) => moment(a.dateOfSale).diff(moment(b.dateOfSale)),
      render: date => moment(date).add(5, 'hours').format('DD/MM/YYYY')
    },
    {
      title: 'Nombres',
      width: 150,
      dataIndex: 'linkedFirstName',
      key: 'linkedFirstName',
      ...SearchRow('linkedFirstName')
    },
    {
      title: 'Apellidos',
      width: 150,
      dataIndex: 'linkedLastName',
      key: 'linkedLastName',
      ...SearchRow('linkedLastName')
    },
    {
      title: 'Email',
      width: 150,
      dataIndex: 'linkedEmail',
      key: 'linkedEmail',
      ...SearchRow('linkedEmail')
    },
    {
      title: 'Celular',
      width: 150,
      dataIndex: 'linkedMobile',
      key: 'linkedMobile',
      ...SearchRow('linkedMobile')
    },
    {
      title: 'Anulada',
      width: 150,
      dataIndex: 'annular',
      key: 'annular',
      render: (annular) => annular ? 'Sí' : 'No',
    },
    {
      title: 'Cuota',
      width: 150,
      dataIndex: 'numberOrders',
      key: 'numberOrders',
      sorter: (a, b) => a.numberOrders - b.numberOrders,
      render: (numberOrders, sale) => (
        <span>
          {sale.numberOrdersPay}/{numberOrders}
        </span>
      )
    },
    {
      title: 'Monto',
      width: 150,
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => (
        <span>
          {amount}
        </span>
      )
    },
    {
      title: 'Moneda',
      width: 150,
      dataIndex: 'currency',
      key: 'currency',
      ...SearchRow('currency')
    },
    {
      title: 'Asesor',
      width: 150,
      dataIndex: 'assignedName',
      ...FilterRow('assignedName', list)
    },
    {
      title: 'Estado',
      width: 150,
      dataIndex: 'status',
      ...FilterRow('status', list)
    },
    {
      title: 'Opciones',
      width: 150,
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='ventas'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta venta?'
        />
      )
    }
  ]

  const handleButton = async () => {
    const query = []
    if (firstName) {
      query.push({ 'user.ref.firstName': { $regex: firstName, $options: 'i' } })
    }
    if (lastName) {
      query.push({ 'user.ref.lastName': { $regex: lastName, $options: 'i' } })
    }
    if (email) {
      query.push({ 'user.ref.email': { $regex: email, $options: 'i' } })
    }
    if (mobile) {
      query.push({ 'user.ref.mobile': parseInt(mobile) })
    }

    if (firstName || lastName || email || mobile) {
      const filter = await searchSales({ query })
      console.log(filter)
      const filterPayload = filter.map(item => payloadToData(item))
      setSales(filterPayload)
    }
  }

  return (
    <>
      <HeaderSection title='Lista de Ventas'>
        <Link href='/ventas/agregar'>
          <Button type='primary'>Agregar venta</Button>
        </Link>
      </HeaderSection>
      {/* <HeaderFlex>
        <HeaderFlexFilter>
          <HeaderFlexFilterItem>
            <HeaderFlexFilterItemName>Fecha de Inicio:</HeaderFlexFilterItemName>
            <HeaderFlexFilterItemDate>
              <DatePicker
                value={moment(new Date(startFilterDate))}
                onChange={onChangeStart}
              />
            </HeaderFlexFilterItemDate>
          </HeaderFlexFilterItem>
          <HeaderFlexFilterItem>
            <HeaderFlexFilterItemName>Fecha de Fin:</HeaderFlexFilterItemName>
            <HeaderFlexFilterItemDate>
              <DatePicker
                value={moment(new Date(endFilterDate))}
                onChange={onChangeEnd}
              />
            </HeaderFlexFilterItemDate>
          </HeaderFlexFilterItem>
        </HeaderFlexFilter>
        <HeaderFlexMount>
          <HeaderFlexMountName>Monto:</HeaderFlexMountName>
          <HeaderFlexMountPrice>s/. {amount}</HeaderFlexMountPrice>
        </HeaderFlexMount>
      </HeaderFlex> */}
      <HeaderFlex>
        <Input placeholder="Nombres" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setFirstName(value.target.value)} value={firstName} />
        <Input placeholder="Apellidos" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setLastName(value.target.value) } value={lastName}/>
        <Input placeholder="Email" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setEmail(value.target.value) } value={email}/>
        <Input placeholder="Celular" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setMobile(value.target.value)} value={mobile} />
        <HeaderButton onClick={handleButton}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 800 }}
        dataSource={sales}
        loading={!loaded && loading}
        rowKey='_id'
        size='middle'
      />
    </>
  )
}
