import Link from 'next/link'
import moment from 'moment'
import { Upload, Icon, Button, Select } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow,
  Box
} from '../../components'

import { HeaderFlex } from './styles/styles'
import { useReduxFetch, useReduxState } from '../../hooks/redux'
import { migrateSales } from '../../redux/migration'
import { useCourses, useCertificates } from '../../hooks'
import { useState } from 'react'

import { payloadToData } from 'utils/functions/certificate'

export const DealAgreements = () => {
  const [course, setCourse] = useState()
  const [certificates, setCertificates] = useState([])
  const { courses } = useCourses()
  const { dealagree } = useCertificates()

  const handleSelect = async (id) => {
    if (id) {
      setCertificates([])
      const index = courses.findIndex(item => item._id === id)
      setCourse(courses[index])
      const data = await dealagree(courses[index])
      console.log('data', data)
      setCertificates(data.map(item => payloadToData(item)))
    } else {
      setCourse('')
      setCertificates([])
    }    
  }
  
  const columns = getColumns(certificates)

  return (
    <>
      <HeaderSection title='Migrar convenios a tratos' />
      <Box>
        <Select
          showSearch
          placeholder='Selecciona un curso'
          onSelect={handleSelect}
          value={course && course._id}
          style={{ width: '100%' }}
          filterOption={
            (input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {courses.map(course => (
            <Select.Option key={course._id} value={course._id}>
              {course.name}
            </Select.Option>
          ))}
        </Select>
      </Box>
      <HeaderFlex>
        
      </HeaderFlex>
      <br></br>
      <Table
        columns={columns}
        dataSource={certificates}
        loading={!certificates}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list) => [
  {
    title: 'Fecha',
    dataIndex: 'date',
    render: date => moment(date).format('DD/MM/YYYY')
    // ...SearchRow('date')
  },
  {
    title: 'Codigo',
    dataIndex: 'code',
    ...SearchRow('code')
  },
  {
    title: 'User',
    dataIndex: 'linkedName',
    ...SearchRow('user')
  },
  {
    title: 'Curso',
    dataIndex: 'courseName',
    ...FilterRow('courseName', list)
  },
  {
    title: 'Nota',
    dataIndex: 'score',
    ...SearchRow('score')
  }
  ,
  {
    title: 'Colegio',
    dataIndex: 'agreementName',
    ...FilterRow('agreementName', list)
  }
]
