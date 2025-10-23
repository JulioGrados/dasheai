import Link from 'next/link'
import moment from 'moment'
import { Select, Button, DatePicker, Alert, message } from 'antd'

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

import { HeaderFilter, HeaderButton, HeaderFilterSelect, HeaderFilterRight, HeaderFilterLeft } from './styles/styles'

import { payloadToDataDeal } from 'utils/functions/call'

import { getCalls, deleteCall } from '../../redux/call'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../hooks/redux'

import { useEffect, useState } from 'react'
import { SelectAssessors } from '../../containers'
import { reasignDeal } from 'utils/api/deals'

const { RangePicker } = DatePicker

export const ReasignList = () => {
  const [deals, setDeals] = useState([])
  const [count, setCount] = useState(0)
  const [reasign, setReasign] = useState(null)
  const callState = useReduxState('call')
  const fetchCalls = useReduxFetch(getCalls)
  const handleDelete = useReduxRemove(
    deleteCall,
    'El certificado se elimino correctamente'
  )
  const start = moment().subtract(1, 'days').endOf('day').subtract(5, 'hours').subtract(2, 'months')
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setDeals(selectedRows)
    }
  }
  
  
  useEffect(() => {
    if (callState.list.length === 0) {
      fetchCalls({
        query: {
          date: { $gt: new Date(start) },
          isCompleted: false,
          deal: { $exists: true }
        },
        populate: {
          path: 'deal',
          populate : {
            path : 'client'
          }
        },
        sort: 'date'
      })
    }
  }, [])

  const handleSelectAssessor = async (value) => {
    setReasign(value)
  }

  const handleSubmit = async () => {
    if (reasign && deals.length){
      const data = {
        assessor: reasign,
        deals: deals
      } 
      const response = await reasignDeal(data)
      if (response.success) {
        if (response.errorDeals.length) {
          message.warning('Para algunos tratos no se realizó la re asignación, comprobar.')
        } else {
          console.log('entro 2')
          message.success('El proceso se realizó exitosamente.')
        }
      } else {
        message.error('No se realizó el proceso.')
      }
    } else {
      message.error('Seleccionar asesor y tratos')
    }
  }

  const handleChange = (pagination, filters, sorter, extra) => {
    if (extra && extra.currentDataSource) {
      setCount(extra.currentDataSource.length)
    }
  }
  
  const calls = callState && callState.list.map(item => payloadToDataDeal(item))
  const columns = getColumns(calls, handleDelete)

  return (
    <>
      <HeaderSection title='Re Asignar'>
        
      </HeaderSection>
      <HeaderFilter>
        <HeaderFilterLeft>
          Total: {count}
        </HeaderFilterLeft>
        <HeaderFilterRight>
          <HeaderFilterSelect>
            <SelectAssessors
              type='username'
              reasign={reasign}
              onSelect={handleSelectAssessor}
            />
          </HeaderFilterSelect>
          <HeaderButton onClick={handleSubmit}>Re asignar</HeaderButton>
        </HeaderFilterRight>
      </HeaderFilter>
      <Table
        onChange={handleChange}
        columns={columns}
        dataSource={calls}
        loading={!calls}
        rowKey='_id'
        rowSelection={rowSelection}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 2000 }}
        bordered
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
  {
    width: 150,
    title: 'Fecha',
    dataIndex: 'time',
    // render: date => moment(date).add(5, 'hours').format('DD/MM/YYYY'),
    ...FilterRow('time', list)
  },
  {
    width: 150,
    title: 'Estado',
    dataIndex: 'status',
    ...FilterRow('status', list)
  },
  {
    width: 150,
    title: 'Etapa',
    dataIndex: 'stage',
    ...FilterRow('stage', list)
  },
  {
    width: 150,
    title: 'Email',
    dataIndex: 'email',
    ...SearchRow('email')
  },
  {
    width: 150,
    title: 'Código país',
    dataIndex: 'mobileCode',
    ...SearchRow('mobileCode')
  },
  {
    width: 150,
    title: 'Celular',
    dataIndex: 'mobile',
    ...SearchRow('mobile')
  },
  {
    width: 150,
    title: 'Nombres',
    dataIndex: 'firstName',
    ...SearchRow('firstName')
  },
  {
    width: 150,
    title: 'Apellidos',
    dataIndex: 'lastName',
    ...SearchRow('lastName')
  },
  {
    width: 150,
    title: 'Asesor',
    dataIndex: 'assessor',
    ...FilterRow('assessor', list)
  }
]
