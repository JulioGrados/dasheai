import Link from 'next/link'
import moment from 'moment'

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

import { HeaderFlex, HeaderButton } from './styles/styles'

import { useCourses } from '../../hooks'

import { payloadToData } from 'utils/functions/certificate'

import { getCertificates, deleteCertificate } from '../../redux/certificate'
import {
  useReduxState,
  useReduxFetch,
  useReduxRemove
} from '../../hooks/redux'

import { useState } from 'react'

const { RangePicker } = DatePicker
const { Option } = Select

export const CertificateList = () => {
  const certificateState = useReduxState('certificate')
  const fetchSales = useReduxFetch(getCertificates)
  const handleDelete = useReduxRemove(
    deleteCertificate,
    'El certificado se elimino correctamente'
  )
  const { courses } = useCourses()

  const [course, setCourse] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const onChangeDate = (date, dateString) => {
    setStart(dateString[0])
    setEnd(dateString[1])
  }

  const handleSelect = id => {
    if (id) {
      const index = courses.findIndex(item => item._id === id)
      setCourse(courses[index])
    } else {
      setCourse('')
    }
  }

  const handleSearch = () => {
    if ((start && end) || course) {
      if ((start && end) && course) {
        fetchSales({ query: { date: { $gte: new Date(start), $lte: new Date(end) }, 'course.ref': course._id }, populate: ['linked.ref', 'course.ref'], sort: '-date' })
      } else if ((start && end) && !course) {
        fetchSales({ query: { date: { $gte: new Date(start), $lte: new Date(end) } }, populate: ['linked.ref', 'course.ref'], sort: '-date' })
      } else if (!(start && end) && course) {
        fetchSales({ query: { 'course.ref': course._id }, populate: ['linked.ref', 'course.ref'], sort: '-date' })
      }
    }
  }

  const certificates = certificateState && certificateState.list && certificateState.list.map(item => payloadToData(item))
  console.log('certificates', certificates)
  const columns = getColumns(certificates, handleDelete)

  return (
    <>
      <HeaderSection title='Lista de certificados'>
        <Link href='/certificados/agregar'>
          <Button type='primary'>Agregar certificado</Button>
        </Link>
      </HeaderSection>
      <HeaderFlex>
        <RangePicker onChange={onChangeDate} />
        <Select
          showSearch
          placeholder='Seleccionar curso'
          onChange={handleSelect}
          style={{ width: '100%' }}
          filterOption={
            (input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {courses.map(course => (
            <Option key={course._id} value={course._id}>
              {course.name}
            </Option>
          ))}
        </Select>
        <HeaderButton onClick={handleSearch}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        dataSource={certificates}
        loading={!certificates}
        rowKey='_id'
      />
    </>
  )
}

const getColumns = (list, handleDelete) => [
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
  },
  {
    title: 'Opciones',
    dataIndex: '_id',
    key: '_id',
    render: _id => (
      <TableOptions
        id={_id}
        path='certificados'
        onDelete={handleDelete}
        confirm='Estas seguro de eliminar este certificado?'
      />
    )
  }
]
