import moment from 'moment'
import { Input } from 'antd'
import {
  HeaderSection,
  Table,
  TableOptions,
  SearchRow,
  FilterRow
} from 'components-path'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderFlex, HeaderButton } from '../styles/styles'

import { searchEmails, listEmails } from 'utils/api/emails'
import { payloadToData } from 'utils/functions/email'

export const EmailList = ({ emails, loading, loaded, handleDelete }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [subject, setSubject] = useState()

  const [list, setList] = useState([])

  useEffect(() => {
    if (emails) {
      setList(emails)
    }
  }, [emails])

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: date => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Hora',
      dataIndex: 'hour',
      key: 'hour',
      render: hour => moment(hour).format('HH:mm')
    },
    {
      title: 'Asesor asigando',
      dataIndex: 'assignedName',
      key: 'assignedName',
      ...SearchRow('assigned')
    },
    {
      title: 'Usuario vinculado',
      dataIndex: 'linkedName',
      key: 'linkedName',
      ...SearchRow('linkedName')
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      ...SearchRow('to')
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ...SearchRow('subject')
    },
    {
      title: 'Plantilla',
      dataIndex: 'templateName',
      key: 'templateName',
      ...SearchRow('templateName')
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      ...FilterRow('status', list)
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <TableOptions
          id={_id}
          path='emails'
          onDelete={handleDelete}
          confirm='Estas seguro de eliminar esta plantilla?'
        />
      )
    }
  ]

  const handleButton = async () => {
    const query = []
    const queryNotRef = {}
    if (firstName) {
      const data = { 'linked.ref.firstName': { $regex: firstName, $options: 'i' } }
      query.push(data)
    }
    if (lastName) {
      const data = { 'linked.ref.lastName': { $regex: lastName, $options: 'i' } }
      query.push(data)
    }
    if (email) {
      const data = { 'linked.ref.email': { $regex: email, $options: 'i' } }
      queryNotRef.to = { $regex: email, $options: 'i' }
      query.push(data)
    }
    if (subject) {
      const data = { subject: { $regex: subject, $options: 'i' } }
      queryNotRef.subject = { $regex: subject, $options: 'i' }
      query.push(data)
    }
    
    if (email || subject) {
      const data = await searchEmails({ query })
      const dataNotRef = await listEmails({ query: queryNotRef } )
      const filter = data.map(item => payloadToData(item))
      const filterNotRef = dataNotRef.map(item => payloadToData(item))
      console.log(filter)
      console.log(filterNotRef)
      setList([...filter, ...filterNotRef])
    } else {
      const data = await searchEmails({ query })
      const filter = data.map(item => payloadToData(item))
      setList(filter)
    }
  }
  
  return (
    <>
      <HeaderSection title='Lista de emails'></HeaderSection>
      <HeaderFlex>
        <Input placeholder="Nombres" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setFirstName(value.target.value)} value={firstName} />
        <Input placeholder="Apellidos" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setLastName(value.target.value) } value={lastName}/>
        <Input placeholder="To (email)" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={ value => setEmail(value.target.value) } value={email}/>
        <Input placeholder="Subject" style={{ width: '30%', margin: '0px 0px 8px 0px' }} onChange={value => setSubject(value.target.value)} value={subject} />
        <HeaderButton onClick={handleButton}>
          <SearchOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </HeaderButton>
      </HeaderFlex>
      <Table
        columns={columns}
        dataSource={list}
        loading={!loaded && loading}
        rowKey='_id'
      />
    </>
  )
}
