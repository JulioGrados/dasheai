import Link from 'next/link'
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv"
import { Select, Button, DatePicker } from 'antd'

import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from '../../components'

import {
  SearchOutlined
} from '@ant-design/icons'

import { HeaderFilter, HeaderButton } from './styles/styles'

import { payloadToDataDeal } from 'utils/functions/call'

import { getCalls, deleteCall } from '../../redux/call'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../hooks/redux'

import { useEffect, useState } from 'react'

const { RangePicker } = DatePicker

export const NotAnswer3List = () => {
  const callState = useReduxState('call')
  const fetchCalls = useReduxFetch(getCalls)
  const handleDelete = useReduxRemove(
    deleteCall,
    'El certificado se elimino correctamente'
  )

  const [start, setStart] = useState(moment().subtract(1, 'days').endOf('day').subtract(5, 'hours'))
  const [end, setEnd] = useState(moment().endOf("day").subtract(5, 'hours'))
  
  useEffect(() => {
    if (callState.list.length === 0) {
      fetchCalls({
        query: {
          date: { $gt: new Date(start), $lt: new Date(end) },
          isCompleted: false,
          deal: { $exists: true }
        },
        populate: {
          path: 'deal',
          populate : {
            path : 'client'
          }
        }
      })
    }
  }, [])

  const onChangeDate = (date, dateString) => {
    setStart(dateString[0])
    setEnd(dateString[1])
  }

  const handleSearch = () => {
    console.log('start', start)
    console.log('end', end)
    if (start && end) {
      fetchCalls({ 
        query: {
          date: { $gt: new Date(start), $lt: new Date(end) },
          isCompleted: false,
          deal: { $exists: true }
        },
        populate: {
          path: 'deal',
          populate : {
            path : 'client'
          }
        }
       })
    }
  }

  // console.log('moment', moment('2023-02-02T00:00:00Z'))

  const callsFilter = callState.list.filter(call => {
    return call.deal && call.deal.progress && call.deal.progress.ref === "63bf40f404394e2b74617c09"
  })
  
  const calls = callsFilter && callsFilter.map(item => payloadToDataDeal(item))
  const csvData = calls.map(item => [
    moment(item.date).add(5, 'hours').format('DD/MM/YYYY'),
    item.status,
    item.email,
    item.mobileCode.toString(),
    item.mobile.toString(),
    item.firstName,
    item.lastName,
    item.dealId
  ])
  csvData.unshift(['Fecha', 'Estado', 'Email', 'Código país', 'Celular', 'Nombres', 'Apellidos', 'Deal'])
  // console.log('calls', calls)
  const columns = getColumns(calls, handleDelete)

  return (
    <>
      <HeaderSection title='No contesto 3'>
        <CSVLink data={csvData}>Download me</CSVLink>
      </HeaderSection>
      <HeaderFilter>
        <RangePicker onChange={onChangeDate} />
        
        <HeaderButton onClick={handleSearch}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFilter>
      <Table
        columns={columns}
        dataSource={calls}
        loading={!calls}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    title: 'Fecha',
    dataIndex: 'date',
    render: date => moment(date).add(5, 'hours').format('DD/MM/YYYY')
    // ...SearchRow('date')
  },
  {
    title: 'Etapa',
    dataIndex: 'stage',
    ...SearchRow('stage')
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ...SearchRow('email')
  },
  {
    title: 'Código país',
    dataIndex: 'mobileCode',
    ...SearchRow('mobileCode')
  },
  {
    title: 'Celular',
    dataIndex: 'mobile',
    ...SearchRow('mobile')
  },
  {
    title: 'Nombres',
    dataIndex: 'firstName',
    ...SearchRow('firstName')
  },
  {
    title: 'Apellidos',
    dataIndex: 'lastName',
    ...SearchRow('lastName')
  },
  {
    title: 'Deal',
    dataIndex: 'dealId',
    ...SearchRow('dealId')
  }
]
